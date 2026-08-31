/**
 * @file SchedulingPage.jsx
 * @description Requirement 4: Scheduling & Live Monitoring — Calendar matrix, appointment booking & doctor availability.
 */

import PageShell from "../components/layout/PageShell";
import ScheduleCalendar from "../components/scheduling/ScheduleCalendar";
import DoctorsOnDuty from "../components/scheduling/DoctorsOnDuty";

export function SchedulingPage() {
  return (
    <PageShell
      title="Clinic Scheduling & Coordination"
      sub="Weekly appointment allocations, slot booking, and physician duty roster"
    >
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ScheduleCalendar />
        </div>
        <div className="lg:col-span-1">
          <DoctorsOnDuty />
        </div>
      </div>
    </PageShell>
  );
}

export default SchedulingPage;
