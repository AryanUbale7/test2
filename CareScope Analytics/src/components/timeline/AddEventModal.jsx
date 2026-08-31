/**
 * @file AddEventModal.jsx
 * @description Dialog modal for logging a new clinical milestone or treatment note to a patient's timeline.
 */

import { useState } from "react";
import Modal from "../common/Modal";
import { TIMELINE_EVENT_TYPES } from "../../constants/medicalConstants";
import { DOCTORS } from "../../services/mockDataEngine";
import useApp from "../../hooks/useApp";

export function AddEventModal({ isOpen, onClose }) {
  const { showToast, selectedPatientId } = useApp();
  const [formData, setFormData] = useState({
    type: "Diagnosis",
    physician: DOCTORS[0],
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.note.trim()) return;

    showToast(`Logged new ${formData.type} milestone for patient ${selectedPatientId}`, "success");
    setFormData({ type: "Diagnosis", physician: DOCTORS[0], note: "" });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Clinical Milestone"
      subtitle={`Log new treatment event for patient #${selectedPatientId}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="evt-type" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
            Event Classification
          </label>
          <select
            id="evt-type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none"
          >
            {TIMELINE_EVENT_TYPES.map((t) => (
              <option key={t.type} value={t.type}>
                {t.type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="evt-physician" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
            Authoring Physician
          </label>
          <select
            id="evt-physician"
            value={formData.physician}
            onChange={(e) => setFormData({ ...formData, physician: e.target.value })}
            className="w-full h-10 px-3 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none"
          >
            {DOCTORS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="evt-note" className="block text-xs font-semibold text-[#0B2545] dark:text-[#F5F7FB] mb-1">
            Clinical Observation & Orders *
          </label>
          <textarea
            id="evt-note"
            rows={3}
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="Details of diagnosis, prescription changes, procedure outcomes, or discharge summary..."
            required
            className="w-full p-3 rounded-xl border border-[#E4E9ED] dark:border-[#243447] bg-white dark:bg-[#1C2C42] text-xs text-[#0B2545] dark:text-[#F5F7FB] outline-none focus:border-[#0F7C6C]"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEF1F4] dark:border-[#243447]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-9 text-xs font-semibold text-[#5B6B7A] dark:text-[#8EA1B5] hover:bg-gray-100 dark:hover:bg-[#1C2C42] rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 h-9 bg-[#0F7C6C] text-white text-xs font-semibold rounded-xl hover:bg-[#0C6A5C] transition-colors"
          >
            Save to Timeline
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddEventModal;
