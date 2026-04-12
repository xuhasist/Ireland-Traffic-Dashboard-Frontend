import type {
  DashboardChartsResponseDto,
  SpeedTrendPointDto,
  TrafficStandardFormat,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type DashboardChartsRequestDto = {
  traffic: TrafficStandardFormat[];
  previousSpeedTrend: SpeedTrendPointDto[];
  timeLabel: string;
  goodThreshold: number;
  moderateThreshold: number;
  maxPoints: number;
  yMax: number;
};

export class DashboardChartsService {
  static async fetchCharts(
    payload: DashboardChartsRequestDto,
  ): Promise<DashboardChartsResponseDto | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/charts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as DashboardChartsResponseDto;
    } catch (error) {
      console.error("Error fetching dashboard charts:", error);
      return null;
    }
  }
}
