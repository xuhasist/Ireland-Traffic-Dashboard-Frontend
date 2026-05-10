## 📁 Frontend Project Structure

```
Ireland-Traffic-Dashboard-Frontend
├── src
│   ├── App.tsx         # Main React component that composes the dashboard UI
│   ├── main.tsx        # React application entry point; renders App into the root DOM element
│   ├── components/     # Reusable UI components, such as cards, charts, lists, and controls
│   ├── hooks/          # Custom React hooks for managing dashboard state and user interactions
│   ├── legacy/         # Existing core dashboard logic, including map setup, refresh logic, and data handling
│   ├── mappers/        # Converts backend API responses into frontend-friendly data structures
│   ├── services/       # API client layer for communicating with backend API endpoints
│   ├── styles/         # CSS files for layout, styling, and responsive design
│   └── types/          # TypeScript type definitions for frontend state, API responses, and domain models
└── index.html          # Root HTML file used by Vite; contains the DOM element where React is mounted
```

---

### 1. App.tsx
- `App.tsx` is the main React component responsible for composing the dashboard UI.
- It does not directly fetch data from the backend. Instead, it receives frontend state and user action handlers from the custom hook `hooks/useTrafficDashboard.ts`.
- This helps keep the UI layer separated from the dashboard state management and data-fetching logic.

Main UI sections rendered by `App.tsx` include:
```
Navbar
WeatherWidget
CityDropdown
Live / Mock Toggle
Refresh / Auto Update Button
Metrics
Map
Charts
Traffic List
Incident List
Snapshot History
```
In this structure, `App.tsx` mainly focuses on what should be displayed, while `useTrafficDashboard.ts` handles how the data is managed and updated.

---

### 2. hooks/useTrafficDashboard.ts
- `useTrafficDashboard.ts` is a custom React hook that acts as the bridge between the React UI and the existing dashboard logic.
- It manages the main frontend state, including the selected city, data mode, weather data, traffic metrics, chart data, traffic flow list, incident list, and pagination.

Main responsibilities:
```
1. Creates and manages React state
2. Initializes the dashboard
3. Fetches city configurations from the backend
4. Connects React state with the existing legacy dashboard logic
5. Provides state and action handlers to App.tsx
```

Important frontend state sources include:
```
uiState
filterState
weatherState
metricsState
chartsState
trafficView
incidentView
cities
actions
```
This hook helps centralize the dashboard logic so that App.tsx can stay cleaner and focus mainly on rendering the UI.

---

### 3. services/
- Each service file is responsible for communicating with a specific backend API endpoint.

```
cityConfigService.ts             → /api/city-configs
cityService.ts                   → /api/cities
dashboardChartsService.ts        → /api/dashboard/charts
dashboardService.ts              → /api/dashboard
dashboardSnapshotService.ts      → /api/dashboard-snapshots
dashboardSummaryService.ts       → /api/dashboard/summary
openWeatherService.ts            → /api/weather
tomtomService.ts                 → /api/traffic
```
