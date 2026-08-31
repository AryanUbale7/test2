/**
 * @file VitalsGrid.jsx
 * @description Streaming live hospital telemetry telemetry grid.
 */

import { Heart, Droplets, Wind, Thermometer } from "lucide-react";
import VitalCard from "./VitalCard";

export function VitalsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <VitalCard
        icon={Heart}
        label="Avg Heart Rate"
        base={78}
        spread={4}
        unit="bpm"
        color="#B33A3A"
        intervalMs={2000}
      />
      <VitalCard
        icon={Droplets}
        label="SpO2 Saturation"
        base={97}
        spread={1.2}
        unit="%"
        color="#0F7C6C"
        intervalMs={2400}
      />
      <VitalCard
        icon={Wind}
        label="Respiratory Rate"
        base={16}
        spread={2}
        unit="/min"
        color="#3A6EA5"
        intervalMs={2800}
      />
      <VitalCard
        icon={Thermometer}
        label="Ward Temperature"
        base={37.0}
        spread={0.3}
        unit="°C"
        color="#B8752F"
        intervalMs={3200}
      />
    </div>
  );
}

export default VitalsGrid;
