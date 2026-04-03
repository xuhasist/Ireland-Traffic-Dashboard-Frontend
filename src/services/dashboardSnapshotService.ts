import type {
  ChartsPayload,
  DataMode,
  MetricsPayload,
  WeatherData,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type DashboardSnapshotPayload = {
  city: string;
  dataMode: DataMode;
  trafficCount: number;
  incidentCount: number;
  generatedAt: string;
  weather: WeatherData | null;
  metrics: MetricsPayload | null;
  congestion: ChartsPayload["congestion"];
};

export class DashboardSnapshotService {
  static async saveSnapshot(payload: DashboardSnapshotPayload): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard-snapshots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving dashboard snapshot:", error);
    }
  }
}
