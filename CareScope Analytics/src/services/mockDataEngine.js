/**
 * @file mockDataEngine.js
 * @description Deterministic PRNG and synthetic healthcare data engine for CareScope Analytics SaaS.
 */

import {
  FIRST_NAMES,
  LAST_NAMES,
  DEPARTMENTS,
  APPT_TYPES,
  DAY_LABELS,
  HOURS,
  MONTHS,
  TIMELINE_EVENT_TYPES,
  LAB_PARAM_POOL,
  REPORT_TITLES,
  REPORT_KPI_POOL,
} from "../constants/medicalConstants";

/**
 * 32-bit integer string hash function
 * @param {string} s - Input string
 * @returns {number} 32-bit positive integer hash
 */
export function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Mulberry32 Seeded Pseudo-Random Number Generator
 * @param {number} seed - Integer seed
 * @returns {() => number} Function returning floats in [0, 1)
 */
export function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const defaultRnd = mulberry32(1337);
const pick = (arr, rnd = defaultRnd) => arr[Math.floor(rnd() * arr.length)];
const range = (n) => Array.from({ length: n }, (_, i) => i);

export const DOCTORS = range(14).map((i) => {
  const dRnd = mulberry32(4000 + i);
  return `Dr. ${pick(LAST_NAMES, dRnd)}`;
});

/**
 * Generates deterministic list of 48 patients
 * @returns {Array<Object>} List of patient objects
 */
