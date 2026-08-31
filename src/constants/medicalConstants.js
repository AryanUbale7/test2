import {
  Heart,
  Activity,
  BedDouble,
  Users,
  ScanLine,
  FlaskConical,
  AlertCircle,
  Stethoscope,
  Pill,
  CheckCircle2,
  CalendarCheck,
  FileText,
  ClipboardList,
  MessageSquareText,
} from "lucide-react";

export const FIRST_NAMES = [
  "Aiden", "Sofia", "Mateo", "Layla", "Ethan", "Amara", "Noah", "Zara",
  "Lucas", "Priya", "Mason", "Elena", "Rhys", "Nadia", "Owen", "Farah",
  "Julian", "Ines", "Theo", "Mira", "Kabir", "Yuki", "Diego", "Anya",
  "Farid", "Camille", "Idris", "Saoirse", "Malik", "Tessa",
];

export const LAST_NAMES = [
  "Whitfield", "Novak", "Herrera", "Okafor", "Lindqvist", "Mercer",
  "Kowalski", "Batra", "Sundberg", "Reyes", "Fontaine", "Adeyemi",
  "Sorensen", "Castillo", "Nakamura", "Bergstrom", "Duval", "Okonkwo",
  "Haas", "Petrov",
];

export const DEPARTMENTS = [
  { id: "cardio", name: "Cardiology", icon: Heart, capacity: 40, baseOccupancy: 32 },
  { id: "neuro", name: "Neurology", icon: Activity, capacity: 30, baseOccupancy: 22 },
  { id: "ortho", name: "Orthopedics", icon: BedDouble, capacity: 35, baseOccupancy: 27 },
  { id: "peds", name: "Pediatrics", icon: Users, capacity: 25, baseOccupancy: 18 },
  { id: "radiology", name: "Radiology", icon: ScanLine, capacity: 20, baseOccupancy: 14 },
  { id: "onco", name: "Oncology", icon: FlaskConical, capacity: 28, baseOccupancy: 24 },
  { id: "emergency", name: "Emergency", icon: AlertCircle, capacity: 45, baseOccupancy: 39 },
  { id: "general", name: "General Medicine", icon: Stethoscope, capacity: 50, baseOccupancy: 38 },
];

export const APPT_TYPES = [
  "Consultation",
  "Follow-up",
  "Diagnostic Review",
  "Procedure",
  "Screening",
];

export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const TIMELINE_EVENT_TYPES = [
  { type: "Admission", icon: BedDouble, color: "#0F7C6C" },
  { type: "Lab Test", icon: FlaskConical, color: "#3A6EA5" },
  { type: "Diagnosis", icon: Stethoscope, color: "#0B2545" },
  { type: "Medication", icon: Pill, color: "#B8752F" },
  { type: "Procedure", icon: Activity, color: "#8E44AD" },
  { type: "Discharge", icon: CheckCircle2, color: "#27AE60" },
];

export const LAB_PARAM_POOL = [
  { param: "Hemoglobin", unit: "g/dL", range: [12, 16] },
  { param: "WBC Count", unit: "x10^3/uL", range: [4, 11] },
  { param: "Platelets", unit: "x10^3/uL", range: [150, 400] },
  { param: "Glucose (Fasting)", unit: "mg/dL", range: [70, 100] },
  { param: "Creatinine", unit: "mg/dL", range: [0.6, 1.3] },
  { param: "Sodium", unit: "mmol/L", range: [135, 145] },
  { param: "Potassium", unit: "mmol/L", range: [3.5, 5.0] },
  { param: "LDL Cholesterol", unit: "mg/dL", range: [0, 100] },
  { param: "HDL Cholesterol", unit: "mg/dL", range: [40, 60] },
  { param: "Systolic BP", unit: "mmHg", range: [90, 120] },
  { param: "Resting Heart Rate", unit: "bpm", range: [60, 100] },
];

export const REPORT_TITLES = [
  "Monthly Census Summary",
  "Diagnostic Turnaround",
  "Readmission Breakdown",
  "Resource Utilization",
  "Patient Satisfaction",
  "Billing Reconciliation",
];

export const REPORT_KPI_POOL = [
  { label: "Total admissions", unit: "" },
  { label: "Readmission rate", unit: "%" },
  { label: "Avg length of stay", unit: "days" },
  { label: "Bed turnover rate", unit: "%" },
  { label: "Avg diagnostic turnaround", unit: "hrs" },
  { label: "Patient satisfaction score", unit: "/5" },
  { label: "Staff-to-patient ratio", unit: ":1" },
  { label: "Billing accuracy", unit: "%" },
];

export const ACTIVITY_LOG = [
  {
    icon: CalendarCheck,
    text: "Confirmed 6 appointments for Cardiology",
    time: "2 hours ago",
  },
  {
    icon: FileText,
    text: "Generated Monthly Census Summary report",
    time: "5 hours ago",
  },
  {
    icon: ClipboardList,
    text: "Updated treatment timeline for PT-1014",
    time: "Yesterday",
  },
  {
    icon: MessageSquareText,
    text: "Sent follow-up reminder to 4 patients",
    time: "Yesterday",
  },
  {
    icon: Users,
    text: "Onboarded 2 new patients into Neurology",
    time: "2 days ago",
  },
];
