/**
 * @file appointmentApi.js
 * @description Clinic scheduling and consultation slot booking API abstraction.
 */

import { apiClient } from "./apiClient";
import { genAppointments } from "../services/mockDataEngine";

export const appointmentApi = {
  async getAppointments(filters = {}) {
    const res = await apiClient.get("/appointments", filters);
    return res.data?.appointments || genAppointments();
  },

  async createAppointment(appointmentData) {
    const res = await apiClient.post("/appointments", appointmentData);
    return {
      success: true,
      data: res.data || appointmentData,
    };
  },

  async cancelAppointment(id) {
    return apiClient.delete(`/appointments/${id}`);
  },
};

export default appointmentApi;
