// Small helper type for Leaflet coordinates
export type LatLng = { lat: number; lng: number };
export type FlowLink = { points: LatLng[] };

export type TrafficStatus = "good" | "moderate" | "heavy";
export type SortOption = "worst" | "best" | "alphabetical";
export type DataMode = "mock" | "live";

export type DashboardConfig = {
  defaultCity: string;
  cities: Record<string, CityConfig>; // key is string, value is CityConfig
  zoom: number;
  timeZone: string;
  updateInterval: number;
  thresholds: {
    goodMax: number;
    moderateMax: number;
  };
  pagination: {
    trafficItemsPerPage: number;
    incidentItemsPerPage: number;
  };
  charts: {
    speedTrendMaxPoints: number;
    speedTrendYMax: number;
  };
};

export type CityConfig = {
  center: [number, number];
  bbox: BBox;
  roads: Road[];
};

export type BBox = {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
};

export type Road = {
  name: string;
  lat: number;
  lng: number;
};

export type TrafficListItem = {
  name: string;
  jamLevel: number;
  speed: number;
  status: TrafficStatus;
  freeFlow: number;
};

export type TrafficStandardFormat = {
  location: {
    description: string;
    shape: { links: FlowLink[] };
  };
  currentFlow: {
    speed: number;
    freeFlow: number;
    jamFactor: number; // 0..10
    traversability: "open" | "closed";
  };
};

export type IncidentStandardFormat = {
  incidentDetails: IncidentDetails;
  location: {
    shape: { links: FlowLink[] };
    description: string;
  };
  impact: {
    delayInSeconds: number;
    affectedRoads: string[];
  };
  icon: string;
};

export type IncidentDetails = {
  id: string;
  type: string;
  criticality: "minor" | "major" | "moderate" | "Unknown";
  description: string;
  startTime: string;
  endTime: string;
};

export type IncidentListItem = {
  type: string;
  icon: string;
  location: string;
  time: string;
  delay: string;
  severity: IncidentDetails["criticality"];
};

export type WeatherData = {
  temperature: number;
  description: string;
  icon: string;
  dt: number;
  timezone: string;
};

export type MetricTrend = {
  text: string;
  dir: "up" | "down";
};

export type MetricsPayload = {
  // null means "no data yet" (e.g. initial load)
  avgSpeed: number | null; // km/h
  commuteTime: number | null; // min
  congestedRoads: number | null;
  activeIncidentsFiltered: number | null;
  activeIncidentsTotal: number | null;
  avgJam: number | null; // 0..10
  healthScore: number | null; // 0..100
  updatedAt: string | null; // already formatted time string
  jamThreshold: number; // threshold used for congestedRoads
  trend: MetricTrend | null; // trend vs previous refresh
};

export type ChartsPayload = {
  speedTrend: {
    labels: string[];
    data: number[];
    yMax: number;
  };
  congestion: {
    good: number;
    moderate: number;
    heavy: number;
  };
};
