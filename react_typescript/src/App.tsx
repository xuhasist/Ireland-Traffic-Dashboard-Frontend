// src/App.tsx 回傳 JSX 元素插進 #root, 就是 React 產生的 UI(DOM) 結構
import { useEffect, useRef, useState } from "react"; // React hook
import {
  bootstrapTrafficDashboard,
  type DashboardHandle,
} from "./legacy/index";
import {
  ChartsPayload,
  IncidentListItem,
  MetricsPayload,
  TrafficListItem,
  WeatherData,
} from "./legacy/types";
import TrafficItems from "./components/TrafficItems";
import IncidentItems from "./components/IncidentItems";
import Pagination from "./components/Pagination";
import WeatherWidget from "./components/WeatherWidget";
import Metrics from "./components/Metrics";
import Charts from "./components/Charts";

/**
 * Day 1 goal:
 * - React renders the SAME HTML structure you had in index.html.
 * - Then we run your existing dashboard logic (ported into TS) which updates the DOM.
 *
 * This "hybrid" approach is very common when migrating a real-world project:
 * you make it work first, then refactor feature-by-feature into React state.
 */
export default function App() {
  // use Ref to hold the dashboard handle across renders (permanent storage)
  // don't use state, because we don't need to re-render when it changes
  const dashRef = useRef<DashboardHandle | null>(null); // initialize with null
  //const [progress, setProgress] = useState(0);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const [metricsData, setMetricsData] = useState<MetricsPayload | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  const [chartsData, setChartsData] = useState<ChartsPayload | null>(null);
  const [chartsLoading, setChartsLoading] = useState(true);

  const [trafficItems, setTrafficItems] = useState<TrafficListItem[]>([]);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [trafficPage, setTrafficPage] = useState(1);
  const [trafficTotalPages, setTrafficTotalPages] = useState(1);

  const [incidentsCount, setIncidentsCount] = useState(0);

  const [incidentItems, setIncidentItems] = useState<IncidentListItem[]>([]);
  const [incidentLoading, setIncidentLoading] = useState(true);
  const [incidentPage, setIncidentPage] = useState(1);
  const [incidentTotalPages, setIncidentTotalPages] = useState(1);

  // 元件第一次 render 完後跑一次, 之後不會因為 state 改變重跑
  useEffect(() => {
    let alive = true;

    /* const onProgressChange = (v: number) => {
      if (!alive) return;
      setProgress(v);
    }; */

    const onWeatherData = (data: WeatherData) => {
      if (!alive) return;
      setWeatherData(data);
      setWeatherLoading(false);
    };

    const onMetricsData = (data: MetricsPayload) => {
      if (!alive) return;
      setMetricsData(data);
      setMetricsLoading(false);
    };

    const onChartsData = (data: ChartsPayload) => {
      if (!alive) return;
      setChartsData(data);
      setChartsLoading(false);
    };

    // 接收端（App） 決定「我用 payload 裡哪些欄位」
    // receiver decides what fields in the payload to use
    const onTrafficPageData = ({
      items,
      page,
      totalPages,
    }: {
      items: TrafficListItem[];
      page: number;
      totalPages: number;
    }) => {
      if (!alive) return;
      // 之後的畫面更新靠這兩行，讓 React 重新 render
      setTrafficItems(items);
      setTrafficPage(page);
      setTrafficTotalPages(totalPages);
      setTrafficLoading(false);
    };

    const onIncidentsCountChange = (count: number) => {
      if (!alive) return;
      setIncidentsCount(count);
    };

    const onIncidentPageData = ({
      items,
      page,
      totalPages,
    }: {
      items: IncidentListItem[];
      page: number;
      totalPages: number;
    }) => {
      if (!alive) return;
      // 之後的畫面更新靠這兩行，讓 React 重新 render
      setIncidentItems(items);
      setIncidentPage(page);
      setIncidentTotalPages(totalPages);
      setIncidentLoading(false);
    };

    // Run after the first render so all #id and .class elements exist.
    // ① effect：做事（訂閱、請求、操作 DOM、啟動東西）
    bootstrapTrafficDashboard({
      //onProgressChange,
      onWeatherData,
      onMetricsData,
      onChartsData,
      onIncidentPageData,
      onIncidentsCountChange,
      onTrafficPageData,
    })
      .then((handle) => {
        // handle is { centerMap, destroy }
        if (!alive) {
          handle.destroy();
          return;
        }
        dashRef.current = handle;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("bootstrapTrafficDashboard failed:", err);
      });

    // ② cleanup：善後（取消、關閉、清理）
    // unmount 時或 effect 重跑前執行
    return () => {
      alive = false;
      dashRef.current?.destroy();
      dashRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Loading traffic data...</p>
      </div>

      <nav className="navbar">
        <h1>🚦 Traffic Dashboard</h1>

        <div className="navbar-right">
          {/*Weather Widget*/}
          <WeatherWidget data={weatherData} isLoading={weatherLoading} />

          <div className="city-selector">
            <span className="time-label">City:</span>
            <select className="time-dropdown" id="cityDropdown"></select>
          </div>

          <div className="data-toggle">
            <span className="toggle-label" id="dataModeLabel">
              Mock Data
            </span>
            <label className="switch" title="Toggle Live API / Mock Data">
              <input type="checkbox" id="dataModeToggle" />
              <span className="slider"></span>
            </label>
          </div>

          <div className="time-selector">
            <span className="time-label">View:</span>
            <select className="time-dropdown" id="timeDropdown">
              <option>Live (Now)</option>
              <option>1 Hour Ago</option>
              <option>Today Morning (8 AM)</option>
              <option>Yesterday</option>
            </select>
          </div>

          <div className="nav-buttons">
            <button className="btn">
              <span className="icon">🔄</span>
              <span className="text">Refresh</span>
            </button>
            <button className="btn btn-primary">
              <span className="icon">⏸️</span>
              <span className="text">Stop Auto-Update</span>
            </button>
          </div>
        </div>
      </nav>

      {/*Main Container*/}
      {/*
            NOTE:
            Your original CSS sets `.container { opacity: 0 }` and only shows it
            after JS adds `.loaded`.
            If the legacy bootstrap crashes, the container stays invisible and
            the page *looks* blank.
            We pre-add `loaded` so you always see the skeleton.
          */}
      <div className="container">
        {/*Metrics Grid*/}
        <div className="metrics-grid">
          <Metrics data={metricsData} isLoading={metricsLoading} />
        </div>

        {/*Map Section*/}
        <div className="map-section">
          <div className="section-header">
            <h2>Live Traffic Map</h2>
            <div className="map-controls">
              <button
                className="map-btn"
                id="centerMapBtn"
                onClick={() => dashRef.current?.centerMap()}
                title="Center"
              >
                <span>📍</span>
              </button>
            </div>
          </div>
          <div id="map" className="map-container">
            {/*<div className="map-placeholder">🗺️ Interactive Map (Coming Soon)</div>*/}
          </div>
          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-color good"></span>
              <span>Good (0-4)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color moderate"></span>
              <span>Moderate (4-7)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color heavy"></span>
              <span>Heavy (7-10)</span>
            </div>
          </div>
        </div>

        {/*Charts Grid*/}
        <Charts data={chartsData} isLoading={chartsLoading} />

        {/*Traffic List*/}
        <div className="traffic-list">
          <div className="traffic-header">
            <h2>Live Traffic Status</h2>
            <div className="traffic-controls">
              <select id="sort-dropdown" className="sort-dropdown">
                <option value="worst">Worst First</option>
                <option value="best">Best First</option>
                <option value="alphabetical">A-Z</option>
              </select>
              <button className="filter-btn">
                <span className="filter-icon">🔍</span>
                Sort
              </button>
            </div>
          </div>
          <div className="traffic-items-container">
            <TrafficItems items={trafficItems} isLoading={trafficLoading} />
          </div>
          <Pagination
            kind="traffic"
            page={trafficPage}
            totalPages={trafficTotalPages}
            disabled={trafficLoading}
            onPrev={() => dashRef.current?.prevTrafficPage()}
            onNext={() => dashRef.current?.nextTrafficPage()}
          />
        </div>
        {/*traffic-list end*/}

        {/*Incidents Section*/}
        <div className="incidents-section">
          <div className="incidents-header">
            <div className="incidents-title">
              <h2>Active Incidents</h2>
              <span className="count-badge" id="incidentCountBadge">
                {incidentsCount}
              </span>
            </div>
            <div className="incident-controls">
              <select
                id="incidentTypeFilter"
                className="sort-dropdown"
              ></select>
              <input
                id="incidentRoadSearch"
                className="text-input"
                type="text"
                placeholder="Search road name…"
                aria-label="Search incident road name"
              />
            </div>
          </div>
          <div className="incident-items-container">
            <IncidentItems items={incidentItems} isLoading={incidentLoading} />
          </div>
          <Pagination
            kind="incident"
            page={incidentPage}
            totalPages={incidentTotalPages}
            disabled={incidentLoading}
            onPrev={() => dashRef.current?.prevIncidentPage()}
            onNext={() => dashRef.current?.nextIncidentPage()}
          />
        </div>
        {/*incidents-section end*/}
      </div>
    </>
  );
}
