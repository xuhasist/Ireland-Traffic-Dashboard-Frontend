// App.tsx 盡量只負責組畫面，資料準備都交給 hook
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
import { useTrafficDashboard } from "./hooks/useTrafficDashboard";
import LoadingOverlay from "./components/LoadingOverlay";
import MapLegend from "./components/MapLegend";
import SnapshotHistory from "./components/SnapshotHistory";

export default function App() {
  const {
    uiState,
    filterState,
    weatherState,
    metricsState,
    chartsState,
    trafficView,
    incidentView,
    cities,
    actions,
  } = useTrafficDashboard();

  return (
    <>
      <LoadingOverlay isLoaded={uiState.isLoaded} />

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
              onChange={actions.onCityChange}
              cities={cities}
            />
          </div>

          <div className="data-toggle">
            <NavToggle
              isLiveUpdate={uiState.isLiveUpdate}
              onChange={actions.onDataModeChange}
            />
          </div>

          <div className="nav-buttons">
            <NavButton
              isAutoUpdate={uiState.isAutoUpdate}
              onRefresh={actions.onRefresh}
              onToggleAutoUpdate={actions.onToggleAutoUpdate}
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
              <MapButton onCenterMap={actions.onCenterMap} />
            </div>
          </div>
          <div id="map" className="map-container"></div>
          <MapLegend />
        </div>

        <Charts data={chartsState.data} isLoading={chartsState.isLoading} />

        <div className="traffic-list">
          <div className="traffic-header">
            <h2>Live Traffic Status</h2>
            <div className="traffic-controls">
              <TrafficFilter
                selectedSort={filterState.selectedTrafficSort}
                onChange={actions.onTrafficSortChange}
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
            onPrev={actions.onPrevTrafficPage}
            onNext={actions.onNextTrafficPage}
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
                onTypeChange={actions.onIncidentTypeChange}
                onRoadQueryChange={actions.onIncidentRoadChange}
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
            onPrev={actions.onPrevIncidentPage}
            onNext={actions.onNextIncidentPage}
          />
        </div>
        <aside className="snapshot-drawer" aria-label="Snapshot history panel">
          <div className="snapshot-drawer-tab">Snapshots</div>

          <div className="snapshot-panel">
            <div className="snapshot-panel-header">
              <h2>Snapshot History</h2>
              <span className="snapshot-panel-city">
                {uiState.currentCity ?? "—"}
              </span>
            </div>

            <SnapshotHistory
              city={uiState.currentCity}
              limit={10}
              onSelect={(item) => {
                console.log("Selected snapshot:", item);
              }}
            />
          </div>
        </aside>
      </div>
    </>
  );
}
