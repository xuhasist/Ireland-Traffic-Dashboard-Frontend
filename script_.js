// ========================================
// 模擬 HERE Maps API 資料生成器
// ========================================

// 都柏林主要道路列表
const dublinRoads = [
  { name: "O'Connell Street", lat: 53.3498, lng: -6.2603 },
  { name: "Grafton Street", lat: 53.3419, lng: -6.2603 },
  { name: "Dame Street", lat: 53.3445, lng: -6.2672 },
  { name: "Nassau Street", lat: 53.3425, lng: -6.2545 },
  { name: "Abbey Street", lat: 53.3488, lng: -6.2580 },
  { name: "Talbot Street", lat: 53.3505, lng: -6.2532 },
  { name: "Henry Street", lat: 53.3490, lng: -6.2628 },
  { name: "Parnell Street", lat: 53.3528, lng: -6.2628 },
  { name: "College Green", lat: 53.3445, lng: -6.2595 },
  { name: "Westmoreland Street", lat: 53.3460, lng: -6.2595 },
];

// 模擬 Traffic Flow API 回傳資料
function generateMockTrafficFlow() {
  return {
    results: dublinRoads.map((road, index) => {
      // 隨機生成壅塞指數 (0-10)
      const jamFactor = (Math.random() * 10).toFixed(1);
      const freeFlowSpeed = 50; // 正常車速
      
      // 根據壅塞程度計算當前車速
      let currentSpeed;
      if (jamFactor < 4) {
        currentSpeed = Math.floor(freeFlowSpeed - jamFactor * 2);
      } else if (jamFactor < 7) {
        currentSpeed = Math.floor(freeFlowSpeed - jamFactor * 4);
      } else {
        currentSpeed = Math.floor(freeFlowSpeed - jamFactor * 5);
      }
      currentSpeed = Math.max(10, currentSpeed); // 最低 10 km/h
      
      return {
        location: {
          description: road.name,
          shape: {
            links: [
              {
                linkId: `link_${index}`,
                points: [
                  { lat: road.lat, lng: road.lng },
                  { lat: road.lat + 0.002, lng: road.lng + 0.002 }
                ]
              }
            ]
          }
        },
        currentFlow: {
          speed: currentSpeed,
          speedUncapped: currentSpeed,
          freeFlow: freeFlowSpeed,
          jamFactor: parseFloat(jamFactor),
          confidence: (0.8 + Math.random() * 0.2).toFixed(2),
          traversability: "open"
        }
      };
    })
  };
}

// 模擬 Traffic Incidents API 回傳資料
function generateMockIncidents() {
  const incidentTypes = [
    { type: "ACCIDENT", icon: "🚨", severity: "critical" },
    { type: "ROADWORK", icon: "🚧", severity: "major" },
    { type: "HEAVY_TRAFFIC", icon: "⚡", severity: "minor" },
    { type: "ROAD_CLOSURE", icon: "🚫", severity: "major" },
  ];
  
  // 隨機生成 2-5 個事件
  const numIncidents = Math.floor(Math.random() * 4) + 2;
  const selectedRoads = dublinRoads
    .sort(() => Math.random() - 0.5)
    .slice(0, numIncidents);
  
  return {
    results: selectedRoads.map((road, index) => {
      const incident = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
      const delayMinutes = Math.floor(Math.random() * 25) + 5;
      const minutesAgo = Math.floor(Math.random() * 120) + 5;
      
      return {
        incidentDetails: {
          id: `incident_${Date.now()}_${index}`,
          type: incident.type,
          criticality: incident.severity,
          description: `${incident.type.replace('_', ' ')} on ${road.name}`,
          startTime: new Date(Date.now() - minutesAgo * 60000).toISOString(),
          endTime: new Date(Date.now() + 60 * 60000).toISOString()
        },
        location: {
          shape: {
            links: [
              {
                points: [{ lat: road.lat, lng: road.lng }]
              }
            ]
          },
          description: road.name
        },
        impact: {
          delayInSeconds: delayMinutes * 60,
          affectedRoads: [road.name]
        },
        icon: incident.icon
      };
    })
  };
}

// ========================================
// 資料處理與畫面更新
// ========================================

let trafficFlowData = [];
let incidentsData = [];
let currentSort = "worst";
let autoUpdateInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Dublin Traffic Dashboard - Mock Data Mode");
  
  showLoading();
  
  // 初始載入
  setTimeout(() => {
    updateDashboard();
    hideLoading();
    
    // 開始自動更新 (每 5 秒)
    startAutoUpdate();
  }, 1000);
});

