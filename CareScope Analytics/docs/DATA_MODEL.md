# Deterministic Mock Data Engine & Data Model

CareScope Analytics operates on a deterministic pseudo-random number generator (PRNG) model that ensures complete consistency across renders without requiring an active backend or database.

## PRNG Mechanics

- **Mulberry32 Algorithm**: 32-bit state generator producing uniform pseudo-random floats in `[0, 1)`.
- **String Hashing (`hashStr`)**: Converts arbitrary entity strings (e.g. `PT-1002::timeline`) into 32-bit integer seeds.

## Core Schemas

### Patient Entity (`PATIENT`)
```typescript
interface Patient {
  id: string; // e.g. "PT-1001"
  name: string; // e.g. "Sofia Novak"
  age: number;
  gender: "Male" | "Female";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  primaryCondition: string;
  allergies: string;
  department: string;
  departmentId: string;
  status: "Stable" | "Under observation" | "Recovering" | "Critical";
  admittedDate: string;
  emergencyContact: string;
}
```

### Timeline Event (`TIMELINE_EVENT`)
```typescript
interface TimelineEvent {
  id: string;
  date: string;
  type: "Admission" | "Lab Test" | "Diagnosis" | "Medication" | "Procedure" | "Discharge";
  physician: string;
  note: string;
}
```

### Diagnostic Report (`DIAGNOSTIC_REPORT`)
```typescript
interface DiagnosticReport {
  id: string;
  name: string;
  department: string;
  status: "Normal" | "Attention";
  date: string;
  reportedBy: string;
  summary: string;
  metrics: Array<{
    param: string;
    unit: string;
    value: number;
    range: string;
    flag: "Normal" | "High" | "Low";
  }>;
}
```