export function genPatients() {
  const conditions = [
    "Hypertension",
    "Type 2 Diabetes",
    "Arrhythmia",
    "Asthma",
    "Post-op Recovery",
    "Migraine Chronic",
    "Coronary Artery Disease",
    "Osteoarthritis",
  ];
  const allergies = ["Penicillin", "Sulfa Drugs", "Latex", "NSAIDs", "None Known", "Peanuts"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  return range(48).map((i) => {
    const pRnd = mulberry32(5000 + i);
    const dept = pick(DEPARTMENTS, pRnd);
    return {
      id: `PT-${1000 + i}`,
      name: `${pick(FIRST_NAMES, pRnd)} ${pick(LAST_NAMES, pRnd)}`,
      age: 8 + Math.floor(pRnd() * 78),
      gender: pRnd() > 0.5 ? "Female" : "Male",
      bloodGroup: pick(bloodGroups, pRnd),
      primaryCondition: pick(conditions, pRnd),
      allergies: pick(allergies, pRnd),
      department: dept.name,
      departmentId: dept.id,
      status: pick(["Stable", "Under observation", "Recovering", "Critical"], pRnd),
      admittedDate: `May ${1 + Math.floor(pRnd() * 28)}, 2026`,
      emergencyContact: `+1 (555) ${100 + Math.floor(pRnd() * 899)}-${1000 + Math.floor(pRnd() * 8999)}`,
    };
  });
}

export const PATIENTS = genPatients();

/**
 * Generates week-view appointments for all departments
 * @returns {Array<Object>} List of appointment records
 */
export function genAppointments() {
  const aRnd = mulberry32(777);
  const list = [];
  DAY_LABELS.forEach((day, dIdx) => {
    const count = dIdx < 5 ? 5 + Math.floor(aRnd() * 3) : 1 + Math.floor(aRnd() * 2);
    for (let i = 0; i < count; i++) {
      const hour = pick(HOURS, aRnd);
      const dur = pick([30, 30, 45, 60], aRnd);
      list.push({
        id: `AP-${dIdx}-${i}-${Math.floor(aRnd() * 9999)}`,
        day,
        dayIdx: dIdx,
        hour,
        minute: pick([0, 30], aRnd),
        duration: dur,
        patient: pick(PATIENTS, aRnd).name,
        doctor: pick(DOCTORS, aRnd),
        department: pick(DEPARTMENTS, aRnd).name,
        type: pick(APPT_TYPES, aRnd),
        room: `Room ${100 + Math.floor(aRnd() * 40)}`,
        status: pick(["Confirmed", "Checked In", "Scheduled", "Completed"], aRnd),
      });
    }
  });
  return list.sort((a, b) => a.dayIdx - b.dayIdx || a.hour - b.hour);
}

/**
 * Generates 14-day admissions chart data
 * @returns {Array<{day: string, admissions: number, discharges: number}>}
 */
export function genAdmissions14D() {
  const admRnd = mulberry32(888);
  return range(14).map((i) => ({
    day: `D${i + 1}`,
    admissions: 18 + Math.round(admRnd() * 22 + Math.sin(i / 2) * 6),
    discharges: 14 + Math.round(admRnd() * 18 + Math.cos(i / 2) * 4),
  }));
}

/**
 * Generates readmission risk forecast series (historical actuals + future predicted)
 * @returns {Array<{month: string, actual: number|null, predicted: number|null, upperCI: number|null, lowerCI: number|null}>}
 */
export function genReadmissionSeries() {
  const fcRnd = mulberry32(999);
  const readmitActual = MONTHS.slice(0, 8).map(
    (_, i) => 12 + Math.round(fcRnd() * 4 + Math.sin(i) * 2)
  );

  return MONTHS.map((m, i) => {
    if (i < 8) {
      return {
        month: m,
        actual: readmitActual[i],
        predicted: i === 7 ? readmitActual[7] : null,
        upperCI: null,
        lowerCI: null,
      };
    }
    const last = readmitActual[7];
    const pred = Math.max(6, Math.round(last - (i - 7) * 1.1 + fcRnd() * 2));
    return {
      month: m,
      actual: null,
      predicted: pred,
      upperCI: Math.round(pred + 2.5 + (i - 7) * 0.4),
      lowerCI: Math.max(4, Math.round(pred - 2.5 - (i - 7) * 0.3)),
    };
  });
}

/**
 * Report metric dataset series across months
 */
export const REPORT_METRICS = {
  Admissions: MONTHS.map((_, i) => 60 + Math.round(Math.sin(i) * 15 + defaultRnd() * 25)),
  Readmissions: MONTHS.map((_, i) => 8 + Math.round(Math.cos(i) * 3 + defaultRnd() * 8)),
  "Bed Occupancy %": MONTHS.map((_, i) => 65 + Math.round(Math.sin(i / 2) * 12 + defaultRnd() * 18)),
  "Avg Wait Time (min)": MONTHS.map((_, i) => 14 + Math.round(Math.cos(i / 3) * 6 + defaultRnd() * 15)),
};

/**
 * Generates deterministic treatment timeline events for a given patient
 * @param {string} patientId
 * @returns {Array<Object>} Timeline events
 */
export function genTimeline(patientId) {
  const seedLocal = mulberry32(hashStr(patientId + "::timeline"));
  const p = (arr) => arr[Math.floor(seedLocal() * arr.length)];
  const n = 5 + Math.floor(seedLocal() * 4);
  let d = new Date(2026, 5, 1 + Math.floor(seedLocal() * 10));

  const notePool = [
    "Vitals within normal range, no acute complications noted during morning rounds.",
    "Mild blood pressure elevation flagged for specialist follow-up review.",
    "Lab results consistent with treatment response; continuing current antibiotic protocol.",
    "Patient reported marked improvement in joint mobility and reduced pain score (2/10).",
    "Dosage adjusted based on latest electrolyte and renal clearance panel.",
    "Diagnostic imaging shows significant resolution of previously noted pulmonary infiltrates.",
    "Patient tolerated physical therapy session well with 98% SpO2 maintained on room air.",
  ];

  return range(n).map((i) => {
    d = new Date(d.getTime() + (1 + Math.floor(seedLocal() * 5)) * 86400000);
    const ev = TIMELINE_EVENT_TYPES[
      i === 0 ? 0 : i === n - 1 ? 5 : 1 + Math.floor(seedLocal() * 4)
    ];
    return {
      id: `${patientId}-EV-${i}`,
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      type: ev.type,
      icon: ev.icon,
      color: ev.color,
      physician: `Dr. ${p(LAST_NAMES)}`,
      note: p(notePool),
    };
  });
}

/**
 * Generates deterministic diagnostic reports for a given patient
 * @param {string} patientId
 * @returns {Array<Object>} Diagnostic reports with detailed lab parameters
 */
export function genReports(patientId) {
  const seedLocal = mulberry32(hashStr(patientId + "::reports"));
  const p = (arr) => arr[Math.floor(seedLocal() * arr.length)];

  const reportKinds = [
    { name: "Complete Blood Panel", icon: "FlaskConical", dept: "General Medicine" },
    { name: "MRI — Cranial Scan", icon: "ScanLine", dept: "Neurology" },
    { name: "Chest X-Ray (PA View)", icon: "ScanLine", dept: "Radiology" },
    { name: "Lipid Profile & Athero Index", icon: "FlaskConical", dept: "Cardiology" },
    { name: "12-Lead ECG Summary", icon: "Activity", dept: "Cardiology" },
    { name: "Bone Mineral Density Scan", icon: "ScanLine", dept: "Orthopedics" },
    { name: "Comprehensive Metabolic Panel", icon: "FlaskConical", dept: "General Medicine" },
    { name: "Renal Function Panel", icon: "FlaskConical", dept: "General Medicine" },
  ];

  const shuffled = [...reportKinds].sort(() => seedLocal() - 0.5);
  const count = 3 + Math.floor(seedLocal() * 3);

  return shuffled.slice(0, count).map((k, i) => {
    const flagged = seedLocal() > 0.7;
    const metricsCount = 4 + Math.floor(seedLocal() * 3);

    const metrics = range(metricsCount).map(() => {
      const base = p(LAB_PARAM_POOL);
      const [min, max] = base.range;
      const outOfRange = seedLocal() > 0.78;
      let value = min + (max - min) * seedLocal();
      if (outOfRange) {
        value = seedLocal() > 0.5
          ? max + (max - min) * (0.1 + seedLocal() * 0.4)
          : Math.max(0, min - (max - min) * (0.1 + seedLocal() * 0.4));
      }
      const roundedVal = Math.round(value * 10) / 10;
      return {
        param: base.param,
        unit: base.unit,
        value: roundedVal,
        range: `${min}–${max}`,
        flag: outOfRange ? (roundedVal > max ? "High" : "Low") : "Normal",
      };
    });

    return {
      id: `${patientId}-RPT-${i}`,
      name: k.name,
      department: k.dept,
      status: flagged ? "Attention" : "Normal",
      date: `Jun ${2 + Math.floor(seedLocal() * 26)}, 2026`,
      reportedBy: `Dr. ${p(LAST_NAMES)}`,
      summary: flagged
        ? "One or more markers outside target reference range. Clinical correlation and specialist follow-up recommended."
        : "All evaluated laboratory markers are within physiological reference bounds for patient demographic baseline.",
      metrics,
    };
  });
}

/**
 * Generates generated reports library
 * @returns {Array<Object>} List of clinical and executive reports
 */
export function genReportCards() {
  return REPORT_TITLES.map((title, i) => {
    const s = mulberry32(hashStr(title + "::report-card"));
    const sp = (arr) => arr[Math.floor(s() * arr.length)];
    const flagged = s() > 0.75;
    const kpis = [...REPORT_KPI_POOL]
      .sort(() => s() - 0.5)
      .slice(0, 4)
      .map((k) => ({
        label: k.label,
        value:
          Math.round(
            (k.unit === "%"
              ? 60 + s() * 35
              : k.unit === "days"
                ? 2 + s() * 5
                : k.unit === "/5"
                  ? 3.4 + s() * 1.5
                  : k.unit === ":1"
                    ? 3 + s() * 4
                    : k.unit === "hrs"
                      ? 1 + s() * 6
                      : 80 + s() * 220) * 10
          ) / 10,
        unit: k.unit,
      }));

    return {
      id: i,
      title,
      dept: sp(DEPARTMENTS).name,
      date: `Jun ${2 + Math.floor(s() * 26)}, 2026`,
      period: "Jun 1 – Jun 30, 2026",
      requestedBy: `Dr. ${sp(LAST_NAMES)}`,
      status: flagged ? "Needs review" : "Ready",
      description: flagged
        ? `This ${title.toLowerCase()} shows one or more metrics drifting outside target thresholds for the designated period, flagged for coordinator review prior to leadership distribution.`
        : `This ${title.toLowerCase()} is fully reconciled within verified targets for the period and is prepared for clinical leadership review.`,
      kpis,
    };
  });
}
