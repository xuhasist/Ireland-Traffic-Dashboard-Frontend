import { CONFIG } from "../legacy/config";
import { WeatherData } from "../types";

type Props = {
  data: WeatherData | null;
  isLoading?: boolean;
};

function capitalizeFirst(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatTime(timeZone: string): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getWeatherIcon(iconCode: string): string {
  const iconMap: Record<string, string> = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "🌤️",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };

  return iconMap[iconCode] ?? "";
}

export default function WeatherWidget({ data, isLoading }: Props) {
  const loaded = !isLoading && !!data;
  const icon = data ? getWeatherIcon(data.icon) : "";
  const temperatureText = data ? `${Math.round(data.temperature)}°C` : "--°C";
  const descriptionText = data ? capitalizeFirst(data.description) : "";

  return (
    <div className={`weather-widget ${loaded ? "loaded" : ""}`}>
      <div className="weather-icon">{icon}</div>
      <div className="weather-info">
        <div className="weather-temp-row">
          <div className="weather-temp">{temperatureText}</div>
          <div className="weather-time">{formatTime(CONFIG.timeZone)}</div>
        </div>
        <div className="weather-desc">{descriptionText}</div>
      </div>
    </div>
  );
}
