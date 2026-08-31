/**
 * @file CoverageCard.jsx
 * @description List of covered hospital departments and specialized wards.
 */

import SectionHeading from "../common/SectionHeading";
import Badge from "../common/Badge";
import { DEPARTMENTS } from "../../constants/medicalConstants";

export function CoverageCard() {
  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 shadow-xs">
      <SectionHeading eyebrow="Departmental Scope" title="Assigned Wards" />

      <div className="flex flex-wrap gap-2 mt-2">
        {DEPARTMENTS.map((d) => (
          <Badge key={d.id} tone="navy">
            <d.icon size={12} className="mr-1 inline" /> {d.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default CoverageCard;
