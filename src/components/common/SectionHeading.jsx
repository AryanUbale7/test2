/**
 * @file SectionHeading.jsx
 * @description Standardized section header component with eyebrow and subtitle.
 */

export function SectionHeading({ eyebrow, title, sub, className = "" }) {
  return (
    <div className={`mb-5 ${className}`}>
      {eyebrow && (
        <div className="text-[11px] font-bold tracking-[0.14em] text-[#0F7C6C] dark:text-[#5EEAD4] uppercase mb-1.5">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[1.4rem] sm:text-[1.5rem] font-bold text-[#0B2545] dark:text-[#F5F7FB] leading-tight">
        {title}
      </h2>
      {sub && (
        <p className="text-[13.5px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-1 leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
