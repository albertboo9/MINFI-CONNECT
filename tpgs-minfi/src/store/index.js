// src/store/index.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ROLES = {
    OPERATOR: 'operator',
    MANAGER: 'manager',
    HRM: 'hrm',
    TECH: 'tech',
    DIRECTOR: 'director',
    ADMIN: 'admin',
};

const MOCK_USERS = {
    [ROLES.OPERATOR]: { id: 'u1', name: 'Armand Mballa', initials: 'AM', role: ROLES.OPERATOR, department: 'Direction des Impôts', grade: 'Inspecteur des Impôts', matricule: '125847-A' },
    [ROLES.MANAGER]: { id: 'u2', name: 'Clarisse Ngo Biyong', initials: 'CN', role: ROLES.MANAGER, department: 'Sous-Direction des Ressources', grade: 'Chef de Service', matricule: '098321-B' },
    [ROLES.HRM]: { id: 'u3', name: 'Roger Essomba', initials: 'RE', role: ROLES.HRM, department: 'Direction des Ressources Humaines', grade: 'Chef de Division Formation', matricule: '067142-C' },
    [ROLES.TECH]: { id: 'u4', name: 'Sandra Fouda', initials: 'SF', role: ROLES.TECH, department: 'Service Technique Formation', grade: 'Technicienne Pédagogique', matricule: '201563-D' },
    [ROLES.DIRECTOR]: { id: 'u5', name: 'Jean-Pierre Atangana', initials: 'JA', role: ROLES.DIRECTOR, department: 'Secrétariat Général', grade: 'Secrétaire Général Adjoint', matricule: '034001-E' },
};

export const useAppStore = create(
    persist(
        (set) => ({
            // Theme
            isDark: true,
            toggleTheme: () => set((s) => {
                const next = !s.isDark;
                document.documentElement.classList.toggle('light', !next);
                return { isDark: next };
            }),

            // Language
            lang: 'fr',
            setLang: (lang) => {
                localStorage.setItem('tpgs-lang', lang);
                set({ lang });
                window.location.reload();
            },

            // Active role (demo switcher)
            activeRole: ROLES.OPERATOR,
            currentUser: MOCK_USERS[ROLES.OPERATOR],
            setRole: (role) => set({ activeRole: role, currentUser: MOCK_USERS[role] }),

            // Sidebar collapsed
            sidebarOpen: true,
            toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
        }),
        {
            name: 'tpgs-app-store',
            partialize: (s) => ({ isDark: s.isDark, lang: s.lang, activeRole: s.activeRole }),
        }
    )
);

// Init theme on load
const { isDark } = useAppStore.getState();
if (!isDark) document.documentElement.classList.add('light');
