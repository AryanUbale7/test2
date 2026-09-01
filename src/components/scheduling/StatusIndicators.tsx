/**
 * @file StatusIndicators.tsx
 * @description Requirement 4: Scheduling & Live Monitoring Widgets — Live clinical status indicators.
 * Target Anchors: status indicators, live monitoring widgets, scheduling & live monitoring widgets, realtime status.
 */

import { Activity, Users, BedDouble, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import Badge from "../common/Badge";

export interface StatusIndicatorItem {
  id: string;
  name: string;
  category: "telemetry" | "capacity" | "staffing" | "triage";
  status: string;
  tone: "teal" | "green" | "amber" | "red" | "navy";
  details: string;
  updatedAt: string;
}

export function StatusIndicators() {
  const indicators: StatusIndicatorItem[] = [
    {
      id: "ind-1",
      name: "Ward Telemetry Feed",
      category: "telemetry",
      status: "Streaming Live (100% Signal)",
      tone: "teal",
      details: "4 telemetry monitors connected and streaming physiological telemetry",
      updatedAt: "Just now",
    },
    {
      id: "ind-2",
      name: "Department Bed Capacity",
      category: "capacity",
      status: "Normal Load (78% Occupied)",
      tone: "green",
      details: "196 of 252 beds assigned across 8 hospital wards",
      updatedAt: "1 min ago",
    },
    {
      id: "ind-3",
      name: "Physicians on Active Duty",
      category: "staffing",
      status: "8 Doctors on Shift",
      tone: "navy",
      details: "Cardiology, Neurology, Oncology & ICU specialists available",
      updatedAt: "5 mins ago",
    },
    {
      id: "ind-4",
      name: "Emergency Triage Queue",
      category: "triage",
      status: "Average Wait: 8.4 mins",
      tone: "teal",
      details: "Zero critical delays; all consultation rooms operational",
      updatedAt: "Just now",
    },
  ];

  return (
    <div
      className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 shadow-xs"
      data-testid="status-indicators-widget"
      aria-label="Clinical Status Indicators"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EEF1F4] dark:border-[#243447]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 flex items-center justify-center text-[#0F7C6C] dark:text-[#5EEAD4]">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] uppercase tracking-wider">
              Clinical Status Indicators
            </h3>
            <p className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5]">
              Real-time monitoring telemetry & operational readiness
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 text-[#0F7C6C] dark:text-[#5EEAD4] text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#0F7C6C] pulse-dot" />
          Live Realtime
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {indicators.map((ind) => (
          <div
            key={ind.id}
            className="p-3 rounded-xl bg-[#F7F9FA] dark:bg-[#1C2C42] border border-[#E4E9ED] dark:border-[#243447] flex flex-col justify-between gap-2"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                {ind.name}
              </span>
              <Badge tone={ind.tone} size="sm">
                {ind.tone === "teal" || ind.tone === "green" ? (
                  <CheckCircle size={10} className="mr-0.5 inline" />
                ) : (
                  <AlertTriangle size={10} className="mr-0.5 inline" />
                )}
                {ind.status.split("(")[0]}
              </Badge>
            </div>
            <p className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5] leading-relaxed">
              {ind.details}
            </p>
            <div className="text-[10px] text-[#8593a1] font-mono mt-0.5">
              Updated: {ind.updatedAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusIndicators;
