# React + TypeScript Migration (Day 1-2)

This folder is a **Day 1** migration of your original vanilla project:
- `index.html` -> `src/App.tsx` (React renders the same markup)
- `style.css`  -> `src/styles/style.css` (imported by `src/main.tsx`)
- `script.js`  -> `src/legacy/dashboard.ts` (ported to a TS module and bootstrapped by React)

> For Day 1, we keep your original "DOM-based" rendering logic so the app works fast.
> Later, we refactor parts into real React components and state.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Where the code lives

- `src/App.tsx`  
  Renders the UI structure (copied from your original HTML).  
  After first render it calls `bootstrapTrafficDashboard()`.

- `src/legacy/dashboard.ts`  
  Your original logic. We removed `DOMContentLoaded` and turned it into an exported function.

## Next steps (Day 3+ ideas)

1. Convert **one section** into React state (start with Metrics cards)
2. Replace `dom.*` cache with React refs
3. Replace `renderTrafficLists()` with a `TrafficList` component
