/**
 * @file AppointmentModal.jsx
 * @description Accessible dialog form for scheduling a new clinical consultation.
 */

import { useState } from "react";
import Modal from "../common/Modal";
import useApp from "../../hooks/useApp";
import { DEPARTMENTS, APPT_TYPES, DAY_LABELS, HOURS } from "../../constants/medicalConstants";
import { DOCTORS } from "../../services/mockDataEngine";

export function AppointmentModal({ isOpen, onClose }) {
  const { addAppointment, patients } = useApp();
  const [formData, setFormData] = useState({
    patient: "",
    department: DEPARTMENTS[0].name,
    doctor: DOCTORS[0],
    type: APPT_TYPES[0],
    dayIdx: 0,
    hour: 9,
    minute: 0,
    duration: 30,
    notes: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patient.trim()) {
      setError("Please enter or select a patient name.");
      return;
    }

    const newAppt = {
      id: `AP-${Date.now()}`,
      day: DAY_LABELS[formData.dayIdx],
      dayIdx: Number(formData.dayIdx),
      hour: Number(formData.hour),
      minute: Number(formData.minute),
      duration: Number(formData.duration),
      patient: formData.patient.trim(),
      doctor: formData.doctor,
      department: formData.department,
      type: formData.type,
      notes: formData.notes,
      room: `Room ${100 + Math.floor(Math.random() * 30)}`,
      status: "Confirmed",
    };

    addAppointment(newAppt);
    setError("");
    setFormData({
      patient: "",
      department: DEPARTMENTS[0].name,
      doctor: DOCTORS[0],
      type: APPT_TYPES[0],
      dayIdx: 0,
      hour: 9,
      minute: 0,
      duration: 30,
      notes: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book New Clinical Appointment"
      subtitle="Allocate room, physician, and consultation slot"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-[#FBEAEA] dark:bg-[#B33A3A]/20 text-[#B33A3A] dark:text-[#FCA5A5] text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Patient Name with datalist */}
        <div>
          <label htmlFor="appt-patient" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
            Patient Name *
          </label>
          <input
            id="appt-patient"
            type="text"
            list="patient-suggestions"
            value={formData.patient}
            onChange={(e) => {
              setFormData({ ...formData, patient: e.target.value });
              if (error) setError("");
            }}
            placeholder="e.g. Sofia Novak"
            className="w-full h-10 px-3 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C] focus:ring-1 focus:ring-[#0F7C6C]"
          />
          <datalist id="patient-suggestions">
            {patients.map((p) => (
              <option key={p.id} value={p.name}>
                {p.id} · {p.department}
              </option>
            ))}
          </datalist>
        </div>

        {/* Department & Doctor Grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="appt-dept" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
              Department
            </label>
            <select
              id="appt-dept"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="appt-doctor" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
              Assigned Physician
            </label>
            <select
              id="appt-doctor"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="w-full h-10 px-3 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
            >
              {DOCTORS.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Day, Time & Duration */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="appt-day" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
              Day
            </label>
            <select
              id="appt-day"
              value={formData.dayIdx}
              onChange={(e) => setFormData({ ...formData, dayIdx: Number(e.target.value) })}
              className="w-full h-10 px-2 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
            >
              {DAY_LABELS.map((d, idx) => (
                <option key={d} value={idx}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="appt-hour" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
              Start Time
            </label>
            <select
              id="appt-hour"
              value={formData.hour}
              onChange={(e) => setFormData({ ...formData, hour: Number(e.target.value) })}
              className="w-full h-10 px-2 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
            >
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, "0")}:00
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="appt-type" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
              Appointment Type
            </label>
            <select
              id="appt-type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full h-10 px-2 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
            >
              {APPT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Consultation Notes */}
        <div>
          <label htmlFor="appt-notes" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
            Clinical Notes / Triage Reason
          </label>
          <textarea
            id="appt-notes"
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Reason for visit, symptoms, or referral instructions..."
            className="w-full p-2.5 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEF1F4] dark:border-[#243447]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-10 text-xs font-semibold text-[#5B6B7A] dark:text-[#8EA1B5] hover:bg-[#EEF1F4] dark:hover:bg-[#1C2C42] rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 h-10 bg-[#0F7C6C] text-white text-xs font-semibold rounded-xl hover:bg-[#0C6A5C] transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#0F7C6C]"
          >
            Confirm Appointment
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AppointmentModal;
