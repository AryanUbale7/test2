/**
 * @file DepartmentOccupancyList.jsx
 * @description Departmental bed occupancy and clinical resource allocation breakdown.
 */

import SectionHeading from "../common/SectionHeading";
import { DEPARTMENTS } from "../../constants/medicalConstants";

export function DepartmentOccupancyList() {
  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 flex flex-col justify-between h-full">
      <div>
        <SectionHeading
          eyebrow="Hospital Capacity"
          title="Department Bed Occupancy"
          sub="Live bed utilization and capacity headroom across 8 wards"
        />

        <div className="flex flex-col gap-3.5 mt-4">
          {DEPARTMENTS.map((d) => {
            const pct = Math.round((d.baseOccupancy / d.capacity) * 100);
            const isHigh = pct > 85;
            const isMedium = pct > 70 && pct <= 85;

            return (
              <div key={d.id} className="flex items-center gap-3">
                <div className="w-32 shrink-0 text-[12.5px] font-medium text-[#0B2545] dark:text-[#F5F7FB] flex items-center gap-2">
                  <d.icon size={14} className="text-[#5B6B7A] dark:text-[#8EA1B5]" aria-hidden="true" />
                  <span className="truncate">{d.name}</span>
                </div>

                <div className="flex-1 h-2.5 rounded-full bg-[#EEF1F4] dark:bg-[#1C2C42] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: isHigh ? "#B33A3A" : isMedium ? "#B8752F" : "#0F7C6C",
                    }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${d.name} occupancy: ${pct}%`}
                  />
                </div>

                <div className="w-20 text-right flex items-center justify-end gap-1.5 font-mono text-xs">
                  <span className="text-[#5B6B7A] dark:text-[#8EA1B5]">
                    {d.baseOccupancy}/{d.capacity}
                  </span>
                  <span
                    className={`font-semibold ${
                      isHigh
                        ? "text-[#B33A3A] dark:text-[#FCA5A5]"
                        : isMedium
                          ? "text-[#B8752F] dark:text-[#FDBA74]"
                          : "text-[#0F7C6C] dark:text-[#5EEAD4]"
                    }`}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#EEF1F4] dark:border-[#243447] flex items-center justify-between text-xs text-[#5B6B7A] dark:text-[#8EA1B5]">
        <span>Total Wards: {DEPARTMENTS.length}</span>
        <span className="font-semibold text-[#0B2545] dark:text-[#F5F7FB]">
          Aggregate Occupancy: 78%
        </span>
      </div>
    </div>
  );
}

export default DepartmentOccupancyList;
