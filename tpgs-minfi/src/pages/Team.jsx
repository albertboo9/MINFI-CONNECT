import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teamMembers, teamTrainings } from '../data/mock.js';
import {
    TrendingUp, TrendingDown, Award, AlertTriangle, BookOpen,
    ChevronRight, X, Mail, Phone, Calendar, Clock, Target,
    FileText, UserCheck, Zap, MoreVertical, Plus, Search, Filter
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';
import { useAppStore, ROLES } from '../store/index.js';

/* ── Member Detail Drawer ───────────────────────────── */
function MemberDrawer({ member, open, onClose, ongoingTrainings }) {
    const { playClick } = useSound();
    if (!member) return null;

    const delta = member.score - member.scoreN1;

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div className="drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                    <motion.div className="drawer-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                        <div className="p-8 border-b border-themed bg-themed-card sticky top-0 z-10 flex justify-between items-start">
                            <div>
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-tpgs-emerald to-blue-500 flex items-center justify-center text-4xl font-black text-white shadow-xl mb-4">
                                    {member.initials}
                                </div>
                                <h2 className="text-2xl font-black text-themed leading-tight">{member.name}</h2>
                                <p className="text-xs font-bold text-tpgs-emerald uppercase tracking-widest mt-1">{member.grade}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-themed-hover rounded-xl text-themed-muted transition-colors"><X size={20} /></button>
                        </div>

                        <div className="p-8 space-y-10 pb-20">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="card p-4">
                                    <p className="section-label mb-1">Score Performance</p>
                                    <p className={clsx('text-3xl font-black', member.score >= 80 ? 'text-tpgs-emerald' : 'text-amber-400')}>{member.score}</p>
                                    <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
                                        {delta >= 0 ? <TrendingUp size={12} className="text-tpgs-emerald" /> : <TrendingDown size={12} className="text-red-400" />}
                                        <span className={delta >= 0 ? 'text-tpgs-emerald' : 'text-red-400'}>{delta > 0 ? '+' : ''}{delta} pts / an</span>
                                    </div>
                                </div>
                                <div className="card p-4">
                                    <p className="section-label mb-1">Dossiers Clos</p>
                                    <p className="text-3xl font-black text-themed">{member.trainingsCompleted}</p>
                                    <p className="text-[10px] text-themed-muted mt-1 uppercase font-mono">Cycle 2025-2026</p>
                                </div>
                            </div>

                            {/* Ongoing Trainings for this specific agent */}
                            <div>
                                <h3 className="section-label mb-4">Cursus en cours</h3>
                                <div className="space-y-3">
                                    {ongoingTrainings.length > 0 ? ongoingTrainings.map(t => (
                                        <div key={t.id} className="p-4 rounded-xl border border-themed bg-themed-card">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-sm font-bold text-themed">{t.title}</p>
                                                <span className="text-[10px] font-black text-tpgs-emerald">{t.progress}%</span>
                                            </div>
                                            <div className="progress-bar h-1.5"><div className="progress-fill" style={{ width: `${t.progress}%` }} /></div>
                                        </div>
                                    )) : (
                                        <p className="text-xs italic text-themed-muted">Aucune formation active actuellement.</p>
                                    )}
                                </div>
                            </div>

                            {/* Competency Spider Placeholder */}
                            <div>
                                <h3 className="section-label mb-4">Radar de Compétences</h3>
                                <div className="h-32 rounded-2xl bg-themed-hover flex items-center justify-center border border-dashed border-themed">
                                    <Zap size={24} className="text-themed-muted opacity-20" />
                                    <span className="text-[10px] font-bold text-themed-muted ml-2">Visualisation Graphique N-1 vs N</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 pt-6 border-t border-themed">
                                <button onClick={() => { playClick(); toast.success('Entretien planifié pour ' + member.name); }} className="btn-primary w-full py-4 rounded-2xl">
                                    <Target size={16} /> Planifier un Entretien Annuel
                                </button>
                                <button className="btn-ghost w-full flex items-center justify-center gap-2">
                                    <FileText size={16} /> Fiche Individuelle (PDF)
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
    const { activeRole } = useAppStore();
    const { playClick } = useSound();
    const [selectedMember, setSelectedMember] = useState(null);
    const [search, setSearch] = useState('');

    const isHRM = activeRole === ROLES.HRM || activeRole === ROLES.DIRECTOR;
    const isManager = activeRole === ROLES.MANAGER;

    const filtered = teamMembers.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.matricule.toLowerCase().includes(search.toLowerCase())
    );

    const getOngoingTrainings = (name) => teamTrainings.filter(t => t.agentName === name && t.status === 'inProgress');

    return (
        <div className="space-y-8">
            <MemberDrawer
                member={selectedMember}
                open={!!selectedMember}
                onClose={() => setSelectedMember(null)}
                ongoingTrainings={selectedMember ? getOngoingTrainings(selectedMember.name) : []}
            />

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
                <div>
                    <h1 className="font-heading font-black text-3xl text-themed">
                        {isHRM ? "Global Personnel Vision" : "Ma Brigade / Service"}
                    </h1>
                    <p className="text-sm mt-1 text-themed-muted">
                        {isHRM ? "Vue d'ensemble sur l'ensemble des agents du Ministère" : "Suivi de performance de vos collaborateurs directs"}
                    </p>
                </div>
                <div className="flex gap-2">
                    {isHRM && <button className="btn-ghost"><FileText size={14} /> Export Global</button>}
                    {isManager && <button className="btn-primary"><Plus size={14} /> Nouvel Agent</button>}
                </div>
            </section>

            {/* Search & Bulk Filter */}
            <section className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-themed-muted" />
                    <input
                        className="input pl-12 h-12 text-sm font-bold"
                        placeholder="Rechercher par Nom, Matricule ou Grade..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <button className="px-6 rounded-2xl bg-themed-card border border-themed text-themed-muted flex items-center gap-3 hover:border-themed-muted transition-all text-xs font-bold uppercase tracking-widest">
                    <Filter size={14} /> Filtres Avancés
                </button>
            </section>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((m, i) => {
                    const delta = m.score - m.scoreN1;
                    const ongoing = getOngoingTrainings(m.name).length;

                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                            onClick={() => { playClick(); setSelectedMember(m); }}
                            className="card group cursor-pointer hover:border-tpgs-emerald/30 transition-all flex flex-col"
                        >
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="w-14 h-14 rounded-2xl bg-themed-hover flex items-center justify-center text-xl font-black text-themed group-hover:bg-tpgs-emerald group-hover:text-white transition-all shadow-sm">
                                        {m.initials}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-themed-muted uppercase tracking-tighter mb-1">Potentiel N</p>
                                        <div className="flex items-center gap-2">
                                            <span className={clsx("text-2xl font-black", m.score > 75 ? "text-tpgs-emerald" : "text-amber-400")}>{m.score}</span>
                                            {delta !== 0 && (
                                                <span className={clsx("text-[9px] font-bold px-1.5 py-0.5 rounded bg-themed-hover", delta > 0 ? "text-tpgs-emerald" : "text-red-400")}>
                                                    {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-bold text-themed group-hover:text-tpgs-emerald transition-colors leading-none truncate">{m.name}</h3>
                                <p className="text-[10px] font-bold text-themed-muted uppercase tracking-widest mt-2">{m.grade}</p>

                                <div className="mt-6 pt-4 border-t border-themed flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] font-bold text-themed-muted uppercase mb-1.5 px-0.5">En Formation</p>
                                        <div className="flex items-center gap-1.5">
                                            {ongoing > 0 ? (
                                                <div className="flex items-center gap-1.5 bg-tpgs-emerald/10 text-tpgs-emerald px-2 py-1 rounded-lg">
                                                    <PlayCircle size={12} className="animate-pulse" />
                                                    <span className="text-[10px] font-black">{ongoing} active{ongoing > 1 ? 's' : ''}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-themed-muted italic px-0.5">Aucun cursus actif</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={clsx("badge", m.status === 'top' ? 'badge-emerald' : m.status === 'at_risk' ? 'badge-red' : 'badge-blue')}>
                                        {m.status === 'top' ? 'Elite' : m.status === 'at_risk' ? 'Alerte' : 'Validé'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="card p-24 text-center opacity-30">
                    <Users size={48} className="mx-auto mb-4" />
                    <p className="text-sm font-bold text-themed">Aucun collaborateur trouvé pour "{search}"</p>
                </div>
            )}
        </div>
    );
}
