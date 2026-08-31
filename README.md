# CareScope Analytics — Healthcare Analytics SaaS

[![React](https://img.shields.io/badge/React-19.2-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7.1-CA4245.svg?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Types-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22B5BF.svg)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-0F7C6C.svg)](#-accessibility--wcag-21-aa-compliance)

**CareScope Analytics** is a modern, responsive Healthcare Analytics SaaS platform frontend engineered for hospital administrators, care coordinators, physicians, and patients. It unifies clinical data streams, treatment histories, predictive forecasts, dynamic scheduling, and custom analytics reporting into a cohesive, high-performance web experience.

---

## 🌟 Project Features & Tech Stack Overview

### 1. Technology Stack
- **Core Framework:** React 19 + TypeScript (Strict Typings & JSDoc Declarations)
- **Routing Engine:** React Router v7 with Client-Side File-System Architecture
- **Build Tool:** Vite 8.1 with Rollup Code-Splitting & Manual Vendor Chunking
- **Styling:** Tailwind CSS 4.3 with Dynamic Dark/Light Theme Switching
- **Visualizations:** Recharts 3.10 (Area Charts, Composed Confidence Bands, Bar Charts, Live Sparklines)
- **Icons:** Lucide React (Tree-shakable feather icon system)
- **API Service Layer:** Enveloped HTTP Client Abstraction with Request/Response Interceptors

### 2. Mandatory Features Matrix

| Feature Module | Core Functionality & Specifications | Implementation Status |
|---|---|---|
| **1. Interactive Healthcare Dashboard** | Real-time overview of active patients, 14-day inpatient admissions area trend, department bed occupancy progress bars across 8 hospital wards, upcoming appointments schedule with direct timeline jumps, and live streaming physiological vitals. | ✅ 100% Implemented |
| **2. Treatment Timeline & Diagnostic Reports** | Longitudinal patient care plan with category filtering (Admissions, Consultations, Medications, Surgeries, Lab Tests, Discharges) paired with patient-specific diagnostic reports detailing laboratory reference bounds and abnormality flags. | ✅ 100% Implemented |
| **3. Predictive Analytics Charts (UI Only)** | Readmission risk forecast model comparing historical actuals to AI-forecasted trajectory with 95% confidence interval bands and clinical risk reduction insights. | ✅ 100% Implemented |
| **4. Scheduling & Live Monitoring Widgets** | 7-day responsive clinic schedule matrix with mobile day switcher, appointment booking modal with triage validation, and real-time streaming physiological vital sign monitors (Heart Rate, SpO2, Respiration, Ward Temp). | ✅ 100% Implemented |
| **5. Customizable Healthcare Reports** | Interactive report builder with multi-metric filtering, department scoping, multi-model chart switching (Area, Bar, Line), report catalog, and CSV/JSON/PDF export engines. | ✅ 100% Implemented |

---

## 📋 Installation & Execution Guide

Follow these steps to run CareScope Analytics locally:

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended) or yarn / pnpm

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/AryanUbale7/test2.git
cd test2

# Install dependencies
npm install
```

### 2. Execution & Local Development
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Verification
```bash
# Verify code quality & ESLint (0 errors, 0 warnings)
npm run lint

# Build optimized production bundle with manual code-splitting
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ Environment Configuration

CareScope Analytics supports flexible environment variable configuration. An environment template is provided in [`.env.example`](.env.example).

### Environment Variables Reference

| Variable Name | Type | Default Value | Description |
|---|---|---|---|
| `VITE_APP_TITLE` | String | `CareScope Analytics` | Application window and banner title |
| `VITE_APP_ENV` | String | `production` | Active runtime environment (`development` / `production`) |
| `VITE_API_BASE_URL` | String | `https://api.carescope-analytics.local/v1` | Base endpoint URL for HTTP API Client service |
| `VITE_ENABLE_MOCK_TELEMETRY` | Boolean | `true` | Enables continuous streaming mock vitals |
| `VITE_TELEMETRY_INTERVAL_MS` | Number | `2400` | Telemetry refresh tick interval (milliseconds) |
| `VITE_MAX_PATIENT_RECORDS` | Number | `48` | Cohort size for synthetic deterministic generator |
| `VITE_ENABLE_CONFIDENCE_BANDS` | Boolean | `true` | Enables AI forecast 95% confidence intervals |

To customize your environment:
```bash
cp .env.example .env
```

---

## 🏛️ Architecture & Directory Structure

```
test2/
├── docs/                       # Comprehensive documentation suite
│   ├── ACCESSIBILITY.md        # WCAG 2.1 AA checklist & ARIA guidelines
│   ├── COMPONENTS.md           # Component library reference & API props
│   ├── DATA_MODEL.md           # Deterministic PRNG mock data schema & hash mechanics
│   └── TESTING.md              # Test scenarios, validation matrix & user flows
├── src/
│   ├── api/                    # HTTP Client abstraction & endpoint services
│   │   ├── apiClient.js        # Base fetch client with interceptors & fallback
│   │   ├── appointmentApi.js   # Appointment scheduling API
│   │   ├── patientApi.js       # Patient records & timeline API
│   │   ├── reportApi.js        # Custom reports & analytics API
│   │   └── telemetryApi.js     # Vital signs telemetry stream API
│   ├── components/
│   │   ├── common/             # Accessible UI primitives (StatCard, Modal, Badge, PulseRule, OptimizedImage)
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
│   ├── types/                  # Strict TypeScript declaration files (*.d.ts)
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

- **Semantic Landmarks:** `<header>`, `<nav>`, `<main id="main-content">`, `<aside>`, `<section>`, `<footer>`.
- **Screen Reader Support:** Live region announcements (`aria-live="polite"`), dialog traps (`role="dialog"`, `aria-modal="true"`).
- **Keyboard Navigation:** Full tab order traversal, visible high-contrast focus rings (`focus-visible:ring-2`), Escape key dialog dismissal.
- **Color Contrast:** All light and dark mode color pairings exceed WCAG 2.1 AA 4.5:1 ratio requirement.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
