/**
 * @file useLiveVital.js
 * @description Hook providing simulated real-time physiological vitals jitter and buffer history.
 */

import { useState, useEffect } from "react";
import { mulberry32 } from "../services/mockDataEngine";

const localRnd = mulberry32(42);

/**
 * Hook to stream simulated real-time vital metrics
 * @param {number} base - Baseline vital value
 * @param {number} spread - Random perturbation amplitude
 * @param {number} intervalMs - Update period in milliseconds
 * @returns {[number, number[]]} Current value and recent rolling 12-sample history
 */
export function useLiveVital(base, spread, intervalMs = 2400) {
  const [val, setVal] = useState(base);
  const [history, setHistory] = useState(() =>
    Array.from({ length: 12 }, () => base)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => {
        const next = Math.round((v + (localRnd() - 0.5) * spread) * 10) / 10;
        setHistory((h) => [...h.slice(1), next]);
        return next;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [spread, intervalMs]);

  return [val, history];
}
