/**
 * @file NotificationSettings.jsx
 * @description Accessible notification preferences toggles for email, SMS, and weekly digest.
 */

import SectionHeading from "../common/SectionHeading";
import useApp from "../../hooks/useApp";

function ToggleRow({ label, sub, checked, onChange, id }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <label htmlFor={id} className="text-xs font-bold text-[#0B2545] dark:text-[#F5F7FB] cursor-pointer">
          {label}
        </label>
        {sub && (
          <p className="text-[11.5px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-0.5">
            {sub}
          </p>
        )}
      </div>

      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`w-11 h-6 rounded-full shrink-0 transition-colors relative focus-visible:ring-2 focus-visible:ring-[#0F7C6C] ${
          checked ? "bg-[#0F7C6C]" : "bg-[#D8DEE4] dark:bg-[#243447]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function NotificationSettings() {
  const { userPrefs, updatePreference } = useApp();

  return (
    <div className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 shadow-xs">
      <SectionHeading eyebrow="Alert Channels" title="Notification Preferences" />

      <div className="flex flex-col divide-y divide-[#EEF1F4] dark:divide-[#243447] mt-2">
        <ToggleRow
          id="toggle-email"
          label="Email Clinical Alerts"
          sub="Real-time notifications for patient triage and report flags"
          checked={userPrefs.email}
          onChange={() => updatePreference("email", !userPrefs.email)}
        />
        <ToggleRow
          id="toggle-sms"
          label="SMS Emergency Dispatch"
          sub="Immediate SMS alerts for critical code changes only"
          checked={userPrefs.sms}
          onChange={() => updatePreference("sms", !userPrefs.sms)}
        />
        <ToggleRow
          id="toggle-digest"
          label="Weekly Census Digest"
          sub="Automated executive summary delivered Monday 7:00 AM"
          checked={userPrefs.digest}
          onChange={() => updatePreference("digest", !userPrefs.digest)}
        />
      </div>
    </div>
  );
}

export default NotificationSettings;
