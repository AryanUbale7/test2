# Testing & Verification Guide

## Test Scenarios & Verification Matrix

### 1. Interactive Healthcare Dashboard
- [x] KPI Summary cards render accurate patient totals and bed occupancy percentages.
- [x] Live vitals jitter within physiological limits without re-rendering sibling cards.
- [x] Admissions chart switches timeframe between 7-day and 14-day modes.
- [x] Upcoming appointments allow direct jump to patient timeline view.

### 2. Treatment Timeline & Diagnostics
- [x] Patient selector accurately updates demographics and loads patient-specific timeline.
- [x] Timeline events filter by category (Admission, Medication, Diagnostic, etc.).
- [x] Diagnostic report cards expand to reveal full laboratory parameters, reference ranges, and flags.
- [x] CSV export downloads parsed laboratory data.

### 3. Predictive Analytics Charts
- [x] Readmission risk forecast displays actual vs predicted lines with confidence interval toggle.
- [x] AI insight banner displays estimated risk reduction.

### 4. Scheduling & Resource Operations
- [x] 7-day calendar grid displays booked appointments per hour slot.
- [x] Mobile day switcher toggles single-day views cleanly on mobile screens.
- [x] "Book Appointment" form validates input and inserts slot immediately into local state.

### 5. Customizable Healthcare Reports
- [x] Report builder updates chart dynamically when metric or department is altered.
- [x] Generated reports library filters by status (Ready / Needs Review).
- [x] Full report detail modal displays executive summary and exports to CSV / PDF.
