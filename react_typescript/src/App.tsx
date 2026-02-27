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
import TrafficFilter from "./components/TrafficFilter";
import IncidentItems from "./components/IncidentItems";
import IncidentFilter from "./components/IncidentFilter";
import Pagination from "./components/Pagination";
import WeatherWidget from "./components/WeatherWidget";
import Metrics from "./components/Metrics";
import Charts from "./components/Charts";
import { state } from "./legacy/state";
import MapButton from "./components/MapButton";
import NavButton from "./components/NavButton";
import NavToggle from "./components/NavToggle";
import CityDropdown from "./components/CityDropdown";

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

  const [isLoaded, setIsLoaded] = useState(true);
  const [isAutoUpdate, setIsAutoUpdate] = useState(true);
  const [isLiveUpdate, setIsLiveUpdate] = useState(false);

  const [currentCity, setCurrentCity] = useState<string | null>(null);

  const [navbarTitle, setNavbarTitle] = useState("🚦 Traffic Dashboard");

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
  const [incidentAll, setIncidentAll] = useState<IncidentListItem[]>([]);
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

    const onLoadedChange = (isLoaded: boolean) => {
      if (!alive) return;
      setIsLoaded(isLoaded);
    };

    const onAutoUpdateChange = (isAuto: boolean) => {
      if (!alive) return;
      setIsAutoUpdate(isAuto);
    };

    const onLiveUpdateChange = (isLive: boolean) => {
      if (!alive) return;
      setIsLiveUpdate(isLive);
    };

    const onNavbarTitle = (title: string) => {
      if (!alive) return;
      setNavbarTitle(title);
    };

    const onCityChange = (city: string) => {
      if (!alive) return;
      setCurrentCity(city);
    };

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
      setIncidentAll((state.incidents.data ?? []) as IncidentListItem[]);
      setIncidentPage(page);
      setIncidentTotalPages(totalPages);
      setIncidentLoading(false);
    };

    // Run after the first render so all #id and .class elements exist.
    // ① effect：做事（訂閱、請求、操作 DOM、啟動東西）
    bootstrapTrafficDashboard({
      //onProgressChange,
      onLoadedChange,
      onAutoUpdateChange,
      onLiveUpdateChange,
      onNavbarTitle,
      onCityChange,
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
      <div className={`loading-overlay ${isLoaded ? "" : "active"}`}>
        <div className="spinner"></div>
        <p>Loading traffic data...</p>
      </div>

      <nav className="navbar">
        <h1>{navbarTitle}</h1>

        <div className="navbar-right">
          {/*Weather Widget*/}
          <WeatherWidget data={weatherData} isLoading={weatherLoading} />

          <div className="city-selector">
            <CityDropdown currentCity={currentCity} />
          </div>

          <div className="data-toggle">
            <NavToggle isLiveUpdate={isLiveUpdate} />
          </div>

          <div className="nav-buttons">
            <NavButton isAutoUpdate={isAutoUpdate} />
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
      <div className={`container ${isLoaded ? " loaded" : ""}`}>
        {/*Metrics Grid*/}
        <div className="metrics-grid">
          <Metrics data={metricsData} isLoading={metricsLoading} />
        </div>

        {/*Map Section*/}
        <div className="map-section">
          <div className="section-header">
            <h2>Live Traffic Map</h2>
            <div className="map-controls">
              <MapButton onCenterMap={() => dashRef.current?.centerMap()} />
            </div>
          </div>
          <div id="map" className="map-container"></div>
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
              <TrafficFilter />
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
              <IncidentFilter incidents={incidentAll} />
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
