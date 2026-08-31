/**
 * @file medical.d.ts
 * @description Strict TypeScript interfaces for CareScope Analytics clinical domain.
 */

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodGroup: string;
  primaryCondition: string;
  allergies: string;
  department: string;
  departmentId: string;
  status: "Stable" | "Under observation" | "Recovering" | "Critical";
  admittedDate: string;
  emergencyContact: string;
}

export interface Department {
  id: string;
  name: string;
  icon: unknown;
  capacity: number;
  baseOccupancy: number;
}

export interface Appointment {
  id: string;
  day: string;
  dayIdx: number;
  hour: number;
  minute: number;
  duration: number;
  patient: string;
  doctor: string;
  department: string;
  type: string;
  room?: string;
  status?: string;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: "Admission" | "Lab Test" | "Diagnosis" | "Medication" | "Procedure" | "Discharge";
  icon?: unknown;
  color?: string;
  physician: string;
  note: string;
}

export interface LabMetric {
  param: string;
  unit: string;
  value: number;
  range: string;
  flag: "Normal" | "High" | "Low";
}

export interface DiagnosticReport {
  id: string;
  name: string;
  department: string;
  status: "Normal" | "Attention";
  date: string;
  reportedBy: string;
  summary: string;
  metrics: LabMetric[];
}

export interface ReportCard {
  id: number;
  title: string;
  dept: string;
  date: string;
  period: string;
  requestedBy: string;
  status: "Ready" | "Needs review";
  description: string;
  kpis: Array<{
    label: string;
    value: number;
    unit: string;
  }>;
}
