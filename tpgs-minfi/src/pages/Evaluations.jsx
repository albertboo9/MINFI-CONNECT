import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teamMembers, competencyFramework } from '../data/mock.js';
import { Lock, CheckCircle2, Save } from 'lucide-react';
import { clsx } from 'clsx';

export default function Evaluations() {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(teamMembers[0].id);
    const [locked, setLocked] = useState(false);
    const [scores, setScores] = useState({});

    const agent = teamMembers.find(m => m.id === selected);
    const allCriteria = [...competencyFramework.behavioral, ...competencyFramework.technical];
    const totalScore = allCriteria.length > 0
        ? Math.round(Object.values(scores).reduce((a, v) => a + v, 0) / (allCriteria.length * 5) * 100)
        : 0;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading font-black text-3xl text-white">{t('nav.annualEvals')}</h1>
                    <p className="text-slate-500 text-sm mt-1">Campagne 2026 — Période de saisie : jusqu'au 15 mars 2026</p>
                </div>
                {locked && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-tpgs-emerald/10 border border-tpgs-emerald/20 rounded-xl">
                        <Lock size={14} className="text-tpgs-emerald" />
                        <span className="text-xs font-semibold text-tpgs-emerald">Évaluation verrouillée</span>
                    </div>
                )}
            </div>

            <div className="grid lg:grid-cols-[280px,1fr] gap-6">
                {/* Agent selector */}
                <div className="card p-2 h-fit">
                    <p className="section-label px-3 py-2">Sélectionner un agent</p>
                    {teamMembers.map(m => (
                        <button key={m.id} onClick={() => { setSelected(m.id); setLocked(false); setScores({}); }}
                            className={clsx('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left',
                                selected === m.id ? 'bg-tpgs-emerald/10 border border-tpgs-emerald/20' : 'hover:bg-tpgs-hover')}>
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-tpgs-emerald/20 to-tpgs-blue/20 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-white truncate">{m.name}</p>
                                <p className="text-2xs text-slate-500 truncate">{m.grade}</p>
                            </div>
                            {selected === m.id && <div className="w-1.5 h-1.5 rounded-full bg-tpgs-emerald flex-shrink-0" />}
                        </button>
                    ))}
                </div>

                {/* Evaluation grid */}
                <div className="space-y-6">
                    {/* Score header */}
                    <div className="card p-5 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-white">{agent?.name}</p>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{agent?.matricule} · {agent?.grade}</p>
                        </div>
                        <div className="text-right">
                            <p className="section-label mb-1">Score calculé</p>
                            <p className={clsx('font-heading font-black text-4xl',
                                totalScore >= 80 ? 'text-tpgs-emerald' : totalScore >= 60 ? 'text-tpgs-gold' : 'text-tpgs-red')}>
                                {totalScore}<span className="text-lg text-slate-500">/100</span>
                            </p>
                        </div>
                    </div>

                    {/* Behavioral competencies */}
                    <div className="card p-6">
                        <h3 className="font-heading font-bold text-white mb-4">Compétences comportementales</h3>
                        <div className="space-y-4">
                            {competencyFramework.behavioral.map((c) => (
                                <div key={c.id}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-slate-300 font-medium">{c.label}</span>
                                        <span className="text-2xs text-slate-500 font-mono">Pondération: {c.weight}%</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(v => (
                                            <button key={v} disabled={locked} onClick={() => setScores(s => ({ ...s, [c.id]: v }))}
                                                className={clsx(
                                                    'flex-1 py-2 rounded-lg text-xs font-bold transition-all',
                                                    scores[c.id] === v ? 'bg-tpgs-emerald text-white shadow-glow-em' : 'bg-tpgs-card border border-tpgs-border text-slate-400 hover:border-tpgs-hover',
                                                    locked && 'cursor-not-allowed opacity-60'
                                                )}>
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical competencies */}
                    <div className="card p-6">
                        <h3 className="font-heading font-bold text-white mb-4">Compétences techniques</h3>
                        <div className="space-y-4">
                            {competencyFramework.technical.map((c) => (
                                <div key={c.id}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-slate-300 font-medium">{c.label}</span>
                                        <span className="text-2xs text-slate-500 font-mono">Pondération: {c.weight}%</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(v => (
                                            <button key={v} disabled={locked} onClick={() => setScores(s => ({ ...s, [c.id]: v }))}
                                                className={clsx(
                                                    'flex-1 py-2 rounded-lg text-xs font-bold transition-all',
                                                    scores[c.id] === v ? 'bg-tpgs-emerald text-white shadow-glow-em' : 'bg-tpgs-card border border-tpgs-border text-slate-400 hover:border-tpgs-hover',
                                                    locked && 'cursor-not-allowed opacity-60'
                                                )}>
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    {!locked ? (
                        <div className="flex gap-3">
                            <button className="btn-primary flex-1" onClick={() => setLocked(true)}>
                                <CheckCircle2 size={15} /> Valider & Verrouiller l'évaluation
                            </button>
                            <button className="btn-ghost"><Save size={15} /> Sauvegarder brouillon</button>
                        </div>
                    ) : (
                        <div className="card p-4 flex items-center gap-3 border-tpgs-emerald/30 bg-tpgs-emerald/5">
                            <CheckCircle2 size={18} className="text-tpgs-emerald" />
                            <div>
                                <p className="text-sm font-semibold text-tpgs-emerald">Évaluation validée et verrouillée</p>
                                <p className="text-xs text-slate-500">Score final : {totalScore}/100 · Transmise à la DRH</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
