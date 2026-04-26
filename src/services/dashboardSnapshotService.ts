import type { DataMode, DashboardSnapshotItemDto, DashboardSnapshotListResponseDto } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

type DashboardSnapshotPayload = {
  city: string;
  dataMode: DataMode;
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

  
  static async fetchTopTenSnapshots(
    city: string,
    limit = 10,
  ): Promise<DashboardSnapshotItemDto[] | null> {
    try {
      const query = new URLSearchParams({ city, limit: String(limit) }).toString();
      const response = await fetch(
        `${API_BASE_URL}/api/dashboard-snapshots?${query}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const payload = (await response.json()) as
        | DashboardSnapshotListResponseDto
        | DashboardSnapshotItemDto[]
        | null;

      if (!payload) return null;
      if (Array.isArray(payload)) return payload as DashboardSnapshotItemDto[];
      if (Array.isArray((payload as DashboardSnapshotListResponseDto).data))
        return (payload as DashboardSnapshotListResponseDto).data;
      return null;
    } catch (error) {
      console.error("Error fetching recent dashboard snapshots:", error);
      return null;
    }
  }

}
