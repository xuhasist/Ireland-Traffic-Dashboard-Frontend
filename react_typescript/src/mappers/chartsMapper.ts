import type { ChartsPayload, TrafficListItem } from "../types";

type ChartState = {
  speedTrend: {
    labels: string[];
    data: number[];
  };
  congestion: {
    good: number;
    moderate: number;
    heavy: number;
  };
};

type BuildChartsPayloadInput = {
  traffic: TrafficListItem[];
  previousCharts: ChartState;
  timeLabel: string;
  goodThreshold: number;
  moderateThreshold: number;
  maxPoints: number;
  yMax: number;
};

type BuildChartsPayloadResult = {
  payload: ChartsPayload;
  nextChartsState: ChartState;
};

export function buildChartsPayload({
  traffic,
  previousCharts,
  timeLabel,
  goodThreshold,
  moderateThreshold,
  maxPoints,
  yMax,
}: BuildChartsPayloadInput): BuildChartsPayloadResult | null {
  if (!traffic.length) return null;

  const avgSpeed =
    traffic.reduce((sum, item) => sum + item.speed, 0) / traffic.length;

  const labels = [...previousCharts.speedTrend.labels, timeLabel]; // push to array
  const data = [...previousCharts.speedTrend.data, Number(avgSpeed.toFixed(1))];

  while (labels.length > maxPoints) labels.shift();
  while (data.length > maxPoints) data.shift();

  const good = traffic.filter((item) => item.jamLevel < goodThreshold).length;
  const moderate = traffic.filter(
    (item) =>
      item.jamLevel >= goodThreshold && item.jamLevel < moderateThreshold,
  ).length;
  const heavy = traffic.filter(
    (item) => item.jamLevel >= moderateThreshold,
  ).length;

  const nextChartsState: ChartState = {
    speedTrend: { labels, data },
    congestion: { good, moderate, heavy },
  };

  return {
    payload: {
      speedTrend: {
        labels: [...labels],
        data: [...data],
        yMax,
      },
      congestion: {
        good,
        moderate,
        heavy,
      },
    },
    nextChartsState,
  };
}
