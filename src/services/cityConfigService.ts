import type { BBox, CityConfig, Road } from "../types/domain";

type CityConfigApiItem = {
  cityName: string;
  center: [number, number];
  bbox: BBox;
  roads: Road[];
};

type CityConfigListResponseDto = {
  meta: {
    timestamp: string;
    source: string;
  };
  data: CityConfigApiItem[];
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export class CityConfigService {
  static async fetchCityConfigs(): Promise<Record<string, CityConfig>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/city-configs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const payload = (await response.json()) as CityConfigListResponseDto;

      return payload.data.reduce<Record<string, CityConfig>>((acc, item) => {
        acc[item.cityName] = {
          center: item.center,
          bbox: item.bbox,
          roads: item.roads,
        };
        return acc;
      }, {});
    } catch (error) {
      console.error("Error fetching city configs from backend:", error);
      return {};
    }
  }
}