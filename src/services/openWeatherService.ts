import type { WeatherData } from "../types/domain";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export class OpenWeatherService {
  static async fetchWeather(
    lat: number,
    lon: number,
  ): Promise<WeatherData | null> {
    const url = `${API_BASE_URL}/api/weather?lat=${lat}&lng=${lon}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as WeatherData;
    } catch (error) {
      console.error("Error fetching weather from backend:", error);
      return null;
    }
  }
}
