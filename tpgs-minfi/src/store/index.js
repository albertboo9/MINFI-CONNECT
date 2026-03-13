// src/store/index.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n/index.js";
import {
  enrolledTrainings as initialEnrolledTrainings,
  TRAINING_STATUS,
} from "../data/mock.js";

export const ROLES = {
  OPERATOR: "operator",
  MANAGER: "manager",
  HRM: "hrm",
  TECH: "tech",
  ADMIN: "admin",
  DIRECTOR: "director",
  PROVIDER: "provider",
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
    department: "Secrétaire Général",
    grade: "Secrétaire Général Adjoint",
    matricule: "034001-E",
  },
  [ROLES.PROVIDER]: {
    id: "p1",
    name: "Cabinet Alpha Formation",
    initials: "CAF",
    role: ROLES.PROVIDER,
    department: "Organisme de Formation",
    grade: "Prestataire Agréé",
    matricule: "PRV-001",
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

      // ============================================
      // DOMAINE E: SUIVI DES FORMATIONS
      // ============================================

      // Formations suivies (état global)
      enrolledTrainings: initialEnrolledTrainings,

      // Action: Démarrer une formation
      startTraining: (trainingId) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  status: TRAINING_STATUS.IN_PROGRESS,
                  startDate: new Date().toISOString().split("T")[0],
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "DÉMARRAGE",
                      user: s.currentUser?.name || "Utilisateur",
                      details: "Confirmation du démarrage de la formation",
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Soumettre un rapport de suivi
      submitReport: (trainingId, reportData) => {
        set((s) => {
          const training = s.enrolledTrainings.find((t) => t.id === trainingId);
          if (!training) return s;

          const newReport = {
            id: `rpt${Date.now()}`,
            date: new Date().toISOString().split("T")[0],
            ...reportData,
          };

          return {
            enrolledTrainings: s.enrolledTrainings.map((t) =>
              t.id === trainingId
                ? {
                    ...t,
                    reports: [...t.reports, newReport],
                    progress: reportData.progress || t.progress,
                    modulesCompleted:
                      reportData.modulesCompleted || t.modulesCompleted,
                    lastReportDate: newReport.date,
                    // Retirer le statut "en retard" si la progression est bonne
                    status:
                      t.status === TRAINING_STATUS.DELAYED &&
                      reportData.progress > 30
                        ? TRAINING_STATUS.IN_PROGRESS
                        : t.status,
                    history: [
                      ...t.history,
                      {
                        date: newReport.date,
                        action: "RAPPORT",
                        user: s.currentUser?.name || "Utilisateur",
                        details: `Rapport soumis - ${reportData.progress || t.progress}%`,
                      },
                    ],
                  }
                : t,
            ),
          };
        });
      },

      // Action: Demander une pause
      requestPause: (trainingId, pauseData) => {
        set((s) => {
          const training = s.enrolledTrainings.find((t) => t.id === trainingId);
          if (!training) return s;

          // Vérifier le nombre de pauses (max 3)
          if (training.pauses.length >= 3) return s;

          const newPause = {
            id: `ps${Date.now()}`,
            startDate: pauseData.startDate,
            endDate: pauseData.endDate,
            reason: pauseData.reason,
            approved: false,
          };

          return {
            enrolledTrainings: s.enrolledTrainings.map((t) =>
              t.id === trainingId
                ? {
                    ...t,
                    status: TRAINING_STATUS.ON_PAUSE,
                    pauses: [...t.pauses, newPause],
                    history: [
                      ...t.history,
                      {
                        date: new Date().toISOString().split("T")[0],
                        action: "PAUSE",
                        user: s.currentUser?.name || "Utilisateur",
                        details: `Demande de pause: ${pauseData.reason}`,
                      },
                    ],
                  }
                : t,
            ),
          };
        });
      },

      // Action: Approuver une pause (pour TECH/HRM)
      approvePause: (trainingId, pauseId) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  pauses: t.pauses.map((p) =>
                    p.id === pauseId
                      ? {
                          ...p,
                          approved: true,
                          approvedBy: s.currentUser?.name,
                          approvedDate: new Date().toISOString().split("T")[0],
                        }
                      : p,
                  ),
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "PAUSE_APPROUVÉE",
                      user: s.currentUser?.name || "Utilisateur",
                      details: "Pause approuvée par le service formation",
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Reprendre la formation après une pause
      resumeTraining: (trainingId) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  status: TRAINING_STATUS.IN_PROGRESS,
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "REPRISE",
                      user: s.currentUser?.name || "Utilisateur",
                      details: "Reprise de la formation après pause",
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Déclarer la formation terminée
      completeTraining: (trainingId) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  status: TRAINING_STATUS.COMPLETED,
                  actualEndDate: new Date().toISOString().split("T")[0],
                  progress: 100,
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "TERMINAISON",
                      user: s.currentUser?.name || "Utilisateur",
                      details:
                        "Formation déclarée terminée - En attente de validation",
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Valider une formation (pour TECH/HRM)
      validateTraining: (trainingId) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  status: TRAINING_STATUS.VALIDATED,
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "VALIDATION",
                      user: s.currentUser?.name || "Utilisateur",
                      details: "Formation validée - Certificat vérifié",
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Rejeter une formation (pour TECH/HRM)
      rejectTraining: (trainingId, reason) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  status: TRAINING_STATUS.REJECTED,
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "REJET",
                      user: s.currentUser?.name || "Utilisateur",
                      details: `Formation rejetée: ${reason}`,
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Soumettre un certificat
      submitCertificate: (trainingId, certificateData) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  certificate: {
                    url: certificateData.url,
                    uploadDate: new Date().toISOString().split("T")[0],
                    verified: false,
                  },
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "CERTIFICAT",
                      user: s.currentUser?.name || "Utilisateur",
                      details: "Certificat déposé",
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Soumettre une évaluation
      submitEvaluation: (trainingId, evaluationData) => {
        set((s) => ({
          enrolledTrainings: s.enrolledTrainings.map((t) =>
            t.id === trainingId
              ? {
                  ...t,
                  evaluation: {
                    date: new Date().toISOString().split("T")[0],
                    ...evaluationData,
                  },
                  history: [
                    ...t.history,
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "ÉVALUATION",
                      user: s.currentUser?.name || "Utilisateur",
                      details: "Évaluation qualité soumise",
                    },
                  ],
                }
              : t,
          ),
        }));
      },

      // Action: Inscrire un collaborateur à une formation
      enrollEmployee: (employeeData) => {
        const newEnrollment = {
          id: `en${Date.now()}`,
          ...employeeData,
          status: TRAINING_STATUS.PLANNED,
          registrationDate: new Date().toISOString().split("T")[0],
          startDate: null,
          expectedEndDate: null,
          actualEndDate: null,
          progress: 0,
          modulesCompleted: 0,
          reports: [],
          pauses: [],
          attendances: [],
          certificate: null,
          attestation: null,
          evaluation: null,
          history: [
            {
              date: new Date().toISOString().split("T")[0],
              action: "INSCRIPTION",
              user: "Service Formation",
              details: "Collaborateur inscrit à la formation",
            },
          ],
        };
        set((s) => ({
          enrolledTrainings: [...s.enrolledTrainings, newEnrollment],
        }));
      },

      // Get formations for current user
      getMyEnrolledTrainings: () => {
        const s = get();
        return s.enrolledTrainings.filter(
          (t) => t.employeeId === s.currentUser?.id,
        );
      },

      // Get team formations (for managers)
      getTeamEnrolledTrainings: () => {
        const s = get();
        // Pour managers, retourne les formations de l'équipe
        return s.enrolledTrainings.filter(
          (t) => t.status !== TRAINING_STATUS.VALIDATED,
        );
      },

      // Get formations en attente de validation (pour TECH/HRM)
      getPendingValidations: () => {
        return get().enrolledTrainings.filter(
          (t) => t.status === TRAINING_STATUS.COMPLETED,
        );
      },
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
