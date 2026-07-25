import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Activity,
  Calendar,
  FileText,
  Users,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  Bell,
  Search,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Filter,
  Download,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  Heart,
  Wind,
  Thermometer,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  User,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Menu,
  Droplets,
  FlaskConical,
  ScanLine,
  Pill,
  BedDouble,
  Home,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Briefcase,
  Globe2,
  CalendarCheck,
  MessageSquareText,
  Moon,
  Sun,
} from "lucide-react";

/* ============================== MOCK DATA ENGINE ============================== */

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(1337);
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const range = (n) => Array.from({ length: n }, (_, i) => i);

const FIRST_NAMES = [
  "Aiden",
  "Sofia",
  "Mateo",
  "Layla",
  "Ethan",
  "Amara",
  "Noah",
  "Zara",
  "Lucas",
  "Priya",
  "Mason",
  "Elena",
  "Rhys",
  "Nadia",
  "Owen",
  "Farah",
  "Julian",
  "Ines",
  "Theo",
  "Mira",
  "Kabir",
  "Yuki",
  "Diego",
  "Anya",
  "Farid",
  "Camille",
  "Idris",
  "Saoirse",
  "Malik",
  "Tessa",
];
const LAST_NAMES = [
  "Whitfield",
  "Novak",
  "Herrera",
  "Okafor",
  "Lindqvist",
  "Mercer",
  "Kowalski",
  "Batra",
  "Sundberg",
  "Reyes",
  "Fontaine",
  "Adeyemi",
  "Sorensen",
  "Castillo",
  "Nakamura",
  "Bergstrom",
  "Duval",
  "Okonkwo",
  "Haas",
  "Petrov",
];
const fullName = () => `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;

const DEPARTMENTS = [
  { id: "cardio", name: "Cardiology", icon: Heart, capacity: 40 },
  { id: "neuro", name: "Neurology", icon: Activity, capacity: 30 },
  { id: "ortho", name: "Orthopedics", icon: BedDouble, capacity: 35 },
  { id: "peds", name: "Pediatrics", icon: Users, capacity: 25 },
  { id: "radiology", name: "Radiology", icon: ScanLine, capacity: 20 },
  { id: "onco", name: "Oncology", icon: FlaskConical, capacity: 28 },
  { id: "emergency", name: "Emergency", icon: AlertCircle, capacity: 45 },
  { id: "general", name: "General Medicine", icon: Stethoscope, capacity: 50 },
].map((d) => ({
  ...d,
  occupied: Math.round(d.capacity * (0.45 + rnd() * 0.5)),
}));

const DOCTORS = range(14).map(() => `Dr. ${pick(LAST_NAMES)}`);

const PATIENTS = range(48).map((i) => ({
  id: `PT-${1000 + i}`,
  name: fullName(),
  age: 8 + Math.floor(rnd() * 78),
  department: pick(DEPARTMENTS).name,
  status: pick(["Stable", "Under observation", "Recovering", "Critical"]),
}));

const APPT_TYPES = [
  "Consultation",
  "Follow-up",
  "Diagnostic Review",
  "Procedure",
  "Screening",
];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = range(10).map((i) => 8 + i); // 8am - 5pm start slots

function genAppointments() {
  const list = [];
  DAY_LABELS.forEach((day, dIdx) => {
    const count =
      dIdx < 5 ? 5 + Math.floor(rnd() * 3) : 1 + Math.floor(rnd() * 2);
    for (let i = 0; i < count; i++) {
      const hour = pick(HOURS);
      const dur = pick([30, 30, 60]);
      list.push({
        id: `AP-${dIdx}-${i}-${Math.floor(rnd() * 9999)}`,
        day,
        dayIdx: dIdx,
        hour,
        minute: pick([0, 30]),
        duration: dur,
        patient: pick(PATIENTS).name,
        doctor: pick(DOCTORS),
        department: pick(DEPARTMENTS).name,
        type: pick(APPT_TYPES),
      });
    }
  });
  return list.sort((a, b) => a.dayIdx - b.dayIdx || a.hour - b.hour);
}

const ADMISSIONS_14D = range(14).map((i) => ({
  day: `D${i + 1}`,
  admissions: 18 + Math.round(rnd() * 22 + Math.sin(i / 2) * 6),
}));

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const READMIT_ACTUAL = MONTHS.slice(0, 8).map(
  (m, i) => 12 + Math.round(rnd() * 4 + Math.sin(i) * 2),
);
const readmitSeries = MONTHS.map((m, i) => {
  if (i < 8)
    return {
      month: m,
      actual: READMIT_ACTUAL[i],
      predicted: i === 7 ? READMIT_ACTUAL[7] : null,
    };
  const last = READMIT_ACTUAL[7];
  return {
    month: m,
    actual: null,
    predicted: Math.max(6, Math.round(last - (i - 7) * 1.1 + rnd() * 2)),
  };
});

const REPORT_METRICS = {
  Admissions: MONTHS.map((m) => 60 + Math.round(rnd() * 40)),
  Readmissions: MONTHS.map((m) => 8 + Math.round(rnd() * 12)),
  "Bed Occupancy %": MONTHS.map((m) => 55 + Math.round(rnd() * 35)),
  "Avg Wait Time (min)": MONTHS.map((m) => 12 + Math.round(rnd() * 25)),
};

const TIMELINE_EVENT_TYPES = [
  { type: "Admission", icon: BedDouble },
  { type: "Lab Test", icon: FlaskConical },
  { type: "Diagnosis", icon: Stethoscope },
  { type: "Medication", icon: Pill },
  { type: "Procedure", icon: Activity },
  { type: "Discharge", icon: CheckCircle2 },
];
function genTimeline(patientId) {
  const seedLocal = mulberry32(hashStr(patientId + "::timeline"));
  const p = (arr) => arr[Math.floor(seedLocal() * arr.length)];
  const n = 5 + Math.floor(seedLocal() * 4);
  let d = new Date(2026, 5, 1 + Math.floor(seedLocal() * 10));
  return range(n).map((i) => {
    d = new Date(d.getTime() + (1 + Math.floor(seedLocal() * 5)) * 86400000);
    const ev =
      TIMELINE_EVENT_TYPES[
        i === 0 ? 0 : i === n - 1 ? 5 : 1 + Math.floor(seedLocal() * 4)
      ];
    return {
      id: i,
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      type: ev.type,
      icon: ev.icon,
      note: p([
        "Vitals within normal range, no complications noted.",
        "Mild elevation flagged for follow-up review.",
        "Results consistent with treatment plan; continuing course.",
        "Patient reported improvement in symptoms.",
        "Dosage adjusted based on latest panel.",
      ]),
    };
  });
}

const LAB_PARAM_POOL = [
  { param: "Hemoglobin", unit: "g/dL", range: [12, 16] },
  { param: "WBC Count", unit: "x10^3/uL", range: [4, 11] },
  { param: "Platelets", unit: "x10^3/uL", range: [150, 400] },
  { param: "Glucose (Fasting)", unit: "mg/dL", range: [70, 100] },
  { param: "Creatinine", unit: "mg/dL", range: [0.6, 1.3] },
  { param: "Sodium", unit: "mmol/L", range: [135, 145] },
  { param: "LDL Cholesterol", unit: "mg/dL", range: [0, 100] },
  { param: "HDL Cholesterol", unit: "mg/dL", range: [40, 60] },
  { param: "Systolic BP", unit: "mmHg", range: [90, 120] },
  { param: "Resting Heart Rate", unit: "bpm", range: [60, 100] },
];

function genReports(patientId) {
  const seedLocal = mulberry32(hashStr(patientId + "::reports"));
  const p = (arr) => arr[Math.floor(seedLocal() * arr.length)];
  const kinds = [
    {
      name: "Complete Blood Panel",
      icon: FlaskConical,
      dept: "General Medicine",
    },
    { name: "MRI — Cranial", icon: ScanLine, dept: "Neurology" },
    { name: "Chest X-Ray", icon: ScanLine, dept: "Radiology" },
    { name: "Lipid Profile", icon: FlaskConical, dept: "Cardiology" },
    { name: "ECG Summary", icon: Activity, dept: "Cardiology" },
    { name: "Bone Density Scan", icon: ScanLine, dept: "Orthopedics" },
    { name: "Metabolic Panel", icon: FlaskConical, dept: "General Medicine" },
  ];
  const shuffled = [...kinds].sort(() => seedLocal() - 0.5);
  const count = 3 + Math.floor(seedLocal() * 3);
  return shuffled.slice(0, count).map((k, i) => {
    const flagged = seedLocal() > 0.7;
    const metrics = range(4 + Math.floor(seedLocal() * 2)).map(() => {
      const base = p(LAB_PARAM_POOL);
      const [min, max] = base.range;
      const outOfRange = seedLocal() > 0.78;
      const value = outOfRange
        ? seedLocal() > 0.5
          ? max + (max - min) * (0.1 + seedLocal() * 0.4)
          : Math.max(0, min - (max - min) * (0.1 + seedLocal() * 0.4))
        : min + (max - min) * seedLocal();
      return {
        param: base.param,
        unit: base.unit,
        value: Math.round(value * 10) / 10,
        range: `${min}–${max}`,
        flag: outOfRange ? (value > max ? "High" : "Low") : "Normal",
      };
    });
    return {
      id: `${patientId}-RPT-${i}`,
      name: k.name,
      icon: k.icon,
      department: k.dept,
      status: flagged ? "Attention" : "Normal",
      date: `Jun ${2 + Math.floor(seedLocal() * 26)}, 2026`,
      reportedBy: `Dr. ${pick(LAST_NAMES)}`,
      summary: flagged
        ? "One or more markers outside reference range — recommend specialist review."
        : "All markers within reference range for age and history.",
      metrics,
    };
  });
}

/* ============================== SMALL PRIMITIVES ============================== */

function PulseRule({ color = "#0F7C6C", opacity = 0.5, height = 20 }) {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      style={{ width: "100%", height, display: "block", opacity }}
    >
      <polyline
        points="0,12 155,12 166,12 173,1 181,23 189,12 400,12"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Badge({ children, tone = "teal" }) {
  const tones = {
    teal: "bg-[#E7F3F0] text-[#0F7C6C]",
    amber: "bg-[#FBF0E4] text-[#B8752F]",
    navy: "bg-[#EAEFF5] text-[#0B2545]",
    red: "bg-[#FBEAEA] text-[#B33A3A]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaTone = "up",
  suffix,
}) {
  return (
    <div className="bg-white border border-[#E4E9ED] rounded-2xl p-5 flex flex-col gap-3 min-w-0">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-[#EAEFF5] flex items-center justify-center">
          <Icon size={17} color="#0B2545" strokeWidth={2} />
        </div>
        {delta && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${deltaTone === "up" ? "text-[#0F7C6C]" : "text-[#B33A3A]"}`}
          >
            {deltaTone === "up" ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            )}
            {delta}
          </span>
        )}
      </div>
      <div>
        <div className="font-mono text-2xl text-[#0B2545] tracking-tight">
          {value}
          <span className="text-sm text-[#8593a1] ml-1">{suffix}</span>
        </div>
        <div className="text-[13px] text-[#5B6B7A] mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <div className="text-[11px] font-semibold tracking-[0.14em] text-[#0F7C6C] uppercase mb-1.5">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[1.5rem] text-[#0B2545]">{title}</h2>
      {sub && <p className="text-[13.5px] text-[#5B6B7A] mt-1">{sub}</p>}
    </div>
  );
}

