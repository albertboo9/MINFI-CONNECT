import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Award,
  BarChart3,
  Users,
  ClipboardCheck,
  BookOpen,
  Target,
  Database,
  Bell,
  Sun,
  Moon,
  Globe,
  ChevronLeft,
  Shield,
  TrendingUp,
  BookMarked,
  Building2,
  CheckSquare,
  Send,
  PlusCircle,
} from "lucide-react";
import { useAppStore, ROLES } from "../../store/index.js";
import RoleSwitcher from "../ui/RoleSwitcher.jsx";
import NotificationPanel from "../ui/NotificationPanel.jsx";
import ToastContainer from "../ui/ToastContainer.jsx";

const NAV_MAP = {
  [ROLES.OPERATOR]: [
    { icon: LayoutDashboard, labelKey: "common.dashboard", path: "/" },
    { icon: Database, labelKey: "nav.sourcing", path: "/catalogue" },
    { icon: GraduationCap, labelKey: "nav.myTrainings", path: "/trainings" },
    { icon: FileText, labelKey: "nav.myRequests", path: "/requests" },
    { icon: Award, labelKey: "nav.myCertifications", path: "/certifications" },
  ],
  [ROLES.MANAGER]: [
    { icon: LayoutDashboard, labelKey: "common.dashboard", path: "/" },
    { icon: Database, labelKey: "nav.sourcing", path: "/catalogue" },
    { icon: Users, labelKey: "common.team", path: "/team" },
    { icon: ClipboardCheck, labelKey: "nav.annualEvals", path: "/evaluations" },
    { icon: FileText, labelKey: "nav.trainingRequests", path: "/requests" },
  ],
  [ROLES.HRM]: [
    { icon: LayoutDashboard, labelKey: "common.dashboard", path: "/" },
    { icon: Database, labelKey: "nav.sourcing", path: "/catalogue" },
    {
      icon: GraduationCap,
      labelKey: "nav.trainingPlan",
      path: "/training-plan",
    },
    { icon: BookOpen, labelKey: "nav.planN1", path: "/planning" },
    { icon: FileText, labelKey: "nav.trainingRequests", path: "/requests" },
    { icon: CheckSquare, labelKey: "nav.validations", path: "/validations" },
    { icon: Building2, labelKey: "nav.providers", path: "/providers" },
    {
      icon: PlusCircle,
      labelKey: "nav.createTraining",
      path: "/create-training",
    },
    { icon: BarChart3, labelKey: "common.analytics", path: "/analytics" },
  ],
  [ROLES.TECH]: [
    { icon: LayoutDashboard, labelKey: "common.dashboard", path: "/" },
    { icon: Database, labelKey: "nav.sourcing", path: "/catalogue" },
    { icon: Users, labelKey: "nav.lmsEnrollments", path: "/team" },
    { icon: CheckSquare, labelKey: "nav.validations", path: "/validations" },
    { icon: Building2, labelKey: "nav.providers", path: "/providers" },
    {
      icon: PlusCircle,
      labelKey: "nav.createTraining",
      path: "/create-training",
    },
    { icon: TrendingUp, labelKey: "nav.techStats", path: "/analytics" },
  ],
  [ROLES.ADMIN]: [
    { icon: Shield, labelKey: "nav.adminSystem", path: "/admin" },
  ],
  [ROLES.DIRECTOR]: [
    { icon: LayoutDashboard, labelKey: "nav.strategicDash", path: "/" },
    { icon: Database, labelKey: "nav.sourcing", path: "/catalogue" },
    {
      icon: GraduationCap,
      labelKey: "nav.trainingPlan",
      path: "/training-plan",
    },
    { icon: Building2, labelKey: "nav.providers", path: "/providers" },
    { icon: BarChart3, labelKey: "common.analytics", path: "/analytics" },
    { icon: TrendingUp, labelKey: "nav.projections", path: "/planning" },
  ],
  [ROLES.PROVIDER]: [
    { icon: LayoutDashboard, labelKey: "common.dashboard", path: "/" },
    { icon: Send, labelKey: "nav.proposeTraining", path: "/propose" },
    { icon: FileText, labelKey: "nav.myProposals", path: "/my-proposals" },
  ],
};

const ROLE_ACCENT = {
  [ROLES.OPERATOR]: "#10B981",
  [ROLES.MANAGER]: "#3B82F6",
  [ROLES.HRM]: "#F59E0B",
  [ROLES.TECH]: "#06B6D4",
  [ROLES.ADMIN]: "#EF4444",
  [ROLES.DIRECTOR]: "#8B5CF6",
  [ROLES.PROVIDER]: "#EC4899",
};

