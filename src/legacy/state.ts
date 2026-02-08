import { CONFIG } from "./config.js";
import type L from "leaflet";
import type {
  DataMode,
  SortOption,
  TrafficListItem,
  TrafficStandardFormat,
  IncidentStandardFormat,
  WeatherData,
  IncidentListItem,
} from "./types.js";
import { Chart } from "chart.js";

// ================================
// APP STATE
// ================================
export type DashboardState = {
  map: L.Map | null;
  mapLayers: {
    traffic?: L.LayerGroup;
  };
  autoUpdateTimer: number | null;
  sort: SortOption;
  cityKey: keyof typeof CONFIG.cities;
  dataMode: DataMode; // "mock" | "live"
  metrics: {
    prevAvgSpeed: number | null;
    lastUpdatedAt: string | null;
  };
  traffic: {
    data: TrafficListItem[];
    raw: TrafficStandardFormat[]; // keep raw flow segments for map rendering
    page: number;
  };
  incidents: {
    data: IncidentListItem[];
    page: number;
    filters: {
      type: string; // e.g. "all", "accident", "construction"
      roadQuery: string;
    };
  };
  weather: WeatherData | null;
  charts: {
    speedTrend: Chart<"line", number[], string> | null;
    congestion: Chart<"doughnut", number[], string> | null;
  };
};

export const state = {
  map: null,
  mapLayers: {},
  autoUpdateTimer: null,
  sort: "worst",
  cityKey: CONFIG.defaultCity,
  dataMode: "mock",
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
} as DashboardState;
