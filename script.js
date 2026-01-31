// ================================
// CONFIG & DATA
// ================================
const CONFIG = {
  defaultCity: "Dublin",
  cities: {
    Dublin: {
      center: [53.3493795, -6.2605593],
      bbox: {
        minLon: -6.3870259,
        minLat: 53.2987342,
        maxLon: -6.1148829,
        maxLat: 53.4105416,
      },
      roads: [
        {
          name: "O'Connell Street",
          lat: 53.3509547,
          lng: -6.2605881,
        },
        {
          name: "Grafton Street",
          lat: 53.3420874,
          lng: -6.2598865,
        },
        {
          name: "Dame Street",
          lat: 53.3441751,
          lng: -6.2646484,
        },
        {
          name: "Nassau Street",
          lat: 53.3432662,
          lng: -6.2592181,
        },
        {
          name: "Abbey Street",
          lat: 53.3485609,
          lng: -6.2581508,
        },
        {
          name: "Talbot Street",
          lat: 53.3504353,
          lng: -6.2563102,
        },
        {
          name: "Parnell Street",
          lat: 53.3501473,
          lng: -6.2670481,
        },
        {
          name: "College Green",
          lat: 53.3445818,
          lng: -6.2595687,
        },
        {
          name: "Westmoreland Street",
          lat: 53.3454921,
          lng: -6.259148,
        },
        {
          name: "Capel Street",
          lat: 53.3482491,
          lng: -6.2687204,
        },
        {
          name: "Jervis Street",
          lat: 53.3495105,
          lng: -6.2669459,
        },
        {
          name: "Parliament Street",
          lat: 53.3445312,
          lng: -6.2673698,
        },
        {
          name: "Pearse Street",
          lat: 53.344473,
          lng: -6.2511176,
        },
        {
          name: "Dorset Street",
          lat: 53.3535615,
          lng: -6.26836,
        },
        {
          name: "Baggot Street",
          lat: 53.3326025,
          lng: -6.243701,
        },
        {
          name: "Merrion Square",
          lat: 53.339152,
          lng: -6.2503308,
        },
        {
          name: "St Stephen's Green",
          lat: 53.3380517,
          lng: -6.2590232,
        },
        {
          name: "Thomas Street",
          lat: 53.3433655,
          lng: -6.2830178,
        },
        {
          name: "James's Street",
          lat: 53.3431108,
          lng: -6.2908996,
        },
        {
          name: "North Circular Road",
          lat: 53.3600583,
          lng: -6.263208,
        },
      ],
    },
    Cork: {
      center: [51.8985136, -8.4726423],
      bbox: {
        minLon: -8.6378543,
        minLat: 51.8273102,
        maxLon: -8.3551315,
        maxLat: 51.9701415,
      },
      roads: [
        {
          name: "St Patrick's Street",
          lat: 51.8983321,
          lng: -8.472843,
        },
        {
          name: "Grand Parade",
          lat: 51.8965952,
          lng: -8.4746255,
        },
        {
          name: "South Mall",
          lat: 51.8962452,
          lng: -8.4735832,
        },
        {
          name: "Oliver Plunkett Street",
          lat: 51.8975744,
          lng: -8.4725112,
        },
        {
          name: "Washington Street",
          lat: 51.897546,
          lng: -8.4792473,
        },
        {
          name: "Patrick's Quay",
          lat: 51.9003253,
          lng: -8.46299,
        },
        {
          name: "Anderson's Quay",
          lat: 51.8997441,
          lng: -8.4654267,
        },
        {
          name: "MacCurtain Street",
          lat: 51.9014929,
          lng: -8.468289,
        },
        {
          name: "North Main Street",
          lat: 51.8991007,
          lng: -8.4778687,
        },
        {
          name: "South Main Street",
          lat: 51.8958344,
          lng: -8.4762772,
        },
        {
          name: "Western Road",
          lat: 51.894201,
          lng: -8.4971505,
        },
        {
          name: "Sheares Street",
          lat: 51.8981759,
          lng: -8.4798997,
        },
        {
          name: "Lower Glanmire Road",
          lat: 51.9054278,
          lng: -8.4070232,
        },
        {
          name: "Douglas Road",
          lat: 51.8799283,
          lng: -8.4401663,
        },
        {
          name: "Blackrock Road",
          lat: 51.8970788,
          lng: -8.4162038,
        },
        {
          name: "Model Farm Road",
          lat: 51.8885654,
          lng: -8.5120059,
        },
        {
          name: "Bishopstown Road",
          lat: 51.8750631,
          lng: -8.5236275,
        },
        {
          name: "Wilton Road",
          lat: 51.8886193,
          lng: -8.5066859,
        },
        {
          name: "Carrigrohane Road",
          lat: 51.8933845,
          lng: -8.5113153,
        },
        {
          name: "Tivoli Road",
          lat: 51.9157267,
          lng: -8.4267312,
        },
      ],
    },
    Galway: {
      center: [53.2744122, -9.0490601],
      bbox: {
        minLon: -9.1426901,
        minLat: 53.2485189,
        maxLon: -8.9548381,
        maxLat: 53.3197423,
      },
      roads: [
        {
          name: "Eyre Square",
          lat: 53.2743794,
          lng: -9.0492256,
        },
        {
          name: "Shop Street",
          lat: 53.2724335,
          lng: -9.0532516,
        },
        {
          name: "Quay Street",
          lat: 53.2710451,
          lng: -9.0541484,
        },
        {
          name: "Forster Street",
          lat: 53.2753644,
          lng: -9.0443073,
        },
        {
          name: "Eglinton Street",
          lat: 53.274442,
          lng: -9.0521013,
        },
        {
          name: "University Road",
          lat: 53.2759778,
          lng: -9.0594264,
        },
        {
          name: "Newcastle Road",
          lat: 53.2734339,
          lng: -9.0626023,
        },
        {
          name: "Headford Road",
          lat: 53.2825559,
          lng: -9.0475886,
        },
        {
          name: "Tuam Road",
          lat: 53.287639,
          lng: -9.0272775,
        },
        {
          name: "Dublin Road",
          lat: 53.2764659,
          lng: -9.0047147,
        },
        {
          name: "Seamus Quirke Road",
          lat: 53.2750111,
          lng: -9.077236,
        },
        {
          name: "Bohermore",
          lat: 53.2787266,
          lng: -9.0449172,
        },
        {
          name: "Wellpark Road",
          lat: 53.282532,
          lng: -9.0332125,
        },
        {
          name: "Lough Atalia Road",
          lat: 53.2729697,
          lng: -9.043575,
        },
        {
          name: "Dock Road",
          lat: 53.2707321,
          lng: -9.0508911,
        },
        {
          name: "Fr Griffin Road",
          lat: 53.2685738,
          lng: -9.0581751,
        },
        {
          name: "Upper Salthill Road",
          lat: 53.2628238,
          lng: -9.0726056,
        },
        {
          name: "Lower Salthill Road",
          lat: 53.267217,
          lng: -9.0681442,
        },
        {
          name: "The Promenade",
          lat: 53.2608756,
          lng: -9.0721628,
        },
        {
          name: "Bóthar na dTreabh",
          lat: 53.2823097,
          lng: -9.0491849,
        },
      ],
    },
    Limerick: {
      center: [52.661252, -8.6301239],
      bbox: {
        minLon: -8.8070765,
        minLat: 52.5721036,
        maxLon: -8.4425444,
        maxLat: 52.757379,
      },
      roads: [
        {
          name: "O'Connell Street",
          lat: 52.6624879,
          lng: -8.6281364,
        },
        {
          name: "William Street",
          lat: 52.6630664,
          lng: -8.6247461,
        },
        {
          name: "Patrick Street",
          lat: 52.6650432,
          lng: -8.6252641,
        },
        {
          name: "Henry Street",
          lat: 52.6595324,
          lng: -8.6331845,
        },
        {
          name: "Cecil Street",
          lat: 52.6612553,
          lng: -8.6274949,
        },
        {
          name: "Shannon Street",
          lat: 52.6626878,
          lng: -8.6289253,
        },
        {
          name: "Thomas Street",
          lat: 52.6626688,
          lng: -8.625923,
        },
        {
          name: "Mulgrave Street",
          lat: 52.6596108,
          lng: -8.616968,
        },
        {
          name: "Roxboro Road",
          lat: 52.6563888,
          lng: -8.6180489,
        },
        {
          name: "Dublin Road",
          lat: 52.6636786,
          lng: -8.5969311,
        },
        {
          name: "Ennis Road",
          lat: 52.6729139,
          lng: -8.6691575,
        },
        {
          name: "Dock Road",
          lat: 52.646592,
          lng: -8.6693603,
        },
        {
          name: "Childers Road",
          lat: 52.6481385,
          lng: -8.6322412,
        },
        {
          name: "Ballinacurra Road",
          lat: 52.6439396,
          lng: -8.6460509,
        },
        {
          name: "South Circular Road",
          lat: 52.6524575,
          lng: -8.6390632,
        },
        {
          name: "Clare Street",
          lat: 52.6655905,
          lng: -8.6125188,
        },
        {
          name: "Parnell Street",
          lat: 52.6597442,
          lng: -8.6250059,
        },
        {
          name: "Barrington Street",
          lat: 52.6583164,
          lng: -8.6313605,
        },
        {
          name: "Newenham Street",
          lat: 52.6587455,
          lng: -8.6330813,
        },
        {
          name: "Catherine Street",
          lat: 52.661149,
          lng: -8.627609,
        },
      ],
    },
    Waterford: {
      center: [52.2609997, -7.1119081],
      bbox: {
        minLon: -7.1869522,
        minLat: 52.2102427,
        maxLon: -7.0338797,
        maxLat: 52.2798229,
      },
      roads: [
        {
          name: "The Quay",
          lat: 52.2393483,
          lng: -6.9724471,
        },
        {
          name: "Merchant's Quay",
          lat: 52.2637538,
          lng: -7.1181641,
        },
        {
          name: "Parade Quay",
          lat: 52.260621,
          lng: -7.1053366,
        },
        {
          name: "O'Connell Street",
          lat: 52.2618159,
          lng: -7.1137506,
        },
        {
          name: "Patrick Street",
          lat: 52.2600379,
          lng: -7.1122554,
        },
        {
          name: "John Street",
          lat: 52.2576216,
          lng: -7.1116742,
        },
        {
          name: "Michael Street",
          lat: 52.2588546,
          lng: -7.1118775,
        },
        {
          name: "Barronstrand Street",
          lat: 52.2616392,
          lng: -7.1116086,
        },
        {
          name: "High Street",
          lat: 52.2607268,
          lng: -7.1098613,
        },
        {
          name: "Catherine Street",
          lat: 52.2576502,
          lng: -7.1072702,
        },
        {
          name: "Bridge Street",
          lat: 52.2633838,
          lng: -7.1193588,
        },
        {
          name: "The Mall",
          lat: 52.2598087,
          lng: -7.1060535,
        },
        {
          name: "Dunmore Road",
          lat: 52.2469433,
          lng: -7.0799638,
        },
        {
          name: "Cork Road",
          lat: 52.2450579,
          lng: -7.1355153,
        },
        {
          name: "Dublin Road",
          lat: 52.1546054,
          lng: -8.2781502,
        },
        {
          name: "Tramore Road",
          lat: 52.2471469,
          lng: -7.1189771,
        },
        {
          name: "Ballybricken",
          lat: 52.2603785,
          lng: -7.1205244,
        },
        {
          name: "Manor Street",
          lat: 52.2543912,
          lng: -7.1142211,
        },
        {
          name: "New Street",
          lat: 52.2583185,
          lng: -7.1125192,
        },
        {
          name: "Poleberry",
          lat: 52.2517856,
          lng: -7.110356,
        },
      ],
    },
  },
  zoom: 13, // 市中心縮放級別
  //radius: 5000, // 5公里範圍
  timeZone: "Europe/Dublin", // 都柏林時區
  //updateInterval: 5 * 60 * 1000, // 5分鐘自動更新
  updateInterval: 5 * 1000, // 5秒自動更新 (測試用)
  thresholds: {
    // jam factor 分級標準
    goodMax: 4,
    moderateMax: 7,
  },
  pagination: {
    trafficItemsPerPage: 10,
    incidentItemsPerPage: 5,
  },
  charts: {
    speedTrendMaxPoints: 10, // 折線圖最多顯示點數
    speedTrendYMax: 60, // 折線圖 Y 軸最大值
  },
};

