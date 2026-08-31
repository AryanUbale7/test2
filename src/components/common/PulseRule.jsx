/**
 * @file PulseRule.jsx
 * @description Signature SVG electrocardiogram heartbeat pulse divider.
 */

export function PulseRule({ color = "#0F7C6C", opacity = 0.5, height = 20, className = "" }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} role="presentation" aria-hidden="true">
      <svg
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block", opacity }}
      >
        <polyline
          points="0,12 155,12 166,12 173,1 181,23 189,12 400,12"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default PulseRule;
