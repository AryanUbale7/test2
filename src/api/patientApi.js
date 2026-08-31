/**
 * @file patientApi.js
 * @description Patient entity endpoints and clinical record retrieval.
 */

import { apiClient } from "./apiClient";
import { PATIENTS, genTimeline, genReports } from "../services/mockDataEngine";

export const patientApi = {
  async getAllPatients() {
    const res = await apiClient.get("/patients");
    return res.data?.patients || PATIENTS;
  },

  async getPatientById(id) {
    const res = await apiClient.get(`/patients/${id}`);
    return res.data?.patient || PATIENTS.find((p) => p.id === id) || PATIENTS[0];
  },

  async getPatientTimeline(patientId) {
    const res = await apiClient.get(`/patients/${patientId}/timeline`);
    return res.data?.events || genTimeline(patientId);
  },

  async getPatientDiagnostics(patientId) {
    const res = await apiClient.get(`/patients/${patientId}/diagnostics`);
    return res.data?.reports || genReports(patientId);
  },
};

export default patientApi;