export default function AppShell({ children }) {
  const { t } = useTranslation();
  const {
    isDark,
    toggleTheme,
    toggleLang,
    lang,
    sidebarOpen,
    toggleSidebar,
    currentUser,
    activeRole,
    notifPanelOpen,
    toggleNotifPanel,
    notifications,
  } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = NAV_MAP[activeRole] || NAV_MAP[ROLES.OPERATOR];
  const unread = notifications.filter(
    (n) => (n.role === "all" || n.role === activeRole) && !n.read,
  ).length;
  const accent = ROLE_ACCENT[activeRole] || "#10B981";

  const currentNavItem = navItems.find((i) =>
    i.path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(i.path),
  );

  return (
    <div className="flex h-screen overflow-hidden bg-themed">
      <ToastContainer />
      <NotificationPanel />

      {/* ── Sidebar ─────────────────────────────────── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 256 : 60 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="flex-shrink-0 flex flex-col z-40 overflow-hidden border-r"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
        }}
      >
        {/* Logo */}
        <div
          className="h-[60px] flex items-center px-3 gap-3 flex-shrink-0 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              backgroundColor: accent + "18",
              border: `1px solid ${accent}30`,
            }}
          >
            <img
              src="/MINFI_LOGO.png"
              alt="MINFI"
              className="w-full h-full object-contain"
            />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="overflow-hidden"
              >
                <p
                  className="font-heading font-black text-sm leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  TPGS <span style={{ color: accent }}>·</span> MINFI
                </p>
                <p
                  className="text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Cameroun · 2026
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User chip */}
        <div
          className="px-2 py-3 border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className={clsx(
              "flex items-center gap-2.5 px-2 py-1.5 rounded-xl",
              !sidebarOpen && "justify-center",
            )}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accent}cc, ${accent}66)`,
              }}
            >
              {currentUser.initials}
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden min-w-0">
                <p
                  className="text-xs font-semibold truncate leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentUser.name}
                </p>
                <p
                  className="text-[9px] font-bold tracking-[0.15em] uppercase truncate mt-0.5"
                  style={{ color: accent }}
                >
                  {t(`roles.${activeRole}`)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={clsx(
                  "nav-item w-full text-left",
                  isActive && "active",
                  !sidebarOpen && "justify-center px-0",
                )}
                style={
                  isActive
                    ? { color: accent, backgroundColor: accent + "14" }
                    : {}
                }
                title={!sidebarOpen ? t(item.labelKey) : undefined}
              >
                <item.icon size={16} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="truncate flex-1">{t(item.labelKey)}</span>
                )}
                {sidebarOpen && isActive && (
                  <div
                    className="w-1.5 h-1.5 rounded-full ml-auto"
                    style={{ backgroundColor: accent }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div
          className="p-2 border-t flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          {sidebarOpen && (
            <div className="mb-2">
              <RoleSwitcher />
            </div>
          )}

          <div className={clsx("flex gap-1", !sidebarOpen && "flex-col")}>
            <button
              onClick={toggleTheme}
              className="nav-item flex-1 justify-center"
              title={isDark ? t("common.lightMode") : t("common.darkMode")}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              {sidebarOpen && (
                <span className="text-xs truncate">
                  {isDark ? t("common.lightMode") : t("common.darkMode")}
                </span>
              )}
            </button>
            <button
              onClick={toggleLang}
              className="nav-item flex-1 justify-center"
              title="Switch language"
            >
              <Globe size={14} />
              {sidebarOpen && (
                <span className="text-xs font-mono">
                  {lang === "fr" ? "EN" : "FR"}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={toggleSidebar}
            className="nav-item w-full justify-center mt-1"
            title="Toggle sidebar"
          >
            <ChevronLeft
              size={14}
              className={clsx(
                "transition-transform duration-300",
                !sidebarOpen && "rotate-180",
              )}
            />
            {sidebarOpen && (
              <span className="text-xs">{t("common.collapse", "Réduire")}</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* ── Main ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="h-[60px] flex items-center justify-between px-6 border-b flex-shrink-0"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {currentNavItem
                ? t(currentNavItem.labelKey)
                : t("common.dashboard")}
            </p>
            <p
              className="text-[10px] font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              {currentUser.matricule} · {currentUser.department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button
              onClick={toggleNotifPanel}
              className="relative p-2.5 rounded-xl transition-all hover:bg-[var(--bg-hover)]"
              style={{
                backgroundColor: notifPanelOpen ? "var(--bg-hover)" : "",
              }}
            >
              <Bell size={16} style={{ color: "var(--text-muted)" }} />
              {unread > 0 && (
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse-ring"
                  style={{
                    backgroundColor: "#EF4444",
                    border: "2px solid var(--bg-secondary)",
                  }}
                />
              )}
            </button>

            {/* Grade pill */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border"
              style={{
                backgroundColor: "var(--bg-hover)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: accent,
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                className="text-[10px] font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                {currentUser.grade}
              </span>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto bg-themed">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
