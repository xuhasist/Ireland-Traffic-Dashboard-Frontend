import type { MetricsPayload } from "../types";
import { CONFIG } from "../legacy/config";

type Props = {
  data: MetricsPayload | null;
  isLoading?: boolean;
};

function healthBand(score: number): "good" | "moderate" | "heavy" {
  if (score >= 70) return "good";
  if (score >= 40) return "moderate";
  return "heavy";
}

export default function Metrics({ data, isLoading }: Props) {
  if (isLoading || !data) return null;

  const footer = data.updatedAt
    ? `Updated ${data.updatedAt}`
    : "Updated --:--:--";
  const avgSpeed = data.avgSpeed != null ? data.avgSpeed.toFixed(0) : "--";
  const avgTravelTime =
    data.commuteTime != null ? data.commuteTime.toFixed(0) : "--";
  const congestedRoads =
    data.congestedRoads != null ? `${data.congestedRoads}` : "--";
  const activeIncidentsFiltered =
    data.activeIncidentsFiltered != null
      ? `${data.activeIncidentsFiltered}`
      : "--";
  const activeIncidents =
    data.activeIncidentsTotal != null ? `${data.activeIncidentsTotal}` : "--";
  const healthScore =
    data.healthScore != null ? data.healthScore.toFixed(0) : "--";
  const avgJam = data.avgJam != null ? data.avgJam.toFixed(1) : "--";
  const progress = data.healthScore ?? 0;
  const band = healthBand(progress);

  return (
    <>
      <div className="metric-top" data-metric="avgSpeed">
        <div className="metric-card">
          <h3>Average Speed</h3>
          <span className="metric-icon">🚗</span>
        </div>
        <div className="value-row">
          <div className="value">
            {avgSpeed} <span className="unit">km/h</span>
          </div>
          <div className={`metric-trend ${data.trend?.dir ?? ""}`}>
            {data.trend?.text ?? ""}
          </div>
        </div>
        <div className="metric-sub"></div>
        <div className="metric-sub footer">{footer}</div>
      </div>
      <div className="metric-top" data-metric="commuteTime">
        <div className="metric-card">
          <h3>Avg Commute Time</h3>
          <span className="metric-icon">⏱️</span>
        </div>
        <div className="value-row">
          <div className="value">
            {avgTravelTime} <span className="unit">min</span>
          </div>
          <div className="metric-trend"></div>
        </div>
        <div className="metric-sub">
          Based on {congestedRoads} congested road(s)
        </div>
        <div className="metric-sub footer">{footer}</div>
      </div>
      <div className="metric-top" data-metric="congestedRoads">
        <div className="metric-card">
          <h3>Congested Roads</h3>
          <span className="metric-icon">🚧</span>
        </div>
        <div className="value-row">
          <div className="value">{congestedRoads}</div>
          <div className="metric-trend"></div>
        </div>
        <div className="metric-sub">
          Jam ≥ {CONFIG.thresholds.moderateMax}/10
        </div>
        <div className="metric-sub footer">{footer}</div>
      </div>
      <div className="metric-top" data-metric="activeIncidents">
        <div className="metric-card">
          <h3>Active Incidents</h3>
          <span className="metric-icon">🚨</span>
        </div>
        <div className="value-row">
          <div className="value">
            {activeIncidentsFiltered}{" "}
            <span className="unit">/ {activeIncidents}</span>
          </div>
          <div className="metric-trend"></div>
        </div>
        <div className="metric-sub">Filtered by type/road</div>
        <div className="metric-sub footer">{footer}</div>
      </div>
      <div className="metric-top" data-metric="healthScore">
        <div className="metric-card">
          <h3>Traffic Health</h3>
          <span className="metric-icon">💚</span>
        </div>
        <div className="value-row">
          <div className="value">
            {healthScore} <span className="unit">/ 100</span>
          </div>
          <div className="metric-trend"></div>
        </div>
        <div className="metric-progress">
          <span
            className={`metric-progress-fill ${band}`}
            style={{ width: `${progress}%` }}
          ></span>
        </div>
        <div className="metric-sub">Avg Jam {avgJam}/10</div>
        <div className="metric-sub footer">{footer}</div>
      </div>
    </>
  );
}
