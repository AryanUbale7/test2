/**
 * @file ReportDetailModal.jsx
 * @description Accessible dialog with comprehensive clinical analytics breakdown and export actions.
 */

import { Download, Printer, CheckCircle2, AlertCircle } from "lucide-react";
import Modal from "../common/Modal";
import Badge from "../common/Badge";
import { exportToCSV, exportToPDF } from "../../services/exportService";
import useApp from "../../hooks/useApp";

export function ReportDetailModal({ report, onClose }) {
  const { showToast } = useApp();

  if (!report) return null;

  const handleExportPDF = () => {
    exportToPDF(report.title);
    showToast(`Exported "${report.title}" as PDF`, "success");
  };

  const handleExportCSV = () => {
    const rows = report.kpis.map((k) => ({
      Report: report.title,
      Department: report.dept,
      Period: report.period,
      Metric: k.label,
      Value: k.value,
      Unit: k.unit,
      Status: report.status,
      Date: report.date,
    }));
    exportToCSV(`${report.title.replace(/\s+/g, "_")}_Export`, rows);
    showToast(`Exported "${report.title}" as CSV`, "success");
  };

  return (
    <Modal
      isOpen={!!report}
      onClose={onClose}
      title={report.title}
      subtitle={`${report.dept} · Reporting Period: ${report.period}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={report.status === "Ready" ? "teal" : "amber"}>
            {report.status === "Ready" ? (
              <CheckCircle2 size={12} className="inline mr-1" />
            ) : (
              <AlertCircle size={12} className="inline mr-1" />
            )}
            {report.status}
          </Badge>
          <Badge tone="navy">Generated {report.date}</Badge>
          <Badge tone="navy">Requested by {report.requestedBy}</Badge>
        </div>

        {/* Executive Summary */}
        <div className="p-4 rounded-xl bg-[#F7F9FA] dark:bg-[#1C2C42] border border-[#E4E9ED] dark:border-[#243447]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] dark:text-[#F5F7FB] mb-1">
            Executive Summary
          </h4>
          <p className="text-xs text-[#5B6B7A] dark:text-[#8EA1B5] leading-relaxed">
            {report.description}
          </p>
        </div>

        {/* Key Metrics KPI Breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2545] dark:text-[#F5F7FB] mb-3">
            Audited Key Performance Indicators
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {report.kpis.map((k) => (
              <div
                key={k.label}
                className="bg-[#F7F9FA] dark:bg-[#1C2C42] border border-[#E4E9ED] dark:border-[#243447] rounded-xl p-3 flex flex-col justify-between"
              >
                <div className="font-mono text-lg font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                  {k.value}
                  <span className="text-xs font-normal text-[#8593a1] ml-0.5">
                    {k.unit}
                  </span>
                </div>
                <div className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-1 font-medium leading-tight">
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit & Export Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EEF1F4] dark:border-[#243447] flex-wrap gap-3">
          <div className="text-[11px] text-[#8593a1]">
            Deterministic Seed Hash: <span className="font-mono">#CS-{report.id}2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 h-9 rounded-xl border border-[#E4E9ED] dark:border-[#243447] text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] hover:bg-[#EEF1F4] dark:hover:bg-[#1C2C42] transition-colors"
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-4 h-9 bg-[#0F7C6C] text-white rounded-xl text-xs font-semibold hover:bg-[#0C6A5C] transition-colors shadow-xs"
            >
              <Printer size={14} /> Print / PDF
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReportDetailModal;
