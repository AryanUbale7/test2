/**
 * @file ProfileHeader.jsx
 * @description Care Coordinator account banner with user badges and actions.
 */

import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import Badge from "../common/Badge";
import useApp from "../../hooks/useApp";

export function ProfileHeader() {
  const { showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Shivansh Shrivastav");
  const [roleTitle, setRoleTitle] = useState("Lead Care Coordinator");

  const handleSave = () => {
    setIsEditing(false);
    showToast("Profile details updated successfully", "success");
  };

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-6 mb-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[#0F7C6C] flex items-center justify-center text-white font-display font-bold text-2xl shrink-0 shadow-md">
          SS
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-display text-xl font-bold text-[#0B2545] dark:text-[#F5F7FB] border border-[#0F7C6C] rounded-lg px-2 py-0.5 bg-transparent"
              />
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="text-xs text-[#5B6B7A] dark:text-[#8EA1B5] border border-[#E4E9ED] dark:border-[#243447] rounded-lg px-2 py-0.5 bg-transparent block"
              />
            </div>
          ) : (
            <>
              <h2 className="font-display text-[1.4rem] font-bold text-[#0B2545] dark:text-[#F5F7FB]">
                {name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <Badge tone="teal">{roleTitle}</Badge>
                <Badge tone="navy">Cross-Department Operations</Badge>
                <Badge tone="green">Active Staff ID: #CC-9082</Badge>
              </div>
            </>
          )}
        </div>

        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="flex items-center gap-1.5 border border-[#E4E9ED] dark:border-[#243447] text-[#0B2545] dark:text-[#F5F7FB] text-xs font-semibold px-4 h-9 rounded-full hover:bg-[#F7F9FA] dark:hover:bg-[#1C2C42] transition-colors self-start sm:self-center"
        >
          {isEditing ? (
            <>
              <Check size={14} className="text-[#0F7C6C]" /> Save
            </>
          ) : (
            <>
              <Pencil size={13} /> Edit Profile
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
