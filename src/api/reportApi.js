/**
 * @file reportApi.js
 * @description Customizable healthcare reports catalog and export API abstraction.
 */

import { apiClient } from "./apiClient";
import { genReportCards, REPORT_METRICS } from "../services/mockDataEngine";

export const reportApi = {
  async getGeneratedReports() {
    const res = await apiClient.get("/reports");
    return res.data?.reports || genReportCards();
  },

  async getMetricSeries(metricName) {
    const res = await apiClient.get(`/reports/metrics/${encodeURIComponent(metricName)}`);
    return res.data?.series || REPORT_METRICS[metricName] || REPORT_METRICS.Admissions;
  },

  async exportReport(reportId, format = "pdf") {
    return apiClient.post(`/reports/${reportId}/export`, { format });
  },
};

export default reportApi;
