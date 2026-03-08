import L from "leaflet";
import { CONFIG } from "./config.js";
import { state } from "./state.js";
import {
  ChartsPayload,
  CityConfig,
  IncidentDetails,
  IncidentListItem,
  IncidentStandardFormat,
  MetricsPayload,
  SortOption,
  TrafficListItem,
  TrafficStandardFormat,
  WeatherData,
} from "../types/domain.js";
import { OpenWeatherService, TomTomService } from "../services";
import {
  mapIncidentsToListItems,
  mapTrafficFlowsToListItems,
} from "../mappers";

// ================================
// UTILITIES
// ================================
const clamp = (n: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, n)); // limit n between min and max

function showLoading() {
  opts?.onLoadedChange?.(false);
}
function hideLoading() {
  opts?.onLoadedChange?.(true);
}

function formatTimeWithSeconds(timeZone: string): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// ================================
// RENDER: METRICS
// ================================
// 呼叫端（dashboard/legacy）決定「會傳什麼 payload」
// caller decides what payload to pass in
type Options = {
  onLoadedChange?: (isLoaded: boolean) => void;
  onAutoUpdateChange?: (isRunning: boolean) => void;
  onLiveUpdateChange?: (isLive: boolean) => void;
  onNavbarTitle?: (title: string) => void;
  onCityChange?: (cityKey: string) => void;
  onWeatherData?: (data: WeatherData) => void;
  onMetricsData?: (data: MetricsPayload) => void;
  onChartsData?: (data: ChartsPayload) => void;
  onTrafficPageData?: (payload: {
    items: TrafficListItem[];
    page: number;
    totalPages: number;
  }) => void;
  onIncidentsCountChange?: (count: number) => void;
  onIncidentPageData?: (payload: {
    items: IncidentListItem[];
    allItems: IncidentListItem[];
    page: number;
    totalPages: number;
  }) => void;
};

let opts: Options | null = null;

// ================================
// CITY & DATA MODE HELPERS
// ================================
function getCityConfig(): CityConfig {
  // if cityKey not found, return default city config
  return CONFIG.cities[state.cityKey] ?? CONFIG.cities[CONFIG.defaultCity];
}

function setCity(cityKey: string): void {
  if (!CONFIG.cities[cityKey]) return; // city not found
  state.cityKey = cityKey;
  opts?.onCityChange?.(state.cityKey);

  // persist selection
  // next time user opens the app, it will load the last selected city
  localStorage.setItem("traffic_dashboard_city", cityKey);

  opts?.onNavbarTitle?.(`🚦 ${cityKey} Traffic Dashboard`);
  // Reset paging
  state.traffic.page = 1;
  state.incidents.page = 1;
  state.metrics.prevAvgSpeed = null;

  // Reset charts series
  state.charts.speedTrend.labels = [];
  state.charts.speedTrend.data = [];
  state.charts.congestion.good = 0;
  state.charts.congestion.moderate = 0;
  state.charts.congestion.heavy = 0;

  // Recenter map
  centerMapHandler();
}

function setDataMode(mode: string): void {
  state.dataMode = mode === "live" ? "live" : "mock";
  setLiveUpdate(state.dataMode === "live");
  localStorage.setItem("traffic_dashboard_dataMode", state.dataMode);
}

export function syncDashboardUiFromState(): void {
  opts?.onCityChange?.(state.cityKey);
  opts?.onNavbarTitle?.(`🚦 ${state.cityKey} Traffic Dashboard`);
  setLiveUpdate(state.dataMode === "live");
  opts?.onAutoUpdateChange?.(Boolean(state.autoUpdateTimer));
}

function setLiveUpdate(isLive: boolean): void {
  opts?.onLiveUpdateChange?.(isLive);
}

