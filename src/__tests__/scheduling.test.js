/* global describe, test, expect */
/**
 * @file scheduling.test.js
 * @description Test verification for Scheduling & Live Monitoring Widgets [REALTIME].
 */

import { validateAppointmentForm } from "../utils/validation";

describe("Scheduling & Live Monitoring Widgets Tests", () => {
  test("validates appointment form parameters successfully", () => {
    const valid = validateAppointmentForm({
      patient: "Sofia Novak",
      department: "Cardiology",
      doctor: "Dr. Gregory House",
      hour: 10,
    });
    expect(valid.isValid).toBe(true);
  });

  test("rejects invalid appointment with missing patient name", () => {
    const invalid = validateAppointmentForm({
      patient: "",
      department: "Cardiology",
      doctor: "Dr. Gregory House",
      hour: 10,
    });
    expect(invalid.isValid).toBe(false);
  });
});
