/**
 * @file DashboardPage.jsx
 * @description Requirement 1: Interactive Healthcare Dashboard — Summary cards, streaming telemetry, admissions, predictive charts, appointments & bed occupancy.
 */

import { useMemo } from "react";
import { Users, Calendar, Clock, BedDouble } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import StatCard from "../components/common/StatCard";
import SectionHeading from "../components/common/SectionHeading";
import PulseRule from "../components/common/PulseRule";
import VitalsGrid from "../components/dashboard/VitalsGrid";
import AdmissionsChart from "../components/dashboard/AdmissionsChart";
import PredictiveForecastChart from "../components/dashboard/PredictiveForecastChart";
import UpcomingAppointmentsList from "../components/dashboard/UpcomingAppointmentsList";
import DepartmentOccupancyList from "../components/dashboard/DepartmentOccupancyList";
import useApp from "../hooks/useApp";
import { DEPARTMENTS } from "../constants/medicalConstants";
import useTheme from "../hooks/useTheme";

export function DashboardPage() {
  const { patients, appointments } = useApp();
  const { isDark } = useTheme();

  const todaysCount = useMemo(() => {
    return appointments.filter((a) => a.dayIdx === 0).length;
  }, [appointments]);

  const totalCapacity = useMemo(
    () => DEPARTMENTS.reduce((sum, d) => sum + d.capacity, 0),
    []
  );
  const totalOccupied = useMemo(
    () => DEPARTMENTS.reduce((sum, d) => sum + d.baseOccupancy, 0),
    []
  );
  const aggregateOccupancy = Math.round((totalOccupied / totalCapacity) * 100);

  return (
    <PageShell
      title="Clinical Dashboard"
      sub="Live operations, telemetry telemetry, and forecast overview across 8 wards"
    >
      {/* KPI Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Users}
          label="Total Active Patients"
          value={patients.length}
          delta="+4.2%"
          deltaTone="up"
        />
        <StatCard
          icon={Calendar}
          label="Appointments Scheduled"
          value={todaysCount + 4}
          delta="Today"
          deltaTone="up"
        />
        <StatCard
          icon={Clock}
          label="Avg Patient Wait Time"
          value="18"
          suffix="min"
          delta="-6.1%"
          deltaTone="up"
        />
        <StatCard
          icon={BedDouble}
          label="Overall Bed Occupancy"
          value={aggregateOccupancy}
          suffix="%"
          delta="+1.4%"
          deltaTone="down"
        />
      </div>

      {/* Pulse Divider */}
      <div className="my-6">
        <PulseRule color={isDark ? "#243447" : "#0F7C6C"} opacity={0.6} height={16} />
      </div>

      {/* Live Monitoring Telemetry */}
      <div className="mb-8">
        <SectionHeading
          eyebrow="Requirement 4 · Live Telemetry Monitoring"
          title="Streaming Ward Physiological Telemetry"
          sub="Simulated real-time vital waveforms streaming from connected hospital telemetry"
        />
        <VitalsGrid />
      </div>

      {/* Analytics & Forecast Charts Grid */}
      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <AdmissionsChart />
        </div>
        <div className="lg:col-span-2">
          <PredictiveForecastChart />
        </div>
      </div>

      {/* Resource Allocation & Schedules */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <UpcomingAppointmentsList />
        </div>
        <div className="lg:col-span-3">
          <DepartmentOccupancyList />
        </div>
      </div>
    </PageShell>
  );
}

export default DashboardPage;
