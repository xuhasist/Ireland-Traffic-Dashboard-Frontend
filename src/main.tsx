import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.css";
import "leaflet/dist/leaflet.css";

// 把 React 掛載到 #root 元素上, 並渲染 App 元件
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
