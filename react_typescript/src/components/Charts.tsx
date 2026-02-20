import { useEffect, useRef } from "react";
import { ChartsPayload } from "../legacy/types";
import { Chart } from "chart.js/auto";
import { CONFIG } from "../legacy/config";

type Props = {
  data: ChartsPayload | null;
  isLoading?: boolean;
};

export default function Charts({ data, isLoading }: Props) {
  // useRef can save DOM components,
  // if charts don't exist -> create them,
  // if they exist -> update them
  const speedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const congestionCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const speedChartRef = useRef<Chart | null>(null);
  const congestionChartRef = useRef<Chart | null>(null);

  // Create charts once (when canvases exist), then update when `data` changes.
  // (A) 第一次 mount：建立 chart（只做一次）
  useEffect(() => {
    const speedCanvas = speedCanvasRef.current;
    const congestionCanvas = congestionCanvasRef.current;
    if (!speedCanvas || !congestionCanvas) return;

    // Create instances on first mount.
    if (!speedChartRef.current) {
      speedChartRef.current = new Chart(speedCanvas, {
        type: "line",
        data: {
          // content of the chart
          labels: [], // x-axis labels (time)
          datasets: [
            // one line one dataset, only one line here
            {
              label: "Average Speed (km/h)",
              data: [], // y-axis data points
              borderColor: "#3b82f6", // line color
              backgroundColor: "rgba(59, 130, 246, 0.1)", // fill color under the line
              tension: 0.4,
              fill: true, // fill area under the line
              pointRadius: 4,
              pointHoverRadius: 6, // 滑鼠移過時放大點的半徑
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              // 滑鼠提示
              mode: "index",
              intersect: false,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: 12,
              titleFont: { size: 14, weight: "bold" },
              bodyFont: { size: 13 },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: CONFIG.charts.speedTrendYMax, // e.g., 60 km/h
              ticks: {
                // y軸刻度
                callback: (value) => `${value} km/h`,
              },
              grid: {
                // light grid lines
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    if (!congestionChartRef.current) {
      congestionChartRef.current = new Chart(congestionCanvas, {
        type: "doughnut",
        data: {
          labels: ["Good", "Moderate", "Heavy"],
          datasets: [
            {
              data: [0, 0, 0],
              backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                font: { size: 12 },
              },
            },
          },
        },
      });
    }

    // Cleanup on unmount.
    return () => {
      speedChartRef.current?.destroy();
      speedChartRef.current = null;
      congestionChartRef.current?.destroy();
      congestionChartRef.current = null;
    };
  }, []);

  // Update chart data when payload changes.
  // (B) data 更新：更新 chart（data 變就更新）
  useEffect(() => {
    /* console.log(
      "speed points:",
      data?.speedTrend.data?.length,
      data?.speedTrend,
    ); */
    if (!data) return;

    const speedChart = speedChartRef.current;
    if (speedChart) {
      speedChart.data.labels = data.speedTrend.labels;
      speedChart.data.datasets[0].data = data.speedTrend.data;
      // Keep yMax driven by legacy config (so chart matches your old behavior)
      const yScale = speedChart.options.scales?.y;
      if (yScale && typeof yScale === "object") {
        (yScale as any).max = data.speedTrend.yMax;
      }
      speedChart.update("none");
    }

    const congestionChart = congestionChartRef.current;
    if (congestionChart) {
      congestionChart.data.datasets[0].data = [
        data.congestion.good,
        data.congestion.moderate,
        data.congestion.heavy,
      ];
      congestionChart.update("none");
    }
  }, [data]);

  return (
    <div className="charts-grid">
      <div className="chart-card chart-large">
        <div className="section-header">
          <h2>Traffic Speed Trend (24 Hours)</h2>
          <div className="chart-legend-inline">
            <span
              className="legend-dot"
              style={{ background: "#3b82f6" }}
            ></span>
            <span>Average Speed</span>
          </div>
        </div>
        <canvas ref={speedCanvasRef}></canvas>
      </div>

      <div className="chart-card">
        <div className="section-header">
          <h2>Congestion Distribution</h2>
        </div>
        <canvas ref={congestionCanvasRef}></canvas>
      </div>
    </div>
  );
}
