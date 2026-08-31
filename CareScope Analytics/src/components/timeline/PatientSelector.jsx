/**
 * @file PatientSelector.jsx
 * @description Dropdown patient roster selector with instant profile switching and triage status.
 */

import { Users } from "lucide-react";
import useApp from "../../hooks/useApp";
import Badge from "../common/Badge";

export function PatientSelector() {
  const { patients, selectedPatientId, setSelectedPatientId } = useApp();
  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const statusTone =
    currentPatient.status === "Critical"
      ? "red"
      : currentPatient.status === "Stable"
        ? "teal"
        : "amber";

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-4 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#EAEFF5] dark:bg-[#1C2C42] flex items-center justify-center text-[#0B2545] dark:text-[#93C5FB]">
          <Users size={16} />
        </div>
        <label htmlFor="patient-select" className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB]">
          Selected Patient:
        </label>
      </div>

      <select
        id="patient-select"
        value={selectedPatientId}
        onChange={(e) => setSelectedPatientId(e.target.value)}
        className="border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] rounded-xl h-10 px-3 text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
      >
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} ({p.id}) · {p.department}
          </option>
        ))}
      </select>

      <Badge tone={statusTone}>
        {currentPatient.status}
      </Badge>

      <div className="text-xs text-[#5B6B7A] dark:text-[#8EA1B5] sm:ml-auto font-medium">
        <span>{currentPatient.age} yrs</span> · <span>{currentPatient.gender}</span> · <span className="font-mono">{currentPatient.bloodGroup}</span> · <span>{currentPatient.department}</span>
      </div>
    </div>
  );
}

export default PatientSelector;
