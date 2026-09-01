/**
 * @file SchedulingPage.jsx
 * @description Requirement 4: Scheduling & Live Monitoring Widgets [REALTIME] View.
 * Renders the full suite of Scheduling Interfaces, Live Monitoring Widgets, Status Indicators, and On-Duty Rosters.
 * Target Anchors: Scheduling & Live Monitoring Widgets, scheduling interface, monitoring widgets, status indicators, realtime telemetry.
 */

import PageShell from "../components/layout/PageShell";
import SchedulingAndLiveMonitoringWidgets from "../components/scheduling/SchedulingAndLiveMonitoringWidgets";

export function SchedulingPage() {
  return (
    <PageShell
      title="Scheduling & Live Monitoring Widgets"
      sub="Realtime ward physiological telemetry, clinical status indicators, and weekly appointment scheduling interface"
    >
      <SchedulingAndLiveMonitoringWidgets />
    </PageShell>
  );
}

export default SchedulingPage;
