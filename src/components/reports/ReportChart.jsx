/**
 * @file ReportChart.jsx
 * @description Dynamic multi-visualization renderer (Area, Bar, Line) for customizable healthcare reports.
 */

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useTheme from "../../hooks/useTheme";

export function ReportChart({ data, chartType = "area", metricName = "Value" }) {
  const { isDark } = useTheme();

  const tooltipStyle = {
    fontSize: 12,
    borderRadius: 12,
    border: isDark ? "1px solid #243447" : "1px solid #E4E9ED",
    backgroundColor: isDark ? "#111C2E" : "#FFFFFF",
    color: isDark ? "#F5F7FB" : "#0B2545",
  };

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "area" ? (
          <AreaChart data={data} margin={{ left: -20, top: 10, right: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="customRepG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F7C6C" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#0F7C6C" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#243447" : "#E4E9ED"} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
            <Area type="monotone" name={metricName} dataKey="value" stroke="#0F7C6C" strokeWidth={2.5} fill="url(#customRepG)" />
          </AreaChart>
        ) : chartType === "bar" ? (
          <BarChart data={data} margin={{ left: -20, top: 10, right: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#243447" : "#E4E9ED"} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
            <Bar name={metricName} dataKey="value" fill="#0B2545" radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ left: -20, top: 10, right: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#243447" : "#E4E9ED"} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: isDark ? "#8EA1B5" : "#8593a1" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
            <Line type="monotone" name={metricName} dataKey="value" stroke="#B8752F" strokeWidth={2.5} dot={{ r: 4, fill: "#B8752F" }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default ReportChart;
