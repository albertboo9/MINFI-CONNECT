// src/store/index.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n/index.js';

export const ROLES = {
    OPERATOR: 'operator',
    MANAGER: 'manager',
    HRM: 'hrm',
    TECH: 'tech',
    DIRECTOR: 'director',
};

const MOCK_USERS = {
    [ROLES.OPERATOR]: { id: 'u1', name: 'Armand Mballa', initials: 'AM', role: ROLES.OPERATOR, department: 'Direction des Impôts', grade: 'Inspecteur des Impôts', matricule: '125847-A' },
    [ROLES.MANAGER]: { id: 'u2', name: 'Clarisse Ngo Biyong', initials: 'CN', role: ROLES.MANAGER, department: 'Sous-Direction des Ressources', grade: 'Chef de Service', matricule: '098321-B' },
    [ROLES.HRM]: { id: 'u3', name: 'Roger Essomba', initials: 'RE', role: ROLES.HRM, department: 'Direction des Ressources Humaines', grade: 'Chef de Division Formation', matricule: '067142-C' },
    [ROLES.TECH]: { id: 'u4', name: 'Sandra Fouda', initials: 'SF', role: ROLES.TECH, department: 'Service Technique Formation', grade: 'Technicienne Pédagogique', matricule: '201563-D' },
    [ROLES.DIRECTOR]: { id: 'u5', name: 'Jean-Pierre Atangana', initials: 'JA', role: ROLES.DIRECTOR, department: 'Secrétariat Général', grade: 'Secrétaire Général Adjoint', matricule: '034001-E' },
};

// Apply theme class to html root element
const applyTheme = (isDark) => {
    if (isDark) {
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.add('light');
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

            // Language — live switch without page reload
            lang: 'fr',
            setLang: (lang) => {
                i18n.changeLanguage(lang);
                localStorage.setItem('tpgs-lang', lang);
                set({ lang });
            },
            toggleLang: () => {
                const next = get().lang === 'fr' ? 'en' : 'fr';
                i18n.changeLanguage(next);
                localStorage.setItem('tpgs-lang', next);
                set({ lang: next });
            },

            // Active role (demo switcher)
            activeRole: ROLES.OPERATOR,
            currentUser: MOCK_USERS[ROLES.OPERATOR],
            setRole: (role) => set({ activeRole: role, currentUser: MOCK_USERS[role] }),

            // Sidebar
            sidebarOpen: true,
            toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

            // Notification panel
            notifPanelOpen: false,
            toggleNotifPanel: () => set((s) => ({ notifPanelOpen: !s.notifPanelOpen })),
            closeNotifPanel: () => set({ notifPanelOpen: false }),
        }),
        {
            name: 'tpgs-app-store',
            partialize: (s) => ({ isDark: s.isDark, lang: s.lang, activeRole: s.activeRole }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyTheme(state.isDark);
                    if (state.lang) i18n.changeLanguage(state.lang);
                    // Rehydrate user from saved role
                    state.currentUser = MOCK_USERS[state.activeRole] || MOCK_USERS[ROLES.OPERATOR];
                }
            },
        }
    )
);

// Init theme immediately
applyTheme(useAppStore.getState().isDark);