// ================================
// APP STATE
// ================================
const state = {
  map: null,
  autoUpdateTimer: null,
  sort: "worst",
  cityKey: CONFIG.defaultCity,
  dataMode: "mock", // "mock" | "live"
  metrics: {
    prevAvgSpeed: null,
    lastUpdatedAt: null,
  },
  traffic: {
    data: [],
    raw: [], // keep raw flow segments for map rendering
    page: 1,
  },
  incidents: {
    data: [],
    page: 1,
    filters: {
      type: "all",
      roadQuery: "",
    },
  },
  weather: null,
  charts: {
    speedTrend: null,
    congestion: null,
  },
};

// ================================
// DOM(Document Object Model) CACHE
// ================================
const dom = {
  loadingOverlay: null,
  container: null,
  // navbar
  navbarTitle: null,
  cityDropdown: null,
  dataModeLabel: null,
  dataModeToggle: null,
  refreshBtn: null,
  autoUpdateBtn: null,
  // weather
  weatherWidget: null,
  // map
  mapEl: null,
  centerMapBtn: null,
  // metrics
  metricCards: null,
  // charts
  speedTrendCanvas: null,
  congestionCanvas: null,
  // traffic
  sortDropdown: null,
  filterBtn: null,
  trafficItemsContainer: null,
  trafficPagination: {
    prevBtn: null,
    nextBtn: null,
    currentPage: null,
    totalPages: null,
  },
  // incidents
  incidentTypeFilter: null,
  incidentRoadSearch: null,
  incidentCountBadge: null,
  incidentItemsContainer: null,
  incidentPagination: {
    prevBtn: null,
    nextBtn: null,
    currentPage: null,
    totalPages: null,
  },
};

