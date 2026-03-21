import type { WeatherData } from "../types/domain";

export class OpenWeatherService {
  static API_KEY = "1970cf6f514f532c6eae6d654ed3d853";
  static BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  static async fetchWeather(
    lat: number,
    lon: number,
  ): Promise<WeatherData | null> {
    const url = `${this.BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        temperature: data.main.temp,
        description: data.weather?.[0]?.description ?? "Unknown",
        icon: data.weather?.[0]?.icon ?? "01d",
        dt: data.dt,
        timezone: String(data.timezone ?? 0),
      };
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  }
}
