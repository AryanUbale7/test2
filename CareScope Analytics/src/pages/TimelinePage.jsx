/**
 * @file TimelinePage.jsx
 * @description Requirement 2: Treatment Timeline & Diagnostic Reports — Chronological timeline and lab panels.
 */

import { useState } from "react";
import PageShell from "../components/layout/PageShell";
import PatientSelector from "../components/timeline/PatientSelector";
import PatientSummaryCard from "../components/timeline/PatientSummaryCard";
import TreatmentTimeline from "../components/timeline/TreatmentTimeline";
import DiagnosticReportsList from "../components/timeline/DiagnosticReportsList";
import AddEventModal from "../components/timeline/AddEventModal";

export function TimelinePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <PageShell
      title="Patient Timeline & Clinical Diagnostics"
      sub="Longitudinal care history, chronological interventions, and individual lab panels"
    >
      <div className="space-y-6">
        {/* Patient Selection & Summary */}
        <PatientSelector />
        <PatientSummaryCard />

        {/* Timeline & Diagnostics 2-Column Layout */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3">
            <TreatmentTimeline onAddEvent={() => setIsAddModalOpen(true)} />
          </div>
          <div className="lg:col-span-2">
            <DiagnosticReportsList />
          </div>
        </div>
      </div>

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </PageShell>
  );
}

export default TimelinePage;
