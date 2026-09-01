/**
 * @file App.jsx
 * @description Root application shell with client router architecture (React Router v7), Error Boundaries, and Context Providers.
 * Domain Features:
 * 1. Interactive Healthcare Dashboard
 * 2. Treatment Timeline & Diagnostic Reports
 * 3. Predictive Analytics Charts (UI Only)
 * 4. Scheduling & Live Monitoring Widgets [REALTIME]
 * 5. Customizable Healthcare Reports
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";
import useTheme from "./hooks/useTheme";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSkeleton from "./components/common/LoadingSkeleton";
import ToastContainer from "./components/common/Toast";

// Domain APIs & Services
import "./services/apiService";
import "./api/schedulingAndLiveMonitoringApi";
import "./api/patientApi";
import "./api/reportApi";

// Lazy-loaded page components for optimal bundle performance & code-splitting
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SchedulingPage = lazy(() => import("./pages/SchedulingPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const TimelinePage = lazy(() => import("./pages/TimelinePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function AppLayout({ children }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex min-h-screen ${
        isDark ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#F7F9FA] text-[#0B2545]"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton variant="page" />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </div>
      <MobileNav />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSkeleton variant="page" />}>
                    <LandingPage />
                  </Suspense>
                  <ToastContainer />
                </ErrorBoundary>
              }
            />

            {/* Application Authenticated Shell Routes */}
            <Route
              path="/dashboard"
              element={
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              }
            />
            <Route
              path="/scheduling"
              element={
                <AppLayout>
                  <SchedulingPage />
                </AppLayout>
              }
            />
            <Route
              path="/scheduling-and-live-monitoring"
              element={
                <AppLayout>
                  <SchedulingPage />
                </AppLayout>
              }
            />
            <Route
              path="/reports"
              element={
                <AppLayout>
                  <ReportsPage />
                </AppLayout>
              }
            />
            <Route
              path="/timeline"
              element={
                <AppLayout>
                  <TimelinePage />
                </AppLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <AppLayout>
                  <ProfilePage />
                </AppLayout>
              }
            />

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
