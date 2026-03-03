import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import {
    LayoutDashboard, GraduationCap, FileText, Award, BarChart3,
    Users, ClipboardCheck, BookOpen, Target, Database, Settings,
    Bell, Sun, Moon, Globe, ChevronLeft, LogOut, Shield,
    TrendingUp, AlertTriangle, BookMarked
} from 'lucide-react';
import { useAppStore, ROLES } from '../../store/index.js';
import RoleSwitcher from '../ui/RoleSwitcher.jsx';

/* ── Nav definitions per role ── */
const NAV_MAP = {
    [ROLES.OPERATOR]: [
        { icon: LayoutDashboard, label: 'nav.myTrainings', path: '/', section: null },
        { icon: GraduationCap, label: 'nav.myTrainings', path: '/trainings' },
        { icon: FileText, label: 'nav.myRequests', path: '/requests' },
        { icon: Award, label: 'nav.myCertifications', path: '/certifications' },
    ],
    [ROLES.MANAGER]: [
        { icon: LayoutDashboard, label: 'common.dashboard', path: '/' },
        { icon: Users, label: 'common.team', path: '/team' },
        { icon: ClipboardCheck, label: 'nav.annualEvals', path: '/evaluations' },
        { icon: FileText, label: 'nav.trainingRequests', path: '/requests' },
        { icon: Target, label: 'nav.trainingSurvey', path: '/trainings' },
    ],
    [ROLES.HRM]: [
        { icon: LayoutDashboard, label: 'common.dashboard', path: '/' },
        { icon: BookOpen, label: 'nav.planN1', path: '/planning' },
        { icon: Database, label: 'nav.sourcing', path: '/catalogue' },
        { icon: FileText, label: 'nav.trainingRequests', path: '/requests' },
        { icon: BarChart3, label: 'common.reporting', path: '/analytics' },
    ],
    [ROLES.TECH]: [
        { icon: LayoutDashboard, label: 'common.dashboard', path: '/' },
        { icon: Users, label: 'nav.lmsEnrollments', path: '/team' },
        { icon: Award, label: 'nav.certValidation', path: '/certifications' },
        { icon: TrendingUp, label: 'nav.techStats', path: '/analytics' },
    ],
    [ROLES.DIRECTOR]: [
        { icon: LayoutDashboard, label: 'nav.strategicDash', path: '/' },
        { icon: BarChart3, label: 'common.analytics', path: '/analytics' },
        { icon: TrendingUp, label: 'nav.projections', path: '/planning' },
        { icon: BookMarked, label: 'nav.exportReports', path: '/certifications' },
    ],
};

const ROLE_COLORS = {
    [ROLES.OPERATOR]: 'text-tpgs-emerald',
    [ROLES.MANAGER]: 'text-tpgs-blue',
    [ROLES.HRM]: 'text-tpgs-gold',
    [ROLES.TECH]: 'text-tpgs-cyan',
    [ROLES.DIRECTOR]: 'text-tpgs-purple',
};

export default function AppShell({ children }) {
    const { t } = useTranslation();
    const { isDark, toggleTheme, lang, setLang, sidebarOpen, toggleSidebar, currentUser, activeRole } = useAppStore();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = NAV_MAP[activeRole] || NAV_MAP[ROLES.OPERATOR];

    return (
        <div className="flex h-screen overflow-hidden">
            {/* ── Sidebar ─────────────────────────────────── */}
            <motion.aside
                animate={{ width: sidebarOpen ? 260 : 64 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex-shrink-0 flex flex-col bg-tpgs-slate border-r border-tpgs-border z-40 overflow-hidden"
            >
                {/* Logo */}
                <div className="h-[60px] flex items-center px-4 border-b border-tpgs-border gap-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-tpgs-emerald flex items-center justify-center flex-shrink-0">
                        <Shield size={16} className="text-white" />
                    </div>
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="overflow-hidden">
                                <p className="font-heading font-black text-sm leading-none text-white">TPGS</p>
                                <p className="text-2xs text-tpgs-emerald font-bold tracking-widest uppercase">MINFI · Cameroun</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User */}
                <div className="px-3 py-4 border-b border-tpgs-border">
                    <div className={clsx('flex items-center gap-3', !sidebarOpen && 'justify-center')}>
                        <div className={clsx(
                            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black',
                            'bg-gradient-to-br from-tpgs-emerald to-tpgs-blue'
                        )}>
                            {currentUser.initials}
                        </div>
                        {sidebarOpen && (
                            <div className="overflow-hidden min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                                <p className={clsx('text-2xs font-bold tracking-wider uppercase truncate', ROLE_COLORS[activeRole])}>
                                    {t(`roles.${activeRole}`)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/' && location.pathname.startsWith(item.path));
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={clsx(
                                    'nav-item w-full',
                                    isActive && 'active',
                                    !sidebarOpen && 'justify-center px-2'
                                )}
                                title={!sidebarOpen ? t(item.label) : undefined}
                            >
                                <item.icon size={17} className="flex-shrink-0" />
                                {sidebarOpen && <span className="truncate">{t(item.label)}</span>}
                                {sidebarOpen && isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-tpgs-emerald" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="p-3 border-t border-tpgs-border space-y-1">
                    {/* Role switcher (demo) */}
                    {sidebarOpen && <RoleSwitcher />}

                    {/* Theme + Lang */}
                    <div className={clsx('flex gap-1', !sidebarOpen && 'flex-col items-center')}>
                        <button onClick={toggleTheme} className="nav-item flex-1 justify-center" title={isDark ? t('common.lightMode') : t('common.darkMode')}>
                            {isDark ? <Sun size={15} /> : <Moon size={15} />}
                            {sidebarOpen && <span className="text-xs">{isDark ? t('common.lightMode') : t('common.darkMode')}</span>}
                        </button>
                        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="nav-item flex-1 justify-center" title="Switch language">
                            <Globe size={15} />
                            {sidebarOpen && <span className="text-xs font-mono">{lang === 'fr' ? 'EN' : 'FR'}</span>}
                        </button>
                    </div>

                    <button onClick={toggleSidebar} className="nav-item w-full justify-center" title="Toggle sidebar">
                        <ChevronLeft size={15} className={clsx('transition-transform duration-300', !sidebarOpen && 'rotate-180')} />
                        {sidebarOpen && <span className="text-xs">Réduire</span>}
                    </button>
                </div>
            </motion.aside>

            {/* ── Main Content ─────────────────────────────── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-[60px] flex items-center justify-between px-6 border-b border-tpgs-border bg-tpgs-slate/50 backdrop-blur-sm flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Breadcrumb / Title */}
                        <div>
                            <p className="text-sm font-semibold text-white">
                                {navItems.find(i => i.path === location.pathname)
                                    ? t(navItems.find(i => i.path === location.pathname).label)
                                    : t('common.dashboard')}
                            </p>
                            <p className="text-2xs text-slate-500 font-mono">{currentUser.matricule} · {currentUser.department}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Notification bell */}
                        <button className="relative p-2 rounded-xl hover:bg-tpgs-hover transition-colors">
                            <Bell size={16} className="text-slate-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-tpgs-red rounded-full border border-tpgs-slate" />
                        </button>
                        {/* Grade */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-tpgs-card border border-tpgs-border">
                            <div className={clsx('w-2 h-2 rounded-full animate-pulse-ring', 'bg-tpgs-emerald')} />
                            <span className="text-2xs font-semibold text-slate-400">{currentUser.grade}</span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-tpgs-navy">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-6 min-h-full"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
