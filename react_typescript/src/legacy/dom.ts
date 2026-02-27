// ================================
// DOM(Document Object Model) CACHE
// ================================

export type DomCache = {
  cityDropdown: HTMLSelectElement;
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
  dom.cityDropdown = requiredById("cityDropdown", HTMLSelectElement);
}