/* ============================== LIVE VITALS WIDGET ============================== */

function useLiveVital(base, spread, intervalMs = 2400) {
  const [val, setVal] = useState(base);
  const [history, setHistory] = useState(range(12).map(() => base));
  useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => {
        const next = Math.round((v + (rnd() - 0.5) * spread) * 10) / 10;
        setHistory((h) => [...h.slice(1), next]);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [spread, intervalMs]);
  return [val, history];
}

function VitalCard({ icon: Icon, label, base, spread, unit, color }) {
  const [val, history] = useLiveVital(base, spread);
  const data = history.map((v, i) => ({ i, v }));
  return (
    <div className="bg-white border border-[#E4E9ED] rounded-2xl p-4 flex items-center gap-4">
      <div
        className="relative w-9 h-9 shrink-0 rounded-xl flex items-center justify-center"
        style={{ background: color + "1A" }}
      >
        <Icon size={16} color={color} />
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full pulse-dot"
          style={{ background: color }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-lg text-[#0B2545] leading-none">
          {val}
          <span className="text-[11px] text-[#8593a1] ml-1">{unit}</span>
        </div>
        <div className="text-[12px] text-[#5B6B7A] mt-1 truncate">{label}</div>
      </div>
      <div className="w-16 h-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ============================== NAV / SHELL ============================== */

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "scheduling", label: "Scheduling", icon: Calendar },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "timeline", label: "Timeline", icon: ClipboardList },
];

function Sidebar({ page, setPage, theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <>
      <aside
        className={`hidden md:flex w-60 shrink-0 flex-col ${isDark ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#0B2545] text-white"} h-screen sticky top-0`}
      >
        <button
          onClick={() => setPage("landing")}
          className={`flex items-center gap-2.5 px-6 h-16 border-b ${isDark ? "border-white/10" : "border-white/10"} text-left`}
        >
          <div className="w-7 h-7 rounded-lg bg-[#0F7C6C] flex items-center justify-center shrink-0">
            <Activity size={15} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-[17px] tracking-tight">
            CareScope
          </span>
        </button>
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${active ? "bg-white/10 text-white" : isDark ? "text-[#AEBBCC] hover:bg-white/5 hover:text-white" : "text-[#AEBBCC] hover:bg-white/5 hover:text-white"}`}
              >
                <item.icon size={17} strokeWidth={2} />
                {item.label}
                {active && (
                  <span className="ml-auto w-1 h-4 rounded-full bg-[#0F7C6C]" />
                )}
              </button>
            );
          })}
        </nav>
        <div className="px-3 pb-3">
          <PulseRule color="#3A5375" opacity={0.8} height={14} />
        </div>
        <button
          onClick={toggleTheme}
          className={`mx-3 mb-3 flex items-center justify-between rounded-xl border px-3 py-2.5 text-[12.5px] font-medium transition-colors ${isDark ? "border-[#243447] bg-[#111C2E] text-[#F5F7FB] hover:bg-[#162234]" : "border-[#D8DEE4] bg-white/90 text-[#0B2545] hover:bg-white"}`}
        >
          <span className="flex items-center gap-2">
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
            {isDark ? "Light mode" : "Dark mode"}
          </span>
          <span
            className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? "text-[#8EA1B5]" : "text-[#5B6B7A]"}`}
          >
            Switch
          </span>
        </button>
        <button
          onClick={() => setPage("profile")}
          className={`px-6 py-4 border-t border-white/10 flex items-center gap-2.5 text-left hover:bg-white/5 transition-colors ${page === "profile" ? "bg-white/10" : ""}`}
        >
          <div className="w-8 h-8 rounded-full bg-[#0F7C6C] flex items-center justify-center text-[12px] font-semibold shrink-0">
            RN
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-medium truncate">
              Shivansh Shrivastav
            </div>
            <div className="text-[11px] text-[#8593a1] truncate">
              Care Coordinator
            </div>
          </div>
          <ChevronRight size={14} className="text-[#8593a1] shrink-0" />
        </button>
      </aside>

      {/* mobile bottom nav */}
      <nav
        className={`md:hidden fixed bottom-0 inset-x-0 z-30 ${isDark ? "bg-[#07121E] border-[#243447]" : "bg-[#0B2545] border-white/10"} border-t flex items-stretch`}
      >
        {NAV_ITEMS.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10.5px] ${active ? "text-white" : "text-[#8593a1]"}`}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          );
        })}
        <button
          onClick={toggleTheme}
          className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10.5px] ${isDark ? "text-[#F5F7FB]" : "text-[#8593a1]"}`}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
          {isDark ? "Light" : "Dark"}
        </button>
        <button
          onClick={() => setPage("profile")}
          className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10.5px] ${page === "profile" ? "text-white" : "text-[#8593a1]"}`}
        >
          <User size={17} />
          Profile
        </button>
      </nav>
    </>
  );
}

function Topbar({ title, sub, theme }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`sticky top-0 z-20 ${isDark ? "bg-[#07121E]/90 border-[#243447]" : "bg-[#FEF3C7]/90 border-[#E8D8A8]"} backdrop-blur border-b px-5 md:px-8 h-16 flex items-center justify-between gap-4`}
    >
      <div>
        <div
          className={`text-[15px] font-semibold ${isDark ? "text-[#F5F7FB]" : "text-[#0B2545]"} leading-none`}
        >
          {title}
        </div>
        {sub && (
          <div
            className={`text-[12px] ${isDark ? "text-[#8EA1B5]" : "text-[#5B6B7A]"} mt-1`}
          >
            {sub}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div
          className={`hidden sm:flex items-center gap-2 ${isDark ? "bg-[#111C2E] border-[#243447]" : "bg-white border-[#E4E9ED]"} rounded-full px-3.5 h-9 w-56`}
        >
          <Search size={14} color={isDark ? "#8EA1B5" : "#8593a1"} />
          <input
            placeholder="Search patients, reports…"
            className={`bg-transparent outline-none text-[13px] ${isDark ? "text-[#F5F7FB] placeholder:text-[#8EA1B5]" : "text-[#0B2545] placeholder:text-[#8593a1]"} w-full`}
          />
        </div>
        <button
          className={`w-9 h-9 rounded-full ${isDark ? "bg-[#111C2E] border-[#243447]" : "bg-white border-[#E4E9ED]"} flex items-center justify-center relative`}
        >
          <Bell size={15} color={isDark ? "#F5F7FB" : "#0B2545"} />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-[#B8752F]" />
        </button>
      </div>
    </div>
  );
}

function PageShell({ title, sub, children, theme }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`flex-1 min-w-0 pb-20 md:pb-0 ${isDark ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#FEF9E8] text-[#0B2545]"}`}
    >
      <Topbar title={title} sub={sub} theme={theme} />
      <div
        className={`px-5 md:px-8 py-6 max-w-[1400px] ${isDark ? "text-[#F5F7FB]" : "text-[#0B2545]"}`}
      >
        {children}
      </div>
    </div>
  );
}

