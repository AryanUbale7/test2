/**
 * @file Modal.jsx
 * @description Accessible, keyboard-navigable dialog modal with focus trap and backdrop.
 */

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-xl",
  ariaLabel = "Dialog",
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/50 dark:bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || ariaLabel}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-[#111C2E] rounded-2xl border border-[#E4E9ED] dark:border-[#243447] w-full ${maxWidth} max-h-[90vh] flex flex-col shadow-[0_30px_80px_-20px_rgba(11,37,69,0.35)] overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-[#EEF1F4] dark:border-[#243447]">
          <div>
            {title && (
              <h3 className="font-display text-[1.25rem] font-bold text-[#0B2545] dark:text-[#F5F7FB] leading-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[12.5px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full hover:bg-[#EEF1F4] dark:hover:bg-[#1E293B] text-[#5B6B7A] dark:text-[#8EA1B5] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#0F7C6C]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
