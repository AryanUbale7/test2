/**
 * @file DiagnosticReportsList.jsx
 * @description Requirement 2: Diagnostic Reports — Expandable lab & diagnostic panels unique per patient.
 */

import { useState, useMemo } from "react";
import { ChevronDown, FlaskConical, ScanLine, Activity, Download } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import Badge from "../common/Badge";
import { genReports } from "../../services/mockDataEngine";
import useApp from "../../hooks/useApp";
import { exportToCSV } from "../../services/exportService";

export function DiagnosticReportsList() {
  const { selectedPatientId, showToast } = useApp();
  const reports = useMemo(() => genReports(selectedPatientId), [selectedPatientId]);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (reportId) => {
    setExpanded((prev) => ({ ...prev, [reportId]: !prev[reportId] }));
  };

  const getReportIcon = (name) => {
    if (name.includes("Scan") || name.includes("MRI") || name.includes("X-Ray")) {
      return ScanLine;
    }
    if (name.includes("ECG")) {
      return Activity;
    }
    return FlaskConical;
  };

  const handleExportLab = (report) => {
    const rows = report.metrics.map((m) => ({
      Report: report.name,
      PatientId: selectedPatientId,
      Date: report.date,
      Physician: report.reportedBy,
      Parameter: m.param,
      Value: m.value,
      Unit: m.unit,
      ReferenceRange: m.range,
      Flag: m.flag,
    }));
    exportToCSV(`${selectedPatientId}_${report.name.replace(/\s+/g, "_")}`, rows);
    showToast(`Exported ${report.name} lab data`, "success");
  };

  return (
    <div className="space-y-4">
      <SectionHeading
        eyebrow="Diagnostic Telemetry"
        title="Diagnostic & Lab Panels"
        sub="Patient-specific laboratory assays, metabolic screens, and radiology impressions"
      />

      <div className="flex flex-col gap-3">
        {reports.map((r) => {
          const isOpen = !!expanded[r.id];
          const Icon = getReportIcon(r.name);

          return (
            <div
              key={r.id}
              className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-4.5 shadow-xs transition-all"
            >
              {/* Card Header & Toggle */}
              <button
                onClick={() => toggleExpand(r.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F7C6C] rounded-xl"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] dark:bg-[#1C2C42] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#0B2545] dark:text-[#93C5FB]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13.5px] font-bold text-[#0B2545] dark:text-[#F5F7FB] truncate">
                      {r.name}
                    </h4>
                    <div className="text-[11.5px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-0.5">
                      {r.department} · <span className="font-mono">{r.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge tone={r.status === "Normal" ? "teal" : "amber"}>
                    {r.status}
                  </Badge>
                  <ChevronDown
                    size={16}
                    className={`text-[#8593a1] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Diagnostic Metrics Breakdown */}
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-[#EEF1F4] dark:border-[#243447] space-y-4">
                  <div className="p-3 rounded-xl bg-[#F7F9FA] dark:bg-[#1C2C42] text-xs text-[#5B6B7A] dark:text-[#8EA1B5] leading-relaxed">
                    <span className="font-bold text-[#0B2545] dark:text-[#F5F7FB]">Clinical Summary: </span>
                    {r.summary}
                    <div className="mt-1 text-[11px] text-[#8593a1]">
                      Attending Pathologist: {r.reportedBy}
                    </div>
                  </div>

                  {/* Laboratory Parameters Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#EEF1F4] dark:border-[#243447] text-[10.5px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5]">
                          <th className="pb-2">Parameter</th>
                          <th className="pb-2">Result Value</th>
                          <th className="pb-2">Reference Bounds</th>
                          <th className="pb-2 text-right">Flag</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EEF1F4] dark:divide-[#243447]/60">
                        {r.metrics.map((m) => (
                          <tr key={m.param} className="hover:bg-[#F7F9FA] dark:hover:bg-[#1C2C42]/50">
                            <td className="py-2 font-medium text-[#0B2545] dark:text-[#F5F7FB]">
                              {m.param}
                            </td>
                            <td className="py-2 font-mono font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                              {m.value} <span className="text-[11px] font-normal text-[#8593a1]">{m.unit}</span>
                            </td>
                            <td className="py-2 font-mono text-[#5B6B7A] dark:text-[#8EA1B5]">
                              {m.range} {m.unit}
                            </td>
                            <td className="py-2 text-right">
                              <Badge
                                tone={
                                  m.flag === "Normal"
                                    ? "teal"
                                    : m.flag === "High"
                                      ? "amber"
                                      : "red"
                                }
                                size="sm"
                              >
                                {m.flag}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Diagnostic Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEF1F4] dark:border-[#243447]">
                    <button
                      onClick={() => handleExportLab(r)}
                      className="flex items-center gap-1.5 px-3 h-8 rounded-lg border border-[#E4E9ED] dark:border-[#243447] text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] hover:bg-gray-50 dark:hover:bg-[#1C2C42]"
                    >
                      <Download size={13} /> Export Panel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiagnosticReportsList;
