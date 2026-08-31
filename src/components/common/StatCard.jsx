/**
 * @file StatCard.jsx
 * @description KPI Metric Summary Card with trending deltas and accessible labels.
 */

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaTone = "up",
  suffix,
  className = "",
}) {
  return (
    <div
      className={`bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 flex flex-col justify-between gap-3 min-w-0 transition-shadow hover:shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] dark:bg-[#1C2C42] flex items-center justify-center">
          <Icon size={18} className="text-[#0B2545] dark:text-[#93C5FD]" strokeWidth={2} />
        </div>
        {delta && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
              deltaTone === "up"
                ? "bg-[#E7F3F0] text-[#0F7C6C] dark:bg-[#0F7C6C]/20 dark:text-[#5EEAD4]"
                : "bg-[#FBEAEA] text-[#B33A3A] dark:bg-[#B33A3A]/20 dark:text-[#FCA5A5]"
            }`}
          >
            {deltaTone === "up" ? (
              <ArrowUpRight size={13} aria-hidden="true" />
            ) : (
              <ArrowDownRight size={13} aria-hidden="true" />
            )}
            {delta}
          </span>
        )}
      </div>
      <div>
        <div className="font-mono text-2xl font-semibold text-[#0B2545] dark:text-[#F5F7FB] tracking-tight">
          {value}
          {suffix && <span className="text-sm font-normal text-[#8593a1] ml-1">{suffix}</span>}
        </div>
        <div className="text-[13px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-0.5 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default StatCard;
