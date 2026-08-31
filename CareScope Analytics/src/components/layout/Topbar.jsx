/**
 * @file Topbar.jsx
 * @description Accessible header bar with live status, global search, and alerts.
 */

import { useState } from "react";
import { Search, Bell, X } from "lucide-react";
import useApp from "../../hooks/useApp";
import useTheme from "../../hooks/useTheme";

export function Topbar({ title, sub }) {
  const { searchQuery, setSearchQuery, patients, setSelectedPatientId, setPage } = useApp();
  const { isDark } = useTheme();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const searchResults = searchQuery.trim()
    ? patients.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.department.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectPatient = (pId) => {
    setSelectedPatientId(pId);
    setPage("timeline");
    setShowSearchModal(false);
    setSearchQuery("");
  };

  return (
    <header
      className={`sticky top-0 z-20 ${
        isDark ? "bg-[#07121E]/95 border-[#243447]" : "bg-white/95 border-[#E4E9ED]"
      } backdrop-blur border-b px-5 md:px-8 h-16 flex items-center justify-between gap-4 transition-colors`}
    >
      {/* Title & Subtitle */}
      <div>
        <h1
          className={`text-[16px] font-bold ${
            isDark ? "text-[#F5F7FB]" : "text-[#0B2545]"
          } leading-none`}
        >
          {title}
        </h1>
        {sub && (
          <p
            className={`text-[12px] ${
              isDark ? "text-[#8EA1B5]" : "text-[#5B6B7A]"
            } mt-1`}
          >
            {sub}
          </p>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Live Status Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 text-[#0F7C6C] dark:text-[#5EEAD4] text-[11px] font-medium" role="status" aria-live="polite">
          <span className="w-2 h-2 rounded-full bg-[#0F7C6C] pulse-dot" />
          <span>Live telemetry active</span>
        </div>

        {/* Global Search Bar */}
        <div className="relative">
          <div
            className={`flex items-center gap-2 ${
              isDark ? "bg-[#111C2E] border-[#243447]" : "bg-[#F7F9FA] border-[#E4E9ED]"
            } border rounded-full px-3.5 h-9 w-48 sm:w-64 transition-all focus-within:w-72 focus-within:border-[#0F7C6C]`}
          >
            <Search size={14} className={isDark ? "text-[#8EA1B5]" : "text-[#8593a1]"} />
            <input
              type="search"
              aria-label="Search patients, conditions or departments"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchModal(true)}
              placeholder="Search patients, depts..."
              className={`bg-transparent outline-none text-[13px] ${
                isDark
                  ? "text-[#F5F7FB] placeholder:text-[#8EA1B5]"
                  : "text-[#0B2545] placeholder:text-[#8593a1]"
              } w-full`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="text-[#8593a1] hover:text-[#0B2545]"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Quick Search Dropdown Results */}
          {showSearchModal && searchQuery.trim() && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowSearchModal(false)}
              />
              <div
                className={`absolute right-0 top-11 z-50 w-80 rounded-2xl border shadow-xl p-2 ${
                  isDark ? "bg-[#111C2E] border-[#243447]" : "bg-white border-[#E4E9ED]"
                }`}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5]">
                  Patient matches ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {searchResults.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPatient(p.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors ${
                          isDark ? "hover:bg-[#1C2C42]" : "hover:bg-[#F7F9FA]"
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-[#0B2545] dark:text-[#F5F7FB]">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5]">
                            {p.id} · {p.department}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-[#0F7C6C] dark:text-[#5EEAD4]">
                          View timeline &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-[#5B6B7A] dark:text-[#8EA1B5]">
                    No matching patient records found.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen((v) => !v)}
            aria-label="View system alerts"
            aria-expanded={notificationsOpen}
            className={`w-9 h-9 rounded-full ${
              isDark ? "bg-[#111C2E] border-[#243447]" : "bg-white border-[#E4E9ED]"
            } border flex items-center justify-center relative hover:bg-[#F7F9FA] dark:hover:bg-[#1E293B] transition-colors focus-visible:ring-2 focus-visible:ring-[#0F7C6C]`}
          >
            <Bell size={15} className={isDark ? "text-[#F5F7FB]" : "text-[#0B2545]"} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B8752F]" />
          </button>

          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
              />
              <div
                className={`absolute right-0 top-11 z-50 w-72 rounded-2xl border shadow-xl p-3 ${
                  isDark ? "bg-[#111C2E] border-[#243447]" : "bg-white border-[#E4E9ED]"
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#EEF1F4] dark:border-[#243447] mb-2">
                  <span className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                    Clinical Alerts
                  </span>
                  <span className="text-[10px] text-[#0F7C6C] font-semibold">2 new</span>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#FBF0E4] dark:bg-[#B8752F]/20 text-[#B8752F] dark:text-[#FDBA74]">
                    <div className="font-semibold">Bed Capacity Warning</div>
                    <div className="text-[11px] mt-0.5">Emergency department reached 86% capacity.</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 text-[#0F7C6C] dark:text-[#5EEAD4]">
                    <div className="font-semibold">Diagnostic Report Ready</div>
                    <div className="text-[11px] mt-0.5">Lab panel compiled for PT-1002 (Sofia Novak).</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
