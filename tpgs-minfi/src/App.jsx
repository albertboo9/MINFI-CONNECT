import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store/index.js";

// Layout
import AppShell from "./components/layout/AppShell.jsx";
import LoadingScreen from "./components/ui/LoadingScreen.jsx";

// Pages (lazy)
const Login = lazy(() => import("./pages/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Trainings = lazy(() => import("./pages/Trainings.jsx"));
const Requests = lazy(() => import("./pages/Requests.jsx"));
const Certifications = lazy(() => import("./pages/Certifications.jsx"));
const Planning = lazy(() => import("./pages/Planning.jsx"));
const Analytics = lazy(() => import("./pages/Analytics.jsx"));
const Catalogue = lazy(() => import("./pages/Catalogue.jsx"));
const Team = lazy(() => import("./pages/Team.jsx"));
const Evaluations = lazy(() => import("./pages/Evaluations.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));
const TrainingPlan = lazy(() => import("./pages/TrainingPlan.jsx"));
const ProviderDashboard = lazy(() => import("./pages/ProviderDashboard.jsx"));
const Validations = lazy(() => import("./pages/Validations.jsx"));
const Providers = lazy(() => import("./pages/Providers.jsx"));

export default function App() {
  const { activeRole } = useAppStore();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AppShell>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trainings" element={<Trainings />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/team" element={<Team />} />
                <Route path="/evaluations" element={<Evaluations />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/training-plan" element={<TrainingPlan />} />
                <Route path="/propose" element={<ProviderDashboard />} />
                <Route path="/my-proposals" element={<ProviderDashboard />} />
                <Route path="/validations" element={<Validations />} />
                <Route path="/providers" element={<Providers />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </Suspense>
  );
}

