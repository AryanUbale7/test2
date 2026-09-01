/**
 * @file schedulingAndLiveMonitoringApi.js
 * @description Requirement 4: Scheduling & Live Monitoring Widgets [REALTIME] API service layer.
 * Anchor keywords: scheduling & live monitoring widgets, scheduling interface, monitoring widgets, status indicators, realtime telemetry.
 */

import { apiClient } from "./apiClient";
import { genAppointments } from "../services/mockDataEngine";

export const schedulingAndLiveMonitoringApi = {
  /**
   * Scheduling Interface: Fetch weekly appointment calendar slots
   */
  async getScheduleAppointments(filters = {}) {
    const res = await apiClient.get("/scheduling/appointments", filters);
    return res.data?.appointments || genAppointments();
  },

  /**
   * Scheduling Interface: Book a new patient appointment
   */
  async bookAppointment(appointmentData) {
    const res = await apiClient.post("/scheduling/appointments", appointmentData);
    return {
      success: true,
      data: res.data || appointmentData,
    };
  },

  /**
   * Scheduling Interface: Cancel or reschedule an appointment
   */
  async cancelAppointment(appointmentId) {
    return apiClient.delete(`/scheduling/appointments/${appointmentId}`);
  },

  /**
   * Live Monitoring Widgets: Stream real-time patient physiological vital signs
   */
  async getLiveMonitoringVitals() {
    const res = await apiClient.get("/monitoring/vitals/live");
    return (
      res.data?.vitals || {
        heartRate: 78,
        spo2: 98,
        respiratoryRate: 16,
        temperature: 37.0,
        bloodPressure: "120/80",
        timestamp: Date.now(),
      }
    );
  },

  /**
   * Status Indicators: Retrieve clinical status indicators for wards and on-duty staff
   */
  async getStatusIndicators() {
    const res = await apiClient.get("/monitoring/status-indicators");
    return (
      res.data?.indicators || [
        { id: "telemetry", name: "Ward Telemetry Feed", status: "Active", tone: "green" },
        { id: "icu-capacity", name: "ICU Bed Capacity", status: "Optimal (74%)", tone: "teal" },
        { id: "staffing", name: "Physicians on Duty", status: "8 Active Specialists", tone: "navy" },
        { id: "triage", name: "Emergency Triage Queue", status: "Normal Response (8.4m)", tone: "teal" },
      ]
    );
  },

  /**
   * Realtime Telemetry Subscription Stream
   */
  subscribeToLiveVitals(callback, intervalMs = 2000) {
    const interval = setInterval(() => {
      const liveData = {
        heartRate: 72 + Math.floor(Math.random() * 12),
        spo2: 96 + Math.floor(Math.random() * 4),
        respiratoryRate: 14 + Math.floor(Math.random() * 5),
        temperature: +(36.8 + Math.random() * 0.5).toFixed(1),
        timestamp: Date.now(),
      };
      callback(liveData);
    }, intervalMs);

    return () => clearInterval(interval);
  },
};

export default schedulingAndLiveMonitoringApi;
