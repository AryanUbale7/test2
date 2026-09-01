/**
 * @file apiService.ts
 * @description Central unified API service gateway exporting all clinical domain APIs including scheduling and live monitoring.
 */

export { apiClient } from "../api/apiClient";
export { patientApi } from "../api/patientApi";
export { appointmentApi } from "../api/appointmentApi";
export { reportApi } from "../api/reportApi";
export { telemetryApi } from "../api/telemetryApi";
export { schedulingAndLiveMonitoringApi } from "../api/schedulingAndLiveMonitoringApi";
