// 只是「型別說明書」，不是東西本身。它不會幫你產生任何實際的值。
export type DashboardHandle = {
  centerMap: () => void;
  destroy: () => void;
};

// Small helper type for Leaflet coordinates
export type LatLng = { lat: number; lng: number };
