/*
import type {
  IncidentListItem,
  MetricsPayload,
  TrafficListItem,
} from "../types";

type BuildMetricsPayloadInput = {
  traffic: TrafficListItem[];
  incidents: IncidentListItem[];
  filteredIncidentCount: number;
  updatedAt: string;
  previousAvgSpeed: number | null;
  jamThreshold: number;
};

type BuildMetricsPayloadResult = {
  payload: MetricsPayload;
  nextPrevAvgSpeed: number;
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function buildMetricsPayload({
  traffic,
  incidents,
  filteredIncidentCount,
  updatedAt,
  previousAvgSpeed,
  jamThreshold,
}: BuildMetricsPayloadInput): BuildMetricsPayloadResult | null {
  if (!traffic.length) return null;

  const totalSpeed = traffic.reduce(
    (sum, item) => sum + (Number(item.speed) || 0),
    0,
  );
  const avgSpeed = totalSpeed / traffic.length;

  const congestedRoads = traffic.filter(
    (item) => Number(item.jamLevel) >= jamThreshold,
  ).length;

  const avgJam =
    traffic.reduce((sum, item) => sum + (Number(item.jamLevel) || 0), 0) /
    traffic.length;

  const healthScore = clamp(Math.round(100 - avgJam * 10), 0, 100);

  let trend: MetricsPayload["trend"] = null;
  if (Number.isFinite(previousAvgSpeed)) {
    //const previous = previousAvgSpeed ?? 0;
    const diff = avgSpeed - (previousAvgSpeed ?? 0);
    const pct = (previousAvgSpeed ?? 0) === 0 ? 0 : (diff / (previousAvgSpeed ?? 1)) * 100;
    trend = {
      text: `${diff >= 0 ? "▲" : "▼"} ${Math.abs(pct).toFixed(0)}%`,
      dir: diff >= 0 ? "up" : "down",
    };
  }

  return {
    payload: {
      avgSpeed,
      commuteTime: congestedRoads * 5,
      congestedRoads,
      activeIncidentsFiltered: filteredIncidentCount,
      activeIncidentsTotal: incidents.length,
      avgJam,
      healthScore,
      updatedAt,
      jamThreshold,
      trend,
    },
    nextPrevAvgSpeed: avgSpeed,
  };
}
*/
