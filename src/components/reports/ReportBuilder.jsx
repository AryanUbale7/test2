/**
 * @file ReportBuilder.jsx
 * @description Requirement 5: Customizable Healthcare Reports — Live report builder with dynamic filtering & exporting.
 */

import { useState, useMemo } from "react";
import { Download, BarChart3, AreaChart as AreaIcon, LineChart as LineIcon } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import ReportChart from "./ReportChart";
import { DEPARTMENTS, MONTHS } from "../../constants/medicalConstants";
import { REPORT_METRICS } from "../../services/mockDataEngine";
import { exportToCSV, exportToJSON } from "../../services/exportService";
import useApp from "../../hooks/useApp";

export function ReportBuilder() {
  const { showToast } = useApp();
  const [metric, setMetric] = useState("Admissions");
  const [dept, setDept] = useState("All Departments");
  const [chartType, setChartType] = useState("area");

  const chartData = useMemo(() => {
    const rawMetric = REPORT_METRICS[metric] || REPORT_METRICS.Admissions;
    return MONTHS.map((m, i) => {
      let multiplier = 1;
      if (dept !== "All Departments") {
        multiplier = 0.6 + ((dept.charCodeAt(0) * (i + 1)) % 40) / 100;
      }
      return {
        month: m,
        value: Math.round(rawMetric[i] * multiplier),
      };
    });
  }, [metric, dept]);

  const handleExportCSV = () => {
    const rows = chartData.map((d) => ({
      Month: d.month,
      Metric: metric,
      Department: dept,
      Value: d.value,
    }));
    exportToCSV(`${metric.replace(/\s+/g, "_")}_${dept.replace(/\s+/g, "_")}`, rows);
    showToast(`Exported ${metric} data as CSV`, "success");
  };

  const handleExportJSON = () => {
    exportToJSON(`${metric.replace(/\s+/g, "_")}_Report`, {
      metric,
      department: dept,
      chartType,
      data: chartData,
      generatedAt: new Date().toISOString(),
    });
    showToast(`Exported ${metric} data as JSON`, "success");
  };

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 mb-8 shadow-xs">
      <SectionHeading
        eyebrow="Custom Report Engine"
        title="Dynamic Healthcare Analytics Builder"
        sub="Configure metrics, department scopes, and visualization models with instant live chart synthesis"
      />

      {/* Control Configuration Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-[#F7F9FA] dark:bg-[#1C2C42] border border-[#E4E9ED] dark:border-[#243447]">
        {/* Metric Selector */}
        <div>
          <label htmlFor="rep-metric" className="block text-[10px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5] mb-1">
            Clinical Metric
          </label>
          <select
            id="rep-metric"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#111C2E] rounded-lg h-9 px-3 text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
          >
            {Object.keys(REPORT_METRICS).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Department Scope */}
        <div>
          <label htmlFor="rep-dept" className="block text-[10px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5] mb-1">
            Department Scope
          </label>
          <select
            id="rep-dept"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#111C2E] rounded-lg h-9 px-3 text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
          >
            <option value="All Departments">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Visualization Type Toggle */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5] mb-1">
            Visual Model
          </label>
          <div className="flex items-center gap-1 bg-[#EEF1F4] dark:bg-[#111C2E] rounded-lg p-1">
            <button
              onClick={() => setChartType("area")}
              aria-label="Area chart"
              className={`flex items-center gap-1 px-2.5 h-7 rounded-md text-xs font-semibold capitalize transition-colors ${
                chartType === "area"
                  ? "bg-white dark:bg-[#1C2C42] text-[#0B2545] dark:text-[#F5F7FB] shadow-xs"
                  : "text-[#5B6B7A] dark:text-[#8EA1B5]"
              }`}
            >
              <AreaIcon size={13} /> Area
            </button>
            <button
              onClick={() => setChartType("bar")}
              aria-label="Bar chart"
              className={`flex items-center gap-1 px-2.5 h-7 rounded-md text-xs font-semibold capitalize transition-colors ${
                chartType === "bar"
                  ? "bg-white dark:bg-[#1C2C42] text-[#0B2545] dark:text-[#F5F7FB] shadow-xs"
                  : "text-[#5B6B7A] dark:text-[#8EA1B5]"
              }`}
            >
              <BarChart3 size={13} /> Bar
            </button>
            <button
              onClick={() => setChartType("line")}
              aria-label="Line chart"
              className={`flex items-center gap-1 px-2.5 h-7 rounded-md text-xs font-semibold capitalize transition-colors ${
                chartType === "line"
                  ? "bg-white dark:bg-[#1C2C42] text-[#0B2545] dark:text-[#F5F7FB] shadow-xs"
                  : "text-[#5B6B7A] dark:text-[#8EA1B5]"
              }`}
            >
              <LineIcon size={13} /> Line
            </button>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="sm:ml-auto flex items-end gap-2 self-end">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#111C2E] px-3 h-9 rounded-lg text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] hover:bg-gray-50 dark:hover:bg-[#1C2C42] transition-colors"
          >
            <Download size={13} /> CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#111C2E] px-3 h-9 rounded-lg text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] hover:bg-gray-50 dark:hover:bg-[#1C2C42] transition-colors"
          >
            <Download size={13} /> JSON
          </button>
        </div>
      </div>

      {/* Render Chart */}
      <ReportChart data={chartData} chartType={chartType} metricName={`${metric} (${dept})`} />

      <div className="text-[11.5px] text-[#8593a1] mt-3 font-mono">
        Telemetry sample interval: Jan 1 – Dec 31, 2026 · Cohort size: 48 patient records
      </div>
    </div>
  );
}

export default ReportBuilder;
