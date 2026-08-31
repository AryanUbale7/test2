/**
 * @file PageShell.jsx
 * @description Standard page container layout with skip link, topbar, and main content boundary.
 */

import { Topbar } from "./Topbar";
import useTheme from "../../hooks/useTheme";

export function PageShell({ title, sub, children }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex-1 min-w-0 pb-24 md:pb-8 flex flex-col ${
        isDark ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#F7F9FA] text-[#0B2545]"
      } transition-colors min-h-screen`}
    >
      {/* Skip to Main Content Link for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0F7C6C] text-white font-semibold rounded-lg shadow-lg"
      >
        Skip to main content
      </a>

      <Topbar title={title} sub={sub} />

      <main
        id="main-content"
        className="px-4 sm:px-6 md:px-8 py-6 max-w-[1440px] w-full mx-auto flex-1 focus:outline-none"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}

export default PageShell;
