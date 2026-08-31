/**
 * @file ReportsPage.jsx
 * @description Requirement 5: Customizable Healthcare Reports — Dynamic builder, generated library, and detail modals.
 */

import PageShell from "../components/layout/PageShell";
import ReportBuilder from "../components/reports/ReportBuilder";
import GeneratedReportsList from "../components/reports/GeneratedReportsList";

export function ReportsPage() {
  return (
    <PageShell
      title="Healthcare Reports & Analytics"
      sub="Customizable metric builders, auditable census records, and data export tools"
    >
      <ReportBuilder />
      <GeneratedReportsList />
    </PageShell>
  );
}

export default ReportsPage;