/* ============================== DASHBOARD ============================== */

function DashboardPage({ theme }) {
  const appointments = useMemo(() => genAppointments(), []);
  const todays = appointments.filter((a) => a.dayIdx === 0).slice(0, 5);
  const occupancyPct = Math.round(
    (DEPARTMENTS.reduce((s, d) => s + d.occupied, 0) /
      DEPARTMENTS.reduce((s, d) => s + d.capacity, 0)) *
      100,
  );

  return (
    <PageShell
      title="Dashboard"
      sub="Live overview across all departments"
      theme={theme}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total patients"
          value={PATIENTS.length}
          delta="4.2%"
        />
        <StatCard
          icon={Calendar}
          label="Appointments today"
          value={todays.length + 6}
          delta="2 fewer"
          deltaTone="down"
        />
        <StatCard
          icon={Clock}
          label="Avg wait time"
          value="18"
          suffix="min"
          delta="6.1%"
        />
        <StatCard
          icon={BedDouble}
          label="Bed occupancy"
          value={occupancyPct}
          suffix="%"
          delta="1.4%"
          deltaTone="down"
        />
      </div>

      <div className="my-7">
        <PulseRule />
      </div>

      <SectionHeading
        eyebrow="Live monitoring"
        title="Ward vitals, streaming"
        sub="Simulated real-time signal from connected monitoring widgets"
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <VitalCard
          icon={Heart}
          label="Avg heart rate"
          base={78}
          spread={4}
          unit="bpm"
          color="#B33A3A"
        />
        <VitalCard
          icon={Droplets}
          label="SpO2 saturation"
          base={97}
          spread={1.2}
          unit="%"
          color="#0F7C6C"
        />
        <VitalCard
          icon={Wind}
          label="Respiratory rate"
          base={16}
          spread={2}
          unit="/min"
          color="#3A6EA5"
        />
        <VitalCard
          icon={Thermometer}
          label="Avg temperature"
          base={37}
          spread={0.3}
          unit="C"
          color="#B8752F"
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-5 mb-8">
        <div className="lg:col-span-3 bg-white border border-[#E4E9ED] rounded-2xl p-5">
          <SectionHeading eyebrow="Insight" title="Admissions, last 14 days" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ADMISSIONS_14D} margin={{ left: -20, top: 5 }}>
              <defs>
                <linearGradient id="admG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F7C6C" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#0F7C6C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E4E9ED"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  border: "1px solid #E4E9ED",
                }}
              />
              <Area
                type="monotone"
                dataKey="admissions"
                stroke="#0F7C6C"
                strokeWidth={2}
                fill="url(#admG)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white border border-[#E4E9ED] rounded-2xl p-5">
          <SectionHeading
            eyebrow="Predictive · UI only"
            title="Readmission forecast"
          />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={readmitSeries} margin={{ left: -20, top: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E4E9ED"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
                interval={1}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  border: "1px solid #E4E9ED",
                }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#0B2545"
                strokeWidth={2}
                dot={false}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#B8752F"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 bg-white border border-[#E4E9ED] rounded-2xl p-5">
          <SectionHeading eyebrow="Today" title="Upcoming appointments" />
          <div className="flex flex-col divide-y divide-[#EEF1F4]">
            {todays.map((a) => (
              <div
                key={a.id}
                className="py-2.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-[#0B2545] truncate">
                    {a.patient}
                  </div>
                  <div className="text-[11.5px] text-[#5B6B7A] truncate">
                    {a.type} · {a.doctor}
                  </div>
                </div>
                <div className="font-mono text-[12px] text-[#0F7C6C] shrink-0">
                  {String(a.hour).padStart(2, "0")}:
                  {String(a.minute).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 bg-white border border-[#E4E9ED] rounded-2xl p-5">
          <SectionHeading
            eyebrow="Resources"
            title="Department bed occupancy"
          />
          <div className="flex flex-col gap-3">
            {DEPARTMENTS.map((d) => {
              const pct = Math.round((d.occupied / d.capacity) * 100);
              return (
                <div key={d.id} className="flex items-center gap-3">
                  <div className="w-28 shrink-0 text-[12.5px] text-[#0B2545] flex items-center gap-2">
                    <d.icon size={13} color="#5B6B7A" />
                    {d.name}
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-[#EEF1F4] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: pct > 85 ? "#B33A3A" : "#0F7C6C",
                      }}
                    />
                  </div>
                  <div className="w-10 text-right font-mono text-[11.5px] text-[#5B6B7A]">
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ============================== SCHEDULING ============================== */

function SchedulingPage({ theme }) {
  const [appointments, setAppointments] = useState(() => genAppointments());
  const [weekOffset, setWeekOffset] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    patient: "",
    department: DEPARTMENTS[0].name,
    day: 0,
    hour: 9,
    duration: 30,
    type: APPT_TYPES[0],
  });

  const grid = useMemo(() => {
    const map = {};
    appointments.forEach((a) => {
      const key = `${a.dayIdx}-${a.hour}`;
      map[key] = map[key] || [];
      map[key].push(a);
    });
    return map;
  }, [appointments]);

  function submit(e) {
    e.preventDefault();
    if (!form.patient.trim()) return;
    setAppointments((prev) => [
      ...prev,
      {
        id: `AP-new-${Date.now()}`,
        day: DAY_LABELS[form.day],
        dayIdx: form.day,
        hour: Number(form.hour),
        minute: 0,
        duration: Number(form.duration),
        patient: form.patient,
        doctor: pick(DOCTORS),
        department: form.department,
        type: form.type,
      },
    ]);
    setForm({ ...form, patient: "" });
    setShowForm(false);
  }

  return (
    <PageShell
      title="Scheduling"
      sub="Appointments & resource allocation"
      theme={theme}
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="w-8 h-8 rounded-lg border border-[#E4E9ED] bg-white flex items-center justify-center"
          >
            <ChevronLeft size={15} color="#0B2545" />
          </button>
          <div className="text-[13.5px] font-medium text-[#0B2545] w-36 text-center">
            {weekOffset === 0
              ? "This week"
              : weekOffset > 0
                ? `${weekOffset} week(s) ahead`
                : `${Math.abs(weekOffset)} week(s) ago`}
          </div>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="w-8 h-8 rounded-lg border border-[#E4E9ED] bg-white flex items-center justify-center"
          >
            <ChevronRight size={15} color="#0B2545" />
          </button>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-1.5 bg-[#0F7C6C] text-white text-[13px] font-medium px-4 h-9 rounded-full hover:bg-[#0c6a5c] transition-colors"
        >
          <Plus size={15} /> New appointment
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={submit}
          className="bg-white border border-[#E4E9ED] rounded-2xl p-5 mb-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end"
        >
          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <label className="text-[11.5px] font-medium text-[#5B6B7A]">
              Patient name
            </label>
            <input
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
              placeholder="e.g. Sofia Novak"
              className="border border-[#E4E9ED] rounded-lg h-9 px-3 text-[13px] outline-none focus:border-[#0F7C6C]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11.5px] font-medium text-[#5B6B7A]">
              Department
            </label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="border border-[#E4E9ED] rounded-lg h-9 px-2.5 text-[13px] outline-none focus:border-[#0F7C6C]"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11.5px] font-medium text-[#5B6B7A]">
              Day
            </label>
            <select
              value={form.day}
              onChange={(e) =>
                setForm({ ...form, day: Number(e.target.value) })
              }
              className="border border-[#E4E9ED] rounded-lg h-9 px-2.5 text-[13px] outline-none focus:border-[#0F7C6C]"
            >
              {DAY_LABELS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11.5px] font-medium text-[#5B6B7A]">
              Time
            </label>
            <select
              value={form.hour}
              onChange={(e) => setForm({ ...form, hour: e.target.value })}
              className="border border-[#E4E9ED] rounded-lg h-9 px-2.5 text-[13px] outline-none focus:border-[#0F7C6C]"
            >
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, "0")}:00
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#0B2545] text-white text-[13px] font-medium h-9 rounded-lg hover:bg-[#0e2f5a] transition-colors"
          >
            Add to schedule
          </button>
        </form>
      )}

      <div className="grid lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3 bg-white border border-[#E4E9ED] rounded-2xl overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[52px_repeat(7,1fr)] border-b border-[#E4E9ED]">
              <div />
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="text-center py-2.5 text-[11.5px] font-semibold text-[#0B2545] border-l border-[#EEF1F4]"
                >
                  {d}
                </div>
              ))}
            </div>
            {HOURS.map((h) => (
              <div
                key={h}
                className="grid grid-cols-[52px_repeat(7,1fr)] border-b border-[#EEF1F4]"
              >
                <div className="text-[10.5px] text-[#8593a1] font-mono py-2.5 pr-2 text-right">
                  {String(h).padStart(2, "0")}:00
                </div>
                {DAY_LABELS.map((d, dIdx) => {
                  const cell = grid[`${dIdx}-${h}`] || [];
                  return (
                    <div
                      key={d}
                      className="border-l border-[#EEF1F4] p-1 min-h-[46px] flex flex-col gap-1"
                    >
                      {cell.map((a) => (
                        <div
                          key={a.id}
                          className="bg-[#E7F3F0] border border-[#0F7C6C]/20 rounded-md px-1.5 py-1 text-[10px] leading-tight text-[#0B2545] truncate"
                          title={`${a.patient} · ${a.type}`}
                        >
                          <span className="font-medium">
                            {a.patient.split(" ")[0]}
                          </span>{" "}
                          · {a.type}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E4E9ED] rounded-2xl p-5 h-fit">
          <SectionHeading eyebrow="Resources" title="Doctors on duty" />
          <div className="flex flex-col gap-2.5">
            {DOCTORS.slice(0, 6).map((doc) => (
              <div
                key={doc}
                className="flex items-center justify-between text-[13px]"
              >
                <span className="text-[#0B2545]">{doc}</span>
                <Badge tone={rnd() > 0.3 ? "teal" : "amber"}>
                  {rnd() > 0.3 ? "Available" : "In session"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ============================== REPORTS ============================== */

function ReportsPage({ theme }) {
  const [dept, setDept] = useState("All departments");
  const [metric, setMetric] = useState("Admissions");
  const [chartType, setChartType] = useState("area");
  const [openReport, setOpenReport] = useState(null);

  const chartData = MONTHS.map((m, i) => ({
    month: m,
    value: REPORT_METRICS[metric][i],
  }));

  const REPORT_TITLES = [
    "Monthly Census Summary",
    "Diagnostic Turnaround",
    "Readmission Breakdown",
    "Resource Utilization",
    "Patient Satisfaction",
    "Billing Reconciliation",
  ];
  const REPORT_KPI_POOL = [
    { label: "Total admissions", unit: "" },
    { label: "Readmission rate", unit: "%" },
    { label: "Avg length of stay", unit: "days" },
    { label: "Bed turnover rate", unit: "%" },
    { label: "Avg diagnostic turnaround", unit: "hrs" },
    { label: "Patient satisfaction score", unit: "/5" },
    { label: "Staff-to-patient ratio", unit: ":1" },
    { label: "Billing accuracy", unit: "%" },
  ];
  const reportCards = useMemo(
    () =>
      REPORT_TITLES.map((title, i) => {
        const s = mulberry32(hashStr(title + "::report"));
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
                          : 80 + s() * 220) * 10,
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
            ? `This ${title.toLowerCase()} shows one or more metrics drifting outside the target range for the period, flagged for coordinator review before distribution.`
            : `This ${title.toLowerCase()} is within expected targets for the period and is ready to be shared with department leads.`,
          kpis,
        };
      }),
    [],
  );

  return (
    <PageShell
      title="Reports"
      sub="Customizable, filterable analytics"
      theme={theme}
    >
      <div className="bg-white border border-[#E4E9ED] rounded-2xl p-5 mb-6">
        <SectionHeading
          eyebrow="Custom builder"
          title="Build a report"
          sub="Choose a metric, department and visualization — updates live"
        />
        <div className="flex flex-wrap gap-3 mb-5">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="border border-[#E4E9ED] rounded-lg h-9 px-3 text-[13px] outline-none focus:border-[#0F7C6C]"
          >
            {Object.keys(REPORT_METRICS).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="border border-[#E4E9ED] rounded-lg h-9 px-3 text-[13px] outline-none focus:border-[#0F7C6C]"
          >
            <option>All departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.id}>{d.name}</option>
            ))}
          </select>
          <div className="flex items-center gap-1 bg-[#FDE68A] rounded-lg p-1">
            {["area", "bar", "line"].map((t) => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                className={`px-3 h-7 rounded-md text-[12px] font-medium capitalize transition-colors ${chartType === t ? "bg-white text-[#0B2545] shadow-sm" : "text-[#5B6B7A]"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-1.5 border border-[#E4E9ED] px-3.5 h-9 rounded-lg text-[13px] font-medium text-[#0B2545]">
            <Download size={14} /> Export
          </button>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          {chartType === "area" ? (
            <AreaChart data={chartData} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="repG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F7C6C" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0F7C6C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E4E9ED"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  border: "1px solid #E4E9ED",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0F7C6C"
                strokeWidth={2}
                fill="url(#repG)"
              />
            </AreaChart>
          ) : chartType === "bar" ? (
            <BarChart data={chartData} margin={{ left: -20 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E4E9ED"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  border: "1px solid #E4E9ED",
                }}
              />
              <Bar dataKey="value" fill="#0B2545" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData} margin={{ left: -20 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E4E9ED"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#8593a1" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 10,
                  border: "1px solid #E4E9ED",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#B8752F"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
        <div className="text-[12px] text-[#8593a1] mt-2">
          Showing {metric.toLowerCase()} for {dept.toLowerCase()} · mock
          dataset, Jan–Dec 2026
        </div>
      </div>

      <SectionHeading eyebrow="Library" title="Generated reports" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-[#E4E9ED] rounded-2xl p-4.5 p-4 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#EAEFF5] flex items-center justify-center">
                <FileText size={16} color="#0B2545" />
              </div>
              <Badge tone={r.status === "Ready" ? "teal" : "amber"}>
                {r.status}
              </Badge>
            </div>
            <div>
              <div className="text-[13.5px] font-medium text-[#0B2545]">
                {r.title}
              </div>
              <div className="text-[12px] text-[#5B6B7A] mt-0.5">
                {r.dept} · {r.date}
              </div>
            </div>
            <button
              onClick={() => setOpenReport(r)}
              className="flex items-center gap-1 text-[12.5px] font-medium text-[#0F7C6C] mt-1"
            >
              View report <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>

      {openReport && (
        <ReportDetailModal
          report={openReport}
          onClose={() => setOpenReport(null)}
        />
      )}
    </PageShell>
  );
}

function ReportDetailModal({ report, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-[#E4E9ED] w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(11,37,69,0.35)]"
      >
        <div className="flex items-start justify-between gap-4 p-6 border-b border-[#EEF1F4]">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EAEFF5] flex items-center justify-center shrink-0">
              <FileText size={19} color="#0B2545" />
            </div>
            <div>
              <h3 className="font-display text-[1.25rem] text-[#0B2545] leading-tight">
                {report.title}
              </h3>
              <div className="text-[12.5px] text-[#5B6B7A] mt-1">
                {report.dept} · {report.period}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#FDE68A] flex items-center justify-center shrink-0"
          >
            <X size={16} color="#5B6B7A" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={report.status === "Ready" ? "teal" : "amber"}>
              {report.status}
            </Badge>
            <Badge tone="navy">Generated {report.date}</Badge>
            <Badge tone="navy">Requested by {report.requestedBy}</Badge>
          </div>

          <p className="text-[13.5px] text-[#5B6B7A] leading-relaxed">
            {report.description}
          </p>

          <div>
            <div className="text-[11.5px] font-semibold tracking-[0.1em] text-[#0B2545] uppercase mb-3">
              Key metrics
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {report.kpis.map((k) => (
                <div
                  key={k.label}
                  className="bg-[#FEF9E8] border border-[#EBD9A6] rounded-xl p-3.5"
                >
                  <div className="font-mono text-lg text-[#0B2545]">
                    {k.value}
                    <span className="text-[11px] text-[#8593a1] ml-1">
                      {k.unit}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#5B6B7A] mt-0.5">
                    {k.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-[#EEF1F4]">
            <button className="flex items-center gap-1.5 bg-[#0F7C6C] text-white text-[13px] font-medium px-4 h-9 rounded-full hover:bg-[#0c6a5c] transition-colors">
              <Download size={14} /> Export PDF
            </button>
            <button
              onClick={onClose}
              className="text-[13px] font-medium text-[#5B6B7A] px-3 h-9"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== TIMELINE ============================== */

function TimelinePage({ theme }) {
  const [patientId, setPatientId] = useState(PATIENTS[0].id);
  const [expanded, setExpanded] = useState({});
  const patient = PATIENTS.find((p) => p.id === patientId);
  const events = useMemo(() => genTimeline(patientId), [patientId]);
  const reports = useMemo(() => genReports(patientId), [patientId]);

  return (
    <PageShell
      title="Timeline"
      sub="Treatment history & diagnostic reports"
      theme={theme}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="text-[13px] text-[#5B6B7A]">Patient</label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="border border-[#E4E9ED] bg-white rounded-lg h-9 px-3 text-[13px] outline-none focus:border-[#0F7C6C]"
        >
          {PATIENTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} · {p.id}
            </option>
          ))}
        </select>
        {patient && (
          <Badge
            tone={
              patient.status === "Critical"
                ? "red"
                : patient.status === "Stable"
                  ? "teal"
                  : "amber"
            }
          >
            {patient.status}
          </Badge>
        )}
        {patient && (
          <span className="text-[12.5px] text-[#5B6B7A]">
            {patient.age} yrs · {patient.department}
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white border border-[#E4E9ED] rounded-2xl p-6">
          <SectionHeading
            eyebrow="Structured view"
            title="Treatment timeline"
          />
          <div className="relative pl-8">
            <div className="absolute left-[13px] top-1 bottom-1 w-px bg-[#E4E9ED]" />
            {events.map((ev, i) => (
              <div key={ev.id} className="relative pb-7 last:pb-0">
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-[#E7F3F0] border-2 border-white ring-1 ring-[#0F7C6C]/30 flex items-center justify-center">
                  <ev.icon size={13} color="#0F7C6C" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13.5px] font-medium text-[#0B2545]">
                    {ev.type}
                  </span>
                  <span className="font-mono text-[11px] text-[#8593a1]">
                    {ev.date}
                  </span>
                </div>
                <p className="text-[13px] text-[#5B6B7A] mt-1 leading-relaxed">
                  {ev.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-3">
          <SectionHeading eyebrow="Diagnostics" title="Reports" />
          {reports.map((r) => {
            const open = expanded[r.id];
            return (
              <div
                key={r.id}
                className="bg-white border border-[#E4E9ED] rounded-2xl p-4"
              >
                <button
                  onClick={() =>
                    setExpanded((e) => ({ ...e, [r.id]: !e[r.id] }))
                  }
                  className="w-full flex items-center gap-3 text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EAEFF5] flex items-center justify-center shrink-0">
                    <r.icon size={16} color="#0B2545" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-medium text-[#0B2545] truncate">
                      {r.name}
                    </div>
                    <div className="text-[11.5px] text-[#5B6B7A]">
                      {r.department} · {r.date}
                    </div>
                  </div>
                  <Badge tone={r.status === "Normal" ? "teal" : "amber"}>
                    {r.status}
                  </Badge>
                  <ChevronDown
                    size={15}
                    color="#8593a1"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="mt-3 pt-3 border-t border-[#EEF1F4]">
                    <p className="text-[12.5px] text-[#5B6B7A] leading-relaxed mb-3">
                      {r.summary}
                    </p>
                    <div className="text-[10.5px] text-[#8593a1] mb-2">
                      Reported by {r.reportedBy}
                    </div>
                    <div className="flex flex-col divide-y divide-[#F2F5F7]">
                      {r.metrics.map((m) => (
                        <div
                          key={m.param}
                          className="flex items-center justify-between py-1.5 text-[12px]"
                        >
                          <span className="text-[#0B2545]">{m.param}</span>
                          <span className="font-mono text-[#5B6B7A]">
                            {m.value} {m.unit}{" "}
                            <span className="text-[#8593a1]">({m.range})</span>
                          </span>
                          <Badge tone={m.flag === "Normal" ? "teal" : "amber"}>
                            {m.flag}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

/* ============================== PROFILE ============================== */

const ACTIVITY_LOG = [
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

function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-[13px] font-medium text-[#0B2545]">{label}</div>
        {sub && <div className="text-[12px] text-[#5B6B7A] mt-0.5">{sub}</div>}
      </div>
      <button
        onClick={onChange}
        className={`w-10 h-6 rounded-full shrink-0 transition-colors relative ${checked ? "bg-[#0F7C6C]" : "bg-[#D8DEE4]"}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

function ProfilePage({ theme }) {
  const [prefs, setPrefs] = useState({ email: true, sms: false, digest: true });
  const totalAppts = 214;

  return (
    <PageShell title="Profile" sub="Care Coordinator account" theme={theme}>
      <div className="bg-white border border-[#E4E9ED] rounded-2xl p-6 md:p-7 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#0F7C6C] flex items-center justify-center text-white font-display text-xl shrink-0">
            SS
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[1.4rem] text-[#0B2545]">
              Shivansh Shrivastav
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <Badge tone="teal">Care Coordinator</Badge>
              <Badge tone="navy">Cross-department</Badge>
            </div>
          </div>
          <button className="flex items-center gap-1.5 border border-[#E8D8A8] text-[#0B2545] text-[13px] font-medium px-4 h-9 rounded-full hover:bg-[#FDE68A] transition-colors self-start sm:self-center">
            <Pencil size={13} /> Edit profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Users}
          label="Patients coordinated"
          value={37}
          delta="3.5%"
        />
        <StatCard
          icon={CalendarCheck}
          label="Appointments this month"
          value={totalAppts}
          delta="12"
        />
        <StatCard
          icon={FileText}
          label="Reports generated"
          value={22}
          delta="4"
        />
        <StatCard
          icon={Clock}
          label="Avg response time"
          value="9"
          suffix="min"
          delta="1.2%"
          deltaTone="down"
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="bg-white border border-[#E4E9ED] rounded-2xl p-5">
            <SectionHeading eyebrow="Contact" title="Details" />
            <div className="flex flex-col gap-3.5 text-[13px] text-[#0B2545]">
              <div className="flex items-center gap-2.5">
                <Mail size={14} color="#5B6B7A" /> shiva.shri0055@gmail.com
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} color="#5B6B7A" /> +1 (555) 214-7790
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} color="#5B6B7A" /> Building C, Level 2 —
                Coordination Desk
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase size={14} color="#5B6B7A" /> Joined March 2023
              </div>
              <div className="flex items-center gap-2.5">
                <Globe2 size={14} color="#5B6B7A" /> English, Hindi
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E4E9ED] rounded-2xl p-5">
            <SectionHeading eyebrow="Coverage" title="Assigned departments" />
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.slice(0, 5).map((d) => (
                <Badge key={d.id} tone="navy">
                  <d.icon size={11} /> {d.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E4E9ED] rounded-2xl p-5">
            <SectionHeading eyebrow="Preferences" title="Notifications" />
            <div className="flex flex-col divide-y divide-[#EEF1F4]">
              <ToggleRow
                label="Email alerts"
                sub="New appointments and report flags"
                checked={prefs.email}
                onChange={() => setPrefs((p) => ({ ...p, email: !p.email }))}
              />
              <ToggleRow
                label="SMS alerts"
                sub="Urgent patient status changes only"
                checked={prefs.sms}
                onChange={() => setPrefs((p) => ({ ...p, sms: !p.sms }))}
              />
              <ToggleRow
                label="Weekly digest"
                sub="Summary of coordination activity"
                checked={prefs.digest}
                onChange={() => setPrefs((p) => ({ ...p, digest: !p.digest }))}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-[#E4E9ED] rounded-2xl p-5">
          <SectionHeading eyebrow="Activity" title="Recent activity" />
          <div className="relative pl-8">
            <div className="absolute left-[13px] top-1 bottom-1 w-px bg-[#E4E9ED]" />
            {ACTIVITY_LOG.map((a, i) => (
              <div key={i} className="relative pb-6 last:pb-0">
                <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-[#E7F3F0] border-2 border-white ring-1 ring-[#0F7C6C]/30 flex items-center justify-center">
                  <a.icon size={13} color="#0F7C6C" />
                </div>
                <div className="text-[13px] text-[#0B2545]">{a.text}</div>
                <div className="text-[11.5px] text-[#8593a1] mt-0.5">
                  {a.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* ============================== LANDING PAGE ============================== */

const FEATURE_GROUPS = [
  {
    icon: LayoutDashboard,
    title: "Interactive dashboard",
    desc: "Appointments, medical history and health insights in one glanceable workspace of summary cards and live charts.",
  },
  {
    icon: ClipboardList,
    title: "Treatment timelines",
    desc: "Structured, chronological views of diagnostic reports and treatment history for every patient.",
  },
  {
    icon: TrendingUp,
    title: "Predictive charts",
    desc: "Forecast trends and readmission risk with UI-driven predictive visualizations, built on mock cohort data.",
  },
  {
    icon: Calendar,
    title: "Scheduling & live widgets",
    desc: "Coordinate appointments and resources while monitoring real-time-style hospital vitals and indicators.",
  },
  {
    icon: BarChart3,
    title: "Customizable reports",
    desc: "Filter, reshape and export reports across departments, metrics and time ranges in a couple of clicks.",
  },
];

function LandingPage({ setPage, theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#FEF9E8] text-[#0B2545]"}`}
    >
      <header
        className={`sticky top-0 z-30 ${isDark ? "bg-[#07121E]/85 border-[#243447]" : "bg-[#FEF3C7]/90 border-[#E8D8A8]"} backdrop-blur border-b`}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0F7C6C] flex items-center justify-center">
              <Activity size={15} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-[17px] text-[#0B2545] tracking-tight">
              CareScope
            </span>
          </div>
          <nav
            className={`hidden md:flex items-center gap-7 text-[13.5px] ${isDark ? "text-[#8EA1B5]" : "text-[#5B6B7A]"}`}
          >
            <a
              href="#features"
              className={
                isDark ? "hover:text-[#F5F7FB]" : "hover:text-[#0B2545]"
              }
            >
              Platform
            </a>
            <a
              href="#metrics"
              className={
                isDark ? "hover:text-[#F5F7FB]" : "hover:text-[#0B2545]"
              }
            >
              Outcomes
            </a>
            <a
              href="#cta"
              className={
                isDark ? "hover:text-[#F5F7FB]" : "hover:text-[#0B2545]"
              }
            >
              Get started
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${isDark ? "border-[#243447] bg-[#111C2E] text-[#F5F7FB]" : "border-[#D8DEE4] bg-white text-[#0B2545]"}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setPage("dashboard")}
              className="flex items-center gap-1.5 bg-[#0B2545] text-white text-[13px] font-medium px-4 h-9 rounded-full hover:bg-[#0e2f5a] transition-colors"
            >
              Open dashboard <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAEFF5] text-[#0B2545] text-[11.5px] font-semibold tracking-wide uppercase mb-6">
            Phase 1 · Healthcare Analytics SaaS
          </div>
          <h1 className="font-display text-[2.6rem] sm:text-[3.3rem] leading-[1.05] text-[#0B2545] tracking-tight">
            Every vital sign of your hospital,{" "}
            <span className="text-[#0F7C6C]">read at a glance.</span>
          </h1>
          <p className="text-[16px] text-[#5B6B7A] mt-6 max-w-[480px] leading-relaxed">
            CareScope turns appointments, treatment histories, diagnostics and
            hospital resources into one interactive analytics surface — built
            for care teams who don't have time to dig for answers.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <button
              onClick={() => setPage("dashboard")}
              className="flex items-center gap-2 bg-[#0F7C6C] text-white text-[14px] font-medium px-5 h-11 rounded-full hover:bg-[#0c6a5c] transition-colors"
            >
              Launch dashboard <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setPage("timeline")}
              className="flex items-center gap-2 border border-[#E8D8A8] text-[#0B2545] text-[14px] font-medium px-5 h-11 rounded-full hover:bg-[#FDE68A] transition-colors"
            >
              View patient timeline
            </button>
          </div>
          <div className="flex items-center gap-6 mt-9 text-[12.5px] text-[#8593a1]">
            <span>48 mock patient records</span>
            <span className="w-1 h-1 rounded-full bg-[#D8DEE4]" />
            <span>8 departments</span>
            <span className="w-1 h-1 rounded-full bg-[#D8DEE4]" />
            <span>Live-simulated vitals</span>
          </div>
        </div>

        {/* hero visual: real mini dashboard preview, not stock art */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#0F7C6C]/10 to-transparent rounded-[2rem] -z-10" />
          <div className="bg-white border border-[#E4E9ED] rounded-2xl shadow-[0_20px_60px_-20px_rgba(11,37,69,0.25)] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] font-semibold text-[#0B2545]">
                Ward overview
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-[#0F7C6C] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F7C6C] pulse-dot" />
                Live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#FEF9E8] rounded-xl p-3">
                <div className="font-mono text-lg text-[#0B2545]">
                  97<span className="text-[10px] text-[#8593a1]">%</span>
                </div>
                <div className="text-[10.5px] text-[#5B6B7A]">Avg SpO2</div>
              </div>
              <div className="bg-[#FEF9E8] rounded-xl p-3">
                <div className="font-mono text-lg text-[#0B2545]">
                  78<span className="text-[10px] text-[#8593a1]">bpm</span>
                </div>
                <div className="text-[10.5px] text-[#5B6B7A]">
                  Avg heart rate
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={110}>
              <AreaChart data={ADMISSIONS_14D.slice(0, 9)}>
                <defs>
                  <linearGradient id="heroG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F7C6C" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0F7C6C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="admissions"
                  stroke="#0F7C6C"
                  strokeWidth={2}
                  fill="url(#heroG)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#EEF1F4]">
              <span className="text-[11px] text-[#5B6B7A]">Bed occupancy</span>
              <span className="font-mono text-[12px] text-[#0B2545]">74%</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <PulseRule color="#0B2545" opacity={0.35} />
      </div>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-[1200px] mx-auto px-5 md:px-8 py-16"
      >
        <SectionHeading
          eyebrow="Platform"
          title="One surface for every kind of care data"
          sub="Five core capabilities, built for the way care teams and patients actually look at information."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {FEATURE_GROUPS.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-[#E4E9ED] rounded-2xl p-6 hover:border-[#0F7C6C]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] flex items-center justify-center mb-4">
                <f.icon size={18} color="#0F7C6C" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0B2545] mb-1.5">
                {f.title}
              </h3>
              <p className="text-[13px] text-[#5B6B7A] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
          <button
            onClick={() => setPage("dashboard")}
            className="bg-[#0B2545] rounded-2xl p-6 flex flex-col justify-between text-left hover:bg-[#0e2f5a] transition-colors"
          >
            <div>
              <h3 className="text-[15px] font-semibold text-white mb-1.5">
                See it running
              </h3>
              <p className="text-[13px] text-[#AEBBCC] leading-relaxed">
                Jump straight into the live dashboard with real interaction, not
                mockups.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-white text-[13px] font-medium mt-5">
              Open dashboard <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section id="metrics" className="bg-[#0B2545]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              v: "40%",
              l: "Faster chart review, reported in usability testing",
            },
            {
              v: "48",
              l: "Mock patient records visualized across 8 departments",
            },
            { v: "12", l: "Months of forecastable readmission trend data" },
            {
              v: "18min",
              l: "Average simulated patient wait time tracked live",
            },
          ].map((m) => (
            <div key={m.l}>
              <div className="font-display text-[2rem] text-white">{m.v}</div>
              <div className="text-[12.5px] text-[#AEBBCC] mt-1.5 leading-relaxed">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="max-w-[1200px] mx-auto px-5 md:px-8 py-20 text-center"
      >
        <h2 className="font-display text-[2rem] text-[#0B2545] max-w-[560px] mx-auto">
          See CareScope running on realistic hospital data.
        </h2>
        <p className="text-[14px] text-[#5B6B7A] mt-3 max-w-[440px] mx-auto">
          No sign-up. No backend. Every screen below is fully interactive.
        </p>
        <button
          onClick={() => setPage("dashboard")}
          className="inline-flex items-center gap-2 bg-[#0F7C6C] text-white text-[14px] font-medium px-6 h-11 rounded-full hover:bg-[#0c6a5c] transition-colors mt-7"
        >
          Launch dashboard <ArrowRight size={15} />
        </button>
      </section>

      <footer className="border-t border-[#E4E9ED]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#0F7C6C] flex items-center justify-center">
              <Activity size={12} color="white" />
            </div>
            <span className="font-display text-[14px] text-[#0B2545]">
              CareScope Analytics
            </span>
          </div>
          <p className="text-[12px] text-[#8593a1] text-center">
            Hackathon Phase 1 prototype — frontend only, mock medical data
            throughout.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ============================== ROOT APP ============================== */

export default function App() {
  const [page, setPage] = useState("landing");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("carescope-theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("carescope-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`cs-root ${theme === "dark" ? "dark" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .cs-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .cs-root .font-display { font-family: 'Fraunces', serif; }
        .cs-root .font-mono, .cs-root .font-mono * { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .cs-root ::selection { background: #0F7C6C33; }
        .cs-root button, .cs-root select, .cs-root input { font-family: inherit; }
        .cs-root button:focus-visible, .cs-root select:focus-visible, .cs-root input:focus-visible, .cs-root a:focus-visible {
          outline: 2px solid #0F7C6C; outline-offset: 2px;
        }
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1);} 50% { opacity:.45; transform:scale(1.35);} }
        .pulse-dot { animation: pulseDot 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pulse-dot { animation: none; } }
        .cs-root ::-webkit-scrollbar { height: 8px; width: 8px; }
        .cs-root ::-webkit-scrollbar-thumb { background: #D8DEE4; border-radius: 8px; }
      `}</style>

      {page === "landing" ? (
        <LandingPage
          setPage={setPage}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <div
          className={`flex min-h-screen ${theme === "dark" ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#FEF9E8] text-[#0B2545]"}`}
        >
          <Sidebar
            page={page}
            setPage={setPage}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          {page === "dashboard" && <DashboardPage theme={theme} />}
          {page === "scheduling" && <SchedulingPage theme={theme} />}
          {page === "reports" && <ReportsPage theme={theme} />}
          {page === "timeline" && <TimelinePage theme={theme} />}
          {page === "profile" && <ProfilePage theme={theme} />}
        </div>
      )}
    </div>
  );
}
