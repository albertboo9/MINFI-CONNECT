import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, CheckCircle2, XCircle, Clock, ChevronRight } from 'lucide-react';
import { myRequests, pendingRequests } from '../data/mock.js';
import { clsx } from 'clsx';
import { useAppStore, ROLES } from '../store/index.js';

const STATUS_CFG = {
    pending: { label: 'En attente', badge: 'badge-gold', icon: Clock },
    approved: { label: 'Approuvée', badge: 'badge-emerald', icon: CheckCircle2 },
    rejected: { label: 'Rejetée', badge: 'badge-red', icon: XCircle },
};

const PRIORITY_CFG = {
    critical: { label: 'Critique', badge: 'badge-red' },
    high: { label: 'Haute', badge: 'badge-gold' },
    medium: { label: 'Moyenne', badge: 'badge-blue' },
    low: { label: 'Basse', badge: 'badge-slate' },
};

export default function Requests() {
    const { t } = useTranslation();
    const { activeRole } = useAppStore();
    const isManager = activeRole === ROLES.MANAGER || activeRole === ROLES.HRM;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading font-black text-3xl text-white">{t('nav.trainingRequests')}</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {isManager ? 'Demandes de votre équipe à valider' : 'Vos demandes de formation'}
                    </p>
                </div>
                {!isManager && (
                    <button className="btn-primary">
                        <Plus size={16} /> Nouvelle demande
                    </button>
                )}
            </div>

            {/* Manager view — pending to validate */}
            {isManager && (
                <div className="space-y-4 mb-10">
                    <h2 className="font-heading font-bold text-lg text-white">En attente de validation <span className="badge badge-gold ml-2">{pendingRequests.length}</span></h2>
                    {pendingRequests.map((r, i) => (
                        <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className="card p-5 hover:border-tpgs-hover transition-all">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className={clsx('badge', PRIORITY_CFG[r.priority]?.badge)}>{PRIORITY_CFG[r.priority]?.label}</span>
                                        <span className="badge badge-slate">{r.modality === 'elearning' ? 'E-learning' : 'Présentiel'}</span>
                                        <span className="font-mono text-2xs text-slate-500">Score agent: <span className="text-tpgs-emerald font-bold">{r.agentScore}/100</span></span>
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{r.trainingTitle}</h3>
                                    <p className="text-xs text-slate-400">Agent : <span className="text-white font-medium">{r.agentName}</span> · {r.cost > 0 ? `${r.cost.toLocaleString()} FCFA` : 'Gratuit'}</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 italic mb-4">"{r.justification}"</p>
                            <div className="flex gap-3">
                                <button className="btn-primary text-xs py-2 px-4">✓ Approuver</button>
                                <button className="btn-danger text-xs py-2 px-4">✗ Rejeter</button>
                                <button className="btn-ghost text-xs py-2 px-4">Reporter</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* My requests */}
            <div>
                {isManager && <h2 className="font-heading font-bold text-lg text-white mb-4">Historique</h2>}
                <div className="space-y-3">
                    {myRequests.map((r, i) => {
                        const cfg = STATUS_CFG[r.status];
                        const StatusIcon = cfg.icon;
                        return (
                            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                                className="card p-5 cursor-pointer hover:border-tpgs-hover transition-all group">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={clsx('badge', cfg.badge)}><StatusIcon size={10} className="mr-1" />{cfg.label}</span>
                                            <span className={clsx('badge', PRIORITY_CFG[r.priority]?.badge)}>{PRIORITY_CFG[r.priority]?.label}</span>
                                            <span className="text-2xs text-slate-600 font-mono">{r.date}</span>
                                        </div>
                                        <h3 className="font-semibold text-white text-sm group-hover:text-tpgs-emerald transition-colors">{r.title}</h3>
                                        {r.managerComment && (
                                            <p className="text-xs text-slate-500 mt-1.5 italic">
                                                💬 {r.managerComment}
                                            </p>
                                        )}
                                    </div>
                                    <ChevronRight size={15} className="text-slate-600 group-hover:text-tpgs-emerald flex-shrink-0 mt-1" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
