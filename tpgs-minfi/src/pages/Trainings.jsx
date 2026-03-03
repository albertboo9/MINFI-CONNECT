import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Pause, CheckCircle2, Clock, ChevronRight, Play } from 'lucide-react';
import { myTrainings } from '../data/mock.js';
import { clsx } from 'clsx';
import { useAppStore, ROLES } from '../store/index.js';

const STATUS_CONFIG = {
    inProgress: { label: 'En cours', badge: 'badge-blue', icon: Play },
    paused: { label: 'En pause', badge: 'badge-gold', icon: Pause },
    validated: { label: 'Validée', badge: 'badge-emerald', icon: CheckCircle2 },
    planned: { label: 'Planifiée', badge: 'badge-slate', icon: Clock },
};

export default function Trainings() {
    const { t } = useTranslation();
    const { activeRole } = useAppStore();
    const [filter, setFilter] = useState('all');

    const statuses = ['all', 'inProgress', 'paused', 'validated'];
    const filtered = filter === 'all' ? myTrainings : myTrainings.filter(t => t.status === filter);

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl text-white">{t('nav.myTrainings')}</h1>
                <p className="text-slate-500 text-sm mt-1">Parcours de formation — Année 2026</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {statuses.map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                        className={clsx('px-4 py-2 rounded-xl text-xs font-semibold transition-all',
                            filter === s ? 'bg-tpgs-emerald text-white' : 'bg-tpgs-card border border-tpgs-border text-slate-400 hover:text-white hover:border-tpgs-hover')}>
                        {s === 'all' ? 'Toutes' : STATUS_CONFIG[s]?.label || s}
                    </button>
                ))}
            </div>

            {/* Training cards */}
            <div className="space-y-4">
                {filtered.map((tr, i) => {
                    const cfg = STATUS_CONFIG[tr.status] || STATUS_CONFIG.planned;
                    const StatusIcon = cfg.icon;
                    return (
                        <motion.div key={tr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className="card p-6 hover:border-tpgs-hover transition-all cursor-pointer group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className={clsx('badge', cfg.badge)}>
                                            <StatusIcon size={10} className="mr-1" /> {cfg.label}
                                        </span>
                                        <span className={clsx('badge', tr.modality === 'elearning' ? 'badge-blue' : tr.modality === 'classroom' ? 'badge-gold' : 'badge-slate')}>
                                            {tr.modality === 'elearning' ? 'E-learning' : tr.modality === 'classroom' ? 'Présentiel' : 'Blended'}
                                        </span>
                                        <span className="badge badge-slate">{tr.category}</span>
                                    </div>
                                    <h3 className="font-semibold text-white group-hover:text-tpgs-emerald transition-colors mb-1">{tr.title}</h3>
                                    <p className="text-xs text-slate-500 font-mono">{tr.provider}</p>
                                </div>
                                <ChevronRight size={16} className="text-slate-600 group-hover:text-tpgs-emerald transition-colors flex-shrink-0 mt-1" />
                            </div>

                            {(tr.status === 'inProgress' || tr.status === 'paused') && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-2xs text-slate-500 font-mono mb-1.5">
                                        <span>{tr.modulesCompleted}/{tr.modules} modules</span>
                                        <span className="text-tpgs-emerald font-bold">{tr.progress}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <motion.div className="progress-fill" style={{ backgroundColor: tr.status === 'paused' ? '#F59E0B' : '#10B981' }}
                                            initial={{ width: 0 }} animate={{ width: `${tr.progress}%` }} transition={{ duration: 0.8 }} />
                                    </div>
                                    <div className="flex justify-between mt-2 text-2xs text-slate-600 font-mono">
                                        <span>Début: {tr.startDate}</span>
                                        <span>Fin: {tr.endDate}</span>
                                        {tr.pausesUsed > 0 && <span className="text-tpgs-gold">⏸ {tr.pausesUsed}/3 pauses</span>}
                                    </div>
                                </div>
                            )}

                            {tr.status === 'validated' && (
                                <div className="mt-4 flex items-center gap-3 p-3 bg-tpgs-emerald/5 border border-tpgs-emerald/20 rounded-xl">
                                    <CheckCircle2 size={14} className="text-tpgs-emerald" />
                                    <span className="text-xs text-tpgs-emerald font-semibold">Formation validée — Certificat disponible</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