/*
const trafficData = [
  {
    name: "O'Connell Street",
    jamLevel: 2.1,
    speed: 45,
    status: "good",
  },
  {
    name: "Grafton Street",
    jamLevel: 6.5,
    speed: 28,
    status: "moderate",
  },
  {
    name: "Dame Street",
    jamLevel: 9.2,
    speed: 15,
    status: "heavy",
  },
  {
    name: "Nassau Street",
    jamLevel: 4.3,
    speed: 35,
    status: "moderate",
  },
  {
    name: "Abbey Street",
    jamLevel: 7.8,
    speed: 22,
    status: "heavy",
  },
  {
    name: "Talbot Street",
    jamLevel: 3.2,
    speed: 40,
    status: "good",
  },
  {
    name: "Henry Street",
    jamLevel: 5.9,
    speed: 30,
    status: "moderate",
  },
  {
    name: "Parnell Street",
    jamLevel: 8.5,
    speed: 18,
    status: "heavy",
  },
];

const incidentsData = [
  {
    type: "Accident",
    icon: "🚨",
    location: "Dame Street near Trinity College",
    time: "15 mins ago",
    delay: "20 min delay",
    severity: "critical",
  },
  {
    type: "Roadwork",
    icon: "🚧",
    location: "Parnell Street",
    time: "2 hours ago",
    delay: "10 min delay",
    severity: "major",
  },
  {
    type: "Heavy Traffic",
    icon: "⚡",
    location: "M50 Northbound",
    time: "5 mins ago",
    delay: "5 min delay",
    severity: "minor",
  },
  {
    type: "Road Closure",
    icon: "🚫",
    location: "O'Connell Bridge",
    time: "1 hour ago",
    delay: "15 min delay",
    severity: "major",
  },
];
*/

function cacheDom() {
  dom.loadingOverlay = document.querySelector(".loading-overlay");
  dom.container = document.querySelector(".container");

  // navbar
  dom.navbarTitle = document.querySelector(".navbar h1");
  dom.cityDropdown = document.getElementById("cityDropdown");
  dom.dataModeLabel = document.getElementById("dataModeLabel");
  dom.dataModeToggle = document.getElementById("dataModeToggle");
  dom.refreshBtn = document.querySelector(".nav-buttons .btn");
  dom.autoUpdateBtn = document.querySelector(".btn-primary");

  // weather
  dom.weatherWidget = document.getElementById("weatherWidget");

  // map
  dom.mapEl = document.getElementById("map");
  dom.centerMapBtn = document.getElementById("centerMapBtn");

  // charts
  dom.speedTrendCanvas = document.getElementById("speedTrendChart");
  dom.congestionCanvas = document.getElementById("congestionChart");

  // metrics
  dom.metricCards = document.querySelectorAll(".metric-top");

  // traffic
  dom.sortDropdown = document.getElementById("sort-dropdown");
  dom.filterBtn = document.querySelector(".filter-btn");
  dom.trafficItemsContainer = document.querySelector(
    ".traffic-items-container",
  );
  dom.trafficPagination.prevBtn = document.getElementById("trafficPrevPage");
  dom.trafficPagination.nextBtn = document.getElementById("trafficNextPage");
  dom.trafficPagination.currentPage =
    document.getElementById("trafficCurrentPage");
  dom.trafficPagination.totalPages =
    document.getElementById("trafficTotalPages");

  // incidents
  dom.incidentTypeFilter = document.getElementById("incidentTypeFilter");
  dom.incidentRoadSearch = document.getElementById("incidentRoadSearch");
  dom.incidentCountBadge = document.getElementById("incidentCountBadge");
  dom.incidentItemsContainer = document.querySelector(
    ".incident-items-container",
  );
  dom.incidentPagination.prevBtn = document.getElementById("incidentPrevPage");
  dom.incidentPagination.nextBtn = document.getElementById("incidentNextPage");
  dom.incidentPagination.currentPage = document.getElementById(
    "incidentCurrentPage",
  );
  dom.incidentPagination.totalPages =
    document.getElementById("incidentTotalPages");
}

// ================================
// UTILITIES
// ================================
const clamp = (n, min, max) => Math.max(min, Math.min(max, n)); // limit n between min and max

