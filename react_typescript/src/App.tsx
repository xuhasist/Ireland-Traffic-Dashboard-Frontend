// src/App.tsx 回傳 JSX 元素插進 #root, 就是 React 產生的 UI(DOM) 結構
import { useEffect, useRef, useState } from "react";
import {
  autoUpdateHandler,
  bootstrapTrafficDashboard,
  centerMapHandler,
  cityChangeHandler,
  dataModeHandler,
  incidentRoadHandler,
  incidentTypeHandler,
  nextIncidentPageHandler,
  nextTrafficPageHandler,
  prevIncidentPageHandler,
  prevTrafficPageHandler,
  refreshHandler,
  trafficSortHandler,
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
import MapButton from "./components/MapButton";
import NavButton from "./components/NavButton";
import NavToggle from "./components/NavToggle";
import CityDropdown from "./components/CityDropdown";

export default function App() {
  // use Ref to hold the dashboard handle across renders (permanent storage)
  // don't use state, because we don't need to re-render when it changes
  const dashRef = useRef<DashboardHandle | null>(null);

  const [isLoaded, setIsLoaded] = useState(true);
  const [isAutoUpdate, setIsAutoUpdate] = useState(true);
  const [isLiveUpdate, setIsLiveUpdate] = useState(false);
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [navbarTitle, setNavbarTitle] = useState("🚦 Traffic Dashboard");

  const [selectedTrafficSort, setSelectedTrafficSort] = useState<
    "worst" | "best" | "alphabetical"
  >("worst");
  const [selectedIncidentType, setSelectedIncidentType] = useState("all");
  const [incidentRoadQuery, setIncidentRoadQuery] = useState("");

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

    // Run after the first render so all #id and .class elements exist.
    // ① effect：做事（訂閱、請求、操作 DOM、啟動東西）
    bootstrapTrafficDashboard({
      // 接收端（App）決定「我用 payload 裡哪些欄位」
      // receiver decides what fields in the payload to use
      onLoadedChange: (loaded) => {
        if (!alive) return;
        // 之後的畫面更新靠這行，讓 React 重新 render
        setIsLoaded(loaded);
      },
      onAutoUpdateChange: (isAuto) => {
        if (!alive) return;
        setIsAutoUpdate(isAuto);
      },
      onLiveUpdateChange: (isLive) => {
        if (!alive) return;
        setIsLiveUpdate(isLive);
      },
      onNavbarTitle: (title) => {
        if (!alive) return;
        setNavbarTitle(title);
      },
      onCityChange: (city) => {
        if (!alive) return;
        setCurrentCity(city);
      },
      onWeatherData: (data) => {
        if (!alive) return;
        setWeatherData(data);
        setWeatherLoading(false);
      },
      onMetricsData: (data) => {
        if (!alive) return;
        setMetricsData(data);
        setMetricsLoading(false);
      },
      onChartsData: (data) => {
        if (!alive) return;
        setChartsData(data);
        setChartsLoading(false);
      },
      onTrafficPageData: ({ items, page, totalPages }) => {
        if (!alive) return;
        setTrafficItems(items);
        setTrafficPage(page);
        setTrafficTotalPages(totalPages);
        setTrafficLoading(false);
      },
      onIncidentsCountChange: (count) => {
        if (!alive) return;
        setIncidentsCount(count);
      },
      onIncidentPageData: ({ items, allItems, page, totalPages }) => {
        if (!alive) return;
        setIncidentItems(items);
        setIncidentAll(allItems);
        setIncidentPage(page);
        setIncidentTotalPages(totalPages);
        setIncidentLoading(false);
      },
    })
      .then((handle) => {
        if (!alive) {
          handle.destroy();
          return;
        }
        dashRef.current = handle;
      })
      .catch((err) => {
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

  function handleTrafficSortChange(sortBy: "worst" | "best" | "alphabetical") {
    setSelectedTrafficSort(sortBy);
    trafficSortHandler(sortBy);
  }

  function handleIncidentTypeChange(type: string) {
    setSelectedIncidentType(type);
    incidentTypeHandler(type);
  }

  function handleIncidentRoadChange(query: string) {
    setIncidentRoadQuery(query);
    incidentRoadHandler(query);
  }

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
            <CityDropdown
              currentCity={currentCity}
              onChange={cityChangeHandler}
            />
          </div>

          <div className="data-toggle">
            <NavToggle isLiveUpdate={isLiveUpdate} onChange={dataModeHandler} />
          </div>

          <div className="nav-buttons">
            <NavButton
              isAutoUpdate={isAutoUpdate}
              onRefresh={refreshHandler}
              onToggleAutoUpdate={autoUpdateHandler}
            />
          </div>
        </div>
      </nav>

      {/*Main Container*/}
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
              <MapButton onCenterMap={centerMapHandler} />
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
              <TrafficFilter
                selectedSort={selectedTrafficSort}
                onChange={handleTrafficSortChange}
              />
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
            onPrev={prevTrafficPageHandler}
            onNext={nextTrafficPageHandler}
          />
        </div>

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
              <IncidentFilter
                incidents={incidentAll}
                selectedType={selectedIncidentType}
                roadQuery={incidentRoadQuery}
                onTypeChange={handleIncidentTypeChange}
                onRoadQueryChange={handleIncidentRoadChange}
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
            onPrev={prevIncidentPageHandler}
            onNext={nextIncidentPageHandler}
          />
        </div>
      </div>
    </>
  );
}