// 自動更新功能
function startAutoUpdate() {
  console.log("⏰ 啟動自動更新 (每 5 秒)");
  
  autoUpdateInterval = setInterval(() => {
    console.log(`🔄 自動更新 - ${new Date().toLocaleTimeString()}`);
    updateDashboard();
  }, 5000); // 5 秒更新一次
}

function stopAutoUpdate() {
  if (autoUpdateInterval) {
    clearInterval(autoUpdateInterval);
    autoUpdateInterval = null;
    console.log("⏸️ 停止自動更新");
  }
}

// 更新整個 Dashboard
function updateDashboard() {
  // 1. 生成新的模擬資料
  const mockFlowData = generateMockTrafficFlow();
  const mockIncidentData = generateMockIncidents();
  
  // 2. 轉換為原本的格式
  trafficFlowData = mockFlowData.results.map(result => {
    const jamFactor = result.currentFlow.jamFactor;
    let status;
    if (jamFactor < 4) status = "good";
    else if (jamFactor < 7) status = "moderate";
    else status = "heavy";
    
    return {
      name: result.location.description,
      jamLevel: jamFactor,
      speed: result.currentFlow.speed,
      status: status,
      freeFlow: result.currentFlow.freeFlow,
      confidence: result.currentFlow.confidence
    };
  });
  
  incidentsData = mockIncidentData.results.map(result => {
    const minutesAgo = Math.floor((Date.now() - new Date(result.incidentDetails.startTime)) / 60000);
    const delayMinutes = Math.floor(result.impact.delayInSeconds / 60);
    
    let timeText;
    if (minutesAgo < 60) {
      timeText = `${minutesAgo} mins ago`;
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      timeText = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    }
    
    return {
      type: result.incidentDetails.type.replace('_', ' '),
      icon: result.icon,
      location: result.location.description,
      time: timeText,
      delay: `${delayMinutes} min delay`,
      severity: result.incidentDetails.criticality
    };
  });
  
  // 3. 更新畫面
  sortTrafficData(trafficFlowData, currentSort);
  renderTrafficLists(trafficFlowData);
  renderIncidentsLists(incidentsData);
  updateMetricsCards();
  
  console.log(`✅ Dashboard 已更新 - ${trafficFlowData.length} 條道路, ${incidentsData.length} 個事件`);
}

// ========================================
// 畫面渲染函數
// ========================================

function showLoading() {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.classList.add("active");
}

function hideLoading() {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.classList.remove("active");
}

function renderTrafficLists(trafficData, applyFilter = false) {
  const trafficList = document.querySelector(".traffic-list");
  const oldItems = trafficList.querySelectorAll(".traffic-item");
  oldItems.forEach((item) => item.remove());

  trafficData.forEach((data) => {
    const item = document.createElement("div");
    item.classList.add("traffic-item");

    const jamWidth = (data.jamLevel / 10) * 100;

    item.innerHTML = `
        <div class="street-info">
            <div class="street-name">${data.name}</div>
            <div class="jam-indicator">
              <div class="jam-bar">
                <div class="jam-fill ${
                  data.status
                }" style="width: ${jamWidth}%"></div>
              </div>
              <span class="jam-text">Jam: ${data.jamLevel}/10</span>
            </div>
          </div>
          <div class="traffic-info">
            <span class="speed">${data.speed} km/h</span>
            <span class="status-badge status-${data.status}">${
      data.status.charAt(0).toUpperCase() + data.status.slice(1)
    }</span>
          </div>
        `;
    trafficList.appendChild(item);

    if (applyFilter) {
      addFilterEffect();
    }
  });
}

function renderIncidentsLists(incidentsData) {
  const incidentSection = document.querySelector(".incidents-section");
  const oldItems = incidentSection.querySelectorAll(".incident-item");
  oldItems.forEach((item) => item.remove());

  incidentsData.forEach((data) => {
    const item = document.createElement("div");
    item.classList.add("incident-item", "incident-" + data.severity);

    item.innerHTML = `
        <div class="incident-icon">${data.icon}</div>
          <div class="incident-details">
            <div class="incident-type">${data.type}</div>
            <div class="incident-location">
              ${data.location}
            </div>
            <div class="incident-time">${data.time} • ${data.delay}</div>
          </div>
          `;
    incidentSection.appendChild(item);
  });
}

