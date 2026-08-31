/**
 * @file MobileNav.jsx
 * @description Accessible mobile bottom navigation bar with theme and profile shortcuts.
 */

import { User, Sun, Moon } from "lucide-react";
import useApp from "../../hooks/useApp";
import useTheme from "../../hooks/useTheme";
import { NAV_ITEMS } from "../../constants/navConfig";

export function MobileNav() {
  const { page, setPage } = useApp();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 ${
        isDark ? "bg-[#07121E] border-[#243447]" : "bg-[#0B2545] border-white/10"
      } border-t flex items-stretch shadow-lg`}
      aria-label="Mobile Navigation"
    >
      {NAV_ITEMS.map((item) => {
        const active = page === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            aria-label={item.label}
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
        onClick={() => setPage("profile")}
        aria-label="Coordinator Profile"
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
          page === "profile" ? "text-white font-bold" : "text-[#8593a1] hover:text-white"
        }`}
      >
        <User size={18} strokeWidth={page === "profile" ? 2.5 : 2} aria-hidden="true" />
        <span>Profile</span>
      </button>
    </nav>
  );
}

export default MobileNav;
