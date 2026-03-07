// src/App.tsx 回傳 JSX 元素插進 #root, 就是 React 產生的 UI(DOM) 結構
import { useEffect, useMemo, useState } from "react";
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
  destroyTrafficDashboard,
} from "./legacy/index";
import {
  AsyncSectionState,
  ChartsPayload,
  DashboardUpdaters,
  FilterState,
  IncidentListItem,
  IncidentPageData,
  IncidentViewState,
  MetricsPayload,
  SortOption,
  TrafficListItem,
  TrafficPageData,
  TrafficViewState,
  UiState,
  WeatherData,
} from "./types";
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


const initialUiState: UiState = {
  isLoaded: true,
  isAutoUpdate: true,
  isLiveUpdate: false,
  currentCity: null,
  navbarTitle: "🚦 Traffic Dashboard",
};

const initialFilterState: FilterState = {
  selectedTrafficSort: "worst",
  selectedIncidentType: "all",
  incidentRoadQuery: "",
};

const initialWeatherState: AsyncSectionState<WeatherData> = {
  data: null,
  isLoading: true,
};

const initialMetricsState: AsyncSectionState<MetricsPayload> = {
  data: null,
  isLoading: true,
};

const initialChartsState: AsyncSectionState<ChartsPayload> = {
  data: null,
  isLoading: true,
};

const initialTrafficViewState: TrafficViewState = {
  items: [],
  isLoading: true,
  page: 1,
  totalPages: 1,
};

const initialIncidentViewState: IncidentViewState = {
  count: 0,
  items: [],
  allItems: [],
  isLoading: true,
  page: 1,
  totalPages: 1,
};

