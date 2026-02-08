// ================================
// DOM(Document Object Model) CACHE
// ================================

type PaginationDom = {
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  currentPage: HTMLSpanElement;
  totalPages: HTMLSpanElement;
};

export type DomCache = {
  loadingOverlay: HTMLDivElement;
  container: HTMLDivElement;
  // navbar
  navbarTitle: HTMLHeadingElement;
  cityDropdown: HTMLSelectElement;
  dataModeLabel: HTMLSpanElement;
  dataModeToggle: HTMLInputElement;
  refreshBtn: HTMLButtonElement;
  autoUpdateBtn: HTMLButtonElement;
  autoUpdateBtnIcon: HTMLSpanElement;
  autoUpdateBtnText: HTMLSpanElement;
  // weather
  weatherWidget: HTMLDivElement;
  weatherWidgetTemp: HTMLDivElement;
  weatherWidgetTime: HTMLDivElement;
  weatherWidgetIcon: HTMLDivElement;
  weatherWidgetDescription: HTMLDivElement;
  // map
  mapEl: HTMLDivElement;
  centerMapBtn: HTMLButtonElement;
  // metrics
  metricCards: NodeListOf<HTMLDivElement>;
  healthCard: HTMLDivElement;
  healthCardBar: HTMLSpanElement;
  // charts
  speedTrendCanvas: HTMLCanvasElement;
  congestionCanvas: HTMLCanvasElement;
  // traffic
  sortDropdown: HTMLSelectElement;
  filterBtn: HTMLButtonElement;
  trafficItemsContainer: HTMLDivElement;
  trafficPagination: PaginationDom;
  // incidents
  incidentTypeFilter: HTMLSelectElement;
  incidentRoadSearch: HTMLInputElement;
  incidentCountBadge: HTMLSpanElement;
  incidentItemsContainer: HTMLDivElement;
  incidentPagination: PaginationDom;
};

function requiredById<T extends HTMLElement>(
  id: string,
  ctor: { new (...args: never[]): T },
): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing required element #${id}`);
  if (!(el instanceof ctor))
    throw new Error(`Element #${id} is not a ${ctor.name}`);
  return el;
}

function requiredQuery<T extends HTMLElement>(
  selector: string,
  ctor: { new (...args: never[]): T },
): T {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Missing required element ${selector}`);
  if (!(el instanceof ctor))
    throw new Error(`Element ${selector} is not a ${ctor.name}`);
  return el;
}

function requiredChild<T extends Element>(
  parent: ParentNode,
  selector: string,
  ctor: { new (...args: never[]): T },
): T {
  const el = parent.querySelector(selector);
  if (!el) throw new Error(`Missing required child '${selector}'`);
  if (!(el instanceof ctor))
    throw new Error(`Child '${selector}' is not a ${ctor.name}`);
  return el;
}

// TS 會把 dom 的型別推斷成 DomCache
export const dom = {} as DomCache;

export function cacheDom() {
  dom.loadingOverlay = requiredQuery(".loading-overlay", HTMLDivElement);
  dom.container = requiredQuery(".container", HTMLDivElement);

  // navbar
  dom.navbarTitle = requiredQuery(".navbar h1", HTMLHeadingElement);
  dom.cityDropdown = requiredById("cityDropdown", HTMLSelectElement);
  dom.dataModeLabel = requiredById("dataModeLabel", HTMLSpanElement);
  dom.dataModeToggle = requiredById("dataModeToggle", HTMLInputElement);
  dom.refreshBtn = requiredQuery(".nav-buttons .btn", HTMLButtonElement);
  dom.autoUpdateBtn = requiredQuery(".btn-primary", HTMLButtonElement);
  dom.autoUpdateBtnIcon = requiredChild(
    dom.autoUpdateBtn,
    ".icon",
    HTMLSpanElement,
  )!;
  dom.autoUpdateBtnText = requiredChild(
    dom.autoUpdateBtn,
    ".text",
    HTMLSpanElement,
  )!;

  // weather
  dom.weatherWidget = requiredById("weatherWidget", HTMLDivElement);
  dom.weatherWidgetTemp = requiredChild(
    dom.weatherWidget,
    ".weather-temp",
    HTMLDivElement,
  )!;
  dom.weatherWidgetTime = requiredChild(
    dom.weatherWidget,
    ".weather-time",
    HTMLDivElement,
  )!;
  dom.weatherWidgetIcon = requiredChild(
    dom.weatherWidget,
    ".weather-icon",
    HTMLDivElement,
  )!;
  dom.weatherWidgetDescription = requiredChild(
    dom.weatherWidget,
    ".weather-desc",
    HTMLDivElement,
  )!;

  // map
  dom.mapEl = requiredById("map", HTMLDivElement);
  dom.centerMapBtn = requiredById("centerMapBtn", HTMLButtonElement);

  // charts
  dom.speedTrendCanvas = requiredById("speedTrendChart", HTMLCanvasElement);
  dom.congestionCanvas = requiredById("congestionChart", HTMLCanvasElement);

  // metrics
  dom.metricCards = document.querySelectorAll<HTMLDivElement>(".metric-top");
  dom.healthCard = requiredQuery(
    '.metric-top[data-metric="healthScore"]',
    HTMLDivElement,
  );
  dom.healthCardBar = requiredChild(
    dom.healthCard,
    ".metric-progress > span",
    HTMLSpanElement,
  );

  // traffic
  dom.sortDropdown = requiredById("sort-dropdown", HTMLSelectElement);
  dom.filterBtn = requiredQuery(".filter-btn", HTMLButtonElement);
  dom.trafficItemsContainer = requiredQuery(
    ".traffic-items-container",
    HTMLDivElement,
  );
  dom.trafficPagination = {
    prevBtn: requiredById("trafficPrevPage", HTMLButtonElement),
    nextBtn: requiredById("trafficNextPage", HTMLButtonElement),
    currentPage: requiredById("trafficCurrentPage", HTMLSpanElement),
    totalPages: requiredById("trafficTotalPages", HTMLSpanElement),
  };

  // incidents
  dom.incidentTypeFilter = requiredById(
    "incidentTypeFilter",
    HTMLSelectElement,
  );
  dom.incidentRoadSearch = requiredById("incidentRoadSearch", HTMLInputElement);
  dom.incidentCountBadge = requiredById("incidentCountBadge", HTMLSpanElement);
  dom.incidentItemsContainer = requiredQuery(
    ".incident-items-container",
    HTMLDivElement,
  );
  // incidents
  dom.incidentPagination = {
    prevBtn: requiredById("incidentPrevPage", HTMLButtonElement),
    nextBtn: requiredById("incidentNextPage", HTMLButtonElement),
    currentPage: requiredById("incidentCurrentPage", HTMLSpanElement),
    totalPages: requiredById("incidentTotalPages", HTMLSpanElement),
  };
}
