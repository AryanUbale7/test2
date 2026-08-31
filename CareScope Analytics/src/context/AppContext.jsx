/**
 * @file AppContext.jsx
 * @description Global state provider for CareScope Analytics SaaS application.
 */

import { useState, useMemo, useCallback } from "react";
import { AppContext } from "./AppContextInstance";
import { PATIENTS, genAppointments, genReportCards } from "../services/mockDataEngine";
import { DEPARTMENTS } from "../constants/medicalConstants";

export function AppProvider({ children }) {
  const [page, setPage] = useState("landing");
  const [selectedPatientId, setSelectedPatientId] = useState(PATIENTS[0].id);
  const [appointments, setAppointments] = useState(() => genAppointments());
  const [reportsList, setReportsList] = useState(() => genReportCards());
  const [searchQuery, setSearchQuery] = useState("");
  const [toasts, setToasts] = useState([]);
  const [userPrefs, setUserPrefs] = useState({
    email: true,
    sms: false,
    digest: true,
  });

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const addAppointment = useCallback((newAppt) => {
    setAppointments((prev) => [newAppt, ...prev]);
    showToast(`Appointment booked for ${newAppt.patient} in ${newAppt.department}`);
  }, [showToast]);

  const cancelAppointment = useCallback((id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    showToast("Appointment cancelled successfully", "info");
  }, [showToast]);

  const addReport = useCallback((newReport) => {
    setReportsList((prev) => [newReport, ...prev]);
    showToast(`New report "${newReport.title}" generated`);
  }, [showToast]);

  const updatePreference = useCallback((key, value) => {
    setUserPrefs((prev) => ({ ...prev, [key]: value }));
    showToast(`Notification preference updated`);
  }, [showToast]);

  const value = useMemo(
    () => ({
      page,
      setPage,
      patients: PATIENTS,
      selectedPatientId,
      setSelectedPatientId,
      departments: DEPARTMENTS,
      appointments,
      addAppointment,
      cancelAppointment,
      reportsList,
      addReport,
      searchQuery,
      setSearchQuery,
      toasts,
      showToast,
      userPrefs,
      updatePreference,
    }),
    [
      page,
      selectedPatientId,
      appointments,
      addAppointment,
      cancelAppointment,
      reportsList,
      addReport,
      searchQuery,
      toasts,
      showToast,
      userPrefs,
      updatePreference,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
