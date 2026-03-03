import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teamMembers } from '../data/mock.js';
import {
    TrendingUp, TrendingDown, Award, AlertTriangle, BookOpen,
    ChevronRight, X, Mail, Phone, Calendar, Clock, Target,
    FileText, UserCheck, Zap, MoreVertical
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';

/* ── Member Detail Drawer ───────────────────────────── */
function MemberDrawer({ member, open, onClose }) {
    const { playClick } = useSound();
    if (!member) return null;

    const delta = member.score - member.scoreN1;

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div className="drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                    <motion.div className="drawer-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                        {/* Header */}
                        <div className="p-8 border-b border-themed bg-themed-card sticky top-0 z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-tpgs-emerald to-blue-500 flex items-center justify-center text-4xl font-black text-white shadow-xl">
                                    {member.initials}
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-themed-hover rounded-xl text-themed-muted transition-colors"><X size={20} /></button>
                            </div>
                            <h2 className="text-2xl font-black text-themed">{member.name}</h2>
                            <p className="section-label mt-1">{member.grade}</p>
                            <div className="flex gap-2 mt-4">
                                <span className="badge badge-slate">{member.matricule}</span>
                                <span className={clsx('badge', member.status === 'top' ? 'badge-emerald' : member.status === 'at_risk' ? 'badge-red' : 'badge-blue')}>
                                    {member.status === 'top' ? 'Elite' : member.status === 'at_risk' ? 'À risque' : 'Actif'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-10 pb-20">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="card p-4">
                                    <p className="section-label mb-1">Score Actuel</p>
                                    <p className={clsx('text-3xl font-black', member.score >= 80 ? 'text-tpgs-emerald' : 'text-amber-400')}>{member.score}</p>
                                    <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
                                        {delta >= 0 ? <TrendingUp size={12} className="text-tpgs-emerald" /> : <TrendingDown size={12} className="text-red-400" />}
                                        <span className={delta >= 0 ? 'text-tpgs-emerald' : 'text-red-400'}>{delta > 0 ? '+' : ''}{delta} pts</span>
                                    </div>
                                </div>
                                <div className="card p-4">
                                    <p className="section-label mb-1">Formations</p>
                                    <p className="text-3xl font-black text-themed">{member.trainingsCompleted}</p>
                                    <p className="text-[10px] text-themed-muted mt-1">Sur 15 assignées</p>
                                </div>
                            </div>

                            {/* Progress Detail */}
                            <div>
                                <h3 className="section-label mb-4">Progression Compétences</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Technique', val: 85, color: '#10B981' },
                                        { label: 'Management', val: 62, color: '#3B82F6' },
                                        { label: 'Transversal', val: 94, color: '#F59E0B' },
                                    ].map(c => (
                                        <div key={c.label}>
                                            <div className="flex justify-between text-xs mb-1.5 font-bold">
                                                <span className="text-themed">{c.label}</span>
                                                <span className="text-themed-muted">{c.val}%</span>
                                            </div>
                                            <div className="progress-bar"><div className="progress-fill" style={{ width: `${c.val}%`, backgroundColor: c.color }} /></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact & Info */}
                            <div className="space-y-4">
                                <h3 className="section-label">Informations Agent</h3>
                                <div className="flex items-center gap-4 text-sm text-themed-muted p-4 rounded-2xl bg-themed-hover">
                                    <Mail size={16} /> <span>{member.name.toLowerCase().replace(' ', '.')}@minfi.gov.cm</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-themed-muted p-4 rounded-2xl bg-themed-hover">
                                    <Phone size={16} /> <span>+237 6•• •• •• ••</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-themed-muted p-4 rounded-2xl bg-themed-hover">
                                    <Calendar size={16} /> <span>Ancienneté : 5 ans, 4 mois</span>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 gap-3 pt-6 border-t border-themed">
                                <button onClick={() => { playClick(); toast.success('Invitation envoyée pour entretien'); }} className="btn-primary w-full shadow-lg">
                                    <Target size={16} /> Organiser un entretien
                                </button>
                                <button onClick={() => { playClick(); toast.info('Rapport de performance en cours...'); }} className="btn-ghost w-full">
                                    <FileText size={16} /> Générer un rapport individuel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default function Team() {
    const { t } = useTranslation();
    const { playClick } = useSound();
    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (m) => {
        playClick();
        setSelectedMember(m);
    };

    return (
        <div>
            <MemberDrawer member={selectedMember} open={!!selectedMember} onClose={() => setSelectedMember(null)} />

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="font-heading font-black text-3xl text-themed">{t('common.team')}</h1>
                    <p className="text-sm mt-1 text-themed-muted">Direction des Impôts — {teamMembers.length} collaborateurs actifs</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-ghost text-xs"><Zap size={14} /> Audit équipe</button>
                    <button className="btn-primary text-xs"><Plus size={14} /> Ajouter un agent</button>
                </div>
            </section>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((m, i) => {
                    const delta = m.score - m.scoreN1;
                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handleMemberClick(m)}
                            className="card group cursor-pointer hover:border-tpgs-emerald/30 active:scale-[0.98] transition-all overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-themed-hover flex items-center justify-center text-lg font-black text-themed group-hover:bg-tpgs-emerald group-hover:text-white transition-colors">
                                        {m.initials}
                                    </div>
                                    <div className="text-right">
                                        <p className="section-label mb-1">Score N</p>
                                        <div className="flex items-center gap-2">
                                            <span className={clsx('text-xl font-black', m.score >= 80 ? 'text-tpgs-emerald' : 'text-amber-400')}>
                                                {m.score}
                                            </span>
                                            {delta !== 0 && (
                                                <span className={clsx('text-[10px] font-bold p-1 rounded-md bg-themed-hover', delta > 0 ? 'text-tpgs-emerald' : 'text-red-400')}>
                                                    {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-bold text-themed group-hover:text-tpgs-emerald transition-colors leading-none">{m.name}</h3>
                                <p className="text-[10px] font-bold text-themed-muted uppercase tracking-wider mt-1.5">{m.grade}</p>

                                <div className="mt-6 flex items-center gap-4 border-t border-themed pt-4">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold text-themed-muted uppercase mb-2">Formations</p>
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-themed bg-themed-hover flex items-center justify-center" title="Formation active">
                                                    <BookOpen size={10} className="text-themed-muted" />
                                                </div>
                                            ))}
                                            <div className="w-6 h-6 rounded-full border-2 border-themed bg-tpgs-emerald flex items-center justify-center text-[10px] font-bold text-white">
                                                +{m.trainingsCompleted}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-themed-muted uppercase mb-2">Statut</p>
                                        <span className={clsx('badge', m.status === 'top' ? 'badge-emerald' : m.status === 'at_risk' ? 'badge-red' : 'badge-blue')}>
                                            {m.status === 'top' ? 'Elite' : m.status === 'at_risk' ? 'Alerte' : 'Ok'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
