/**
 * @file App.jsx
 * @description Root application shell for CareScope Analytics SaaS with Lazy-Loaded routing, ErrorBoundaries, and Context Providers.
 */

import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";
import useTheme from "./hooks/useTheme";
import useApp from "./hooks/useApp";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSkeleton from "./components/common/LoadingSkeleton";
import ToastContainer from "./components/common/Toast";

// Lazy-loaded page components for optimal bundle performance & code-splitting
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SchedulingPage = lazy(() => import("./pages/SchedulingPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const TimelinePage = lazy(() => import("./pages/TimelinePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function MainAppShell() {
  const { page, setPage } = useApp();
  const { isDark } = useTheme();

  if (page === "landing") {
    return (
      <ErrorBoundary onReset={() => setPage("landing")}>
        <Suspense fallback={<LoadingSkeleton variant="page" />}>
          <LandingPage />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${
        isDark ? "bg-[#07121E] text-[#F5F7FB]" : "bg-[#F7F9FA] text-[#0B2545]"
      }`}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ErrorBoundary onReset={() => setPage("dashboard")}>
          <Suspense fallback={<LoadingSkeleton variant="page" />}>
            {page === "dashboard" && <DashboardPage />}
            {page === "scheduling" && <SchedulingPage />}
            {page === "reports" && <ReportsPage />}
            {page === "timeline" && <TimelinePage />}
            {page === "profile" && <ProfilePage />}
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
        <MainAppShell />
      </AppProvider>
    </ThemeProvider>
  );
}
