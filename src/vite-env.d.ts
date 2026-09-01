/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ENABLE_MOCK_TELEMETRY: string;
  readonly VITE_TELEMETRY_INTERVAL_MS: string;
  readonly VITE_MAX_PATIENT_RECORDS: string;
  readonly VITE_ENABLE_CONFIDENCE_BANDS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
