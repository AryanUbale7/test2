/**
 * @file Sidebar.jsx
 * @description Accessible desktop sidebar navigation for CareScope Analytics SaaS.
 */

import {
  Activity,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import useApp from "../../hooks/useApp";
import useTheme from "../../hooks/useTheme";
import PulseRule from "../common/PulseRule";
import { NAV_ITEMS } from "../../constants/navConfig";

export function Sidebar() {
  const { page, setPage } = useApp();
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside
      className={`hidden md:flex w-60 shrink-0 flex-col ${
        isDark ? "bg-[#07121E] text-[#F5F7FB] border-r border-[#243447]" : "bg-[#0B2545] text-white"
      } h-screen sticky top-0 z-30`}
      aria-label="Main Navigation"
    >
      {/* Brand Header */}
      <button
        onClick={() => setPage("landing")}
        className="flex items-center gap-2.5 px-6 h-16 border-b border-white/10 text-left focus-visible:ring-2 focus-visible:ring-[#0F7C6C]"
        aria-label="CareScope Home"
      >
        <div className="w-8 h-8 rounded-lg bg-[#0F7C6C] flex items-center justify-center shrink-0 shadow-sm">
          <Activity size={17} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <span className="font-display text-[17px] font-bold tracking-tight text-white">
            CareScope
          </span>
          <span className="text-[10px] text-[#AEBBCC] block font-mono">SaaS Analytics</span>
        </div>
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1.5" role="tablist">
        {NAV_ITEMS.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={active}
              onClick={() => setPage(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
                active
                  ? "bg-white/15 text-white shadow-sm font-semibold"
                  : isDark
                    ? "text-[#AEBBCC] hover:bg-white/5 hover:text-white"
                    : "text-[#AEBBCC] hover:bg-white/10 hover:text-white"
              } focus-visible:ring-2 focus-visible:ring-[#0F7C6C]`}
            >
              <item.icon size={17} strokeWidth={2} aria-hidden="true" />
              <span>{item.label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-4 rounded-full bg-[#0F7C6C]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Signature Pulse Divider */}
      <div className="px-4 pb-3">
        <PulseRule color={isDark ? "#243447" : "#3A5375"} opacity={0.9} height={14} />
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`mx-3 mb-3 flex items-center justify-between rounded-xl border px-3 py-2.5 text-[12.5px] font-medium transition-colors ${
          isDark
            ? "border-[#243447] bg-[#111C2E] text-[#F5F7FB] hover:bg-[#162234]"
            : "border-white/10 bg-white/10 text-white hover:bg-white/15"
        } focus-visible:ring-2 focus-visible:ring-[#0F7C6C]`}
      >
        <span className="flex items-center gap-2">
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
          {isDark ? "Light mode" : "Dark mode"}
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.2em] ${
            isDark ? "text-[#8EA1B5]" : "text-[#AEBBCC]"
          }`}
        >
          Toggle
        </span>
      </button>

      {/* User Coordinator Profile */}
      <button
        onClick={() => setPage("profile")}
        aria-label="View Care Coordinator Profile"
        className={`px-5 py-4 border-t border-white/10 flex items-center gap-3 text-left hover:bg-white/5 transition-colors ${
          page === "profile" ? "bg-white/15" : ""
        } focus-visible:ring-2 focus-visible:ring-[#0F7C6C]`}
      >
        <div className="w-8 h-8 rounded-full bg-[#0F7C6C] flex items-center justify-center text-[12px] font-bold text-white shrink-0 shadow">
          SS
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-semibold text-white truncate">
            Shivansh Shrivastav
          </div>
          <div className="text-[11px] text-[#AEBBCC] truncate">
            Care Coordinator
          </div>
        </div>
        <ChevronRight size={14} className="text-[#AEBBCC] shrink-0" />
      </button>
    </aside>
  );
}

export default Sidebar;
