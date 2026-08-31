/**
 * @file Sidebar.jsx
 * @description Accessible desktop sidebar navigation with React Router integration and theme toggles.
 */

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Activity, Sun, Moon, ArrowLeft } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import PulseRule from "../common/PulseRule";
import { NAV_ITEMS } from "../../constants/navConfig";

export function Sidebar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside
      className={`hidden md:flex flex-col w-[250px] shrink-0 ${
        isDark ? "bg-[#07121E] border-[#243447]" : "bg-[#0B2545] border-transparent"
      } text-white border-r min-h-screen select-none`}
      aria-label="Sidebar Navigation"
    >
      {/* Brand Header */}
      <div className="p-6 pb-4">
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7C6C] rounded-xl p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F7C6C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Activity size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-bold text-[17px] tracking-tight leading-none text-white">
              CareScope
            </div>
            <div className="text-[10px] tracking-[0.14em] uppercase text-[#0F7C6C] dark:text-[#5EEAD4] font-semibold mt-0.5">
              Analytics SaaS
            </div>
          </div>
        </Link>

        {/* Pulse divider */}
        <PulseRule color="#0F7C6C" opacity={0.35} height={18} className="mt-4" />
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 px-3 space-y-1.5 mt-2" aria-label="Main Menu">
        {NAV_ITEMS.map((item) => {
          const path = `/${item.id}`;
          const active = location.pathname === path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(path)}
              aria-current={active ? "page" : undefined}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                active
                  ? "bg-[#0F7C6C] text-white font-semibold shadow-sm"
                  : "text-[#AEBBCC] hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-[#AEBBCC]"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Theme switch & Profile preview */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-[#AEBBCC] hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">
            {isDark ? "Dark" : "Light"}
          </span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
            location.pathname === "/profile" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-[#0F7C6C] flex items-center justify-center font-display font-bold text-xs text-white">
            SS
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              Shivansh S.
            </div>
            <div className="text-[10.5px] text-[#AEBBCC] truncate">
              Lead Coordinator
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-[#8593a1] hover:text-[#AEBBCC] transition-colors"
        >
          <ArrowLeft size={13} /> Return to Landing
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