function capitalizeFirst(s) {
  if (!s) return ""; // all falsy values: false, 0, "", null, undefined, NaN
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function minutesAgoToText(minutesAgo) {
  // check minutesAgo is a number
  if (!Number.isFinite(minutesAgo) || minutesAgo < 0) return "--";
  if (minutesAgo < 60) return `${minutesAgo} mins ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
}

function jamToStatus(jamFactor) {
  if (jamFactor < CONFIG.thresholds.goodMax) return "good";
  if (jamFactor < CONFIG.thresholds.moderateMax) return "moderate";
  return "heavy";
}

function updateAutoUpdateButton(isRunning) {
  if (!dom.autoUpdateBtn) return; // check button exists
  dom.autoUpdateBtn.querySelector(".icon").textContent = isRunning
    ? "⏸️"
    : "▶️";
  dom.autoUpdateBtn.querySelector(".text").textContent = isRunning
    ? "Stop Auto-Update"
    : "Start Auto-Update";
}

function showLoading() {
  dom.loadingOverlay?.classList.add("active");
}
function hideLoading() {
  dom.loadingOverlay?.classList.remove("active");
}

function formatTime(timeZone) {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
function formatTimeWithSeconds(timeZone) {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// ================================
// CITY & DATA MODE HELPERS
// ================================
function getCityConfig() {
  // if cityKey not found, return default city config
  return CONFIG.cities[state.cityKey] ?? CONFIG.cities[CONFIG.defaultCity];
}

function setCity(cityKey) {
  if (!CONFIG.cities[cityKey]) return; // city not found
  state.cityKey = cityKey;

  // persist selection
  // next time user opens the app, it will load the last selected city
  localStorage.setItem("traffic_dashboard_city", cityKey);

  // Update navbar title + center button tooltip
  const cityName = cityKey;
  if (dom.navbarTitle)
    dom.navbarTitle.textContent = `🚦 ${cityName} Traffic Dashboard`;
  if (dom.centerMapBtn) dom.centerMapBtn.title = `Center on ${cityName}`;

  // Reset paging + chart history
  state.traffic.page = 1;
  state.incidents.page = 1;
  state.metrics.prevAvgSpeed = null;

  // Reset charts series
  if (state.charts.speedTrend) {
    state.charts.speedTrend.data.labels = [];
    state.charts.speedTrend.data.datasets[0].data = [];
    state.charts.speedTrend.update("none");
  }
  // Recenter map
  centerMap();
}

function setDataMode(mode) {
  state.dataMode = mode === "live" ? "live" : "mock";
  localStorage.setItem("traffic_dashboard_dataMode", state.dataMode);
  if (dom.dataModeLabel) {
    dom.dataModeLabel.textContent = "Live Data";
    //state.dataMode === "live" ? "Live API" : "Mock Data";
  }
}

function syncUIFromState() {
  // City dropdown
  if (dom.cityDropdown) dom.cityDropdown.value = state.cityKey;

  // Data mode toggle (checked = live)
  if (dom.dataModeToggle)
    // checkbox
    dom.dataModeToggle.checked = state.dataMode === "live";

  // Navbar title + tooltip
  /*
  if (dom.navbarTitle)
    dom.navbarTitle.textContent = `🚦 ${state.cityKey} Traffic Dashboard`;
  if (dom.centerMapBtn) dom.centerMapBtn.title = `Center on ${state.cityKey}`;
  */
}

// ================================
// MOCK DATA GENERATORS
// ================================
function generateMockTrafficFlow() {
  // 整個function的回傳值
  return {
    // each roads become an object in results array
    results: getCityConfig().roads.map((road, index) => {
      const jamFactor = parseFloat((Math.random() * 10).toFixed(1));
      const freeFlowSpeed = 50;

      let currentSpeed;
      if (jamFactor < 4) {
        currentSpeed = Math.floor(freeFlowSpeed - jamFactor * 2);
      } else if (jamFactor < 7) {
        currentSpeed = Math.floor(freeFlowSpeed - jamFactor * 4);
      } else {
        currentSpeed = Math.floor(freeFlowSpeed - jamFactor * 5);
      }
      currentSpeed = Math.max(10, currentSpeed); // 最低 10 km/h

      // map每次迭代的回傳值
      return {
        location: {
          description: road.name,
          shape: {
            links: [
              {
                linkId: `link_${index}`,
                points: [
                  //{ lat: road.lat, lng: road.lng },
                  //{ lat: road.lat + 0.002, lng: road.lng + 0.002 },
                ],
              },
            ],
          },
        },
        currentFlow: {
          speed: currentSpeed,
          speedUncapped: currentSpeed,
          freeFlow: freeFlowSpeed,
          jamFactor: jamFactor,
          //confidence: (0.8 + Math.random() * 0.2).toFixed(2),
          traversability: "open",
        },
      };
    }),
  };

  /* return json */
  /*
  {
    "results": [
      { // road segment 1
        "location": {...},
        "currentFlow": {...}
      },
      { // road segment 2
        "location": {...},
        "currentFlow": {...}
      }
    ]
  }
  */
}

function generateMockIncidents() {
  const incidentTypes = [
    { type: "ACCIDENT", icon: "🚨", severity: "critical" },
    { type: "ROADWORK", icon: "🚧", severity: "major" },
    { type: "HEAVY_TRAFFIC", icon: "⚡", severity: "minor" },
    { type: "ROAD_CLOSURE", icon: "🚫", severity: "major" },
  ];

  // 隨機生成 2-5 個事件
  const numIncidents = Math.floor(Math.random() * 4) + 2;
  const selectedRoads = [...getCityConfig().roads] // shallow copy
    .sort(() => Math.random() - 0.5)
    .slice(0, numIncidents);

  return {
    results: selectedRoads.map((road, index) => {
      const incident =
        incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
      const delayMinutes = Math.floor(Math.random() * 25) + 5;
      const minutesAgo = Math.floor(Math.random() * 120) + 5;

      return {
        incidentDetails: {
          id: `incident_${Date.now()}_${index}`,
          type: incident.type,
          criticality: incident.severity,
          description: `${incident.type.replace("_", " ")} on ${road.name}`,
          startTime: new Date(Date.now() - minutesAgo * 60000).toISOString(),
          endTime: new Date(Date.now() + 60 * 60000).toISOString(),
        },
        location: {
          shape: {
            links: [
              {
                points: [{ lat: road.lat, lng: road.lng }],
              },
            ],
          },
          description: road.name,
        },
        impact: {
          delayInSeconds: delayMinutes * 60,
          affectedRoads: [road.name],
        },
        icon: incident.icon,
      };
    }),
  };

  /* return json */
  /*
  {
    "results": [
      { // road segment 1
        "incidentDetails": {...},
        "location": {...},
        "impact": {...},
        "icon": "..."
      },
      { // road segment 2
        "incidentDetails": {...},
        "location": {...},
        "impact": {...},
        "icon": "..."
      }
    ]
  }
  */
}

// ================================
// SERVICES
// ================================
class TomTomAPI {
  static API_KEY = "PEooaTjLuccn1ZmqjT25dDIfEIoXaIRh";
  static BASE_URL = "https://api.tomtom.com/traffic/services";

  static async fetchTrafficFlow(roads) {
    // Fetch each road segment in parallel. If a single request fails, we simply drop that segment.
    const tasks = roads.map((road) =>
      this.#fetchFlowForPoint(road.lat, road.lng, road.name),
    );
    const results = (await Promise.all(tasks)).filter(Boolean); // Filter out null results

    return { results }; // Return as an object with results array
  }

  // #fetchFlowForPoint: private method
  static async #fetchFlowForPoint(lat, lng, roadName) {
    const url = `${this.BASE_URL}/4/flowSegmentData/absolute/22/json?point=${lat},${lng}&unit=KMPH&key=${this.API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.#convertToStandardFormat(data, lat, lng, roadName);
    } catch (error) {
      console.error(
        `Error fetching traffic flow for point (${lat}, ${lng}):`,
        error,
      );
      return null;
    }
  }

  static #convertToStandardFormat(tomtomData, lat, lng, roadName) {
    const flow = tomtomData.flowSegmentData;

    const freeFlow = Number(flow.freeFlowSpeed) || 0; // if null or undefined, set to 0
    const currentSpeed = Number(flow.currentSpeed) || 0;

    const speedDiff = freeFlow - currentSpeed;
    const jamFactor = freeFlow > 0 ? (speedDiff / freeFlow) * 10 : 0;

    return {
      location: {
        description: roadName,
        shape: {
          links: [
            {
              points: (() => {
                // immediately invoked function expression (IIFE)
                const coordArr = flow?.coordinates?.coordinate;
                const parsed = Array.isArray(coordArr)
                  ? coordArr.map((c) => ({
                      lat: Number(c.latitude),
                      lng: Number(c.longitude),
                    }))
                  : [];
                // Fallback if API did not return a usable geometry
                return parsed.length >= 2 ? parsed : [];
              })(),
            },
          ],
        },
      },
      currentFlow: {
        speed: Math.round(currentSpeed),
        freeFlow: freeFlow,
        jamFactor: Number(clamp(Number(jamFactor.toFixed(1)), 0, 10)),
        //confidence: flow.confidence,
        traversability: flow.roadClosure ? "closed" : "open",
      },
    };
  }

  static async fetchIncidents(bbox) {
    const fields =
      "{incidents{type,geometry{type,coordinates},properties{id,iconCategory,magnitudeOfDelay,events{description,code,iconCategory},startTime,endTime,from,to,length,delay,roadNumbers,timeValidity,probabilityOfOccurrence,numberOfReports,lastReportTime,tmc{countryCode,tableNumber,tableVersion,direction,points{location,offset}}}}}";
    const url =
      `${this.BASE_URL}/5/incidentDetails` +
      `?key=${this.API_KEY}` +
      `&bbox=${bbox.minLon},${bbox.minLat},${bbox.maxLon},${bbox.maxLat}` +
      `&language=en-GB` +
      `&fields=${fields}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.#convertIncidentsToStandardFormat(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      return null;
    }
  }

  static #convertIncidentsToStandardFormat(tomtomData) {
    return {
      results: tomtomData.incidents.map((incident) => {
        const iconCategory = incident.properties.iconCategory;
        return {
          incidentDetails: {
            id: incident.properties.id,
            type: this.getIncidentType(iconCategory),
            criticality: this.getSeverityLevel(iconCategory),
            description: incident.properties.events[0]?.description,
            startTime: incident.properties.startTime,
            endTime: incident.properties.endTime,
          },
          location: {
            shape: {
              links: [
                {
                  points: incident.geometry.coordinates.map((coord) => ({
                    lat: coord[1],
                    lng: coord[0],
                  })),
                },
              ],
            },
            description:
              incident.properties.from + " to " + incident.properties.to,
          },
          impact: {
            delayInSeconds: incident.properties.delay,
            affectedRoads: incident.properties.roadNumbers,
          },
          icon: this.getIncidentIcon(iconCategory),
        };
      }),
    };
  }

  static getIncidentIcon(iconCategory) {
    const iconMap = {
      0: "❓", // Unknown
      1: "💥", // Accident
      2: "🌫️", // Fog
      3: "⚠️", // Dangerous Conditions
      4: "🌧️", // Rain
      5: "🧊", // Ice
      6: "⚡", // Jam
      7: "🚧", // Lane Closed
      8: "⛔", // Road Closed
      9: "🏗️", // Road Works
      10: "💨", // Wind
      11: "🌊", // Flooding
      14: "❌", // Broken Down Vehicle
    };

    return iconMap[iconCategory] ?? "";
  }

  static getIncidentType(iconCategory) {
    const typeMap = {
      0: "Unknown",
      1: "Accident",
      2: "Fog",
      3: "Dangerous Conditions",
      4: "Rain",
      5: "Ice",
      6: "Heavy Traffic",
      7: "Lane Closed",
      8: "Road Closed",
      9: "Road Works",
      10: "Wind",
      11: "Flooding",
      14: "Broken Down Vehicle",
    };
    return typeMap[iconCategory] ?? "Unknown";
  }

  static getSeverityLevel(iconCategory) {
    const typeMap = {
      0: "Unknown",
      1: "major",
      2: "moderate",
      3: "moderate",
      4: "minor",
      5: "major",
      6: "minor",
      7: "moderate",
      8: "major",
      9: "moderate",
      10: "moderate",
      11: "major",
      14: "moderate",
    };
    return typeMap[iconCategory] ?? "Unknown";
  }
}

class OpenWeatherAPI {
  static API_KEY = "1970cf6f514f532c6eae6d654ed3d853";
  static BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  static async fetchWeather(lat, lon) {
    const url = `${this.BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        dt: data.dt,
        timezone: data.timezone,
      };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  /*
  static formatTime(timestamp, timezoneOffset = 0) {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  */

  static getWeatherIcon(iconCode) {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "🌤️",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] ?? "";
  }
}

