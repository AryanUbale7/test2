# Component Library & Reference Guide

## Common Primitives (`src/components/common/`)

### `StatCard`
- **Props**: `icon`, `label`, `value`, `delta`, `deltaTone` ('up' | 'down'), `suffix`, `className`
- **Description**: Displays key performance metrics with trend indicators.

### `Modal`
- **Props**: `isOpen`, `onClose`, `title`, `subtitle`, `children`, `maxWidth`
- **Description**: Accessible modal dialog with focus trap and Escape key listener.

### `Badge`
- **Props**: `children`, `tone` ('teal' | 'amber' | 'navy' | 'red' | 'green' | 'purple'), `size` ('sm' | 'md' | 'lg')
- **Description**: Harmonic status indicator tag.

### `PulseRule`
- **Props**: `color`, `opacity`, `height`, `className`
- **Description**: Signature SVG electrocardiogram heartbeat divider.

### `ErrorBoundary`
- **Props**: `children`, `onReset`
- **Description**: Catches component lifecycle and render crashes gracefully.

---

## Dashboard Components (`src/components/dashboard/`)

### `VitalsGrid` & `VitalCard`
- Real-time streaming vitals (Heart Rate, SpO2, Respiration, Temperature) with live sparklines.

### `AdmissionsChart`
- 14-day interactive admissions vs discharge area chart with 7D/14D timeframe controls.

### `PredictiveForecastChart`
- Readmission risk forecast comparing historical actuals to AI projections with 95% confidence intervals.

### `DepartmentOccupancyList`
- Progress bars showing bed utilization across 8 wards with high occupancy (>85%) warning badges.
