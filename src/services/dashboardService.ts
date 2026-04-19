import type {
  ChartsPayload,
  IncidentStandardFormat,
  MetricsPayload,
  TrafficStandardFormat,
  WeatherData,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type DashboardAggregateApiResponse = {
  meta: {
    timestamp: string;
    source: string;
  };
  city: string;
  mode: string;
  weather: WeatherData | null;
  traffic: TrafficStandardFormat[];
  incidents: IncidentStandardFormat[];
  metrics: {
    avgSpeedKph: number | null;
    commuteTimeMinutes: number | null;
    congestedRoadCount: number | null;
    activeIncidentCount: number | null;
    avgJamFactor: number | null;
    healthScore: number | null;
    jamThreshold: number;
    updatedAt: string | null;
    trend: MetricsPayload["trend"];
  };
  charts: {
    speedTrend: { label: string; avgSpeedKph: number }[];
    congestion: {
      good: number;
      moderate: number;
      heavy: number;
    };
    yMax: number;
  };
};

export type DashboardAggregateData = {
  weather: WeatherData | null;
  traffic: TrafficStandardFormat[];
  incidents: IncidentStandardFormat[];
  metrics: MetricsPayload;
  charts: ChartsPayload;
};

export class DashboardService {
  static async fetchDashboard(
    city: string,
    mode: "mock" | "live",
  ): Promise<DashboardAggregateData | null> {
    try {
      const query = new URLSearchParams({ city, mode }).toString();
      const response = await fetch(`${API_BASE_URL}/api/dashboard?${query}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const payload = (await response.json()) as DashboardAggregateApiResponse;

      return {
        weather: payload.weather,
        traffic: payload.traffic ?? [],
        incidents: payload.incidents ?? [],
        metrics: {
          avgSpeed: payload.metrics.avgSpeedKph,
          commuteTime: payload.metrics.commuteTimeMinutes,
          congestedRoads: payload.metrics.congestedRoadCount,
          activeIncidentsFiltered: payload.metrics.activeIncidentCount,
          activeIncidentsTotal: payload.incidents?.length ?? 0,
          avgJam: payload.metrics.avgJamFactor,
          healthScore: payload.metrics.healthScore,
          updatedAt: payload.metrics.updatedAt,
          jamThreshold: payload.metrics.jamThreshold,
          trend: payload.metrics.trend,
        },
        charts: {
          speedTrend: {
            labels: payload.charts.speedTrend.map((point) => point.label),
            data: payload.charts.speedTrend.map((point) => point.avgSpeedKph),
            yMax: payload.charts.yMax,
          },
          congestion: payload.charts.congestion,
        },
      };
    } catch (error) {
      console.error("Error fetching dashboard aggregate:", error);
      return null;
    }
  }
}
