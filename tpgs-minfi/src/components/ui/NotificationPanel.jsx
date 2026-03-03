// src/components/ui/NotificationPanel.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle2, AlertTriangle, Info, CheckCheck } from 'lucide-react';
import { useAppStore } from '../../store/index.js';
import { useSound } from '../../hooks/useSound.js';

const TYPE_CONFIG = {
    success: { icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
    warning: { icon: AlertTriangle, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    info: { icon: Info, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
    alert: { icon: AlertTriangle, color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
};

export default function NotificationPanel() {
    const { notifPanelOpen, closeNotifPanel, notifications, markAllNotificationsRead, activeRole } = useAppStore();
    const { playNotify } = useSound();

    // Filter by role
    const filtered = notifications.filter(n => n.role === 'all' || n.role === activeRole);
    const unread = filtered.filter(n => !n.read).length;

    useEffect(() => {
        if (notifPanelOpen && unread > 0) {
            setTimeout(() => playNotify(), 200);
        }
    }, [notifPanelOpen]);

    return (
        <AnimatePresence>
            {notifPanelOpen && (
                <>
                    <motion.div className="drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeNotifPanel} />
                    <motion.div
                        className="drawer-panel"
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
                                    <button onClick={markAllNotificationsRead} className="flex items-center gap-1.5 text-xs font-semibold text-tpgs-emerald hover:text-emerald-300 transition-colors px-3 py-2 rounded-xl hover:bg-themed-hover">
                                        <CheckCheck size={13} /> Tout lire
                                    </button>
                                )}
                                <button onClick={closeNotifPanel} className="p-2 rounded-xl hover:bg-themed-hover transition-colors" style={{ color: 'var(--text-muted)' }}>
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Notifications list */}
                        <div className="divide-y overflow-y-auto max-h-[calc(100vh-80px)]" style={{ borderColor: 'var(--border)' }}>
                            {filtered.map((n, i) => {
                                const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
                                const Icon = cfg.icon;
                                return (
                                    <motion.div
                                        key={n.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex gap-4 px-6 py-4 cursor-pointer transition-all hover:bg-themed-hover/40"
                                        style={{ borderLeft: !n.read ? `3px solid ${cfg.color}` : 'none' }}
                                    >
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ backgroundColor: cfg.bg }}>
                                            <Icon size={16} style={{ color: cfg.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className={`text-sm leading-snug ${!n.read ? 'font-bold' : 'font-medium'}`} style={{ color: 'var(--text-primary)' }}>{n.title}</p>
                                            </div>
                                            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{n.message}</p>
                                            <p className="text-[10px] mt-1.5 font-mono" style={{ color: 'var(--text-faint)' }}>{n.date}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {filtered.length === 0 && (
                                <div className="p-20 text-center">
                                    <Bell size={40} className="mx-auto text-themed-muted opacity-10 mb-4" />
                                    <p className="text-sm text-themed-muted">Aucune notification pour votre rôle.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
