/**
 * @file TreatmentTimeline.jsx
 * @description Requirement 2: Treatment Timeline — Structured chronological care history with event filtering.
 */

import { useState, useMemo } from "react";
import { Plus, Filter } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { genTimeline } from "../../services/mockDataEngine";
import useApp from "../../hooks/useApp";

export function TreatmentTimeline({ onAddEvent }) {
  const { selectedPatientId } = useApp();
  const rawEvents = useMemo(() => genTimeline(selectedPatientId), [selectedPatientId]);
  const [filterType, setFilterType] = useState("All");

  const events = useMemo(() => {
    if (filterType === "All") return rawEvents;
    return rawEvents.filter((ev) => ev.type === filterType);
  }, [rawEvents, filterType]);

  const eventTypes = ["All", "Admission", "Lab Test", "Diagnosis", "Medication", "Procedure", "Discharge"];

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <SectionHeading
          eyebrow="Chronological Care Plan"
          title="Treatment History Timeline"
          sub="Audited care milestones, physician orders, and diagnostic notes"
          className="mb-0"
        />

        <div className="flex items-center gap-2 flex-wrap">
          {/* Event Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#5B6B7A] dark:text-[#8EA1B5]">
            <Filter size={13} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter events by category"
              className="h-8 px-2 rounded-lg border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none"
            >
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {onAddEvent && (
            <button
              onClick={onAddEvent}
              className="flex items-center gap-1 bg-[#0B2545] text-white text-xs font-semibold px-3 h-8 rounded-lg hover:bg-[#162C48] transition-colors"
            >
              <Plus size={14} /> Add Event
            </button>
          )}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-8 space-y-6">
        {/* Continuous timeline vertical line */}
        <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-[#E4E9ED] dark:bg-[#243447]" />

        {events.map((ev) => (
          <div key={ev.id} className="relative group">
            {/* Event Icon Pin */}
            <div
              className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-[#E7F3F0] dark:bg-[#1C2C42] border-2 border-white dark:border-[#111C2E] ring-1 ring-[#0F7C6C]/40 flex items-center justify-center shadow-xs"
            >
              <ev.icon size={13} style={{ color: ev.color || "#0F7C6C" }} aria-hidden="true" />
            </div>

            {/* Event Content Box */}
            <div className="bg-[#F7F9FA] dark:bg-[#1C2C42] border border-[#E4E9ED] dark:border-[#243447] rounded-xl p-3.5 hover:border-[#0F7C6C]/40 transition-colors">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                    {ev.type}
                  </span>
                  <span className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5]">
                    · {ev.physician}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold text-[#0F7C6C] dark:text-[#5EEAD4]">
                  {ev.date}
                </span>
              </div>

              <p className="text-xs text-[#5B6B7A] dark:text-[#8EA1B5] leading-relaxed">
                {ev.note}
              </p>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="p-8 text-center text-xs text-[#8593a1]">
            No timeline events match the selected filter category.
          </div>
        )}
      </div>
    </div>
  );
}

export default TreatmentTimeline;
