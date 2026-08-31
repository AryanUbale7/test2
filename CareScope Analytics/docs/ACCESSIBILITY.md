# Accessibility & WCAG 2.1 AA Compliance

CareScope Analytics has been engineered to adhere strictly to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standard.

## Accessibility Checklist

- **Perceivable**:
  - High color contrast ratio (>= 4.5:1 for standard text, >= 3:1 for large text and UI components).
  - Explicit `<label>` elements linked to all inputs, selects, and textareas.
  - Text alternatives for all interactive icons and status indicators.

- **Operable**:
  - Complete keyboard navigability with visible focus outline rings (`focus-visible:ring-2 focus-visible:ring-[#0F7C6C]`).
  - Modals trap focus and support Escape key dismissal.
  - Skip-to-main-content link for screen reader and keyboard power users.

- **Understandable**:
  - Predictable navigation patterns across desktop sidebar and mobile bottom navigation.
  - Clear error notifications and confirmation toasts on user actions.

- **Robust**:
  - ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-live="polite"`, `role="tablist"`, `role="tab"`, `role="status"`.
