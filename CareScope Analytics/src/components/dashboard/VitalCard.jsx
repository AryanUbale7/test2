/**
 * @file VitalCard.jsx
 * @description Real-time animated clinical vital monitor card with sparkline waveform.
 */

import { memo } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useLiveVital } from "../../hooks/useLiveVital";

export const VitalCard = memo(function VitalCard({
  icon: Icon,
  label,
  base,
  spread,
  unit,
  color,
  intervalMs = 2200,
}) {
  const [val, history] = useLiveVital(base, spread, intervalMs);
  const chartData = history.map((v, i) => ({ i, v }));

  return (
    <div
      className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-[#0F7C6C]/40"
      role="region"
      aria-label={`Realtime ${label}`}
    >
      <div
        className="relative w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
        style={{ background: `${color}1A` }}
      >
        <Icon size={18} color={color} aria-hidden="true" />
        <span
          className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full pulse-dot"
          style={{ background: color }}
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="font-mono text-lg font-bold text-[#0B2545] dark:text-[#F5F7FB] leading-none"
          role="status"
          aria-live="polite"
        >
          {val}
          <span className="text-[11px] font-normal text-[#8593a1] ml-1">{unit}</span>
        </div>
        <div className="text-[12px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-1 truncate font-medium">
          {label}
        </div>
      </div>

      <div className="w-16 h-8 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={1.8}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default VitalCard;