// ========================================
// MAP FUNCTIONS
// ========================================
function initializeMap() {
  if (state.map) state.map.remove();

  const city = getCityConfig();
  state.map = L.map("map").setView(city.center, CONFIG.zoom); // Initialize Leaflet map

  // OpenStreetMap Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(state.map);

  // Layer group for traffic flow polylines (cleared/redrawn on each refresh)
  state.mapLayers = state.mapLayers || {};
  if (state.mapLayers.traffic) state.mapLayers.traffic.clearLayers();
  state.mapLayers.traffic = L.layerGroup().addTo(state.map);
}

function centerMap() {
  const city = getCityConfig();
  if (state.map) state.map.setView(city.center, CONFIG.zoom);
}

// ========================================
// MAP: TRAFFIC FLOW RENDERING
// ========================================
function getTrafficColor(jamFactor, colors) {
  // colors: { good, moderate, heavy }
  const jf = Number(jamFactor) || 0;
  if (jf <= CONFIG.thresholds.goodMax) return colors.good;
  if (jf <= CONFIG.thresholds.moderateMax) return colors.moderate;
  return colors.heavy;
}
function updateTrafficMap(flowResults) {
  if (!state.map || !state.mapLayers?.traffic) return;
  // Read CSS vars once (fallback to hardcoded)
  const css = getComputedStyle(document.documentElement);
  const colors = {
    good: css.getPropertyValue("--traffic-good").trim() || "#27ae60",
    moderate: css.getPropertyValue("--traffic-moderate").trim() || "#f39c12",
    heavy: css.getPropertyValue("--traffic-heavy").trim() || "#e74c3c",
  };

  state.mapLayers.traffic.clearLayers();

  (flowResults ?? []).forEach((seg) => {
    const links = seg?.location?.shape?.links ?? [];
    const jam = seg?.currentFlow?.jamFactor ?? 0;
    const speed = seg?.currentFlow?.speed ?? 0;
    const free = seg?.currentFlow?.freeFlow ?? 0;
    //const confidence = seg?.currentFlow?.confidence ?? null;
    const traversability = seg?.currentFlow?.traversability ?? "open";

    links.forEach((link) => {
      const pts = link?.points ?? [];
      if (pts.length < 2) return;

      const latlngs = pts
        .map((p) => [Number(p.lat), Number(p.lng)])
        .filter(([la, ln]) => Number.isFinite(la) && Number.isFinite(ln));

      if (latlngs.length < 2) return;

      const color = getTrafficColor(jam, colors);
      const poly = L.polyline(latlngs, {
        color,
        weight: 3,
        opacity: 0.85,
        dashArray: traversability === "closed" ? "6 6" : null, // dashed if closed
      });

      /*
      const outline = L.polyline(latlngs, {
        color: "#111", // 外框顏色
        weight: 5, // 外框粗
        opacity: 0.65,
        lineCap: "round",
        lineJoin: "round",
        interactive: false,
      }).addTo(state.mapLayers.traffic);
      */

      const title = seg?.location?.description ?? "Road segment";

      // click popup content
      const popupHtml = `
        <div style="min-width:180px">
          <div style="font-weight:600;margin-bottom:4px">${title}</div>
          <div>Speed: <b>${speed}</b> km/h</div>
          <div>Free flow: <b>${free}</b> km/h</div>
          <div>Jam: <b>${Number(jam)}</b> / 10</div>
          ${
            traversability === "closed"
              ? `<div style="margin-top:6px;color:#b91c1c">Road closed</div>`
              : ""
          }
        </div>
      `;
      poly.bindPopup(popupHtml);
      poly.addTo(state.mapLayers.traffic);
    });
  });
}

