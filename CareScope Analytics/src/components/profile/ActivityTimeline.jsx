/**
 * @file ActivityTimeline.jsx
 * @description Audit trail of recent coordinator actions and triage logs.
 */

import SectionHeading from "../common/SectionHeading";
import { ACTIVITY_LOG } from "../../constants/medicalConstants";

export function ActivityTimeline() {
  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 shadow-xs">
      <SectionHeading eyebrow="Audit Trail" title="Recent Clinical Activity" />

      <div className="relative pl-8 space-y-5 mt-4">
        {/* Timeline line */}
        <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-[#E4E9ED] dark:bg-[#243447]" />

        {ACTIVITY_LOG.map((a, i) => (
          <div key={i} className="relative group">
            <div className="absolute -left-8 top-0.5 w-7 h-7 rounded-full bg-[#E7F3F0] dark:bg-[#1C2C42] border-2 border-white dark:border-[#111C2E] ring-1 ring-[#0F7C6C]/30 flex items-center justify-center">
              <a.icon size={13} className="text-[#0F7C6C]" aria-hidden="true" />
            </div>

            <div className="text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB]">
              {a.text}
            </div>
            <div className="text-[11px] text-[#8593a1] mt-0.5 font-mono">
              {a.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