function updateMetricsCards() {
  // 計算平均車速
  let totalSpeed = 0;
  trafficFlowData.forEach((data) => {
    totalSpeed += data.speed;
  });
  const avgSpeed = (totalSpeed / trafficFlowData.length).toFixed(0);

  // 計算壅塞路段數
  let congestedStreets = 0;
  trafficFlowData.forEach((data) => {
    if (data.jamLevel >= 7) {
      congestedStreets++;
    }
  });

  // 活躍事件數
  const activeIncidents = incidentsData.length;
  
  // 估算平均通勤時間 (基於壅塞程度)
  const avgJamLevel = trafficFlowData.reduce((sum, d) => sum + d.jamLevel, 0) / trafficFlowData.length;
  const baseTime = 25; // 基礎通勤時間
  const avgTravelTime = Math.floor(baseTime + avgJamLevel * 1.5);

  // 更新卡片
  const metricCards = document.querySelectorAll(".metric-card");
  metricCards[0].querySelector(
    ".value"
  ).innerHTML = `${avgSpeed} <span class="unit">km/h</span>`;
  metricCards[1].querySelector(".value").textContent = congestedStreets;
  metricCards[2].querySelector(".value").textContent = activeIncidents;
  metricCards[3].querySelector(
    ".value"
  ).innerHTML = `${avgTravelTime} <span class="unit">min</span>`;

  // 更新變化趨勢 (模擬)
  const changes = [
    { text: "↑ 5% from yesterday", class: "up" },
    { text: "↓ 3 from yesterday", class: "down" },
    { text: `↑ ${Math.floor(Math.random() * 3)} new events`, class: "up" },
    { text: "↓ 12% faster", class: "down" }
  ];
  
  changes.forEach((change, index) => {
    const changeElement = metricCards[index].querySelector(".change");
    changeElement.textContent = change.text;
    changeElement.className = `change ${change.class}`;
  });
}

// ========================================
// 事件監聽器設定
// ========================================

function setupEventListeners() {
  // Refresh 按鈕
  const refreshButton = document.querySelector(".nav-buttons .btn");
  refreshButton.addEventListener("click", () => {
    console.log("🔄 手動刷新");
    showLoading();
    setTimeout(() => {
      updateDashboard();
      hideLoading();
    }, 500);
  });

  // Settings 按鈕
  const settingsButton = document.querySelector(".btn-primary");
  settingsButton.addEventListener("click", () => {
    const isRunning = autoUpdateInterval !== null;
    
    if (isRunning) {
      stopAutoUpdate();
      settingsButton.textContent = "▶ Start Auto-Update";
      settingsButton.style.backgroundColor = "#27ae60";
      alert("⏸️ 自動更新已暫停\n\n點擊 '▶ Start Auto-Update' 可重新啟動");
    } else {
      startAutoUpdate();
      settingsButton.textContent = "Settings";
      settingsButton.style.backgroundColor = "";
      alert("▶️ 自動更新已啟動\n\n每 5 秒更新一次資料");
    }
  });

  // 排序與篩選
  const sortDropdown = document.querySelector("#sort-dropdown");
  const filterButton = document.querySelector(".filter-btn");
  
  filterButton.addEventListener("click", () => {
    const sortBy = sortDropdown.value;
    let applyFilter = sortBy === currentSort;

    sortTrafficData(trafficFlowData, sortBy);
    renderTrafficLists(trafficFlowData, applyFilter);

    currentSort = sortBy;
    console.log(`🔍 排序方式: ${sortBy}`);
  });
}

// 初始化事件監聽器
setTimeout(() => {
  setupEventListeners();
}, 1500);

// ========================================
// 工具函數
// ========================================

function addFilterEffect() {
  const trafficItems = document.querySelectorAll(".traffic-item");
  trafficItems.forEach((item) => {
    item.classList.add("filter-applied");
    setTimeout(() => {
      item.classList.remove("filter-applied");
    }, 500);
  });
}

function sortTrafficData(trafficData, sortBy) {
  if (sortBy === "worst") {
    trafficData.sort((a, b) => b.jamLevel - a.jamLevel);
  } else if (sortBy === "best") {
    trafficData.sort((a, b) => a.jamLevel - b.jamLevel);
  } else if (sortBy === "alphabetical") {
    trafficData.sort((a, b) => a.name.localeCompare(b.name));
  }
}

// ========================================
// Console 提示訊息
// ========================================

console.log(`
╔═══════════════════════════════════════╗
║  🚦 Dublin Traffic Dashboard v2.0    ║
║  模擬資料模式 - 階段 2                  ║
╠═══════════════════════════════════════╣
║  ✅ 模擬 HERE Maps API 格式           ║
║  ✅ 自動更新 (每 5 秒)                ║
║  ✅ 即時資料生成                      ║
╠═══════════════════════════════════════╣
║  功能:                                ║
║  • 10 條都柏林主要道路                ║
║  • 隨機壅塞指數 (0-10)                ║
║  • 動態事件生成 (2-5 個)              ║
║  • 自動計算指標                       ║
╚═══════════════════════════════════════╝
`);
