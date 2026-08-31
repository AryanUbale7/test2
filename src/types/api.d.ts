/**
 * @file api.d.ts
 * @description TypeScript definitions for HTTP API Client and telemetry services.
 */

import { Patient, Appointment, DiagnosticReport, ReportCard } from "./medical";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export interface TelemetryStreamMessage {
  heartRate: number;
  spo2: number;
  respiratoryRate: number;
  temperature: number;
  timestamp: number;
}

export interface IApiClient {
  get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}
