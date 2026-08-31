/**
 * @file GeneratedReportsList.jsx
 * @description Catalog library of generated healthcare reports with status filters & detail modals.
 */

import { useState, useMemo } from "react";
import { FileText, ArrowRight, Search } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import Badge from "../common/Badge";
import ReportDetailModal from "./ReportDetailModal";
import useApp from "../../hooks/useApp";

export function GeneratedReportsList() {
  const { reportsList } = useApp();
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterQuery, setFilterQuery] = useState("");
  const [activeReport, setActiveReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reportsList.filter((r) => {
      const matchStatus = filterStatus === "All" || r.status === filterStatus;
      const matchQuery =
        !filterQuery.trim() ||
        r.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        r.dept.toLowerCase().includes(filterQuery.toLowerCase()) ||
        r.requestedBy.toLowerCase().includes(filterQuery.toLowerCase());
      return matchStatus && matchQuery;
    });
  }, [reportsList, filterStatus, filterQuery]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <SectionHeading
          eyebrow="Clinical Repository"
          title="Generated Reports Library"
          sub="Audited monthly census, diagnostic turnaround, and utilization reports"
          className="mb-0"
        />

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 h-9 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#111C2E] text-xs">
            <Search size={13} className="text-[#8593a1]" />
            <input
              type="text"
              placeholder="Filter reports..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="bg-transparent outline-none text-xs text-[#0B2545] dark:text-[#F5F7FB] w-32 placeholder:text-[#8593a1]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 px-3 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#111C2E] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
          >
            <option value="All">All Statuses</option>
            <option value="Ready">Ready</option>
            <option value="Needs review">Needs Review</option>
          </select>
        </div>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((r) => (
          <div
            key={r.id}
            className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-xs hover:border-[#0F7C6C]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAEFF5] dark:bg-[#1C2C42] flex items-center justify-center">
                  <FileText size={18} className="text-[#0B2545] dark:text-[#93C5FD]" />
                </div>
                <Badge tone={r.status === "Ready" ? "teal" : "amber"}>
                  {r.status}
                </Badge>
              </div>

              <h4 className="text-[14px] font-bold text-[#0B2545] dark:text-[#F5F7FB] leading-snug">
                {r.title}
              </h4>
              <div className="text-[11.5px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-1">
                {r.dept} · <span className="font-mono">{r.date}</span>
              </div>
              <div className="text-[11px] text-[#8593a1] mt-0.5">
                Req: {r.requestedBy}
              </div>
            </div>

            <button
              onClick={() => setActiveReport(r)}
              className="flex items-center gap-1 text-xs font-bold text-[#0F7C6C] dark:text-[#5EEAD4] hover:underline pt-2 border-t border-[#EEF1F4] dark:border-[#243447]"
            >
              View Full Report <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="p-12 text-center text-xs text-[#8593a1] bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl">
          No clinical reports match the current search filters.
        </div>
      )}

      {/* Modal Detail View */}
      {activeReport && (
        <ReportDetailModal
          report={activeReport}
          onClose={() => setActiveReport(null)}
        />
      )}
    </div>
  );
}

export default GeneratedReportsList;
