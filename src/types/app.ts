import type {
  ChartsPayload,
  IncidentListItem,
  MetricsPayload,
  SortOption,
  TrafficListItem,
  WeatherData,
} from "./domain";

export type UiState = {
  isLoaded: boolean;
  isAutoUpdate: boolean;
  isLiveUpdate: boolean;
  currentCity: string | null;
  navbarTitle: string;
};

export type FilterState = {
  selectedTrafficSort: SortOption;
  selectedIncidentType: string;
  incidentRoadQuery: string;
};

export type AsyncSectionState<T> = {
  data: T | null;
  isLoading: boolean;
};

export type TrafficViewState = {
  items: TrafficListItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
};

export type IncidentViewState = {
  count: number;
  items: IncidentListItem[];
  allItems: IncidentListItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
};

export type TrafficPageData = {
  items: TrafficListItem[];
  page: number;
  totalPages: number;
};

export type IncidentPageData = {
  items: IncidentListItem[];
  allItems: IncidentListItem[];
  page: number;
  totalPages: number;
};

export type DashboardUpdaters = {
  onLoadedChange: (loaded: boolean) => void;
  onAutoUpdateChange: (isAuto: boolean) => void;
  onLiveUpdateChange: (isLive: boolean) => void;
  onNavbarTitle: (title: string) => void;
  onCityChange: (city: string) => void;
  onWeatherData: (data: WeatherData) => void;
  onMetricsData: (data: MetricsPayload) => void;
  onChartsData: (data: ChartsPayload) => void;
  onTrafficPageData: (payload: TrafficPageData) => void;
  onIncidentsCountChange: (count: number) => void;
  onIncidentPageData: (payload: IncidentPageData) => void;
};
