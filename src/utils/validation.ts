/**
 * @file validation.ts
 * @description Form validation rules for appointment scheduling and clinical triage entries.
 */

export function validateAppointmentForm(data: {
  patient: string;
  department: string;
  doctor: string;
  hour: number;
}): { isValid: boolean; error?: string } {
  if (!data.patient || data.patient.trim().length < 2) {
    return { isValid: false, error: "Please provide a valid patient name." };
  }
  if (!data.department) {
    return { isValid: false, error: "Department selection is mandatory." };
  }
  if (!data.doctor) {
    return { isValid: false, error: "Attending doctor is required." };
  }
  if (data.hour < 8 || data.hour > 18) {
    return { isValid: false, error: "Appointment hours must be between 8:00 AM and 6:00 PM." };
  }
  return { isValid: true };
}
