/**
 * @file ContactCard.jsx
 * @description Contact details, location, and credentials card for care coordinator.
 */

import { Mail, Phone, MapPin, Briefcase, Globe2 } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export function ContactCard() {
  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 shadow-xs">
      <SectionHeading eyebrow="Credentials" title="Contact & Desk Info" />

      <div className="flex flex-col gap-3.5 text-xs text-[#0B2545] dark:text-[#F5F7FB] mt-2">
        <div className="flex items-center gap-3">
          <Mail size={15} className="text-[#5B6B7A] dark:text-[#8EA1B5] shrink-0" />
          <span>shiva.shri0055@gmail.com</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={15} className="text-[#5B6B7A] dark:text-[#8EA1B5] shrink-0" />
          <span>+1 (555) 214-7790</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={15} className="text-[#5B6B7A] dark:text-[#8EA1B5] shrink-0" />
          <span>Building C, Level 2 — Central Coordination Hub</span>
        </div>
        <div className="flex items-center gap-3">
          <Briefcase size={15} className="text-[#5B6B7A] dark:text-[#8EA1B5] shrink-0" />
          <span>Joined Hospital Network: March 2023 (3+ Years)</span>
        </div>
        <div className="flex items-center gap-3">
          <Globe2 size={15} className="text-[#5B6B7A] dark:text-[#8EA1B5] shrink-0" />
          <span>English, Hindi, Spanish (Clinical Medical)</span>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
