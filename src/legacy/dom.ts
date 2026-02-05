// ================================
// DOM(Document Object Model) CACHE
// ================================
export const dom: any = {
  loadingOverlay: null,
  container: null,
  // navbar
  navbarTitle: null,
  cityDropdown: null,
  dataModeLabel: null,
  dataModeToggle: null,
  refreshBtn: null,
  autoUpdateBtn: null,
  // weather
  weatherWidget: null,
  // map
  mapEl: null,
  centerMapBtn: null,
  // metrics
  metricCards: null,
  // charts
  speedTrendCanvas: null,
  congestionCanvas: null,
  // traffic
  sortDropdown: null,
  filterBtn: null,
  trafficItemsContainer: null,
  trafficPagination: {
    prevBtn: null,
    nextBtn: null,
    currentPage: null,
    totalPages: null,
  },
  // incidents
  incidentTypeFilter: null,
  incidentRoadSearch: null,
  incidentCountBadge: null,
  incidentItemsContainer: null,
  incidentPagination: {
    prevBtn: null,
    nextBtn: null,
    currentPage: null,
    totalPages: null,
  },
};

export function cacheDom() {
  dom.loadingOverlay = document.querySelector(".loading-overlay");
  dom.container = document.querySelector(".container");

  // navbar
  dom.navbarTitle = document.querySelector(".navbar h1");
  dom.cityDropdown = document.getElementById("cityDropdown");
  dom.dataModeLabel = document.getElementById("dataModeLabel");
  dom.dataModeToggle = document.getElementById("dataModeToggle");
  dom.refreshBtn = document.querySelector(".nav-buttons .btn");
  dom.autoUpdateBtn = document.querySelector(".btn-primary");

  // weather
  dom.weatherWidget = document.getElementById("weatherWidget");

  // map
  dom.mapEl = document.getElementById("map");
  dom.centerMapBtn = document.getElementById("centerMapBtn");

  // charts
  dom.speedTrendCanvas = document.getElementById("speedTrendChart");
  dom.congestionCanvas = document.getElementById("congestionChart");

  // metrics
  dom.metricCards = document.querySelectorAll(".metric-top");

  // traffic
  dom.sortDropdown = document.getElementById("sort-dropdown");
  dom.filterBtn = document.querySelector(".filter-btn");
  dom.trafficItemsContainer = document.querySelector(
    ".traffic-items-container",
  );
  dom.trafficPagination.prevBtn = document.getElementById("trafficPrevPage");
  dom.trafficPagination.nextBtn = document.getElementById("trafficNextPage");
  dom.trafficPagination.currentPage =
    document.getElementById("trafficCurrentPage");
  dom.trafficPagination.totalPages =
    document.getElementById("trafficTotalPages");

  // incidents
  dom.incidentTypeFilter = document.getElementById("incidentTypeFilter");
  dom.incidentRoadSearch = document.getElementById("incidentRoadSearch");
  dom.incidentCountBadge = document.getElementById("incidentCountBadge");
  dom.incidentItemsContainer = document.querySelector(
    ".incident-items-container",
  );
  dom.incidentPagination.prevBtn = document.getElementById("incidentPrevPage");
  dom.incidentPagination.nextBtn = document.getElementById("incidentNextPage");
  dom.incidentPagination.currentPage = document.getElementById(
    "incidentCurrentPage",
  );
  dom.incidentPagination.totalPages =
    document.getElementById("incidentTotalPages");
}
