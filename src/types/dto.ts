import type { IncidentDetails, MetricTrend, TrafficStatus } from "./domain";

/*
 * DTO = Data Transfer Object
 * 未來後端 API 回傳格式
 * 跟 domain.ts 不同，domain.ts 是偏前端畫面實際使用的 model。
 *
 * backend response (DTO) -> mapper -> domain/view model -> UI
 */

/* ---------------------------------- */
/* shared / common                    */
/* ---------------------------------- */

export type ApiMetaDto = {
  requestId?: string;
  timestamp: string; // ISO string
  city: string;
  source?: "mock" | "backend" | "tomtom" | "openweather";
};

export type PageDto = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type LatLngDto = {
  lat: number; // latitude
  lng: number; // longitude
};

export type FlowLinkDto = {
  points: LatLngDto[];
};

/* ---------------------------------- */
/* traffic                            */
/* ---------------------------------- */

export type TrafficFlowDto = {
  id: string;
  roadName: string;
  currentSpeedKph: number;
  freeFlowSpeedKph: number;
  jamFactor: number; // 0..10
  status: TrafficStatus;
  traversability: "open" | "closed";
  updatedAt: string; // ISO string
  path: FlowLinkDto[];
};

export type TrafficFlowResponseDto = {
  meta: ApiMetaDto;
  data: TrafficFlowDto[];
};

/* ---------------------------------- */
/* incidents                          */
/* ---------------------------------- */

export type IncidentSeverityDto = IncidentDetails["criticality"];

export type IncidentDto = {
  id: string;
  type: string;
  icon: string;
  severity: IncidentSeverityDto;
  description: string;
  location: string;
  affectedRoads: string[];
  delaySeconds: number;
  startTime: string; // ISO string
  endTime: string; // ISO string
  updatedAt?: string; // ISO string
  path: FlowLinkDto[];
};

export type IncidentResponseDto = {
  meta: ApiMetaDto;
  data: IncidentDto[];
};

export type IncidentPageResponseDto = {
  meta: ApiMetaDto;
  page: PageDto;
  data: IncidentDto[];
};

/* ---------------------------------- */
/* weather                            */
/* ---------------------------------- */

export type WeatherDto = {
  temperatureCelsius: number;
  description: string;
  icon: string;
  observedAt: string; // ISO string
  timezone: string;
};

export type WeatherResponseDto = {
  meta: ApiMetaDto;
  data: WeatherDto;
};

/* ---------------------------------- */
/* dashboard summary / metrics        */
/* ---------------------------------- */

export type DashboardSummaryDto = {
  avgSpeedKph: number | null;
  commuteTimeMinutes: number | null;
  congestedRoadCount: number | null;
  activeIncidentCount: number | null;
  avgJamFactor: number | null;
  healthScore: number | null; // 0..100
  jamThreshold: number;
  updatedAt: string | null;
  trend: MetricTrend | null;
};

export type DashboardSummaryResponseDto = {
  meta: ApiMetaDto;
  data: DashboardSummaryDto;
};

/* ---------------------------------- */
/* charts                             */
/* ---------------------------------- */

export type SpeedTrendPointDto = {
  label: string;
  avgSpeedKph: number;
};

export type CongestionBreakdownDto = {
  good: number;
  moderate: number;
  heavy: number;
};

export type DashboardChartsDto = {
  speedTrend: SpeedTrendPointDto[];
  congestion: CongestionBreakdownDto;
  yMax: number;
};

export type DashboardChartsResponseDto = {
  meta: ApiMetaDto;
  data: DashboardChartsDto;
};

/* ---------------------------------- */
/* combined dashboard endpoint        */
/* ---------------------------------- */

export type DashboardDataResponseDto = {
  meta: ApiMetaDto;
  summary: DashboardSummaryDto;
  weather: WeatherDto | null;
  traffic: TrafficFlowDto[];
  incidents: IncidentDto[];
  charts?: DashboardChartsDto;
};
