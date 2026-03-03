import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    BookOpen, Pause, CheckCircle2, Clock, ChevronRight, Play,
    FileText, Calendar, AlertTriangle, X, Send, Users, Search
} from 'lucide-react';
import { myTrainings, teamTrainings as initialTeamTrainings } from '../data/mock.js';
import { clsx } from 'clsx';
import { useAppStore, ROLES } from '../store/index.js';
import Modal from '../components/ui/Modal.jsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';

const STATUS_CONFIG = {
    inProgress: { label: 'En cours', badge: 'badge-blue', icon: Play },
    paused: { label: 'En pause', badge: 'badge-gold', icon: Pause },
    validated: { label: 'Validée', badge: 'badge-emerald', icon: CheckCircle2 },
    planned: { label: 'Planifiée', badge: 'badge-slate', icon: Clock },
    abandoned: { label: 'Abandonnée', badge: 'badge-red', icon: X },
};

const MODALITY_LABEL = { elearning: 'E-learning', classroom: 'Présentiel', blended: 'Blended' };

/* ─── Training Progress Row (Generic) ───────────────── */
function TrainingCard({ training, onClick, isTeamView = false }) {
    const cfg = STATUS_CONFIG[training.status] || STATUS_CONFIG.planned;
    const StatusIcon = cfg.icon;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="card p-5 cursor-pointer hover:border-tpgs-emerald/30 transition-all group"
            onClick={() => onClick(training)}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={clsx('badge', cfg.badge)}><StatusIcon size={10} /> {cfg.label}</span>
                        {isTeamView && <span className="badge badge-indigo font-bold tracking-tight">{training.agentName}</span>}
                        <span className="badge badge-slate">{MODALITY_LABEL[training.modality] || training.modality}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-1 group-hover:text-tpgs-emerald transition-colors text-themed">{training.title}</h3>
                    <p className="text-[10px] font-mono text-themed-muted">{training.provider}</p>
                </div>
                <div className="flex items-center gap-3">
                    {['inProgress', 'paused'].includes(training.status) && (
                        <span className="text-xs font-black font-mono" style={{ color: training.status === 'paused' ? '#F59E0B' : '#10B981' }}>{training.progress}%</span>
                    )}
                    <ChevronRight size={15} className="text-themed-muted group-hover:text-tpgs-emerald group-hover:translate-x-1 transition-all" />
                </div>
            </div>
            {['inProgress', 'paused'].includes(training.status) && (
                <div className="mt-4 progress-bar h-1.5">
                    <motion.div className="progress-fill" style={{ backgroundColor: training.status === 'paused' ? '#F59E0B' : '#10B981', width: `${training.progress}%` }}
                        initial={{ width: 0 }} animate={{ width: `${training.progress}%` }} transition={{ duration: 0.8 }} />
                </div>
            )}
        </motion.div>
    );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function Trainings() {
    const { activeRole } = useAppStore();
    const isManager = activeRole === ROLES.MANAGER || activeRole === ROLES.HRM;

    const [tab, setTab] = useState('mine'); // 'mine' or 'team'
    const [filter, setFilter] = useState('all');
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [trainings, setTrainings] = useState(myTrainings);
    const [teamTrainings] = useState(initialTeamTrainings || []); // Mocked in mock.js or needs to be added

    const statuses = ['all', 'inProgress', 'paused', 'validated', 'planned'];
    const data = tab === 'mine' ? trainings : teamTrainings;
    const filtered = filter === 'all' ? data : data.filter(tr => tr.status === filter);

    return (
        <div className="space-y-8">
            {/* Header */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
                <div>
                    <h1 className="font-heading font-black text-3xl text-themed">
                        {tab === 'mine' ? "Mes Cursus" : "Suivi des Formations d'Équipe"}
                    </h1>
                    <p className="text-sm mt-1 text-themed-muted">
                        {tab === 'mine' ? `${trainings.length} formations actives dans votre parcours` : `Supervision de ${teamTrainings.length} formations en cours dans votre service`}
                    </p>
                </div>

                {isManager && (
                    <div className="flex p-1 bg-themed-hover rounded-2xl border border-themed">
                        <button onClick={() => setTab('mine')} className={clsx("px-4 py-2 rounded-xl text-xs font-bold transition-all", tab === 'mine' ? "bg-themed-card text-themed shadow-sm" : "text-themed-muted hover:text-themed")}>
                            Mon parcours
                        </button>
                        <button onClick={() => setTab('team')} className={clsx("px-4 py-2 rounded-xl text-xs font-bold transition-all", tab === 'team' ? "bg-themed-card text-themed shadow-sm" : "text-themed-muted hover:text-themed")}>
                            <Users size={14} className="inline mr-2" /> Équipe
                        </button>
                    </div>
                )}
            </section>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {statuses.map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                        className={clsx('px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                            filter === s ? 'bg-tpgs-emerald text-white shadow-lg' : 'bg-themed-card text-themed-muted border border-themed hover:border-themed-muted')}>
                        {s === 'all' ? 'Toutes' : STATUS_CONFIG[s]?.label || s}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div className="space-y-4">
                {tab === 'team' && (
                    <div className="relative mb-6">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-themed-muted" />
                        <input className="input pl-12" placeholder="Rechercher un agent ou une formation..." />
                    </div>
                )}

                {filtered.length === 0 ? (
                    <div className="card p-20 text-center opacity-40 animate-fade-in">
                        <BookOpen size={48} className="mx-auto text-themed-muted mb-4" />
                        <p className="text-sm font-bold text-themed">Aucun dossier trouvé pour ce filtre</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filtered.map((tr, i) => (
                            <TrainingCard key={tr.id} training={tr} onClick={setSelectedTraining} isTeamView={tab === 'team'} />
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal Placeholder - Reuse logic from previous if available or kept simple here */}
            <AnimatePresence>
                {selectedTraining && (
                    <Modal open={!!selectedTraining} onClose={() => setSelectedTraining(null)} title={selectedTraining.title} subtitle={selectedTraining.provider} size="md">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-themed-hover">
                                <div className="w-12 h-12 rounded-xl bg-tpgs-emerald/20 text-tpgs-emerald flex items-center justify-center">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-themed">{selectedTraining.title}</p>
                                    <p className="text-xs text-themed-muted uppercase font-mono">{selectedTraining.provider}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="card p-4">
                                    <p className="section-label mb-1">Progression</p>
                                    <p className="text-2xl font-black text-tpgs-emerald">{selectedTraining.progress}%</p>
                                </div>
                                <div className="card p-4">
                                    <p className="section-label mb-1">Dernière activité</p>
                                    <p className="text-sm font-bold text-themed">Aujourd'hui, 09:12</p>
                                </div>
                            </div>

                            {tab === 'team' && (
                                <div className="p-4 rounded-xl border border-blue-400/20 bg-blue-400/5">
                                    <p className="text-xs font-bold text-blue-400 mb-2 uppercase">Historique des Rapports (Agent)</p>
                                    <ul className="space-y-2">
                                        <li className="text-[11px] text-themed-muted border-b border-themed pb-2 flex justify-between">
                                            <span>Semaine 08 · 6h cumulées</span>
                                            <span className="font-bold text-themed">Considéré comme satisfaisant ✓</span>
                                        </li>
                                        <li className="text-[11px] text-themed-muted flex justify-between">
                                            <span>Semaine 07 · 4h cumulées</span>
                                            <span className="font-bold text-themed">Rapport validé</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
}
