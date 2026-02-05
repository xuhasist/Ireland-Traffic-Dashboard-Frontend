// Track listeners so we can cleanly unmount (important for HMR / React remounts)
const __listeners: Array<{
  el: EventTarget;
  type: string;
  fn: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}> = [];

export function on(
  el: EventTarget | null | undefined,
  type: string,
  fn: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) {
  if (!el) return;
  el.addEventListener(type, fn, options);
  __listeners.push({ el, type, fn, options });
}

export function removeAllListeners() {
  for (const l of __listeners.splice(0)) {
    try {
      l.el.removeEventListener(l.type, l.fn, l.options);
    } catch {
      // ignore
    }
  }
}
