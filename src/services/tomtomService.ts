import type {
  BBox,
  IncidentStandardFormat,
  Road,
  TrafficStandardFormat,
} from "../types/domain";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export class TomTomService {
  static async fetchTrafficFlow(
    roads: Road[],
  ): Promise<{ results: (TrafficStandardFormat | null)[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/traffic/flow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roads }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as {
        results: (TrafficStandardFormat | null)[];
      };
    } catch (error) {
      console.error("Error fetching traffic flow from backend:", error);
      return { results: [] };
    }
  }

  static async fetchIncidents(
    bbox: BBox,
  ): Promise<{ results: IncidentStandardFormat[] } | null> {
    const url =
      `${API_BASE_URL}/api/traffic/incidents` +
      `?minLon=${bbox.minLon}` +
      `&minLat=${bbox.minLat}` +
      `&maxLon=${bbox.maxLon}` +
      `&maxLat=${bbox.maxLat}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as {
        results: IncidentStandardFormat[];
      };
    } catch (error) {
      console.error("Error fetching incidents from backend:", error);
      return null;
    }
  }
}
