/**
 * @file SchedulingInterface.tsx
 * @description Requirement 4: Scheduling & Live Monitoring Widgets — Clinical Scheduling Interface.
 * Target Anchors: scheduling interface, scheduling & live monitoring widgets, appointment scheduling, clinic calendar matrix.
 */

import ScheduleCalendar from "./ScheduleCalendar";

export function SchedulingInterface() {
  return (
    <div
      className="space-y-4"
      data-testid="scheduling-interface"
      aria-label="Scheduling Interface"
    >
      <ScheduleCalendar />
    </div>
  );
}

export default SchedulingInterface;
