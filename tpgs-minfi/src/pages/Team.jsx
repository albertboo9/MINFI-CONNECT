import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teamMembers } from '../data/mock.js';
import { TrendingUp, TrendingDown, Award, AlertTriangle, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';

export default function Team() {
    const { t } = useTranslation();

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl text-white">{t('common.team')}</h1>
                <p className="text-slate-500 text-sm mt-1">{teamMembers.length} collaborateurs · Direction des Impôts</p>
            </div>

            <div className="grid gap-4">
                {teamMembers.map((m, i) => {
                    const delta = m.score - m.scoreN1;
                    const statusColors = { top: 'border-l-tpgs-emerald', active: 'border-l-tpgs-border', at_risk: 'border-l-tpgs-red' };
                    return (
                        <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className={clsx('card p-5 border-l-2 hover:border-l-tpgs-emerald transition-all cursor-pointer group', statusColors[m.status])}>
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-tpgs-slate to-tpgs-card border border-tpgs-border flex items-center justify-center text-sm font-black text-white flex-shrink-0">
                                    {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>

                                {/* Name + grade */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-white text-sm group-hover:text-tpgs-emerald transition-colors">{m.name}</h3>
                                        {m.status === 'top' && <span className="badge badge-emerald">⭐ Top</span>}
                                        {m.status === 'at_risk' && <span className="badge badge-red">⚠ À risque</span>}
                                        {m.alertsCount > 0 && <span className="badge badge-gold">{m.alertsCount} alerte{m.alertsCount > 1 ? 's' : ''}</span>}
                                    </div>
                                    <p className="text-xs text-slate-500 font-mono mt-0.5">{m.matricule} · {m.grade}</p>
                                </div>

                                {/* Score */}
                                <div className="flex items-center gap-6 flex-shrink-0">
                                    <div className="text-center">
                                        <p className="text-2xs section-label mb-1">Score N</p>
                                        <p className={clsx('font-heading font-black text-2xl',
                                            m.score >= 80 ? 'text-tpgs-emerald' : m.score >= 65 ? 'text-tpgs-gold' : 'text-tpgs-red')}>
                                            {m.score}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xs section-label mb-1">N-1</p>
                                        <p className="font-heading font-black text-2xl text-slate-500">{m.scoreN1}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-bold">
                                        {delta >= 0 ? <TrendingUp size={14} className="text-tpgs-emerald" /> : <TrendingDown size={14} className="text-tpgs-red" />}
                                        <span className={delta >= 0 ? 'text-tpgs-emerald' : 'text-tpgs-red'}>{delta > 0 ? '+' : ''}{delta}</span>
                                    </div>
                                    <div className="text-center hidden md:block">
                                        <p className="text-2xs section-label mb-1">Formations</p>
                                        <div className="flex items-center gap-1.5">
                                            <BookOpen size={12} className="text-tpgs-emerald" />
                                            <span className="font-bold text-white text-sm">{m.trainingsCompleted}</span>
                                        </div>
                                    </div>
                                    <div className="text-center hidden md:block">
                                        <p className="text-2xs section-label mb-1">Certifs</p>
                                        <div className="flex items-center gap-1.5">
                                            <Award size={12} className="text-tpgs-gold" />
                                            <span className="font-bold text-white text-sm">{m.certifications}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress bar score */}
                            <div className="mt-4 progress-bar">
                                <motion.div className="progress-fill" style={{
                                    width: `${m.score}%`,
                                    backgroundColor: m.score >= 80 ? '#10B981' : m.score >= 65 ? '#F59E0B' : '#EF4444'
                                }}
                                    initial={{ width: 0 }} animate={{ width: `${m.score}%` }} transition={{ duration: 0.8, delay: i * 0.07 }} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
