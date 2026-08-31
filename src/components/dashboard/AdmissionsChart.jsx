/**
 * @file AdmissionsChart.jsx
 * @description Interactive admissions & discharge telemetry trend chart with timeframe controls.
 */

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import SectionHeading from "../common/SectionHeading";
import { genAdmissions14D } from "../../services/mockDataEngine";
import useTheme from "../../hooks/useTheme";

export function AdmissionsChart() {
  const { isDark } = useTheme();
  const rawData = useMemo(() => genAdmissions14D(), []);
  const [timeframe, setTimeframe] = useState("14");
  const [viewMode, setViewMode] = useState("all"); // 'all' | 'admissions' | 'discharges'

  const data = useMemo(() => {
    if (timeframe === "7") return rawData.slice(7);
    return rawData;
  }, [rawData, timeframe]);

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <SectionHeading
          eyebrow="Admissions Telemetry"
          title="Patient Flow & Census Trend"
          sub="Daily inpatient admissions vs discharged patients"
          className="mb-0"
        />

        <div className="flex items-center gap-2 flex-wrap">
          {/* Timeframe selector */}
          <div className="flex items-center rounded-lg bg-[#EEF1F4] dark:bg-[#1C2C42] p-1 text-xs font-semibold">
            <button
              onClick={() => setTimeframe("7")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                timeframe === "7"
                  ? "bg-white dark:bg-[#111C2E] text-[#0B2545] dark:text-[#F5F7FB] shadow-xs"
                  : "text-[#5B6B7A] dark:text-[#8EA1B5]"
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeframe("14")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                timeframe === "14"
                  ? "bg-white dark:bg-[#111C2E] text-[#0B2545] dark:text-[#F5F7FB] shadow-xs"
                  : "text-[#5B6B7A] dark:text-[#8EA1B5]"
              }`}
            >
              14D
            </button>
          </div>

          {/* Metric toggle */}
          <div className="flex items-center rounded-lg bg-[#EEF1F4] dark:bg-[#1C2C42] p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode("all")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === "all"
                  ? "bg-white dark:bg-[#111C2E] text-[#0B2545] dark:text-[#F5F7FB] shadow-xs"
                  : "text-[#5B6B7A] dark:text-[#8EA1B5]"
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setViewMode("admissions")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                viewMode === "admissions"
                  ? "bg-white dark:bg-[#111C2E] text-[#0B2545] dark:text-[#F5F7FB] shadow-xs"
                  : "text-[#5B6B7A] dark:text-[#8EA1B5]"
              }`}
            >
              Adm
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[240px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, top: 10, right: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="admGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F7C6C" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#0F7C6C" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="disGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3A6EA5" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3A6EA5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#243447" : "#E4E9ED"}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 12,
                border: isDark ? "1px solid #243447" : "1px solid #E4E9ED",
                backgroundColor: isDark ? "#111C2E" : "#FFFFFF",
                color: isDark ? "#F5F7FB" : "#0B2545",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 6 }}
            />
            {(viewMode === "all" || viewMode === "admissions") && (
              <Area
                type="monotone"
                name="Admissions"
                dataKey="admissions"
                stroke="#0F7C6C"
                strokeWidth={2.5}
                fill="url(#admGradient)"
              />
            )}
            {(viewMode === "all" || viewMode === "discharges") && (
              <Area
                type="monotone"
                name="Discharges"
                dataKey="discharges"
                stroke="#3A6EA5"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="url(#disGradient)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdmissionsChart;
