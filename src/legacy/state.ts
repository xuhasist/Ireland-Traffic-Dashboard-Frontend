import { CONFIG } from "./config.js";

// ================================
// APP STATE
// ================================
export const state = {
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
