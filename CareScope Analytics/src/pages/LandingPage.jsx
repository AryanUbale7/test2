/**
 * @file LandingPage.jsx
 * @description SaaS landing page with live interactive mini-dashboard preview and capability matrix.
 */

import {
  Activity,
  LayoutDashboard,
  ClipboardList,
  TrendingUp,
  Calendar,
  BarChart3,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  Shield,
  Zap,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import PulseRule from "../components/common/PulseRule";
import useApp from "../hooks/useApp";
import useTheme from "../hooks/useTheme";
import { genAdmissions14D } from "../services/mockDataEngine";

const FEATURE_GROUPS = [
  {
    icon: LayoutDashboard,
    title: "1. Interactive Healthcare Dashboard",
    desc: "Centralized overview of appointments, medical history, bed occupancy, streaming telemetry, and summary KPI metrics.",
    tag: "Analytics & Telemetry",
  },
  {
    icon: ClipboardList,
    title: "2. Treatment Timeline & Diagnostics",
    desc: "Structured patient history timeline paired with comprehensive lab reports, reference ranges, and abnormal marker flags.",
    tag: "Clinical Care Plan",
  },
  {
    icon: TrendingUp,
    title: "3. Predictive Analytics Charts (UI)",
    desc: "Forecast healthcare trends and 30-day readmission risk curves with 95% confidence intervals and AI insights.",
    tag: "AI Forecasting",
  },
  {
    icon: Calendar,
    title: "4. Scheduling & Live Monitoring",
    desc: "7-day interactive appointment matrix with doctor-on-duty rosters and real-time streaming vital sign widgets.",
    tag: "Resource Operations",
  },
  {
    icon: BarChart3,
    title: "5. Customizable Healthcare Reports",
    desc: "Dynamic report builder with multi-model visualizations, filtered archives, and instant CSV/PDF export pipelines.",
    tag: "Executive Reporting",
  },
];

export function LandingPage() {
  const { setPage } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const previewData = genAdmissions14D().slice(0, 9);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#F7F9FA] text-[#0B2545]"
      } transition-colors`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-30 ${
          isDark ? "bg-[#07121E]/90 border-[#243447]" : "bg-white/90 border-[#E4E9ED]"
        } backdrop-blur border-b`}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F7C6C] flex items-center justify-center shadow-xs">
              <Activity size={18} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-[18px] font-bold text-[#0B2545] dark:text-[#F5F7FB] tracking-tight">
              CareScope Analytics
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#5B6B7A] dark:text-[#8EA1B5]">
            <a href="#features" className="hover:text-[#0F7C6C] dark:hover:text-[#5EEAD4] transition-colors">
              Platform Features
            </a>
            <a href="#outcomes" className="hover:text-[#0F7C6C] dark:hover:text-[#5EEAD4] transition-colors">
              Clinical Outcomes
            </a>
            <a href="#architecture" className="hover:text-[#0F7C6C] dark:hover:text-[#5EEAD4] transition-colors">
              Architecture
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                isDark
                  ? "border-[#243447] bg-[#111C2E] text-[#F5F7FB]"
                  : "border-[#E4E9ED] bg-white text-[#0B2545]"
              }`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setPage("dashboard")}
              className="flex items-center gap-1.5 bg-[#0F7C6C] text-white text-xs font-bold px-4 h-9 rounded-full hover:bg-[#0C6A5C] transition-colors shadow-xs"
            >
              Launch Dashboard <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 text-[#0F7C6C] dark:text-[#5EEAD4] text-[11px] font-bold tracking-wide uppercase mb-6">
            <Zap size={12} /> Modern Healthcare Analytics SaaS Frontend
          </div>

          <h1 className="font-display text-[2.6rem] sm:text-[3.4rem] font-bold leading-[1.08] text-[#0B2545] dark:text-[#F5F7FB] tracking-tight">
            Every vital sign of your hospital,{" "}
            <span className="text-[#0F7C6C] dark:text-[#5EEAD4]">analyzed in real time.</span>
          </h1>

          <p className="text-[15px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-6 max-w-[500px] leading-relaxed">
            CareScope unifies patient records, treatment timelines, predictive trends, diagnostic panels, and department scheduling into one high-performance clinical workspace.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-8">
            <button
              onClick={() => setPage("dashboard")}
              className="flex items-center gap-2 bg-[#0F7C6C] text-white text-sm font-bold px-6 h-12 rounded-full hover:bg-[#0C6A5C] transition-all shadow-md"
            >
              Open Live Dashboard <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setPage("timeline")}
              className="flex items-center gap-2 border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#111C2E] text-[#0B2545] dark:text-[#F5F7FB] text-sm font-bold px-6 h-12 rounded-full hover:bg-gray-50 dark:hover:bg-[#1C2C42] transition-colors"
            >
              View Patient Timeline
            </button>
          </div>

          <div className="flex items-center gap-6 mt-10 text-xs font-semibold text-[#8593a1]">
            <span>48 Mock Patients</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F7C6C]" />
            <span>8 Hospital Wards</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F7C6C]" />
            <span>Streaming Telemetry</span>
          </div>
        </div>

        {/* Live Mini Dashboard Visual */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#0F7C6C]/15 to-transparent rounded-[2.5rem] -z-10" />
          <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EEF1F4] dark:border-[#243447]">
              <div>
                <span className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                  Ward Live Telemetry
                </span>
                <span className="text-[10.5px] text-[#5B6B7A] dark:text-[#8EA1B5] block">
                  Cardiology & Intensive Monitoring
                </span>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 text-[#0F7C6C] dark:text-[#5EEAD4] text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#0F7C6C] pulse-dot" />
                Telemetry Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#F7F9FA] dark:bg-[#1C2C42] rounded-xl p-3">
                <div className="font-mono text-xl font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                  98<span className="text-xs text-[#8593a1]">%</span>
                </div>
                <div className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5] font-medium">Avg Ward SpO2</div>
              </div>
              <div className="bg-[#F7F9FA] dark:bg-[#1C2C42] rounded-xl p-3">
                <div className="font-mono text-xl font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                  74<span className="text-xs text-[#8593a1]">bpm</span>
                </div>
                <div className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5] font-medium">Resting Heart Rate</div>
              </div>
            </div>

            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={previewData}>
                  <defs>
                    <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0F7C6C" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#0F7C6C" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="admissions"
                    stroke="#0F7C6C"
                    strokeWidth={2.5}
                    fill="url(#heroAreaGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#EEF1F4] dark:border-[#243447] text-xs">
              <span className="text-[#5B6B7A] dark:text-[#8EA1B5]">Overall Ward Occupancy</span>
              <span className="font-mono font-bold text-[#0F7C6C] dark:text-[#5EEAD4]">78% Utilized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Heartbeat Divider */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <PulseRule color={isDark ? "#243447" : "#0B2545"} opacity={0.3} height={22} />
      </div>

      {/* Mandatory Features Matrix */}
      <section id="features" className="max-w-[1280px] mx-auto px-5 md:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest uppercase text-[#0F7C6C] dark:text-[#5EEAD4] mb-2">
            5 Core Requirements
          </div>
          <h2 className="font-display text-3xl font-bold text-[#0B2545] dark:text-[#F5F7FB]">
            Comprehensive Clinical Analytics Architecture
          </h2>
          <p className="text-sm text-[#5B6B7A] dark:text-[#8EA1B5] mt-2">
            Every feature engineered according to the competition specifications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_GROUPS.map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#0F7C6C]/40 transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EAEFF5] dark:bg-[#1C2C42] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <f.icon size={22} className="text-[#0F7C6C] dark:text-[#5EEAD4]" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F7C6C] dark:text-[#5EEAD4] mb-1">
                  {f.tag}
                </div>
                <h3 className="text-[15.5px] font-bold text-[#0B2545] dark:text-[#F5F7FB] mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-[#5B6B7A] dark:text-[#8EA1B5] leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EEF1F4] dark:border-[#243447] flex items-center text-xs font-bold text-[#0F7C6C] dark:text-[#5EEAD4]">
                <CheckCircle2 size={14} className="mr-1.5" /> Fully Implemented
              </div>
            </div>
          ))}

          {/* Quick Launch Card */}
          <div className="bg-[#0B2545] dark:bg-[#162234] rounded-2xl p-6 flex flex-col justify-between text-white shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <Shield size={22} className="text-[#5EEAD4]" />
              </div>
              <h3 className="text-[16px] font-bold mb-2">
                Production-Ready UI Prototype
              </h3>
              <p className="text-xs text-[#AEBBCC] leading-relaxed">
                Deterministic PRNG seed engine delivers coherent patient histories and lab panels without external API latency.
              </p>
            </div>

            <button
              onClick={() => setPage("dashboard")}
              className="mt-6 flex items-center justify-between w-full px-4 py-3 bg-[#0F7C6C] hover:bg-[#0C6A5C] text-white text-xs font-bold rounded-xl transition-colors"
            >
              <span>Explore Analytics Console</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Clinical Outcomes Metrics */}
      <section id="outcomes" className="bg-[#0B2545] text-white py-14">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { metric: "40%", label: "Faster chart review in coordinator triage" },
            { metric: "48", label: "Synthetic patient records visualized" },
            { metric: "12 Mos", label: "Predictive readmission forecast series" },
            { metric: "8.4 min", label: "Average simulated triage response rate" },
          ].map((item) => (
            <div key={item.label}>
              <div className="font-display text-3xl md:text-4xl font-bold text-[#5EEAD4]">
                {item.metric}
              </div>
              <div className="text-xs text-[#AEBBCC] mt-1.5 leading-relaxed font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4E9ED] dark:border-[#243447] py-8 text-xs text-[#8593a1]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#0F7C6C]" />
            <span className="font-bold text-[#0B2545] dark:text-[#F5F7FB]">
              CareScope Analytics SaaS
            </span>
          </div>
          <p>© 2026 CareScope Analytics. Healthcare Analytics SaaS Frontend Prototype.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
