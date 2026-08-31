/**
 * @file DoctorsOnDuty.jsx
 * @description Roster of active clinical staff and specialists on duty with status badges.
 */

import { useMemo } from "react";
import SectionHeading from "../common/SectionHeading";
import Badge from "../common/Badge";
import { DOCTORS, mulberry32 } from "../../services/mockDataEngine";
import { DEPARTMENTS } from "../../constants/medicalConstants";

export function DoctorsOnDuty() {
  const doctorRoster = useMemo(() => {
    return DOCTORS.slice(0, 7).map((doc, idx) => {
      const rnd = mulberry32(8000 + idx);
      const dept = DEPARTMENTS[idx % DEPARTMENTS.length];
      const randVal = rnd();
      const status = randVal > 0.4 ? "Available" : randVal > 0.2 ? "In session" : "In surgery";
      const tone = status === "Available" ? "teal" : status === "In session" ? "amber" : "red";
      return {
        name: doc,
        department: dept.name,
        status,
        tone,
        shift: `${8 + (idx % 2)}:00 AM – ${4 + (idx % 2)}:00 PM`,
      };
    });
  }, []);

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 h-fit">
      <SectionHeading
        eyebrow="Clinical Staffing"
        title="Doctors on Duty"
        sub="Active physician shifts and availability status"
      />

      <div className="flex flex-col gap-3 mt-3">
        {doctorRoster.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between p-2.5 rounded-xl border border-[#EEF1F4] dark:border-[#243447] hover:bg-[#F7F9FA] dark:hover:bg-[#1C2C42] transition-colors"
          >
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-[#0B2545] dark:text-[#F5F7FB] truncate">
                {doc.name}
              </div>
              <div className="text-[11px] text-[#5B6B7A] dark:text-[#8EA1B5] truncate">
                {doc.department} · <span className="font-mono">{doc.shift}</span>
              </div>
            </div>
            <Badge tone={doc.tone} size="sm">
              {doc.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsOnDuty;