export default function App() {
  const [uiState, setUiState] = useState(initialUiState);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [weatherState, setWeatherState] = useState(initialWeatherState);
  const [metricsState, setMetricsState] = useState(initialMetricsState);
  const [chartsState, setChartsState] = useState(initialChartsState);
  const [trafficView, setTrafficView] = useState(initialTrafficViewState);
  const [incidentView, setIncidentView] = useState(initialIncidentViewState);

  // the reason using useMemo is to avoid re-creating the updaters object on every render
  const dashboardUpdaters = useMemo(
    (): DashboardUpdaters => ({
      onLoadedChange: (loaded: boolean) => {
        // only update isLoaded
        setUiState((prev) => ({ ...prev, isLoaded: loaded }));
      },
      onAutoUpdateChange: (isAuto: boolean) => {
        setUiState((prev) => ({ ...prev, isAutoUpdate: isAuto }));
      },
      onLiveUpdateChange: (isLive: boolean) => {
        setUiState((prev) => ({ ...prev, isLiveUpdate: isLive }));
      },
      onNavbarTitle: (title: string) => {
        setUiState((prev) => ({ ...prev, navbarTitle: title }));
      },
      onCityChange: (city: string) => {
        setUiState((prev) => ({ ...prev, currentCity: city }));
      },
      onWeatherData: (data: WeatherData) => {
        setWeatherState({ data, isLoading: false });
      },
      onMetricsData: (data: MetricsPayload) => {
        setMetricsState({ data, isLoading: false });
      },
      onChartsData: (data: ChartsPayload) => {
        setChartsState({ data, isLoading: false });
      },
      onTrafficPageData: ({
        items,
        page,
        totalPages,
      }: TrafficPageData) => {
        setTrafficView({
          items,
          page,
          totalPages,
          isLoading: false,
        });
      },
      onIncidentsCountChange: (count: number) => {
        setIncidentView((prev) => ({ ...prev, count }));
      },
      onIncidentPageData: ({
        items,
        allItems,
        page,
        totalPages,
      }: IncidentPageData) => {
        setIncidentView((prev) => ({
          ...prev,
          items,
          allItems,
          page,
          totalPages,
          isLoading: false,
        }));
      },
    }),
    [],
  );

  useEffect(() => {
    let alive = true;

    const guardedUpdaters = {
      onLoadedChange: (loaded: boolean) => {
        if (!alive) return;
        dashboardUpdaters.onLoadedChange(loaded);
      },
      onAutoUpdateChange: (isAuto: boolean) => {
        if (!alive) return;
        dashboardUpdaters.onAutoUpdateChange(isAuto);
      },
      onLiveUpdateChange: (isLive: boolean) => {
        if (!alive) return;
        dashboardUpdaters.onLiveUpdateChange(isLive);
      },
      onNavbarTitle: (title: string) => {
        if (!alive) return;
        dashboardUpdaters.onNavbarTitle(title);
      },
      onCityChange: (city: string) => {
        if (!alive) return;
        dashboardUpdaters.onCityChange(city);
      },
      onWeatherData: (data: WeatherData) => {
        if (!alive) return;
        dashboardUpdaters.onWeatherData(data);
      },
      onMetricsData: (data: MetricsPayload) => {
        if (!alive) return;
        dashboardUpdaters.onMetricsData(data);
      },
      onChartsData: (data: ChartsPayload) => {
        if (!alive) return;
        dashboardUpdaters.onChartsData(data);
      },
      onTrafficPageData: (payload: TrafficPageData) => {
        if (!alive) return;
        dashboardUpdaters.onTrafficPageData(payload);
      },
      onIncidentsCountChange: (count: number) => {
        if (!alive) return;
        dashboardUpdaters.onIncidentsCountChange(count);
      },
      onIncidentPageData: (payload: IncidentPageData) => {
        if (!alive) return;
        dashboardUpdaters.onIncidentPageData(payload);
      },
    };

    bootstrapTrafficDashboard(guardedUpdaters).catch((err) => {
      console.error("bootstrapTrafficDashboard failed:", err);
    });

    return () => {
      alive = false;
      destroyTrafficDashboard();
    };
  }, [dashboardUpdaters]);

  function handleTrafficSortChange(sortBy: SortOption) {
    setFilterState((prev) => ({ ...prev, selectedTrafficSort: sortBy }));
    trafficSortHandler(sortBy);
  }

  function handleIncidentTypeChange(type: string) {
    setFilterState((prev) => ({ ...prev, selectedIncidentType: type }));
    incidentTypeHandler(type);
  }

  function handleIncidentRoadChange(query: string) {
    setFilterState((prev) => ({ ...prev, incidentRoadQuery: query }));
    incidentRoadHandler(query);
  }

  return (
    <>
      <div className={`loading-overlay ${uiState.isLoaded ? "" : "active"}`}>
        <div className="spinner"></div>
        <p>Loading traffic data...</p>
      </div>

      <nav className="navbar">
        <h1>{uiState.navbarTitle}</h1>

        <div className="navbar-right">
          <WeatherWidget
            data={weatherState.data}
            isLoading={weatherState.isLoading}
          />

          <div className="city-selector">
            <CityDropdown
              currentCity={uiState.currentCity}
              onChange={cityChangeHandler}
            />
          </div>

          <div className="data-toggle">
            <NavToggle
              isLiveUpdate={uiState.isLiveUpdate}
              onChange={dataModeHandler}
            />
          </div>

          <div className="nav-buttons">
            <NavButton
              isAutoUpdate={uiState.isAutoUpdate}
              onRefresh={refreshHandler}
              onToggleAutoUpdate={autoUpdateHandler}
            />
          </div>
        </div>
      </nav>

      <div className={`container ${uiState.isLoaded ? " loaded" : ""}`}>
        <div className="metrics-grid">
          <Metrics
            data={metricsState.data}
            isLoading={metricsState.isLoading}
          />
        </div>

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

        <Charts data={chartsState.data} isLoading={chartsState.isLoading} />

        <div className="traffic-list">
          <div className="traffic-header">
            <h2>Live Traffic Status</h2>
            <div className="traffic-controls">
              <TrafficFilter
                selectedSort={filterState.selectedTrafficSort}
                onChange={handleTrafficSortChange}
              />
            </div>
          </div>
          <div className="traffic-items-container">
            <TrafficItems
              items={trafficView.items}
              isLoading={trafficView.isLoading}
            />
          </div>
          <Pagination
            kind="traffic"
            page={trafficView.page}
            totalPages={trafficView.totalPages}
            disabled={trafficView.isLoading}
            onPrev={prevTrafficPageHandler}
            onNext={nextTrafficPageHandler}
          />
        </div>

        <div className="incidents-section">
          <div className="incidents-header">
            <div className="incidents-title">
              <h2>Active Incidents</h2>
              <span className="count-badge" id="incidentCountBadge">
                {incidentView.count}
              </span>
            </div>
            <div className="incident-controls">
              <IncidentFilter
                incidents={incidentView.allItems}
                selectedType={filterState.selectedIncidentType}
                roadQuery={filterState.incidentRoadQuery}
                onTypeChange={handleIncidentTypeChange}
                onRoadQueryChange={handleIncidentRoadChange}
              />
            </div>
          </div>
          <div className="incident-items-container">
            <IncidentItems
              items={incidentView.items}
              isLoading={incidentView.isLoading}
            />
          </div>
          <Pagination
            kind="incident"
            page={incidentView.page}
            totalPages={incidentView.totalPages}
            disabled={incidentView.isLoading}
            onPrev={prevIncidentPageHandler}
            onNext={nextIncidentPageHandler}
          />
        </div>
      </div>
    </>
  );
}
