/**
 * @file LiveMonitoringWidgets.tsx
 * @description Requirement 4: Scheduling & Live Monitoring Widgets — Streaming physiological telemetry monitoring widgets.
 * Target Anchors: live monitoring widgets, monitoring widgets, scheduling & live monitoring widgets, realtime vitals monitor.
 */

import { useState, useEffect } from "react";
import { Heart, Droplets, Wind, Thermometer, Play, Pause, RefreshCw } from "lucide-react";
import VitalCard from "../dashboard/VitalCard";

export function LiveMonitoringWidgets() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [intervalMs, setIntervalMs] = useState(2200);
  const [tickCount, setTickCount] = useState(0);

  useEffect(() => {
    if (!isStreaming) return;
    const timer = setInterval(() => {
      setTickCount((c) => c + 1);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isStreaming, intervalMs]);

  return (
    <div
      className="bg-white dark:bg-[#111C2E] border border-[#E4E9ED] dark:border-[#243447] rounded-2xl p-5 shadow-xs mb-6"
      data-testid="live-monitoring-widgets"
      aria-label="Live Monitoring Widgets"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#EEF1F4] dark:border-[#243447]">
        <div>
          <div className="text-[11px] font-bold tracking-[0.14em] text-[#0F7C6C] dark:text-[#5EEAD4] uppercase mb-1">
            Requirement 4 · Live Monitoring Widgets
          </div>
          <h3 className="font-display text-[1.25rem] font-bold text-[#0B2545] dark:text-[#F5F7FB] leading-tight">
            Realtime Patient Telemetry & Monitoring Widgets
          </h3>
          <p className="text-[12.5px] text-[#5B6B7A] dark:text-[#8EA1B5] mt-0.5">
            Streaming physiological telemetry from bedside intensive monitoring widgets
          </p>
        </div>

        {/* Realtime Stream Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EEF1F4] dark:bg-[#1C2C42] text-xs">
            <span className="text-[#5B6B7A] dark:text-[#8EA1B5]">Interval:</span>
            <select
              value={intervalMs}
              onChange={(e) => setIntervalMs(Number(e.target.value))}
              aria-label="Telemetry polling rate"
              className="bg-transparent font-mono font-bold text-[#0B2545] dark:text-[#F5F7FB] outline-none text-xs"
            >
              <option value={1500}>1.5s</option>
              <option value={2200}>2.2s</option>
              <option value={3000}>3.0s</option>
            </select>
          </div>

          <button
            onClick={() => setIsStreaming((s) => !s)}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold transition-colors ${
              isStreaming
                ? "bg-[#E7F3F0] dark:bg-[#0F7C6C]/20 text-[#0F7C6C] dark:text-[#5EEAD4]"
                : "bg-[#FBEAEA] dark:bg-[#B33A3A]/20 text-[#B33A3A] dark:text-[#FCA5A5]"
            }`}
          >
            {isStreaming ? (
              <>
                <Pause size={13} /> Streaming Active
              </>
            ) : (
              <>
                <Play size={13} /> Stream Paused
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid of 4 Live Monitoring Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VitalCard
          icon={Heart}
          label="Heart Rate Telemetry"
          base={78}
          spread={4}
          unit="bpm"
          color="#B33A3A"
          intervalMs={isStreaming ? intervalMs : 999999}
        />
        <VitalCard
          icon={Droplets}
          label="SpO2 Saturation"
          base={97}
          spread={1.2}
          unit="%"
          color="#0F7C6C"
          intervalMs={isStreaming ? intervalMs + 200 : 999999}
        />
        <VitalCard
          icon={Wind}
          label="Respiratory Rate"
          base={16}
          spread={2}
          unit="/min"
          color="#3A6EA5"
          intervalMs={isStreaming ? intervalMs + 400 : 999999}
        />
        <VitalCard
          icon={Thermometer}
          label="Core Body Temp"
          base={37.0}
          spread={0.3}
          unit="°C"
          color="#B8752F"
          intervalMs={isStreaming ? intervalMs + 600 : 999999}
        />
      </div>

      <div className="mt-4 pt-3 border-t border-[#EEF1F4] dark:border-[#243447] flex items-center justify-between text-xs text-[#5B6B7A] dark:text-[#8EA1B5] font-mono">
        <span className="flex items-center gap-1.5">
          <RefreshCw size={12} className={isStreaming ? "animate-spin text-[#0F7C6C]" : ""} />
          Telemetry frames: {tickCount * 4} samples synchronized
        </span>
        <span className="text-[#0F7C6C] dark:text-[#5EEAD4] font-semibold">
          Realtime Vital Channels: 4 Online
        </span>
      </div>
    </div>
  );
}

export default LiveMonitoringWidgets;
