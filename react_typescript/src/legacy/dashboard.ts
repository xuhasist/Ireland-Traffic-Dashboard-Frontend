import L from "leaflet";
import { CONFIG } from "./config.js";
import { state } from "./state.js";
import {
  BBox,
  ChartsPayload,
  CityConfig,
  IncidentDetails,
  IncidentListItem,
  IncidentStandardFormat,
  MetricsPayload,
  Road,
  SortOption,
  TrafficListItem,
  TrafficStandardFormat,
  TrafficStatus,
  WeatherData,
} from "../types/domain.js";

// ================================
// UTILITIES
// ================================
const clamp = (n: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, n)); // limit n between min and max

function minutesAgoToText(minutesAgo: number): string {
  // check minutesAgo is a number
  if (!Number.isFinite(minutesAgo) || minutesAgo < 0) return "--";
  if (minutesAgo < 60) return `${minutesAgo} mins ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
}

function jamToStatus(jamFactor: number): TrafficStatus {
  if (jamFactor < CONFIG.thresholds.goodMax) return "good";
  if (jamFactor < CONFIG.thresholds.moderateMax) return "moderate";
  return "heavy";
}

function showLoading() {
  if (opts?.onLoadedChange) opts.onLoadedChange(false);
}
function hideLoading() {
  if (opts?.onLoadedChange) opts.onLoadedChange(true);
}

function formatTimeWithSeconds(timeZone: string): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: timeZone,
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
  //onProgressChange: (v: number) => void;
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
    //totalItems: number;
  }) => void;
  //onTrafficSortChange?: (sortBy: SortOption) => void;
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

function setCity(cityKey: string) {
  if (!CONFIG.cities[cityKey]) return; // city not found
  state.cityKey = cityKey;
  if (opts?.onCityChange) opts.onCityChange(state.cityKey);

  // persist selection
  // next time user opens the app, it will load the last selected city
  localStorage.setItem("traffic_dashboard_city", cityKey);

  // Update navbar title
  const cityName = cityKey;
  if (!opts?.onNavbarTitle) return;
  opts.onNavbarTitle(`🚦 ${cityName} Traffic Dashboard`);

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

function syncUIFromState() {
  setLiveUpdate(state.dataMode === "live");
}

function setLiveUpdate(isLive: boolean) {
  if (opts?.onLiveUpdateChange) opts.onLiveUpdateChange(isLive);
}

// ================================
// MOCK DATA GENERATORS
// ================================
function generateMockTrafficFlow(): { results: TrafficStandardFormat[] } {
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

// ================================
// SERVICES
// ================================
class TomTomAPI {
  static API_KEY = "PEooaTjLuccn1ZmqjT25dDIfEIoXaIRh";
  static BASE_URL = "https://api.tomtom.com/traffic/services";

  static async fetchTrafficFlow(
    roads: Road[],
  ): Promise<{ results: (TrafficStandardFormat | null)[] }> {
    // Fetch each road segment in parallel. If a single request fails, we simply drop that segment.
    const tasks = roads.map((road) =>
      this.#fetchFlowForPoint(road.lat, road.lng, road.name),
    );
    const results = (await Promise.all(tasks)).filter(Boolean); // Filter out null results

    return { results }; // Return as an object with results array
  }

  // #fetchFlowForPoint: private method
  static async #fetchFlowForPoint(
    lat: number,
    lng: number,
    roadName: string,
  ): Promise<TrafficStandardFormat | null> {
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

  static #convertToStandardFormat(
    tomtomData: any,
    lat: number,
    lng: number,
    roadName: string,
  ): TrafficStandardFormat {
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

  static async fetchIncidents(
    bbox: BBox,
  ): Promise<{ results: IncidentStandardFormat[] } | null> {
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

  static #convertIncidentsToStandardFormat(tomtomData: any): {
    results: IncidentStandardFormat[];
  } {
    return {
      results: tomtomData.incidents.map((incident: any) => {
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
                  points: incident.geometry.coordinates.map(
                    (coord: [number, number]) => ({
                      lat: coord[1],
                      lng: coord[0],
                    }),
                  ),
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

  static getIncidentIcon(iconCategory: number): string {
    const iconMap: Record<number, string> = {
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

  static getIncidentType(iconCategory: number): string {
    const typeMap: Record<number, string> = {
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

  static getSeverityLevel(iconCategory: number): string {
    const typeMap: Record<number, string> = {
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

  static async fetchWeather(
    lat: number,
    lon: number,
  ): Promise<WeatherData | null> {
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

  static getWeatherIcon(iconCode: string): string {
    const iconMap: Record<string, string> = {
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
  //state.mapLayers = state.mapLayers || {};
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
  //state.traffic.page = 1;
  //const sortBy = dom.sortDropdown.value as SortOption;
  const applyFilter = sortBy === state.sort;

  sortTrafficData(sortBy);
  renderTrafficLists(applyFilter);

  state.sort = sortBy;
}

export function incidentRoadHandler(query: string) {
  state.incidents.filters.roadQuery = query; //dom.incidentRoadSearch.value;
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
  await initializeDashboard();
  hideLoading();
}

export function autoUpdateHandler(isAutoUpdate: boolean): void {
  toggleAutoUpdate(isAutoUpdate);
}

export function updateAutoUpdateButton(isRunning: boolean): void {
  /* if (!dom.autoUpdateBtn) return; // check button exists
  dom.autoUpdateBtnIcon.textContent = isRunning ? "⏸️" : "▶️";
  dom.autoUpdateBtnText.textContent = isRunning
    ? "Stop Auto-Update"
    : "Start Auto-Update"; */

  if (opts?.onAutoUpdateChange) opts.onAutoUpdateChange(isRunning);
}

export async function refreshHandler() {
  showLoading();
  centerMapHandler();
  await initializeDashboard();
  hideLoading();
}

// ========================================
// MAP: TRAFFIC FLOW RENDERING
// ========================================
function getTrafficColor(
  jamFactor: number,
  colors: { good: string; moderate: string; heavy: string },
): string {
  // colors: { good, moderate, heavy }
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
      const poly = L.polyline(latlngs as L.LatLngExpression[], {
        color,
        weight: 3,
        opacity: 0.85,
        dashArray: traversability === "closed" ? "6 6" : undefined, // dashed if closed
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
      if (state.mapLayers.traffic) poly.addTo(state.mapLayers.traffic);
    });
  });
}

function updateCharts() {
  if (!state.traffic.data.length) return;
  //console.log("!!!state.traffic.data.length:", state.traffic.data.length);

  //const now = new Date();
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

  /* console.log(
    "state.charts.speedTrend.labels:",
    state.charts.speedTrend.labels.length,
  ); */

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
  if (!opts?.onWeatherData) return;
  if (!state.weather) return;
  opts.onWeatherData(state.weather);
}

// ================================
// DATA TRANSFORMS
// ================================
function toTrafficListItem(flowResult: TrafficStandardFormat): TrafficListItem {
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

function toIncidentListItem(
  incidentResult: IncidentStandardFormat,
): IncidentListItem {
  const startTime = new Date(incidentResult.incidentDetails.startTime);
  const minutesAgo = Math.floor(
    (Date.now() - new Date(startTime).getTime()) / 60000,
  );
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

export async function cityChangeHandler(currentCity: string) {
  showLoading();
  setCity(currentCity);
  initializeMap();
  await initializeDashboard();
  hideLoading();
}

function updateMetricsCards() {
  if (!opts?.onMetricsData) return;

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
    trend: trend,
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
  return;
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

  /* console.log(
    "dataMode:",
    state.dataMode,
    "city:",
    state.cityKey,
    "roads:",
    getCityConfig().roads?.length,
  ); */

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
      ? safe(TomTomAPI.fetchTrafficFlow(city.roads), () =>
          generateMockTrafficFlow(),
        )
      : Promise.resolve(generateMockTrafficFlow()); // wrap to Promise
  const incidentsPromise =
    state.dataMode === "live"
      ? safe(TomTomAPI.fetchIncidents(city.bbox), () => generateMockIncidents())
      : Promise.resolve(generateMockIncidents()); // wrap to Promise

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

  //console.log("trafficFlow results:", trafficFlow?.results?.length);

  // Transform
  //state.traffic.data = (trafficFlow?.results ?? []).map(toTrafficListItem);
  state.traffic.raw = trafficFlow?.results ?? [];
  state.traffic.data = state.traffic.raw.map(toTrafficListItem);
  state.incidents.data = (incidents?.results ?? []).map(toIncidentListItem);

  //console.log("state.traffic.data.length:", state.traffic.data.length);

  //refreshIncidentTypeOptions();
}

// ================================
// DASHBOARD UPDATE PIPELINE
// ================================
async function initializeDashboard({ flashFilter = false } = {}) {
  //console.log("Initializing dashboard data:", new Date().toLocaleString());
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

function toggleAutoUpdate(isRunning?: boolean) {
  //const isRunning = Boolean(state.autoUpdateTimer);
  if (isRunning) stopAutoUpdate();
  else startAutoUpdate();
}

let __bootstrapped = false;

/**
 * Bootstraps the dashboard AFTER React has rendered the HTML.
 * We guard it so hot-reload / double-calls won't register events twice.
 */
export async function bootstrapTrafficDashboard(o: Options): Promise<void> {
  opts = o; // assign to outer variable for use in updateMetricsCards
  if (__bootstrapped) return;
  // If we crash during bootstrap, we reset this back to false so you can
  // hot-reload and retry without refreshing the whole page.
  __bootstrapped = true;

  // HTML 已經被解析完成，DOM Tree 已經建好
  // 所有 HTML tags 都變成 DOM nodes
  // getElementById / querySelector 找得到東西

  try {
    console.log(
      "Traffic Dashboard Script Loaded: " + new Date().toLocaleString(),
    );
    //cacheDom();

    // Load persisted preferences
    const savedCity = localStorage.getItem("traffic_dashboard_city"); // might be null
    const savedMode = localStorage.getItem("traffic_dashboard_dataMode"); // might be null
    if (savedCity && CONFIG.cities[savedCity]) state.cityKey = savedCity;
    if (savedMode === "live" || savedMode === "mock")
      state.dataMode = savedMode; // including null check

    // Populate city dropdown (in case HTML changes)
    /* if (dom.cityDropdown) {
      const keys = Object.keys(CONFIG.cities);
      dom.cityDropdown.innerHTML = keys
        .map((k) => `<option value="${k}">${k}</option>`)
        .join("");
    } */

    syncUIFromState();
    setDataMode(state.dataMode); // update label
    setCity(state.cityKey); // update title/tooltip + persist

    showLoading();
    //setupEventListeners();
    initializeMap();
    //initializeCharts();
    await initializeDashboard();
    //dom.container?.classList.add("loaded");
    startAutoUpdate();
    hideLoading();
  } catch (err) {
    // If anything throws, keep the page usable and visible.
    console.error("Legacy dashboard bootstrap failed:", err);
    hideLoading();
    __bootstrapped = false;
    throw err;
  }
}

export function destroyTrafficDashboard(): void {
  // Stop periodic updates
  try {
    stopAutoUpdate();
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
  __bootstrapped = false;
}
