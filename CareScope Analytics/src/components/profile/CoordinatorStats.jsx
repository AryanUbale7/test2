/**
 * @file CoordinatorStats.jsx
 * @description KPI summary stats for coordinator productivity and throughput.
 */

import { Users, CalendarCheck, FileText, Clock } from "lucide-react";
import StatCard from "../common/StatCard";

export function CoordinatorStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={Users}
        label="Patients Coordinated"
        value={48}
        delta="8.5%"
        deltaTone="up"
      />
      <StatCard
        icon={CalendarCheck}
        label="Appointments Facilitated"
        value={214}
        delta="+18"
        deltaTone="up"
      />
      <StatCard
        icon={FileText}
        label="Reports Generated"
        value={36}
        delta="+6"
        deltaTone="up"
      />
      <StatCard
        icon={Clock}
        label="Avg Triage Response"
        value="8.4"
        suffix="min"
        delta="-1.6m"
        deltaTone="up"
      />
    </div>
  );
}

export default CoordinatorStats;
