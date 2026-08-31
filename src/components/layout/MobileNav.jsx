/**
 * @file MobileNav.jsx
 * @description Accessible mobile bottom navigation bar with React Router integration and theme toggles.
 */

import { useLocation, useNavigate } from "react-router-dom";
import { User, Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import { NAV_ITEMS } from "../../constants/navConfig";

export function MobileNav() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 ${
        isDark ? "bg-[#07121E] border-[#243447]" : "bg-[#0B2545] border-white/10"
      } border-t flex items-stretch shadow-lg`}
      aria-label="Mobile Navigation"
    >
      {NAV_ITEMS.map((item) => {
        const path = `/${item.id}`;
        const active = location.pathname === path;

        return (
          <button
            key={item.id}
            onClick={() => navigate(path)}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
              active ? "text-white font-bold" : "text-[#8593a1] hover:text-white"
            }`}
          >
            <item.icon size={18} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
          isDark ? "text-[#F5F7FB]" : "text-[#8593a1] hover:text-white"
        }`}
      >
        {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        <span>{isDark ? "Light" : "Dark"}</span>
      </button>

      <button
        onClick={() => navigate("/profile")}
        aria-label="Coordinator Profile"
        aria-current={location.pathname === "/profile" ? "page" : undefined}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
          location.pathname === "/profile" ? "text-white font-bold" : "text-[#8593a1] hover:text-white"
        }`}
      >
        <User size={18} strokeWidth={location.pathname === "/profile" ? 2.5 : 2} aria-hidden="true" />
        <span>Profile</span>
      </button>
    </nav>
  );
}

export default MobileNav;
