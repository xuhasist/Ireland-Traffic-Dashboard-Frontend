// ================================
// DOM(Document Object Model) CACHE
// ================================

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

  // map
  mapEl: HTMLDivElement;
  centerMapBtn: HTMLButtonElement;

  // charts
  speedTrendCanvas: HTMLCanvasElement;
  congestionCanvas: HTMLCanvasElement;
  // traffic
  sortDropdown: HTMLSelectElement;
  filterBtn: HTMLButtonElement;
  trafficItemsContainer: HTMLDivElement;

  // incidents
  incidentTypeFilter: HTMLSelectElement;
  incidentRoadSearch: HTMLInputElement;
  incidentCountBadge: HTMLSpanElement;
  incidentItemsContainer: HTMLDivElement;
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

  // map
  dom.mapEl = requiredById("map", HTMLDivElement);
  dom.centerMapBtn = requiredById("centerMapBtn", HTMLButtonElement);

  // charts
  dom.speedTrendCanvas = requiredById("speedTrendChart", HTMLCanvasElement);
  dom.congestionCanvas = requiredById("congestionChart", HTMLCanvasElement);

  // traffic
  dom.sortDropdown = requiredById("sort-dropdown", HTMLSelectElement);
  dom.filterBtn = requiredQuery(".filter-btn", HTMLButtonElement);
  dom.trafficItemsContainer = requiredQuery(
    ".traffic-items-container",
    HTMLDivElement,
  );

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
}
