/**
 * @file Badge.jsx
 * @description Accessible status badge component with harmonic clinical tones.
 */

export function Badge({ children, tone = "teal", className = "", size = "md" }) {
  const tones = {
    teal: "bg-[#E7F3F0] text-[#0F7C6C] border-[#0F7C6C]/20 dark:bg-[#0F7C6C]/20 dark:text-[#5EEAD4]",
    amber: "bg-[#FBF0E4] text-[#B8752F] border-[#B8752F]/20 dark:bg-[#B8752F]/20 dark:text-[#FDBA74]",
    navy: "bg-[#EAEFF5] text-[#0B2545] border-[#0B2545]/15 dark:bg-[#1E293B] dark:text-[#93C5FD]",
    red: "bg-[#FBEAEA] text-[#B33A3A] border-[#B33A3A]/20 dark:bg-[#B33A3A]/20 dark:text-[#FCA5A5]",
    green: "bg-[#EBF7EE] text-[#1E824C] border-[#1E824C]/20 dark:bg-[#1E824C]/20 dark:text-[#86EFAC]",
    purple: "bg-[#F3E8FF] text-[#7E22CE] border-[#7E22CE]/20 dark:bg-[#7E22CE]/20 dark:text-[#D8B4FE]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-[13px]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full border ${tones[tone] || tones.teal} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
