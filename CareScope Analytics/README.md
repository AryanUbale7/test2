# CareScope Analytics

**A Healthcare Analytics SaaS platform — Phase 1 Hackathon Submission**

CareScope Analytics is a frontend-only healthcare analytics platform that lets hospitals and patients visualize appointments, medical histories, treatment timelines, diagnostic reports, hospital resources, and predictive health insights through interactive dashboards, scheduling tools, and customizable reports — all built on realistic mock medical datasets.

> Frontend implementation only. No backend. All data shown is simulated/mock, generated deterministically at runtime.

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI framework | React (functional components + hooks) |
| Charts | Recharts (Area, Line, Bar) |
| Icons | lucide-react |
| Styling | Tailwind CSS utility classes + scoped custom CSS |
| Fonts | Fraunces (display), Inter (body/UI), IBM Plex Mono (data & numerics) |
| Data | Deterministic mock data engine (seeded PRNG, no backend/API calls) |

---

## Design System

- **Palette:** paper `#F7F9FA`, ink-navy `#0B2545`, clinical teal `#0F7C6C`, clay-amber `#B8752F` (alerts), slate `#5B6B7A`, hairline `#E4E9ED`
- **Typography:** Fraunces serif for headlines (personality, restraint), Inter for UI/body copy, IBM Plex Mono for all numeric/data values (vitals, stats, timestamps)
- **Signature motif — the "pulse rule":** a recurring thin horizontal divider with a heartbeat blip, used across section breaks and the sidebar to tie the whole product back to vitals monitoring
- **Layout:** landing page uses a marketing-style layout with a live mini-dashboard hero preview; app pages use a fixed navy sidebar (bottom tab bar on mobile) + card-based workspace
- **Accessibility:** visible keyboard focus states, `prefers-reduced-motion` respected for pulse animations, responsive down to mobile

---

## Pages & Features

### 1. Landing Page
Marketing entry point introducing the product.
- Hero section with a **live mini-dashboard preview** (not a stock image) as the hero visual
- Feature grid covering all 5 mandatory platform capabilities
- Outcomes/metrics strip (mock adoption stats)
- CTAs routing directly into the live app (`Launch dashboard`, `View patient timeline`)

### 2. Dashboard
The interactive healthcare analytics home screen.
- **KPI summary cards** — total patients, appointments today, avg wait time, bed occupancy
- **Live monitoring widgets** — 4 vitals cards (heart rate, SpO₂, respiratory rate, temperature) that stream and update in real time with sparkline history, simulating live hospital monitoring
- **Admissions insight chart** — 14-day admissions trend (Area chart)
- **Predictive chart (UI only)** — readmission forecast with solid "actual" line transitioning into a dashed "predicted" line
- **Upcoming appointments** — today's schedule at a glance
- **Department bed occupancy** — per-department utilization bars

### 3. Scheduling
Appointment and resource coordination interface.
- **Week-view calendar grid** (7 days × hourly slots) populated with mock appointments
- **Functional "New appointment" form** — add a patient, department, day, and time; it's inserted into the live grid immediately (local state, no backend)
- Week navigation (previous/next/today)
- **Doctors-on-duty panel** with live availability badges

### 4. Reports
Customizable, filterable analytics reporting.
- **Custom report builder** — pick a metric (Admissions, Readmissions, Bed Occupancy %, Avg Wait Time), a department filter, and a chart type (area/bar/line); the chart re-renders live from the same selections
- **Generated reports library** — a grid of report cards (status, department, date)
- **Full report detail modal** — clicking "View report" opens a modal with the complete report: description, status, requester, generation date, and a key-metrics breakdown
- Mock PDF export action

### 5. Timeline
Per-patient treatment history and diagnostics.
- **Patient selector** across the full mock patient roster
- **Structured treatment timeline** — chronological, iconized events (Admission, Lab Test, Diagnosis, Medication, Procedure, Discharge) with notes
- **Diagnostic reports panel** — expandable report cards **unique per patient** (deterministically generated from the patient ID, not shared/duplicated across patients), each with a full lab-metric breakdown (parameter, value, reference range, flag) and reporting physician

### 6. Profile
Care Coordinator account page.
- Profile header with role and department badges
- Coordinator stats — patients coordinated, appointments this month, reports generated, avg response time
- Contact details card (email, phone, location, tenure, languages)
- Assigned departments
- **Notification preferences** — working toggles for email/SMS/weekly digest (local state)
- Recent activity feed

---

## Mock Data Engine

All data is generated client-side using a seeded PRNG (`mulberry32`) so results are consistent across renders, while still varying meaningfully **per entity**:

- Patients, doctors, and departments are generated from name/spec pools
- Appointments are distributed across a full mock week
- Vitals widgets simulate live streaming via `setInterval`-driven jitter within realistic physiological bounds
- **Per-patient uniqueness:** timelines and diagnostic reports are seeded from a hash of the patient's ID (`hashStr`), so every patient in the roster gets distinct events, report types, statuses, and lab values — not a repeated template
- No network calls; API simulation is entirely local

---

## Project Structure

This build ships as a single self-contained React component file:

```
carescope-analytics.jsx   → default-exported <App /> containing all pages,
                             components, mock data generators, and styles
```

To use in a standard React project (Vite/CRA):

1. Ensure dependencies are installed: `react`, `recharts`, `lucide-react`, and Tailwind CSS configured in the project
2. Drop `carescope-analytics.jsx` into `src/` and import/render the default export
3. Ensure the Google Fonts import (Fraunces, Inter, IBM Plex Mono) in the embedded `<style>` block is reachable, or self-host the fonts

---

## Evaluation Alignment

| Rubric area | Where it's addressed |
|---|---|
| User experience & usability | Sidebar/bottom-nav app shell, consistent page patterns, working forms and toggles |
| Visual design & aesthetics | Custom clinical-calm design system, distinctive type pairing, pulse-rule signature motif |
| Responsiveness & accessibility | Mobile bottom nav, responsive grids, focus states, reduced-motion support |
| Information architecture | 6 clearly scoped pages, each mapped to a mandatory feature area |
| Component design & reusability | Shared primitives (`StatCard`, `Badge`, `SectionHeading`, `PageShell`, `PulseRule`, modal) reused across all pages |
| Functionality & interactivity | Live-updating vitals, functional scheduling form, live custom report builder, expandable per-patient diagnostics, working notification toggles |
| Creativity & overall quality | Per-patient deterministic mock data engine, live dashboard preview as hero visual instead of stock imagery |

---

## Disclaimer

This is a **Phase 1 hackathon prototype**. All patient names, vitals, appointments, and reports are synthetically generated mock data. No real medical, patient, or hospital data is used or stored, and there is no backend or persistence layer.
