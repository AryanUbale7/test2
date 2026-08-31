/**
 * @file UpcomingAppointmentsList.jsx
 * @description List of today's upcoming clinic appointments with direct timeline jump.
 */

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useApp from "../../hooks/useApp";
import SectionHeading from "../common/SectionHeading";

export function UpcomingAppointmentsList() {
  const { appointments, setSelectedPatientId, patients } = useApp();
  const navigate = useNavigate();
  const todays = appointments.filter((a) => a.dayIdx === 0).slice(0, 5);

  const handlePatientClick = (patientName) => {
    const found = patients.find((p) => p.name === patientName);
    if (found) {
      setSelectedPatientId(found.id);
      navigate("/timeline");
    }
  };

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <SectionHeading
            eyebrow="Today's Schedule"
            title="Upcoming Appointments"
            className="mb-0"
          />
          <button
            onClick={() => navigate("/scheduling")}
            className="text-xs font-semibold text-[#0F7C6C] dark:text-[#5EEAD4] hover:underline flex items-center gap-1"
          >
            Full schedule <ArrowRight size={13} />
          </button>
        </div>

        <div className="flex flex-col divide-y divide-[#EEF1F4] dark:divide-[#243447] mt-3">
          {todays.map((a) => (
            <div
              key={a.id}
              className="py-3 flex items-center justify-between gap-3 group transition-colors"
            >
              <div className="min-w-0">
                <button
                  onClick={() => handlePatientClick(a.patient)}
                  className="text-[13.5px] font-semibold text-[#0B2545] dark:text-[#F5F7FB] group-hover:text-[#0F7C6C] dark:group-hover:text-[#5EEAD4] text-left truncate block"
                >
                  {a.patient}
                </button>
                <div className="text-[11.5px] text-[#5B6B7A] dark:text-[#8EA1B5] truncate mt-0.5">
                  {a.type} · {a.doctor} · <span className="font-mono">{a.department}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="font-mono text-xs font-semibold text-[#0F7C6C] dark:text-[#5EEAD4] bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 px-2 py-1 rounded-md">
                  {String(a.hour).padStart(2, "0")}:{String(a.minute).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#EEF1F4] dark:border-[#243447] flex items-center justify-between text-xs text-[#5B6B7A] dark:text-[#8EA1B5]">
        <span>{todays.length} active sessions today</span>
        <span className="font-mono text-[#0F7C6C] dark:text-[#5EEAD4]">All slots confirmed</span>
      </div>
    </div>
  );
}

export default UpcomingAppointmentsList;
