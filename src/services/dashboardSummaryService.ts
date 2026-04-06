import type {
  DashboardSummaryResponseDto,
  IncidentStandardFormat,
  TrafficStandardFormat,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type DashboardSummaryRequestDto = {
  traffic: TrafficStandardFormat[];
  incidents: IncidentStandardFormat[];
  filteredIncidentCount: number;
  updatedAt: string;
  previousAvgSpeed: number | null;
  jamThreshold: number;
};

export class DashboardSummaryService {
  static async fetchSummary(
    payload: DashboardSummaryRequestDto,
  ): Promise<DashboardSummaryResponseDto | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as DashboardSummaryResponseDto;
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      return null;
    }
  }
}
