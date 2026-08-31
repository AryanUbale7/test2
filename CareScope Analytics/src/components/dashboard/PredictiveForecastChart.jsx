/**
 * @file PredictiveForecastChart.jsx
 * @description Requirement 3: Predictive Analytics Charts (UI Only) — Readmission Forecast & AI Risk Projection.
 */

import { useMemo, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
} from "recharts";
import { Sparkles, TrendingDown } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { genReadmissionSeries } from "../../services/mockDataEngine";
import useTheme from "../../hooks/useTheme";

export function PredictiveForecastChart() {
  const { isDark } = useTheme();
  const data = useMemo(() => genReadmissionSeries(), []);
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 flex flex-col justify-between h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FBF0E4] dark:bg-[#B8752F]/20 text-[#B8752F] dark:text-[#FDBA74] text-[11px] font-bold uppercase tracking-wider mb-1">
            <Sparkles size={12} /> Predictive Analytics · UI Only
          </div>
          <SectionHeading
            title="Readmission Risk Forecast"
            sub="ML-projected 30-day readmission rates with 95% confidence interval"
            className="mb-0"
          />
        </div>

        <button
          onClick={() => setShowConfidenceBands((s) => !s)}
          className={`self-start sm:self-center text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
            showConfidenceBands
              ? "bg-[#0B2545] dark:bg-[#1E293B] text-white border-transparent"
              : "bg-transparent text-[#5B6B7A] dark:text-[#8EA1B5] border-[#E4E9ED] dark:border-[#243447]"
          }`}
        >
          {showConfidenceBands ? "CI Bands: On" : "CI Bands: Off"}
        </button>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ left: -20, top: 10, right: 10, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#243447" : "#E4E9ED"}
              vertical={false}
            />
            <XAxis
              dataKey="month"
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
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />

            {showConfidenceBands && (
              <Area
                type="monotone"
                dataKey="upperCI"
                name="Confidence Range"
                stroke="none"
                fill="#B8752F"
                fillOpacity={0.12}
                connectNulls
              />
            )}

            <Line
              type="monotone"
              name="Actual (Historical)"
              dataKey="actual"
              stroke="#0B2545"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#0B2545" }}
              connectNulls
            />
            <Line
              type="monotone"
              name="Predicted (AI Forecast)"
              dataKey="predicted"
              stroke="#B8752F"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: "#B8752F" }}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insight banner */}
      <div className="mt-4 p-3 rounded-xl bg-[#E7F3F0] dark:bg-[#0F7C6C]/15 border border-[#0F7C6C]/20 flex items-start gap-2.5">
        <TrendingDown size={16} className="text-[#0F7C6C] dark:text-[#5EEAD4] shrink-0 mt-0.5" />
        <div className="text-xs text-[#0B2545] dark:text-[#F5F7FB]">
          <span className="font-bold text-[#0F7C6C] dark:text-[#5EEAD4]">Projected 18.4% reduction:</span> Enhanced discharge follow-up protocol is forecast to lower readmissions across Cardiology and General Medicine through Q4 2026.
        </div>
      </div>
    </div>
  );
}

export default PredictiveForecastChart;