// ========================================
// CHART FUNCTIONS
// ========================================
function initializeCharts() {
  // Speed Trend Chart
  if (dom.speedTrendCanvas) {
    // use Chart.js to create line chart
    state.charts.speedTrend = new Chart(dom.speedTrendCanvas, {
      type: "line",
      data: {
        // content of the chart
        labels: [], // x-axis labels (time)
        datasets: [
          // one line one dataset, only one line here
          {
            label: "Average Speed (km/h)",
            data: [], // y-axis data points
            borderColor: "#3b82f6", // line color
            backgroundColor: "rgba(59, 130, 246, 0.1)", // fill color under the line
            tension: 0.4,
            fill: true, // fill area under the line
            pointRadius: 4,
            pointHoverRadius: 6, // 滑鼠移過時放大點的半徑
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            // 滑鼠提示
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: 12,
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: CONFIG.charts.speedTrendYMax, // e.g., 60 km/h
            ticks: {
              // y軸刻度
              callback: (value) => `${value} km/h`,
            },
            grid: {
              // light grid lines
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Congestion Distribution Chart
  if (dom.congestionCanvas) {
    state.charts.congestion = new Chart(dom.congestionCanvas, {
      type: "doughnut",
      data: {
        labels: ["Good", "Moderate", "Heavy"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 15,
              font: { size: 12 },
            },
          },
        },
      },
    });
  }
}

function updateSpeedTrendChart() {
  const chart = state.charts.speedTrend;
  if (!chart || !state.traffic.data.length) return;

  const now = new Date();
  const timeLabel = formatTimeWithSeconds(CONFIG.timeZone); // get current time label

  const avgSpeed =
    state.traffic.data.reduce((sum, d) => sum + d.speed, 0) /
    state.traffic.data.length;

  chart.data.labels.push(timeLabel);
  chart.data.datasets[0].data.push(avgSpeed.toFixed(1));

  if (chart.data.labels.length > CONFIG.charts.speedTrendMaxPoints) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update("none"); // 'none' to prevent animation
}

function updateCongestionChart() {
  const chart = state.charts.congestion;
  if (!chart) return;

  const good = state.traffic.data.filter(
    (d) => d.jamLevel < CONFIG.thresholds.goodMax,
  ).length;
  const moderate = state.traffic.data.filter(
    (d) =>
      d.jamLevel >= CONFIG.thresholds.goodMax &&
      d.jamLevel < CONFIG.thresholds.moderateMax,
  ).length;
  const heavy = state.traffic.data.filter(
    (d) => d.jamLevel >= CONFIG.thresholds.moderateMax,
  ).length;
  chart.data.datasets[0].data = [good, moderate, heavy];
  chart.update("none");
}

// ================================
// WEATHER WIDGET
// ================================
function updateWeatherWidget() {
  if (!dom.weatherWidget || !state.weather) return;

  //const city = getCityConfig();
  const { temperature, description, icon } = state.weather; // get values by key names

  dom.weatherWidget.querySelector(".weather-temp").textContent = `${Math.round(
    temperature,
  )}°C`;
  dom.weatherWidget.querySelector(".weather-time").textContent = formatTime(
    CONFIG.timeZone,
  );
  dom.weatherWidget.querySelector(".weather-desc").textContent =
    capitalizeFirst(description);
  dom.weatherWidget.querySelector(".weather-icon").textContent =
    OpenWeatherAPI.getWeatherIcon(icon);

  dom.weatherWidget.classList.add("loaded");
}

// ================================
// DATA TRANSFORMS
// ================================
function toTrafficListItem(flowResult) {
  const jamFactor = flowResult.currentFlow.jamFactor;
  const status = jamToStatus(jamFactor);
  return {
    name: flowResult.location.description,
    jamLevel: jamFactor,
    speed: flowResult.currentFlow.speed,
    status: status,
    freeFlow: flowResult.currentFlow.freeFlow,
    //confidence: flowResult.currentFlow.confidence,
  };
}

function toIncidentListItem(incidentResult) {
  const startTime = new Date(incidentResult.incidentDetails.startTime);
  const minutesAgo = Math.floor((Date.now() - startTime) / 60000);
  const delayMinutes = Math.floor(incidentResult.impact.delayInSeconds / 60);

  return {
    type: incidentResult.incidentDetails.type.replace("_", " "),
    icon: incidentResult.icon,
    location: incidentResult.location.description,
    time: minutesAgoToText(minutesAgo),
    delay: `${delayMinutes} min delay`,
    severity: incidentResult.incidentDetails.criticality,
  };
}

// ================================
// SORTING
// ================================
function sortTrafficData(sortBy) {
  const list = state.traffic.data;

  if (sortBy === "worst") {
    list.sort((a, b) => b.jamLevel - a.jamLevel);
  } else if (sortBy === "best") {
    list.sort((a, b) => a.jamLevel - b.jamLevel);
  } else if (sortBy === "alphabetical") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
}

// ================================
// RENDER: METRICS
// ================================
function updateMetricsCards() {
  //if (!dom.metricCards?.length) return;

  const traffic = state.traffic.data ?? [];
  const incidents = state.incidents.data ?? [];

  //const city = getCityConfig();
  const updatedAt = formatTimeWithSeconds(CONFIG.timeZone);

  state.metrics.lastUpdatedAt = updatedAt;

  // Guard
  if (!traffic.length) return;

  const totalSpeed = traffic.reduce(
    (sum, d) => sum + (Number(d.speed) || 0),
    0,
  );

  const avgSpeed = totalSpeed / traffic.length;

  const congestedRoads = traffic.filter(
    (d) => Number(d.jamLevel) >= CONFIG.thresholds.moderateMax,
  ).length;

  /*
  const filteredIncidents =
    typeof getFilteredIncidents === "function"
      ? getFilteredIncidents()
      : incidents;
  */
  const filteredIncidents = getFilteredIncidents();

  const activeIncidentsFiltered = filteredIncidents.length;
  const activeIncidents = incidents.length;

  const avgTravelTime = congestedRoads * 5; // Example calculation

  const avgJam =
    traffic.reduce((sum, d) => sum + (Number(d.jamLevel) || 0), 0) /
    traffic.length;
  const healthScore = clamp(Math.round(100 - avgJam * 10), 0, 100);

  // Trend vs previous average speed (per refresh)
  let trendText = "";
  let trendDir = "";
  if (Number.isFinite(state.metrics.prevAvgSpeed)) {
    const diff = avgSpeed - state.metrics.prevAvgSpeed;
    const pct =
      state.metrics.prevAvgSpeed === 0
        ? 0
        : (diff / state.metrics.prevAvgSpeed) * 100;
    trendText = `${diff >= 0 ? "▲" : "▼"} ${Math.abs(pct).toFixed(0)}%`;
    trendDir = diff >= 0 ? "up" : "down";
  }
  state.metrics.prevAvgSpeed = avgSpeed;

  //const sourceText = state.dataMode === "live" ? "Live API" : "Mock Data";
  const footer = `Updated ${updatedAt}`;

  setCard("avgSpeed", {
    // .toFixed(0) will change Number to String
    valueHtml: `${avgSpeed.toFixed(0)} <span class="unit">km/h</span>`,
    subText: null,
    footer: footer,
    trend: trendText ? { text: trendText, dir: trendDir } : null,
  });
  setCard("commuteTime", {
    valueHtml: `${avgTravelTime} <span class="unit">min</span>`,
    subText: `Based on ${congestedRoads} congested road(s)`,
    footer: `${footer}`,
    trend: null,
  });
  setCard("congestedRoads", {
    valueHtml: `${congestedRoads}`,
    subText: `Jam ≥ ${CONFIG.thresholds.moderateMax}/10`,
    footer: `${footer}`,
    trend: null,
  });
  setCard("activeIncidents", {
    valueHtml: `${activeIncidentsFiltered} <span class="unit">/ ${activeIncidents}</span>`,
    subText: `Filtered by type/road`,
    footer: `${footer}`,
    trend: null,
  });
  setCard("healthScore", {
    valueHtml: `${healthScore} <span class="unit">/ 100</span>`,
    subText: `Avg Jam ${avgJam.toFixed(1)}/10`,
    footer: `${footer}`,
    trend: null,
  });
  // Progress bar for health score
  const healthCard = document.querySelector(
    '.metric-top[data-metric="healthScore"]',
  );
  const bar = healthCard?.querySelector(".metric-progress > span");
  if (bar) bar.style.width = `${healthScore}%`;

  if (healthScore >= 70) {
    healthCard
      .querySelector(".metric-progress-fill")
      .classList.remove("moderate", "heavy");
    healthCard.querySelector(".metric-progress-fill").classList.add("good");
  } else if (healthScore >= 40) {
    healthCard
      .querySelector(".metric-progress-fill")
      .classList.remove("good", "heavy");
    healthCard.querySelector(".metric-progress-fill").classList.add("moderate");
  } else {
    healthCard
      .querySelector(".metric-progress-fill")
      .classList.remove("good", "moderate");
    healthCard.querySelector(".metric-progress-fill").classList.add("heavy");
  }

  /*
  dom.metricCards[0].querySelector(
    ".value"
  ).innerHTML = `${avgSpeed} <span class="unit">km/h</span>`;
  dom.metricCards[1].querySelector(
    ".value"
  ).innerHTML = `${avgTravelTime} <span class="unit">min</span>`;
  dom.metricCards[2].querySelector(".value").textContent = congestedStreets;
  dom.metricCards[3].querySelector(".value").textContent = activeIncidents;
  */
}

function setCard(metricKey, { valueHtml, subText, footer, trend }) {
  const card = document.querySelector(
    `.metric-top[data-metric="${metricKey}"]`,
  );
  if (!card) return;
  const valueEl = card.querySelector(".value");
  const subEl = card.querySelector(".metric-sub");
  const footerEl = card.querySelector(".metric-sub.footer");
  const trendEl = card.querySelector(".metric-trend");
  if (valueEl) valueEl.innerHTML = valueHtml;
  if (subEl) subEl.textContent = subText ?? "";
  if (footerEl) footerEl.textContent = footer ?? "";
  if (trendEl) {
    if (!trend) {
      trendEl.textContent = "";
      trendEl.classList.remove("up", "down");
    } else {
      trendEl.textContent = trend.text;
      trendEl.classList.toggle("up", trend.dir === "up");
      trendEl.classList.toggle("down", trend.dir === "down");
    }
  }
}

// ================================
// RENDER: TRAFFIC LIST
// ================================
function renderTrafficLists(applyFilter = false) {
  if (!dom.trafficItemsContainer) return;

  dom.trafficItemsContainer.innerHTML = "";

  const total = state.traffic.data.length;
  const perPage = CONFIG.pagination.trafficItemsPerPage;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  state.traffic.page = clamp(state.traffic.page, 1, totalPages);
  const startIndex = (state.traffic.page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageData = state.traffic.data.slice(startIndex, endIndex);

  //const trafficList = document.querySelector(".traffic-list");
  //const header = trafficList.querySelector(".traffic-header");
  //const oldItems = trafficList.querySelectorAll(".traffic-item");
  //oldItems.forEach((item) => item.remove());

  pageData.forEach((data) => {
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
            <span class="status-badge status-${data.status}">${capitalizeFirst(
              data.status,
            )}</span>
          </div>
        `;
    dom.trafficItemsContainer.appendChild(item);
  });

  updateTrafficPagination(total);
  if (applyFilter) addFilterEffect();
}

function updateTrafficPagination(totalItems) {
  const perPage = CONFIG.pagination.trafficItemsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  dom.trafficPagination.currentPage.textContent = state.traffic.page;
  dom.trafficPagination.totalPages.textContent = totalPages;

  // 更新按鈕狀態
  dom.trafficPagination.prevBtn.disabled = state.traffic.page === 1;
  dom.trafficPagination.nextBtn.disabled = state.traffic.page === totalPages;
}

function addFilterEffect() {
  const trafficItems = document.querySelectorAll(".traffic-item");
  trafficItems.forEach((item) => {
    item.classList.add("filter-applied");
    setTimeout(() => {
      item.classList.remove("filter-applied");
    }, 500);
  });
}

// ================================
// RENDER: INCIDENTS LIST
// ================================
function getFilteredIncidents() {
  // filter out "Unknown" data
  const base = (state.incidents.data ?? []).filter(
    (d) => d.severity !== "Unknown",
  );
  const type = state.incidents.filters.type;
  const q = (state.incidents.filters.roadQuery ?? "").trim().toLowerCase();
  let list = base;
  if (type && type !== "all") {
    list = list.filter(
      (d) => (d.type ?? "").toLowerCase() === type.toLowerCase(),
    );
  }
  if (q) {
    list = list.filter((d) => (d.location ?? "").toLowerCase().includes(q));
  }
  return list;
}

function refreshIncidentTypeOptions() {
  // Goal: populate(填入) incident type filter dropdown based on current data

  if (!dom.incidentTypeFilter) return;

  const base = (state.incidents.data ?? []).filter(
    (d) => d.severity !== "Unknown",
  );
  const uniqueTypes = Array.from(
    new Set(base.map((d) => d.type).filter(Boolean)),
  ).sort();

  const current = state.incidents.filters.type ?? "all";

  // innerHTML needs string, so we join the array
  // insert to select element
  dom.incidentTypeFilter.innerHTML = [
    '<option value="all">All types</option>',
    // map 會產生一個新陣列
    // ... to spread the array into individual elements
    ...uniqueTypes.map((t) => `<option value="${t}">${t}</option>`),
  ].join("");

  // Keep selection if still valid
  // current means the previous selected type
  // uniqueTypes is the newly generated list of types
  // 如果我前一次的選擇適用這一次的結果，就續用
  const stillValid = current === "all" || uniqueTypes.includes(current);
  state.incidents.filters.type = stillValid ? current : "all";
  dom.incidentTypeFilter.value = state.incidents.filters.type;
}

function renderIncidentsLists() {
  if (!dom.incidentItemsContainer) return;
  dom.incidentItemsContainer.innerHTML = "";

  const validIncidents = getFilteredIncidents();
  // Update badge
  if (dom.incidentCountBadge) {
    dom.incidentCountBadge.textContent = `${validIncidents.length}`;
  }

  const total = validIncidents.length;
  const perPage = CONFIG.pagination.incidentItemsPerPage;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  state.incidents.page = clamp(state.incidents.page, 1, totalPages);
  const startIndex = (state.incidents.page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageData = validIncidents.slice(startIndex, endIndex);

  //const incidentSection = document.querySelector(".incidents-section");
  //const oldItems = incidentSection.querySelectorAll(".incident-item");
  //oldItems.forEach((item) => item.remove());

  pageData.forEach((data) => {
    //if (data.severity === "Unknown") return;
    const item = document.createElement("div");
    item.classList.add("incident-item", `incident-${data.severity}`);

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
    dom.incidentItemsContainer.appendChild(item);
  });

  updateIncidentPagination(total);
}

function updateIncidentPagination(totalItems) {
  const perPage = CONFIG.pagination.incidentItemsPerPage;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  dom.incidentPagination.currentPage.textContent = state.incidents.page;
  dom.incidentPagination.totalPages.textContent = totalPages;

  // 更新按鈕狀態
  dom.incidentPagination.prevBtn.disabled = state.incidents.page === 1;
  dom.incidentPagination.nextBtn.disabled = state.incidents.page === totalPages;
}

// ================================
// DATA LOAD
// ================================
async function loadDashboardData() {
  // load traffic, incidents, weather data

  const city = getCityConfig();

  // Promise.all: run independent network calls in parallel to reduce total wait time.
  // Important: Promise.all rejects if ANY promise rejects. To avoid losing all data due
  // to a single failing request, we wrap each request with a local fallback.
  const safe = async (promise, fallbackFn) => {
    try {
      const result = await promise;
      return result ?? fallbackFn();
    } catch (err) {
      console.warn("Data source failed, falling back to mock:", err);
      return fallbackFn();
    }
  };

  const trafficPromise =
    state.dataMode === "live"
      ? safe(TomTomAPI.fetchTrafficFlow(city.roads), () =>
          generateMockTrafficFlow(city.roads),
        )
      : Promise.resolve(generateMockTrafficFlow(city.roads)); // wrap to Promise
  const incidentsPromise =
    state.dataMode === "live"
      ? safe(TomTomAPI.fetchIncidents(city.bbox), () =>
          generateMockIncidents(city.roads),
        )
      : Promise.resolve(generateMockIncidents(city.roads)); // wrap to Promise

  // Traffic + Incidents
  /*
  const [trafficFlow, incidents] = await Promise.all([
    TomTomAPI.fetchTrafficFlow(dublinRoads),
    TomTomAPI.fetchIncidents(CONFIG.bbox),
  ]);
  */

  // async function returns a Promise
  const weatherPromise = OpenWeatherAPI.fetchWeather(
    city.center[0],
    city.center[1],
  );
  const [trafficFlow, incidents, weather] = await Promise.all([
    trafficPromise,
    incidentsPromise,
    weatherPromise,
  ]);
  state.weather = weather;

  // Transform
  //state.traffic.data = (trafficFlow?.results ?? []).map(toTrafficListItem);
  state.traffic.raw = trafficFlow?.results ?? [];
  state.traffic.data = state.traffic.raw.map(toTrafficListItem);
  state.incidents.data = (incidents?.results ?? []).map(toIncidentListItem);

  refreshIncidentTypeOptions();
}

// ================================
// DASHBOARD UPDATE PIPELINE
// ================================
async function initializeDashboard({ flashFilter = false } = {}) {
  console.log("Initializing dashboard data:", new Date().toLocaleString());
  // avoid no parameter error
  await loadDashboardData();
  // Draw traffic flow on the map using raw flow segments
  updateTrafficMap(state.traffic.raw);
  sortTrafficData(state.sort);
  updateWeatherWidget();
  updateMetricsCards();
  updateSpeedTrendChart();
  updateCongestionChart();
  renderTrafficLists(flashFilter);
  renderIncidentsLists();
}

// ================================
// AUTO UPDATE
// ================================
function startAutoUpdate() {
  if (state.autoUpdateTimer) return;

  state.autoUpdateTimer = setInterval(() => {
    initializeDashboard();
  }, CONFIG.updateInterval);

  updateAutoUpdateButton(true);
}

function stopAutoUpdate() {
  if (!state.autoUpdateTimer) return;

  clearInterval(state.autoUpdateTimer);
  state.autoUpdateTimer = null;

  updateAutoUpdateButton(false);
}

function toggleAutoUpdate() {
  const isRunning = Boolean(state.autoUpdateTimer);
  if (isRunning) stopAutoUpdate();
  else startAutoUpdate();
}

// ================================
// EVENTS
// ================================
function setupEventListeners() {
  dom.refreshBtn?.addEventListener("click", async () => {
    showLoading();
    centerMap();
    await initializeDashboard();
    hideLoading();
  });

  // City selector
  // select set selected option to value
  dom.cityDropdown?.addEventListener("change", async () => {
    showLoading();
    setCity(dom.cityDropdown.value);
    initializeMap();
    await initializeDashboard();
    hideLoading();
  });
  // Live API / Mock switch
  dom.dataModeToggle?.addEventListener("change", async () => {
    showLoading();
    setDataMode(dom.dataModeToggle.checked ? "live" : "mock");
    await initializeDashboard();
    hideLoading();
  });

  // Auto-update
  dom.autoUpdateBtn?.addEventListener("click", () => {
    toggleAutoUpdate();
  });

  // Traffic sort
  dom.filterBtn?.addEventListener("click", () => {
    state.traffic.page = 1;
    const sortBy = dom.sortDropdown.value;
    const applyFilter = sortBy === state.sort;

    sortTrafficData(sortBy);
    renderTrafficLists(applyFilter);

    state.sort = sortBy;
  });

  // Incident filters
  dom.incidentTypeFilter?.addEventListener("change", () => {
    state.incidents.filters.type = dom.incidentTypeFilter.value;
    state.incidents.page = 1;
    renderIncidentsLists();
    updateMetricsCards(); // only show filtered count
  });
  dom.incidentRoadSearch?.addEventListener("input", () => {
    state.incidents.filters.roadQuery = dom.incidentRoadSearch.value;
    state.incidents.page = 1;
    renderIncidentsLists();
    updateMetricsCards(); // only show filtered count
  });

  setupTrafficPagination();
  setupIncidentPagination();
}

function setupTrafficPagination() {
  dom.trafficPagination.prevBtn.addEventListener("click", () => {
    if (state.traffic.page > 1) {
      state.traffic.page--;
      renderTrafficLists();
    }
  });
  dom.trafficPagination.nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(
      state.traffic.data.length / CONFIG.pagination.trafficItemsPerPage,
    );
    if (state.traffic.page < totalPages) {
      state.traffic.page++;
      renderTrafficLists();
    }
  });
}

function setupIncidentPagination() {
  dom.incidentPagination.prevBtn.addEventListener("click", () => {
    if (state.incidents.page > 1) {
      state.incidents.page--;
      renderIncidentsLists();
    }
  });

  dom.incidentPagination.nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(
      getFilteredIncidents().length / CONFIG.pagination.incidentItemsPerPage,
    );
    if (state.incidents.page < totalPages) {
      state.incidents.page++;
      renderIncidentsLists();
    }
  });
}

// ================================
// BOOTSTRAP
// ================================
document.addEventListener("DOMContentLoaded", async () => {
  // HTML 已經被解析完成，DOM Tree 已經建好
  // 所有 HTML tags 都變成 DOM nodes
  // getElementById / querySelector 找得到東西

  console.log(
    "Traffic Dashboard Script Loaded: " + new Date().toLocaleString(),
  );
  cacheDom();

  // Load persisted preferences
  const savedCity = localStorage.getItem("traffic_dashboard_city"); // might be null
  const savedMode = localStorage.getItem("traffic_dashboard_dataMode"); // might be null
  if (savedCity && CONFIG.cities[savedCity]) state.cityKey = savedCity;
  if (savedMode === "live" || savedMode === "mock") state.dataMode = savedMode; // including null check

  // Populate city dropdown (in case HTML changes)
  if (dom.cityDropdown) {
    const keys = Object.keys(CONFIG.cities);
    dom.cityDropdown.innerHTML = keys
      .map((k) => `<option value="${k}">${k}</option>`)
      .join("");
  }

  syncUIFromState();
  setDataMode(state.dataMode); // update label
  setCity(state.cityKey); // update title/tooltip + persist

  showLoading();
  setupEventListeners();
  initializeMap();
  initializeCharts();
  await initializeDashboard();
  dom.container.classList.add("loaded");
  startAutoUpdate();
  hideLoading();
});

/*
function updateTrafficData(trafficData) {
  trafficData.forEach((data) => {
    let randomChange = (Math.random() - 0.5) * 3; // Random change between -1.5 and +1.5
    data.jamLevel = Math.round(
      Math.min(10, Math.max(0, data.jamLevel + randomChange))
    );

    if (data.jamLevel < 4) {
      data.status = "good";
      data.speed = Math.min(60, data.speed + 5); // Increase speed
    } else if (data.jamLevel < 7) {
      data.status = "moderate";
      data.speed = Math.max(20, data.speed - 5); // Decrease speed
    } else {
      data.status = "heavy";
      data.speed = Math.max(10, data.speed - 10); // Decrease speed more
    }
  });
}
*/
