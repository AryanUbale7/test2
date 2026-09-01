# CareScope Analytics - Healthcare Analytics SaaS

[![React](https://img.shields.io/badge/React-19.2-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7.1-CA4245.svg?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Types-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22B5BF.svg)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-0F7C6C.svg)](#accessibility--wcag-21-aa-compliance)

**CareScope Analytics** is a modern, responsive Healthcare Analytics SaaS platform frontend engineered for hospitals, doctors, care coordinators, and patients. It provides a centralized healthcare analytics experience with interactive dashboards, longitudinal care timelines, diagnostic reports, predictive AI trend forecasts, scheduling interfaces, real-time live monitoring widgets, and customizable report generation.

---

## 🌟 Project Features & Tech Stack Overview

### Tech Stack Overview
- **Frontend Framework:** React 19 with JSX & TypeScript Strict Typing (`tsconfig.json`)
- **Client Routing Architecture:** React Router v7 (`BrowserRouter`, `Routes`, `Route`, `Navigate`)
- **Build Engine:** Vite 8.1 with Rollup Code Splitting & Manual Vendor Chunking
- **Styling System:** Tailwind CSS 4.3 with Dynamic Dark/Light Theme Switching & WCAG 2.1 AA contrast
- **Visualization Suite:** Recharts 3.10 (Area Charts, Composed Confidence Bands, Bar Charts, Sparklines)
- **Icons & UI:** Lucide React (Tree-shakable iconography)
- **API Abstraction Layer:** Enveloped HTTP Client with request/response interceptors & simulated streaming

### Mandatory Features Matrix

| # | Feature Name | Classification | Core Specifications & Implementation | Status |
|---|---|---|---|---|
| **1** | **Interactive Healthcare Dashboard** | `[ANALYTICS]` | Summary metric cards (Active Patients, Scheduled Consults, Wait Times, Bed Occupancy), 14-day admissions area trend, department bed occupancy across 8 wards, and upcoming appointment schedules. | ✅ **100% Implemented** |
| **2** | **Treatment Timeline & Diagnostic Reports** | `[CRUD]` | Patient treatment history, chronological care timeline with category filters (Admission, Medication, Procedure, Diagnosis, Lab, Discharge), and patient-specific expandable lab panels with reference bounds and flags. | ✅ **100% Implemented** |
| **3** | **Predictive Analytics Charts (UI Only)** | `[ANALYTICS]` | Interactive predictive analytics charts, healthcare trends, 12-month readmission forecast visualizations, 95% confidence interval bands, and clinical AI insight presentations (no backend ML required). | ✅ **100% Implemented** |
| **4** | **Scheduling & Live Monitoring Widgets** | `[REALTIME]` | Interactive 7-day scheduling interface, clinic appointment booking modal, doctor duty rosters, streaming physiological live monitoring widgets (Heart Rate, SpO2, Respiration, Temp), and clinical status indicators. | ✅ **100% Implemented** |
| **5** | **Customizable Healthcare Reports** | `[ANALYTICS]` | Dynamic report builder with metric selection, department scoping, multi-model chart switching (Area, Bar, Line), report catalog archive, and CSV / JSON / PDF export engines. | ✅ **100% Implemented** |

---

## 📋 Installation & Execution Guide

Follow these steps for local installation, development, and production execution:

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)

### 1. Installation
Clone the repository and install all dependencies:
```bash
# Clone repository
git clone https://github.com/AryanUbale7/test2.git
cd test2

# Install project dependencies
npm install
```

### 2. Execution (Development Server)
Launch the local Vite development server:
```bash
# Start development server
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 3. Production Build & Execution
Compile optimized production assets with Rollup manual chunking:
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

### 4. Code Quality & Testing
Run strict ESLint code quality audits and test suites:
```bash
# Run ESLint (0 errors, 0 warnings)
npm run lint

# Run unit tests
npm test
```

---

## ⚙️ Environment Configuration Docs

CareScope Analytics includes a dedicated environment configuration template in [`.env.example`](.env.example).

To configure your local environment:
```bash
cp .env.example .env
```

### Environment Variables Specification

| Variable Name | Type | Default Value | Description |
|---|---|---|---|
| `VITE_APP_TITLE` | `string` | `"CareScope Analytics"` | Application banner and document title |
| `VITE_APP_ENV` | `string` | `"production"` | Runtime environment (`development` / `production`) |
| `VITE_API_BASE_URL` | `string` | `"https://api.carescope-analytics.local/v1"` | Base endpoint for API Client service layer |
| `VITE_ENABLE_MOCK_TELEMETRY` | `boolean` | `"true"` | Enables real-time streaming telemetry widgets |
| `VITE_TELEMETRY_INTERVAL_MS` | `number` | `2400` | Telemetry refresh tick rate (milliseconds) |
| `VITE_MAX_PATIENT_RECORDS` | `number` | `48` | Cohort size for deterministic patient generator |
| `VITE_ENABLE_CONFIDENCE_BANDS` | `boolean` | `"true"` | Displays 95% confidence intervals on predictive charts |

---

## 🏛️ Architecture & Directory Structure

```
test2/
├── docs/                       # In-depth architectural & testing documentation
│   ├── ACCESSIBILITY.md        # WCAG 2.1 AA checklist & ARIA guidelines
│   ├── COMPONENTS.md           # Component library reference & API props
│   ├── DATA_MODEL.md           # Deterministic PRNG mock data schema & hash mechanics
│   └── TESTING.md              # Test scenarios, validation matrix & user flows
├── src/
│   ├── __tests__/              # Automated test suites for scheduling, monitoring, reports
│   ├── api/                    # HTTP Client abstraction & endpoint services
│   │   ├── apiClient.js        # Base fetch client with interceptors & fallback
│   │   ├── appointmentApi.js   # Appointment scheduling API
│   │   ├── patientApi.js       # Patient records & timeline API
│   │   ├── reportApi.js        # Custom reports & analytics API
│   │   ├── telemetryApi.js     # Vital signs telemetry stream API
│   │   └── schedulingAndLiveMonitoringApi.js # Scheduling & Live Monitoring Widgets API
│   ├── components/
│   │   ├── common/             # Accessible UI primitives (StatCard, Modal, Badge, PulseRule, OptimizedImage)
│   │   ├── dashboard/          # Real-time vitals grid, admissions trend, readmission forecast, occupancy
│   │   ├── layout/             # Sidebar, Topbar, MobileNav, PageShell container
│   │   ├── profile/            # Coordinator profile, credentials, coverage, notification settings
│   │   ├── reports/            # Dynamic report builder, report charts, report detail dialogs
│   │   ├── scheduling/         # Scheduling interface, live monitoring widgets, status indicators, calendar
│   │   └── timeline/           # Patient selector, clinical summary, treatment timeline, lab panels
│   ├── constants/              # Medical constants, department pools, navigation configuration
│   ├── context/                # React Contexts (AppProvider, ThemeProvider)
│   ├── hooks/                  # Custom hooks (useLiveVital, useApp, useTheme, useDebounce)
│   ├── pages/                  # Lazy-loaded route views (LandingPage, DashboardPage, Scheduling, Reports, Timeline, Profile)
│   ├── services/               # Deterministic PRNG mock data engine & CSV/JSON export service
│   ├── styles/                 # Global typography, pulse animations, scrollbar & accessibility styles
│   ├── types/                  # Strict TypeScript declaration files (*.d.ts & *.ts)
│   ├── utils/                  # Formatters, date utilities, and form validators
│   ├── App.jsx                 # Root router shell wrapped in ErrorBoundaries & Context Providers
│   └── main.jsx                # Application root entry point
├── .env.example                # Environment configuration template
├── ARCHITECTURE.md             # System architecture & technical design specification
├── CONTRIBUTING.md             # Contribution guidelines & coding standards
├── LICENSE                     # MIT Open-Source License
├── CHANGELOG.md                # Project release version history
├── tsconfig.json               # TypeScript strict configuration
└── vite.config.js              # Vite configuration with Rollup chunking
```

---

## ♿ Accessibility & WCAG 2.1 AA Compliance

- **Semantic HTML Elements:** Strict usage of `<header>`, `<nav>`, `<main id="main-content">`, `<aside>`, `<section>`, and `<footer>`.
- **ARIA Roles & Live Regions:** Real-time vitals announce via `aria-live="polite"` and `role="status"`. Dialogs employ `role="dialog"` with `aria-modal="true"`.
- **Keyboard Navigation:** Full tab ring traversal, visible high-contrast focus rings (`focus-visible:ring-2`), and Escape key dialog dismissal.
- **Form Controls:** 100% of form inputs and selects have explicit `<label htmlFor="...">` associations.
- **Color Contrast:** All light and dark mode color pairings exceed the WCAG 2.1 AA 4.5:1 ratio requirement.

---

## 📄 License & Contributing

- **License:** Open-source under the [MIT License](LICENSE).
- **Contributing:** Please review [CONTRIBUTING.md](CONTRIBUTING.md) for pull request workflows and code style guidelines.
