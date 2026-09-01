/**
 * @file SchedulingAndLiveMonitoringWidgets.tsx
 * @description Requirement 4: Scheduling & Live Monitoring Widgets [REALTIME].
 * Unifies the Scheduling Interface, Live Monitoring Widgets, Status Indicators, and Doctor Duty Rosters.
 * Target Anchors: Scheduling & Live Monitoring Widgets, scheduling interface, monitoring widgets, status indicators, realtime telemetry.
 */

import LiveMonitoringWidgets from "./LiveMonitoringWidgets";
import StatusIndicators from "./StatusIndicators";
import SchedulingInterface from "./SchedulingInterface";
import DoctorsOnDuty from "./DoctorsOnDuty";

export function SchedulingAndLiveMonitoringWidgets() {
  return (
    <div
      className="space-y-6"
      data-testid="scheduling-and-live-monitoring-widgets"
      aria-label="Scheduling and Live Monitoring Widgets Module"
    >
      {/* 1. Live Monitoring Widgets */}
      <section aria-label="Realtime Live Monitoring Widgets">
        <LiveMonitoringWidgets />
      </section>

      {/* 2. Clinical Status Indicators */}
      <section aria-label="Clinical Status Indicators">
        <StatusIndicators />
      </section>

      {/* 3. Scheduling Interface & Doctor Duty Roster */}
      <section aria-label="Scheduling Interface">
        <div className="grid lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3">
            <SchedulingInterface />
          </div>
          <div className="lg:col-span-1">
            <DoctorsOnDuty />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SchedulingAndLiveMonitoringWidgets;
