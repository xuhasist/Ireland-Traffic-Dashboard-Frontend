import type { WeatherData } from "../types";

export function mapWeatherToViewModel(
  weather: WeatherData | null,
): WeatherData | null {
  if (!weather) return null;

  const temperature = Number(weather.temperature);
  const dt = Number(weather.dt);

  return {
    temperature: Number.isFinite(temperature) ? temperature : 0,
    description: weather.description?.trim() || "Unknown",
    icon: weather.icon?.trim() || "01d", // default to clear day icon
    dt: Number.isFinite(dt) ? dt : 0,
    timezone: weather.timezone || "0",
  };
}
