import ReactDOM from "react-dom/client";
import App from "./App";

// 1) Your original CSS (moved from /style.css)
//    This keeps the UI *looking the same* as the vanilla HTML version.
import "./styles/style.css";

// 2) Leaflet CSS (previously loaded via <link> tag)
//    In Vite, we can import it from the npm package.
import "leaflet/dist/leaflet.css";

// NOTE: We intentionally DO NOT use <React.StrictMode> for Day 1.
// StrictMode runs effects twice in dev mode, which would bootstrap the legacy dashboard twice
// (double event listeners, duplicate intervals, etc). We'll re-enable StrictMode later after
// we refactor the code to be React-native.
// 把 React 掛載到 #root 元素上, 並渲染 App 元件
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
