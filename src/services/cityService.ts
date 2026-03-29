export type CityApiItem = {
  id: number;
  name: string;
  countryCode: string;
  lat: number;
  lng: number;
};

export type CityListResponseDto = {
  meta: {
    timestamp: string;
    source: string;
  };
  data: CityApiItem[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export class CityService {
  static async fetchCities(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cities`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const payload = (await response.json()) as CityListResponseDto;
      return payload.data.map((city) => city.name);
    } catch (error) {
      console.error("Error fetching cities from backend:", error);
      return [];
    }
  }
}
