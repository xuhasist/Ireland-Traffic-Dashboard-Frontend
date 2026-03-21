import { useCallback, useEffect, useMemo, useState } from "react";
import {
  attachDashboardUpdaters,
  autoUpdateHandler,
  centerMapHandler,
  cityChangeHandler,
  dataModeHandler,
  destroyTrafficDashboard,
  incidentRoadHandler,
  incidentTypeHandler,
  initializeDashboardMap,
  loadPersistedDashboardPreferences,
  nextIncidentPageHandler,
  nextTrafficPageHandler,
  prevIncidentPageHandler,
  prevTrafficPageHandler,
  refreshHandler,
  runDashboardRefresh,
  startDashboardAutoUpdate,
  syncDashboardUiFromState,
  trafficSortHandler,
} from "../legacy";
import type {
  AsyncSectionState,
  ChartsPayload,
  DashboardUpdaters,
  FilterState,
  IncidentPageData,
  IncidentViewState,
  MetricsPayload,
  SortOption,
  TrafficPageData,
  TrafficViewState,
  UiState,
  WeatherData,
} from "../types";

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

export function useTrafficDashboard() {
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
      onTrafficPageData: ({ items, page, totalPages }: TrafficPageData) => {
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

    const guardedUpdaters: DashboardUpdaters = {
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

    attachDashboardUpdaters(guardedUpdaters);

    const initialize = async () => {
      try {
        console.log(
          "Traffic Dashboard Script Loaded: " + new Date().toLocaleString(),
        );
        loadPersistedDashboardPreferences();
        syncDashboardUiFromState();
        guardedUpdaters.onLoadedChange(false);
        initializeDashboardMap();
        await runDashboardRefresh();
        startDashboardAutoUpdate();
        guardedUpdaters.onLoadedChange(true);
      } catch (err) {
        console.error("Traffic dashboard initialization failed:", err);
        guardedUpdaters.onLoadedChange(true);
      }
    };

    initialize();

    return () => {
      alive = false;
      destroyTrafficDashboard();
    };
  }, [dashboardUpdaters]);

  // use useCallback to memorize the function references, 
  // so that we don't re-create the handlers on every render
  const handleTrafficSortChange = useCallback((sortBy: SortOption) => {
    setFilterState((prev) => ({ ...prev, selectedTrafficSort: sortBy }));
    trafficSortHandler(sortBy);
  }, []);

  const handleIncidentTypeChange = useCallback((type: string) => {
    setFilterState((prev) => ({ ...prev, selectedIncidentType: type }));
    incidentTypeHandler(type);
  }, []);

  const handleIncidentRoadChange = useCallback((query: string) => {
    setFilterState((prev) => ({ ...prev, incidentRoadQuery: query }));
    incidentRoadHandler(query);
  }, []);

  return {
    uiState,
    filterState,
    weatherState,
    metricsState,
    chartsState,
    trafficView,
    incidentView,

    actions: {
      onCityChange: cityChangeHandler,
      onDataModeChange: dataModeHandler,
      onRefresh: refreshHandler,
      onToggleAutoUpdate: autoUpdateHandler,
      onCenterMap: centerMapHandler,
      onTrafficSortChange: handleTrafficSortChange,
      onIncidentTypeChange: handleIncidentTypeChange,
      onIncidentRoadChange: handleIncidentRoadChange,
      onPrevTrafficPage: prevTrafficPageHandler,
      onNextTrafficPage: nextTrafficPageHandler,
      onPrevIncidentPage: prevIncidentPageHandler,
      onNextIncidentPage: nextIncidentPageHandler,
    },
  };
}
