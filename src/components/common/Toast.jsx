/**
 * @file Toast.jsx
 * @description Notification toast container displaying interactive cues.
 */

import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import useApp from "../../hooks/useApp";

export function ToastContainer() {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <div
      className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0B2545] dark:bg-[#1E293B] text-white text-xs font-medium shadow-lg border border-white/10 animate-slideUp"
        >
          {t.type === "success" && <CheckCircle2 size={16} className="text-[#0F7C6C] shrink-0" />}
          {t.type === "error" && <AlertCircle size={16} className="text-[#B33A3A] shrink-0" />}
          {t.type === "info" && <Info size={16} className="text-[#3A6EA5] shrink-0" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
