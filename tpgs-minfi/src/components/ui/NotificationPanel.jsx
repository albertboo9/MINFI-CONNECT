// src/components/ui/NotificationPanel.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle2, AlertTriangle, Info, CheckCheck } from 'lucide-react';
import { useAppStore } from '../../store/index.js';
import { useSound } from '../../hooks/useSound.js';

export const NOTIFICATIONS = [
    { id: 'n1', type: 'warning', title: 'Rapport hebdomadaire en retard', message: 'Paul-Éric Nkodo — Rapport non soumis depuis 12 jours', date: 'Il y a 2h', read: false, role: 'manager' },
    { id: 'n2', type: 'success', title: 'Certification validée', message: 'Marie-Claire Owona a obtenu la Certification ARMP', date: 'Il y a 3h', read: false, role: 'manager' },
    { id: 'n3', type: 'info', title: 'Deadline évaluations', message: 'Saisie des évaluations annuelles — Clôture le 15 mars', date: 'Il y a 5h', read: true, role: 'all' },
    { id: 'n4', type: 'alert', title: 'Budget 80% consommé', message: 'Direction des Douanes — Enveloppe formation quasi épuisée', date: 'Hier', read: true, role: 'hrm' },
    { id: 'n5', type: 'info', title: 'Demande approuvée', message: "Votre demande 'Excel Avancé' a été approuvée par C. Ngo Biyong", date: 'Hier', read: true, role: 'operator' },
    { id: 'n6', type: 'warning', title: 'Formation non démarrée', message: "'Marchés Publics' — Planifiée il y a 35 jours, aucune activité", date: '2 jours', read: true, role: 'tech' },
];

const TYPE_CONFIG = {
    success: { icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
    warning: { icon: AlertTriangle, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    info: { icon: Info, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
    alert: { icon: AlertTriangle, color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
};

export default function NotificationPanel() {
    const { notifPanelOpen, closeNotifPanel } = useAppStore();
    const { playNotify } = useSound();

    const unread = NOTIFICATIONS.filter(n => !n.read).length;

    // Play sound when panel opens with unread
    useEffect(() => {
        if (notifPanelOpen && unread > 0) {
            setTimeout(() => playNotify(), 200);
        }
    }, [notifPanelOpen]);

    return (
        <AnimatePresence>
            {notifPanelOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div className="drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeNotifPanel} />

                    {/* Panel */}
                    <motion.div
                        className="drawer-panel animate-slide-in-right"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-tpgs-emerald/10 flex items-center justify-center">
                                    <Bell size={17} className="text-tpgs-emerald" />
                                </div>
                                <div>
                                    <h2 className="font-heading font-bold text-base" style={{ color: 'var(--text-primary)' }}>Notifications</h2>
                                    {unread > 0 && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{unread} non lue{unread > 1 ? 's' : ''}</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {unread > 0 && (
                                    <button className="flex items-center gap-1.5 text-xs font-semibold text-tpgs-emerald hover:text-emerald-300 transition-colors px-3 py-2 rounded-xl hover:bg-tpgs-emerald/10">
                                        <CheckCheck size={13} /> Tout marquer lu
                                    </button>
                                )}
                                <button onClick={closeNotifPanel} className="p-2 rounded-xl transition-colors" style={{ color: 'var(--text-muted)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = ''}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Notifications list */}
                        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                            {NOTIFICATIONS.map((n, i) => {
                                const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
                                const Icon = cfg.icon;
                                return (
                                    <motion.div
                                        key={n.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex gap-4 px-6 py-4 cursor-pointer transition-all hover:brightness-105"
                                        style={{ backgroundColor: !n.read ? cfg.bg : 'transparent' }}
                                    >
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.color}20` }}>
                                            <Icon size={16} style={{ color: cfg.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{n.title}</p>
                                                {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: cfg.color }} />}
                                            </div>
                                            <p className="text-xs mt-1 leading-snug" style={{ color: 'var(--text-muted)' }}>{n.message}</p>
                                            <p className="text-[10px] mt-1.5 font-mono" style={{ color: 'var(--text-faint)' }}>{n.date}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
