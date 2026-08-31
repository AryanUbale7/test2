# CareScope Analytics — Healthcare Analytics SaaS

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC.svg)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22B5BF.svg)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-0F7C6C.svg)](#accessibility)

**CareScope Analytics** is a modern, responsive Healthcare Analytics SaaS platform frontend engineered for hospital administrators, care coordinators, physicians, and patients. It unifies clinical data streams, treatment histories, predictive forecasts, dynamic scheduling, and custom analytics reporting into a cohesive, high-performance web experience.

---

## 🌟 Key Features & Requirements Matrix

| Requirement | Module & Features | Status |
|---|---|---|
| **1. Interactive Healthcare Dashboard** | Summary KPI cards, 14-day admissions area trend, department bed occupancy gauges, today's appointments schedule, and streaming telemetry vitals. | ✅ Fully Implemented |
| **2. Treatment Timeline & Diagnostic Reports** | Longitudinal patient care plan with category filtering (Admissions, Consultations, Medications, Surgeries, Lab Tests, Discharges) + patient-specific diagnostic reports with lab reference bounds and abnormality flags. | ✅ Fully Implemented |
| **3. Predictive Analytics Charts (UI Only)** | Readmission risk forecast model comparing historical actuals to AI-forecasted trajectory with 95% confidence interval bands and clinical risk reduction insights. | ✅ Fully Implemented |
| **4. Scheduling & Live Monitoring Widgets** | 7-day responsive clinic schedule matrix with mobile day switcher, appointment booking modal with triage validation, and real-time streaming physiological vital sign monitors. | ✅ Fully Implemented |
| **5. Customizable Healthcare Reports** | Interactive report builder with multi-metric filtering, department scoping, multi-model chart switching (Area, Bar, Line), report catalog, and CSV/JSON/PDF export engines. | ✅ Fully Implemented |

---

## 🏗️ Architecture & Component Hierarchy

CareScope is engineered with a modular, enterprise-grade directory structure:

```
CareScope Analytics/
├── src/
│   ├── components/
│   │   ├── common/             # Accessible UI primitives (StatCard, Modal, Badge, PulseRule, ErrorBoundary)
│   │   ├── dashboard/          # Real-time vitals grid, admissions trend, readmission forecast, occupancy
│   │   ├── layout/             # Sidebar, Topbar, MobileNav, PageShell container
│   │   ├── profile/            # Coordinator profile, credentials, coverage, notification settings
│   │   ├── reports/            # Dynamic report builder, report charts, report detail dialogs
│   │   ├── scheduling/         # 7-day schedule matrix, appointment booking modal, doctor duty roster
│   │   └── timeline/           # Patient selector, clinical summary, treatment timeline, lab panels
│   ├── constants/              # Medical constants, department pools, navigation configuration
│   ├── context/                # React Contexts (AppProvider, ThemeProvider)
│   ├── hooks/                  # Custom hooks (useLiveVital, useApp, useTheme, useDebounce)
│   ├── pages/                  # Lazy-loaded route views (LandingPage, DashboardPage, Scheduling, Reports, Timeline, Profile)
│   ├── services/               # Deterministic PRNG mock data engine & CSV/JSON export service
│   ├── styles/                 # Global typography, pulse animations, scrollbar & accessibility styles
│   ├── App.jsx                 # Lazy-loaded root shell wrapped in ErrorBoundaries & Context Providers
│   └── main.jsx                # Application root entry point
├── docs/                       # In-depth architectural & testing documentation
│   ├── ACCESSIBILITY.md        # WCAG 2.1 AA checklist & ARIA guidelines
│   ├── COMPONENTS.md           # Component library reference & API props
│   ├── DATA_MODEL.md           # Deterministic PRNG mock data schema & hash mechanics
│   └── TESTING.md              # Test plan, validation matrix & user flows
├── ARCHITECTURE.md             # High-level system design & performance optimizations
├── CONTRIBUTING.md             # Developer workflow & coding guidelines
└── README.md
```

---

## 🎨 Design System

- **Clinical Palette:** 
  - Clinical Teal (`#0F7C6C` / `#5EEAD4`) — primary brand & healing tone
  - Ink Navy (`#0B2545` / `#111C2E`) — structural depth & typographic authority
  - Clay Amber (`#B8752F` / `#FDBA74`) — predictive warnings & alerts
  - Pulse Crimson (`#B33A3A` / `#FCA5A5`) — critical vital thresholds
  - Slate Neutral (`#5B6B7A` / `#8EA1B5`) — secondary copy & metadata
- **Typography:**
  - **Fraunces** (Serif) — Headlines, metrics emphasis, and editorial polish
  - **Inter** (Sans-Serif) — High-legibility UI typography, form controls, and body copy
  - **IBM Plex Mono** (Monospace) — Numerical vitals, lab ranges, and clinical timestamps
- **Signature Motif:**
  - The **Pulse Rule** — an SVG electrocardiogram waveform divider used across sections and sidebars to reinforce live clinical telemetry.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```bash
# Clone the repository
git clone https://github.com/AryanUbale7/test2.git
cd "CareScope Analytics"

# Install project dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Linting
```bash
# Run strict ESLint verification (0 errors, 0 warnings)
npm run lint

# Build optimized production bundle with manual code-splitting
npm run build

# Preview production build locally
npm run preview
```

---

## ⚡ Performance Optimizations

1. **Route-Level Code Splitting:** Every page is dynamically loaded via `React.lazy()` and `Suspense` with bespoke skeleton placeholders.
2. **Vendor Chunking:** Configured Rollup `manualChunks` in `vite.config.js` to isolate `vendor-react`, `vendor-recharts`, and `vendor-icons`, eliminating oversized chunk warnings.
3. **Isolated Vital Ticks:** Streaming telemetry calculations in `useLiveVital` and `VitalCard` run within local component scopes, preventing parent page re-renders.
4. **Memoized Computations:** `useMemo` and `useCallback` prevent redundant array recalculations on patient timeline events and reports.

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Semantic Landmark Elements:** `<header>`, `<nav>`, `<main id="main-content">`, `<aside>`, `<section>`, `<footer>`.
- **ARIA Annotations:** Full `role="dialog"`, `aria-modal="true"`, `aria-live="polite"` for streaming vitals, `role="tablist"` / `role="tab"` navigation.
- **Keyboard Navigation:** Escape key dismisses modals, visible high-contrast focus rings (`focus-visible:ring-2`), skip-to-content links.
- **Accessible Forms:** All inputs and select elements have explicit `<label htmlFor="...">` bindings.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
