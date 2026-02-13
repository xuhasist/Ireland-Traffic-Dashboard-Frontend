import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config is intentionally minimal for Day 1.
// We'll keep your original DOM-based dashboard logic for now and run it after React renders.
export default defineConfig({
  plugins: [react()],
});
