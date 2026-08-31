/**
 * @file ScheduleCalendar.jsx
 * @description Interactive 7-day responsive clinic schedule matrix with mobile day switcher.
 */

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Filter, Clock } from "lucide-react";
import useApp from "../../hooks/useApp";
import { DAY_LABELS, HOURS, DEPARTMENTS } from "../../constants/medicalConstants";
import AppointmentModal from "./AppointmentModal";

export function ScheduleCalendar() {
  const { appointments, setSelectedPatientId, setPage, patients } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDayMobile, setActiveDayMobile] = useState(0);
  const [deptFilter, setDeptFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter appointments by department
  const filteredAppointments = useMemo(() => {
    if (deptFilter === "All") return appointments;
    return appointments.filter((a) => a.department === deptFilter);
  }, [appointments, deptFilter]);

  // Index appointments into grid map
  const grid = useMemo(() => {
    const map = {};
    filteredAppointments.forEach((a) => {
      const key = `${a.dayIdx}-${a.hour}`;
      map[key] = map[key] || [];
      map[key].push(a);
    });
    return map;
  }, [filteredAppointments]);

  const handlePatientClick = (patientName) => {
    const found = patients.find((p) => p.name === patientName);
    if (found) {
      setSelectedPatientId(found.id);
      setPage("timeline");
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-4">
        {/* Week navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            aria-label="Previous week"
            className="w-8 h-8 rounded-lg border border-[#E4E9ED] dark:border-[#243447] bg-[#F7F9FA] dark:bg-[#1C2C42] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#243447] transition-colors"
          >
            <ChevronLeft size={16} className="text-[#0B2545] dark:text-[#F5F7FB]" />
          </button>
          <div className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] w-36 text-center font-mono">
            {weekOffset === 0
              ? "Current Week"
              : weekOffset > 0
                ? `+${weekOffset} Week(s) Ahead`
                : `${Math.abs(weekOffset)} Week(s) Ago`}
          </div>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            aria-label="Next week"
            className="w-8 h-8 rounded-lg border border-[#E4E9ED] dark:border-[#243447] bg-[#F7F9FA] dark:bg-[#1C2C42] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#243447] transition-colors"
          >
            <ChevronRight size={16} className="text-[#0B2545] dark:text-[#F5F7FB]" />
          </button>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="text-xs text-[#0F7C6C] dark:text-[#5EEAD4] font-semibold underline ml-1"
            >
              Today
            </button>
          )}
        </div>

        {/* Filters and CTA */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-[#5B6B7A] dark:text-[#8EA1B5]">
            <Filter size={13} />
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              aria-label="Filter by department"
              className="h-9 px-2.5 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#0F7C6C] text-white text-xs font-semibold px-4 h-9 rounded-xl hover:bg-[#0C6A5C] transition-colors shadow-xs"
          >
            <Plus size={15} /> Book Appointment
          </button>
        </div>
      </div>

      {/* Mobile Day Tabs */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto pb-1">
        {DAY_LABELS.map((d, idx) => (
          <button
            key={d}
            onClick={() => setActiveDayMobile(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeDayMobile === idx
                ? "bg-[#0B2545] text-white"
                : "bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] text-[#5B6B7A] dark:text-[#8EA1B5]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Grid Container */}
      <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl overflow-hidden shadow-xs">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Header row */}
            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-[#E4E9ED] dark:border-[#243447] bg-[#F7F9FA] dark:bg-[#1C2C42]">
              <div className="p-2.5 text-center text-[10.5px] font-mono text-[#8593a1] flex items-center justify-center">
                <Clock size={13} />
              </div>
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="text-center py-2.5 text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] border-l border-[#EEF1F4] dark:border-[#243447]"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Time Slot Rows */}
            {HOURS.map((h) => (
              <div
                key={h}
                className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-[#EEF1F4] dark:border-[#243447]/60 min-h-[58px]"
              >
                <div className="text-[11px] text-[#8593a1] font-mono p-2 text-right">
                  {String(h).padStart(2, "0")}:00
                </div>

                {DAY_LABELS.map((d, dIdx) => {
                  const cell = grid[`${dIdx}-${h}`] || [];
                  return (
                    <div
                      key={d}
                      className="border-l border-[#EEF1F4] dark:border-[#243447]/60 p-1 flex flex-col gap-1.5"
                    >
                      {cell.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => handlePatientClick(a.patient)}
                          className="bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 border border-[#0F7C6C]/30 rounded-lg p-1.5 text-left text-[10.5px] leading-tight hover:shadow-sm transition-all group"
                          title={`${a.patient} (${a.type}) with ${a.doctor} · Click to view timeline`}
                        >
                          <div className="font-bold text-[#0B2545] dark:text-[#F5F7FB] group-hover:text-[#0F7C6C] truncate">
                            {a.patient}
                          </div>
                          <div className="text-[9.5px] text-[#5B6B7A] dark:text-[#8EA1B5] truncate mt-0.5">
                            {a.type} · {a.doctor}
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Single Day View */}
        <div className="md:hidden divide-y divide-[#EEF1F4] dark:divide-[#243447]">
          {HOURS.map((h) => {
            const cell = grid[`${activeDayMobile}-${h}`] || [];
            return (
              <div key={h} className="p-3 flex items-start gap-3">
                <div className="font-mono text-xs text-[#8593a1] font-semibold w-12 shrink-0 pt-1">
                  {String(h).padStart(2, "0")}:00
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  {cell.length > 0 ? (
                    cell.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => handlePatientClick(a.patient)}
                        className="bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 border border-[#0F7C6C]/30 rounded-xl p-2 cursor-pointer"
                      >
                        <div className="font-bold text-xs text-[#0B2545] dark:text-[#F5F7FB]">
                          {a.patient}
                        </div>
                        <div className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-0.5">
                          {a.type} · {a.doctor} · {a.department}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[11px] text-[#AEBBCC] italic pt-1">
                      No consultations booked
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default ScheduleCalendar;
