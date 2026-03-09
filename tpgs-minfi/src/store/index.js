// src/store/index.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n/index.js";

export const ROLES = {
  OPERATOR: "operator",
  MANAGER: "manager",
  HRM: "hrm",
  TECH: "tech",
  ADMIN: "admin",
  DIRECTOR: "director",
};

const MOCK_USERS = {
  [ROLES.OPERATOR]: {
    id: "u1",
    name: "Armand Mballa",
    initials: "AM",
    role: ROLES.OPERATOR,
    department: "Direction des Impôts",
    grade: "Inspecteur des Impôts",
    matricule: "125847-A",
  },
  [ROLES.MANAGER]: {
    id: "u2",
    name: "Clarisse Ngo Biyong",
    initials: "CN",
    role: ROLES.MANAGER,
    department: "Sous-Direction des Ressources",
    grade: "Chef de Service",
    matricule: "098321-B",
  },
  [ROLES.HRM]: {
    id: "u3",
    name: "Roger Essomba",
    initials: "RE",
    role: ROLES.HRM,
    department: "Direction des Ressources Humaines",
    grade: "Chef de Division Formation",
    matricule: "067142-C",
  },
  [ROLES.TECH]: {
    id: "u4",
    name: "Sandra Fouda",
    initials: "SF",
    role: ROLES.TECH,
    department: "Service Technique Formation",
    grade: "Technicienne Pédagogique",
    matricule: "201563-D",
  },
  [ROLES.ADMIN]: {
    id: "u6",
    name: "David Kana",
    initials: "DK",
    role: ROLES.ADMIN,
    department: "DSI - Direction des Systèmes d'Information",
    grade: "Administrateur Système",
    matricule: "089234-F",
  },
  [ROLES.DIRECTOR]: {
    id: "u5",
    name: "Jean-Pierre Atangana",
    initials: "JA",
    role: ROLES.DIRECTOR,
    department: "Secrétariat Général",
    grade: "Secrétaire Général Adjoint",
    matricule: "034001-E",
  },
};

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "warning",
    title: "Rapport hebdomadaire en retard",
    message: "Paul-Éric Nkodo — Rapport non soumis depuis 12 jours",
    date: "Il y a 2h",
    read: false,
    role: ROLES.MANAGER,
  },
  {
    id: "n2",
    type: "success",
    title: "Certification validée",
    message: "Marie-Claire Owona a obtenu la Certification ARMP",
    date: "Il y a 3h",
    read: false,
    role: ROLES.MANAGER,
  },
  {
    id: "n3",
    type: "info",
    title: "Deadline évaluations",
    message: "Saisie des évaluations annuelles — Clôture le 15 mars",
    date: "Il y a 5h",
    read: true,
    role: "all",
  },
  {
    id: "n4",
    type: "alert",
    title: "Budget 80% consommé",
    message: "Direction des Douanes — Enveloppe formation quasi épuisée",
    date: "Hier",
    read: true,
    role: ROLES.HRM,
  },
  {
    id: "n5",
    type: "info",
    title: "Demande approuvée",
    message: "Votre demande 'Excel Avancé' a été approuvée par C. Ngo Biyong",
    date: "Hier",
    read: true,
    role: ROLES.OPERATOR,
  },
  {
    id: "n6",
    type: "warning",
    title: "Formation non démarrée",
    message: "'Marchés Publics' — Planifiée il y a 35 jours, aucune activité",
    date: "2 jours",
    read: true,
    role: ROLES.TECH,
  },
];

const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
  }
};

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme
      isDark: true,
      toggleTheme: () => {
        const next = !get().isDark;
        applyTheme(next);
        set({ isDark: next });
      },

      // Language
      lang: "fr",
      setLang: (lang) => {
        i18n.changeLanguage(lang);
        set({ lang });
      },
      toggleLang: () => {
        const next = get().lang === "fr" ? "en" : "fr";
        i18n.changeLanguage(next);
        set({ lang: next });
      },

      // Notifications
      notifications: INITIAL_NOTIFICATIONS,
      markAllNotificationsRead: () => {
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        }));
      },
      addNotification: (n) => {
        set((s) => ({
          notifications: [
            {
              id: `n${Date.now()}`,
              date: "À l'instant",
              read: false,
              role: "all",
              ...n,
            },
            ...s.notifications,
          ],
        }));
      },

      // Active role
      activeRole: ROLES.OPERATOR,
      currentUser: MOCK_USERS[ROLES.OPERATOR],
      setRole: (role) =>
        set({ activeRole: role, currentUser: MOCK_USERS[role] }),

      // UI State
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      notifPanelOpen: false,
      toggleNotifPanel: () =>
        set((s) => ({ notifPanelOpen: !s.notifPanelOpen })),
      closeNotifPanel: () => set({ notifPanelOpen: false }),

      // Workspace Data (Simulated)
      myTeamRequests: [], // For Managers
      allEmployees: [], // For HRM
    }),
    {
      name: "tpgs-app-store",
      partialize: (s) => ({
        isDark: s.isDark,
        lang: s.lang,
        activeRole: s.activeRole,
        notifications: s.notifications,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.isDark);
          if (state.lang) i18n.changeLanguage(state.lang);
          state.currentUser =
            MOCK_USERS[state.activeRole] || MOCK_USERS[ROLES.OPERATOR];
        }
      },
    },
  ),
);

applyTheme(useAppStore.getState().isDark);
