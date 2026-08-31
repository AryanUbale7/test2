/**
 * @file PatientSummaryCard.jsx
 * @description Header summary showing patient clinical profile, allergies, and emergency contacts.
 */

import { AlertTriangle, Phone, Calendar, Heart } from "lucide-react";
import useApp from "../../hooks/useApp";

export function PatientSummaryCard() {
  const { patients, selectedPatientId } = useApp();
  const patient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 shadow-xs">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Condition */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 flex items-center justify-center text-[#0F7C6C] shrink-0">
            <Heart size={18} />
          </div>
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5]">
              Primary Condition
            </div>
            <div className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] mt-0.5">
              {patient.primaryCondition}
            </div>
          </div>
        </div>

        {/* Known Allergies */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FBF0E4] dark:bg-[#B8752F]/20 flex items-center justify-center text-[#B8752F] shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5]">
              Known Allergies
            </div>
            <div className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] mt-0.5">
              {patient.allergies}
            </div>
          </div>
        </div>

        {/* Admitted Date */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EAEFF5] dark:bg-[#1C2C42] flex items-center justify-center text-[#0B2545] dark:text-[#93C5FD] shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5]">
              Admission Date
            </div>
            <div className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] mt-0.5 font-mono">
              {patient.admittedDate}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF1F4] dark:bg-[#1C2C42] flex items-center justify-center text-[#5B6B7A] dark:text-[#8EA1B5] shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#5B6B7A] dark:text-[#8EA1B5]">
              Emergency Contact
            </div>
            <div className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] mt-0.5 font-mono">
              {patient.emergencyContact}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientSummaryCard;
