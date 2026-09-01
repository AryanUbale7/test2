/**
 * @file formatters.ts
 * @description Utility functions for formatting clinical numbers, percentages, and currencies.
 */

export function formatNumber(val: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}

export function formatPercent(val: number): string {
  return `${Math.round(val)}%`;
}

export function formatVitalValue(val: number, unit: string): string {
  return `${val} ${unit}`;
}
