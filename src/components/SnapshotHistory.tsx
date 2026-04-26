import React, { useEffect, useState } from "react";
import type { DashboardSnapshotItemDto } from "../types";
import { DashboardSnapshotService } from "../services";

type Props = {
  city?: string | null;
  limit?: number;
  onSelect?: (item: DashboardSnapshotItemDto) => void;
};

export default function SnapshotHistory({ city, limit = 10, onSelect }: Props) {
  const [items, setItems] = useState<DashboardSnapshotItemDto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      if (!city) {
        setItems(null);
        setLoading(false);
        return;
      }
      try {
        const res = await DashboardSnapshotService.fetchTopTenSnapshots(
          city,
          limit,
        );
        if (!mounted) return;
        setItems(res);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to load snapshots");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [city, limit]);

  if (loading)
    return <div className="snapshot-history">Loading snapshots…</div>;
  if (error) return <div className="snapshot-history error">{error}</div>;
  if (!items || items.length === 0)
    return <div className="snapshot-history">No snapshots available.</div>;

  return (
    <div className="snapshot-history">
      <div className="snapshot-list">
        {items.map((it) => (
          <div
            key={it.id}
            className="snapshot-card"
            onClick={() => onSelect?.(it)}
            role="button"
            tabIndex={0}
          >
            <div className="snapshot-header">
              <div className="snapshot-city">{it.city}</div>
              <div className="snapshot-mode">{it.dataMode}</div>
            </div>
            <div className="snapshot-times">
              <div>Generated: {new Date(it.generatedAt).toLocaleString()}</div>
              <div>Captured: {new Date(it.capturedAt).toLocaleString()}</div>
            </div>
            <div className="snapshot-stats">
              <div>Traffic: {it.trafficCount}</div>
              <div>Incidents: {it.incidentCount}</div>
              <div>Avg Speed: {it.metrics?.avgSpeed ?? "—"} km/h</div>
              <div>Commute: {it.metrics?.commuteTime ?? "—"} min</div>
            </div>
            <div className="snapshot-congestion">
              <strong>Congestion</strong>
              <div>
                Good: {it.congestion.good} • Moderate: {it.congestion.moderate}{" "}
                • Heavy: {it.congestion.heavy}
              </div>
            </div>
            {it.weather ? (
              <div className="snapshot-weather">
                <div>{it.weather.description}</div>
                <div>{it.weather.temperature}°</div>
              </div>
            ) : null}
            {it.metrics?.trend ? (
              <div className="snapshot-trend">
                {it.metrics.trend.text} ({it.metrics.trend.dir})
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
