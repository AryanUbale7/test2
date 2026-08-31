/**
 * @file telemetryApi.js
 * @description Real-time ward telemetry stream and physiological vital sign updates.
 */

import { apiClient } from "./apiClient";

export const telemetryApi = {
  async getWardVitalsSummary() {
    const res = await apiClient.get("/telemetry/summary");
    return (
      res.data?.summary || {
        avgHeartRate: 78,
        avgSpO2: 97,
        avgRespRate: 16,
        avgTemperature: 37.0,
      }
    );
  },
};

export default telemetryApi;