// ================================
// MOCK DATA GENERATORS
// ================================
function generateMockTrafficFlow(): { results: TrafficStandardFormat[] } {
  const city = getCityConfig();

  // 整個function的回傳值
  return {
    // each roads become an object in results array
    results: city.roads.map((road, index) => {
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

function normalizeCriticality(
  value: string | null | undefined,
): IncidentDetails["criticality"] {
  switch (value) {
    case "minor":
    case "major":
    case "moderate":
      return value;
    default:
      return "Unknown";
  }
}

function generateMockIncidents(): { results: IncidentStandardFormat[] } {
  const incidentTypes = [
    { type: "ACCIDENT", icon: "🚨", criticality: "major" },
    { type: "ROADWORK", icon: "🚧", criticality: "major" },
    { type: "HEAVY_TRAFFIC", icon: "⚡", criticality: "minor" },
    { type: "ROAD_CLOSURE", icon: "🚫", criticality: "major" },
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
          criticality: normalizeCriticality(incident.criticality),
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

// ========================================
// MAP FUNCTIONS
// ========================================
export function initializeDashboardMap(): void {
  if (state.map) state.map.remove();

  const city = getCityConfig();
  state.map = L.map("map").setView(city.center, CONFIG.zoom); // Initialize Leaflet map

  // OpenStreetMap Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(state.map);

  // Layer group for traffic flow polylines (cleared/redrawn on each refresh)
  if (state.mapLayers.traffic) state.mapLayers.traffic.clearLayers();
  state.mapLayers.traffic = L.layerGroup().addTo(state.map);
}

export function centerMapHandler() {
  const city = getCityConfig();
  if (state.map) state.map.setView(city.center, CONFIG.zoom);
}

function setTrafficPage(page: number) {
  const perPage = CONFIG.pagination.trafficItemsPerPage;
  const totalPages = Math.max(
    1,
    Math.ceil(state.traffic.data.length / perPage),
  );

  state.traffic.page = clamp(page, 1, totalPages);
  renderTrafficLists();
}

export function prevTrafficPageHandler() {
  setTrafficPage(state.traffic.page - 1);
}

export function nextTrafficPageHandler() {
  setTrafficPage(state.traffic.page + 1);
}

function setIncidentPage(page: number) {
  const perPage = CONFIG.pagination.incidentItemsPerPage;
  const totalPages = Math.max(
    1,
    Math.ceil(state.incidents.data.length / perPage),
  );

  state.incidents.page = clamp(page, 1, totalPages);
  renderIncidentsLists();
}

export function prevIncidentPageHandler() {
  setIncidentPage(state.incidents.page - 1);
}

export function nextIncidentPageHandler() {
  setIncidentPage(state.incidents.page + 1);
}

function sortTrafficData(sortBy: SortOption) {
  const list = state.traffic.data;

  if (sortBy === "worst") {
    list.sort((a, b) => b.jamLevel - a.jamLevel);
  } else if (sortBy === "best") {
    list.sort((a, b) => a.jamLevel - b.jamLevel);
  } else if (sortBy === "alphabetical") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
}

export function trafficSortHandler(sortBy: SortOption) {
  const applyFilter = sortBy === state.sort;

  sortTrafficData(sortBy);
  renderTrafficLists(applyFilter);

  state.sort = sortBy;
}

export function incidentRoadHandler(query: string) {
  state.incidents.filters.roadQuery = query;
  state.incidents.page = 1;
  renderIncidentsLists();
  updateMetricsCards();
}

export function incidentTypeHandler(type: string) {
  state.incidents.filters.type = type;
  state.incidents.page = 1;
  renderIncidentsLists();
  updateMetricsCards();
}

export async function dataModeHandler(isLive: boolean) {
  showLoading();
  setDataMode(isLive ? "live" : "mock");
  await runDashboardRefresh();
  hideLoading();
}

export function autoUpdateHandler(isAutoUpdate: boolean): void {
  if (isAutoUpdate) {
    stopDashboardAutoUpdate();
    return;
  }
  startDashboardAutoUpdate();
}

function updateAutoUpdateButton(isRunning: boolean): void {
  opts?.onAutoUpdateChange?.(isRunning);
}

export async function refreshHandler() {
  showLoading();
  centerMapHandler();
  await runDashboardRefresh();
  hideLoading();
}

// ========================================
// MAP: TRAFFIC FLOW RENDERING
// ========================================
function getTrafficColor(
  jamFactor: number,
  colors: { good: string; moderate: string; heavy: string },
): string {
  const jf = Number(jamFactor) || 0;
  if (jf <= CONFIG.thresholds.goodMax) return colors.good;
  if (jf <= CONFIG.thresholds.moderateMax) return colors.moderate;
  return colors.heavy;
}
function updateTrafficMap(flowResults: TrafficStandardFormat[]) {
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
    const traversability = seg?.currentFlow?.traversability ?? "open";

    links.forEach((link) => {
      const pts = link?.points ?? [];
      if (pts.length < 2) return;

      const latlngs = pts
        .map((p) => [Number(p.lat), Number(p.lng)])
        .filter(([la, ln]) => Number.isFinite(la) && Number.isFinite(ln));

      if (latlngs.length < 2) return;

      const color = getTrafficColor(jam, colors);
      const poly = L.polyline(latlngs as L.LatLngExpression[], {
        color,
        weight: 3,
        opacity: 0.85,
        dashArray: traversability === "closed" ? "6 6" : undefined, // dashed if closed
      });

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
      if (state.mapLayers.traffic) poly.addTo(state.mapLayers.traffic);
    });
  });
}

function updateCharts() {
  if (!state.traffic.data.length) return;

  const timeLabel = formatTimeWithSeconds(CONFIG.timeZone); // get current time label

  const avgSpeed =
    state.traffic.data.reduce((sum, d) => sum + d.speed, 0) /
    state.traffic.data.length;

  state.charts.speedTrend.labels?.push(timeLabel);
  state.charts.speedTrend.data?.push(Number(avgSpeed.toFixed(1)));

  if (
    (state.charts.speedTrend.labels?.length ?? 0) >
    CONFIG.charts.speedTrendMaxPoints
  ) {
    state.charts.speedTrend.labels?.shift();
    state.charts.speedTrend.data?.shift();
  }

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
  state.charts.congestion.good = good;
  state.charts.congestion.moderate = moderate;
  state.charts.congestion.heavy = heavy;

  opts?.onChartsData?.({
    speedTrend: {
      labels: [...state.charts.speedTrend.labels],
      data: [...state.charts.speedTrend.data],
      yMax: CONFIG.charts.speedTrendYMax,
    },
    congestion: {
      good: state.charts.congestion.good,
      moderate: state.charts.congestion.moderate,
      heavy: state.charts.congestion.heavy,
    },
  });
}

// ================================
// WEATHER WIDGET
// ================================
function updateWeatherWidget() {
  if (!opts?.onWeatherData || !state.weather) return;
  opts.onWeatherData(state.weather);
}

export async function cityChangeHandler(currentCity: string) {
  showLoading();
  setCity(currentCity);
  initializeDashboardMap();
  await runDashboardRefresh();
  hideLoading();
}

function updateMetricsCards() {
  if (!opts?.onMetricsData) return;

  const traffic = state.traffic.data ?? [];
  const incidents = state.incidents.data ?? [];

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
  let trend: MetricsPayload["trend"] = null;
  if (Number.isFinite(state.metrics.prevAvgSpeed)) {
    const diff = avgSpeed - (state.metrics.prevAvgSpeed ?? 0);
    const pct =
      state.metrics.prevAvgSpeed === 0
        ? 0
        : (diff / (state.metrics.prevAvgSpeed ?? 1)) * 100;
    trendText = `${diff >= 0 ? "▲" : "▼"} ${Math.abs(pct).toFixed(0)}%`;
    trend = { text: trendText, dir: diff >= 0 ? "up" : "down" };
  }
  state.metrics.prevAvgSpeed = avgSpeed;

  opts?.onMetricsData?.({
    avgSpeed,
    commuteTime: avgTravelTime,
    congestedRoads,
    activeIncidentsFiltered,
    activeIncidentsTotal: activeIncidents,
    avgJam,
    healthScore,
    updatedAt,
    jamThreshold: CONFIG.thresholds.moderateMax,
    trend,
  });
}

// ================================
// RENDER: TRAFFIC LIST
// ================================
function renderTrafficLists(applyFilter = false) {
  const total = state.traffic.data.length;
  const perPage = CONFIG.pagination.trafficItemsPerPage;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  state.traffic.page = clamp(state.traffic.page, 1, totalPages);
  const startIndex = (state.traffic.page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageData = state.traffic.data.slice(startIndex, endIndex);

  opts?.onTrafficPageData?.({
    items: pageData,
    page: state.traffic.page,
    totalPages,
  });

  if (applyFilter) setTimeout(addFilterEffect, 0);
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

function renderIncidentsLists() {
  const validIncidents = getFilteredIncidents();

  opts?.onIncidentsCountChange?.(validIncidents.length);

  const total = validIncidents.length;
  const perPage = CONFIG.pagination.incidentItemsPerPage;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  state.incidents.page = clamp(state.incidents.page, 1, totalPages);
  const startIndex = (state.incidents.page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageData = validIncidents.slice(startIndex, endIndex);

  opts?.onIncidentPageData?.({
    items: pageData,
    allItems: state.incidents.data,
    page: state.incidents.page,
    totalPages,
  });
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
  const safe = async (promise: Promise<any>, fallbackFn: () => any) => {
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
      ? safe(TomTomService.fetchTrafficFlow(city.roads), () =>
          generateMockTrafficFlow(),
        )
      : Promise.resolve(generateMockTrafficFlow()); // wrap to Promise
  const incidentsPromise =
    state.dataMode === "live"
      ? safe(TomTomService.fetchIncidents(city.bbox), () =>
          generateMockIncidents(),
        )
      : Promise.resolve(generateMockIncidents()); // wrap to Promise

  // async function returns a Promise
  const weatherPromise = OpenWeatherService.fetchWeather(
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
  state.traffic.raw = trafficFlow?.results ?? [];
  state.traffic.data = mapTrafficFlowsToListItems(state.traffic.raw);
  state.incidents.data = mapIncidentsToListItems(incidents?.results ?? []);
}

// ================================
// DASHBOARD UPDATE PIPELINE
// ================================
export async function runDashboardRefresh({
  flashFilter = false,
} = {}): Promise<void> {
  // avoid no parameter error
  await loadDashboardData();
  // Draw traffic flow on the map using raw flow segments
  updateTrafficMap(state.traffic.raw);
  sortTrafficData(state.sort);
  updateWeatherWidget();
  updateMetricsCards();
  updateCharts();
  renderTrafficLists(flashFilter);
  renderIncidentsLists();
}

// ================================
// AUTO UPDATE
// ================================
export function startDashboardAutoUpdate(): void {
  if (state.autoUpdateTimer) return;

  state.autoUpdateTimer = window.setInterval(() => {
    runDashboardRefresh().catch((err) => {
      console.error("Dashboard auto refresh failed:", err);
    });
  }, CONFIG.updateInterval);

  updateAutoUpdateButton(true);
}

function stopDashboardAutoUpdate(): void {
  if (!state.autoUpdateTimer) return;

  clearInterval(state.autoUpdateTimer);
  state.autoUpdateTimer = null;
  updateAutoUpdateButton(false);
}

export function attachDashboardUpdaters(o: Options): void {
  opts = o;
}

export function loadPersistedDashboardPreferences(): void {
  // Load persisted preferences
  const savedCity = localStorage.getItem("traffic_dashboard_city"); // might be null
  const savedMode = localStorage.getItem("traffic_dashboard_dataMode"); // might be null
  if (savedCity && CONFIG.cities[savedCity]) state.cityKey = savedCity;
  if (savedMode === "live" || savedMode === "mock") state.dataMode = savedMode; // including null check
}

export function destroyTrafficDashboard(): void {
  // Stop periodic updates
  try {
    stopDashboardAutoUpdate();
  } catch {}

  state.charts.speedTrend.labels = [];
  state.charts.speedTrend.data = [];
  state.charts.congestion.good = 0;
  state.charts.congestion.moderate = 0;
  state.charts.congestion.heavy = 0;
  // Destroy map
  try {
    state.map?.remove?.();
  } catch {}

  state.map = null;
  opts = null;
}
