# System Architecture & Technical Design

## 1. Overview

CareScope Analytics is an enterprise-grade Healthcare Analytics SaaS frontend engineered with React 19, Vite, Tailwind CSS, and Recharts. The architecture enforces strict separation of concerns, high performance through intelligent code-splitting, accessible user interactions conforming to WCAG 2.1 AA, and a deterministic synthetic clinical data generation engine.

---

## 2. Directory Structure

```
src/
├── components/
│   ├── common/           # Generic reusable UI primitives (Modal, StatCard, Badge, PulseRule, ErrorBoundary)
│   ├── dashboard/        # Dashboard telemetry, area charts, readmission forecast, occupancy bars
│   ├── layout/           # App navigation shell, responsive sidebar, topbar, mobile nav
│   ├── profile/          # Care coordinator credentials, coverage scope, preference toggles
│   ├── reports/          # Dynamic report builder, multi-type chart renderer, report modal
│   ├── scheduling/       # 7-day responsive clinic schedule matrix, appointment form modal
│   └── timeline/         # Patient clinical summary, longitudinal care timeline, diagnostic reports
├── constants/            # Medical taxonomies, department specs, appointment types, lab parameters
├── context/              # Context providers for global application state and theme
├── hooks/                # Custom React hooks (useLiveVital, useApp, useTheme, useDebounce)
├── pages/                # Lazy-loaded page route components
├── services/             # Deterministic PRNG mock data engine & CSV/JSON export service
├── styles/               # CSS variables, typography, animations, scrollbars
├── App.jsx               # Root shell with error boundaries, suspense, and providers
└── main.jsx              # React DOM mounting
```

---

## 3. Data Flow & State Management

CareScope leverages a layered state architecture:

1. **Deterministic Mock Data Engine (`services/mockDataEngine.js`)**:
   - Uses a seeded PRNG (`mulberry32`) and 32-bit string hashing (`hashStr`) to generate consistent clinical records, physiological parameters, and lab results without requiring an active backend or API keys.
   - Per-patient determinism ensures patient `PT-1002` always displays their unique MRI scans, blood panels, and timeline history.
2. **Application Context (`context/AppContext.jsx`)**:
   - Manages mutable client-side entities such as active appointment bookings, newly generated report records, global search queries, and notification toasts.
3. **Theme Context (`context/ThemeContext.jsx`)**:
   - Manages light/dark color theme preference with synchronized `data-theme` attribute and `localStorage` persistence.

---

## 4. Performance & Rendering Strategy

- **Code Splitting**: All pages are code-split using `React.lazy()` and rendered under `Suspense` fallbacks (`LoadingSkeleton.jsx`).
- **Manual Rollup Chunks**: Configured Rollup `manualChunks` in `vite.config.js` to separate heavy dependencies (`recharts`, `lucide-react`, `react-dom`), keeping the initial bundle under 25KB gzip.
- **Isolated Telemetry Updates**: `VitalCard.jsx` utilizes localized state updates within `useLiveVital` so streaming jitter does not cause re-renders of sibling dashboard cards or navigation components.
- **Computation Memoization**: Complex cohort aggregations and calendar matrix lookups are memoized with `useMemo`.

---

## 5. Accessibility & Design Compliance

- **Semantic HTML**: Strict usage of landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<footer>`).
- **WCAG 2.1 AA Contrast**: All color pairings in both light and dark modes pass minimum 4.5:1 contrast ratios.
- **Focus Management**: Explicit `focus-visible:ring-2` styling on interactive elements and Escape key dismissal on all modal dialogs.
