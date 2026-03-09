import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teamMembers, competencyFramework } from '../data/mock.js';
import {
    Lock, CheckCircle2, Save, User, Info, AlertTriangle,
    ChevronRight, ArrowRight, Zap, Target, BookOpen, Clock
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';
import Modal from '../components/ui/Modal.jsx';

export default function Evaluations() {
    const { t } = useTranslation();
    const { playClick, playSuccess, playAlert } = useSound();
    const [selectedAgentId, setSelectedAgentId] = useState(teamMembers[0].id);
    const [scores, setScores] = useState({});
    const [isLocked, setIsLocked] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const agent = teamMembers.find(m => m.id === selectedAgentId);
    const allCriteria = [...competencyFramework.behavioral, ...competencyFramework.technical];

    // Calculate score
    const totalWeight = allCriteria.reduce((acc, c) => acc + (c.weight || 0), 0);
    const currentTotal = allCriteria.reduce((acc, c) => {
        const val = scores[c.id] || 0;
        return acc + (val * (c.weight || 10));
    }, 0);

    // Score on 100
    const finalScore = totalWeight > 0 ? Math.round((currentTotal / (totalWeight * 5)) * 100) : 0;

    useEffect(() => {
        // Reset state when agent changes (simulated fresh evaluation)
        setScores({});
        setIsLocked(false);
    }, [selectedAgentId]);

    const handleScore = (id, val) => {
        if (isLocked) return;
        playClick();
        setScores(s => ({ ...s, [id]: val }));
    };

    const handleValidation = () => {
        const scoredCount = Object.keys(scores).length;
        if (scoredCount < allCriteria.length) {
            playAlert();
            toast.error(`Vous devez évaluer tous les critères (${scoredCount}/${allCriteria.length})`, { title: 'Saisie incomplète' });
            return;
        }
        setShowConfirm(true);
    };

    const confirmLock = () => {
        playSuccess();
        setIsLocked(true);
        setShowConfirm(false);
        toast.success(`Évaluation de ${agent.name} validée !`, { title: 'Transmission effectuée ✓', duration: 5000 });
    };

    return (
        <div className="space-y-8">
            {/* Confirm Modal */}
            <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Confirmer la validation ?" subtitle="Cette action est irréversible et verrouillera la note." size="sm"
                footer={<>
                    <button onClick={() => setShowConfirm(false)} className="btn-ghost">Annuler</button>
                    <button onClick={confirmLock} className="btn-primary">Valider & Verrouiller</button>
                </>}>
                <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5 text-center">
                    <AlertTriangle size={32} className="text-amber-400 mx-auto mb-3" />
                    <p className="text-sm text-themed">Une fois verrouillée, l'évaluation sera transmise à la DRH pour consolidation du plan de formation.</p>
                    <p className="text-lg font-black mt-4 text-tpgs-emerald">Note Finale : {finalScore}/100</p>
                </div>
            </Modal>

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="font-heading font-black text-3xl text-themed">Évaluations Annuelles & Professionnelles</h1>
                    <p className="text-sm mt-1 text-themed-muted">Campagne 2026 — Clôture de saisie dans 12 jours</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-ghost text-xs"><Info size={14} /> Guide de notation</button>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
                {/* Agent List */}
                <aside className="space-y-2">
                    <h3 className="section-label px-2 mb-4">Équipe (Direction des Impôts)</h3>
                    {teamMembers.map(m => (
                        <button
                            key={m.id}
                            onClick={() => { playClick(); setSelectedAgentId(m.id); }}
                            className={clsx(
                                'w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left',
                                selectedAgentId === m.id ? 'border-tpgs-emerald/40 bg-tpgs-emerald/5' : 'border-themed bg-themed-card hover:border-themed-muted'
                            )}
                        >
                            <div className="w-10 h-10 rounded-xl bg-themed-hover flex items-center justify-center text-sm font-black text-themed">
                                {m.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-themed truncate">{m.name}</p>
                                <p className="text-[10px] text-themed-muted truncate uppercase tracking-wider">{m.matricule}</p>
                            </div>
                            {selectedAgentId === m.id && <div className="w-1.5 h-1.5 rounded-full bg-tpgs-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
                        </button>
                    ))}
                </aside>

                {/* Scoring Engine */}
                <main className="space-y-8 animate-fade-in" key={selectedAgentId}>
                    {/* Header Info */}
                    <div className="card p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-themed-card to-themed-hover border border-themed flex items-center justify-center text-2xl font-black text-themed shadow-lg">
                                {agent.initials}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-themed">{agent.name}</h2>
                                <p className="text-xs text-themed-muted font-mono">{agent.grade} · {agent.department}</p>
                            </div>
                        </div>

                        <div className="text-center md:text-right bg-themed-hover/50 p-4 rounded-2xl border border-themed min-w-[140px]">
                            <p className="section-label mb-1">Score Calculé</p>
                            <h3 className={clsx('text-4xl font-heading font-black',
                                finalScore >= 85 ? 'text-tpgs-emerald' : finalScore >= 60 ? 'text-amber-400' : 'text-red-400'
                            )}>
                                {finalScore}<span className="text-sm font-mono text-themed-muted ml-0.5">/100</span>
                            </h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Behavioral */}
                        <section className="card p-6 space-y-6">
                            <div className="flex items-center gap-2 mb-2 pb-4 border-b border-themed">
                                <Zap size={18} className="text-amber-400" />
                                <h3 className="font-heading font-bold text-themed uppercase tracking-wider text-sm">Aptitudes Comportementales</h3>
                            </div>
                            {competencyFramework.behavioral.map((c) => (
                                <div key={c.id} className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs font-bold text-themed">{c.label}</p>
                                        <span className="text-[9px] font-bold text-themed-muted uppercase tracking-tighter">Poids: {c.weight}%</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3, 4, 5].map(v => (
                                            <button
                                                key={v}
                                                disabled={isLocked}
                                                onClick={() => handleScore(c.id, v)}
                                                className={clsx(
                                                    'flex-1 py-1.5 rounded-lg text-xs font-black transition-all border',
                                                    scores[c.id] === v ? 'border-tpgs-emerald bg-tpgs-emerald text-white shadow-lg' : 'border-themed bg-themed-hover text-themed-muted hover:border-themed-muted',
                                                    isLocked && 'cursor-not-allowed'
                                                )}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Technical */}
                        <section className="card p-6 space-y-6">
                            <div className="flex items-center gap-2 mb-2 pb-4 border-b border-themed">
                                <Target size={18} className="text-tpgs-emerald" />
                                <h3 className="font-heading font-bold text-themed uppercase tracking-wider text-sm">Compétences Techniques</h3>
                            </div>
                            {competencyFramework.technical.map((c) => (
                                <div key={c.id} className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs font-bold text-themed">{c.label}</p>
                                        <span className="text-[9px] font-bold text-themed-muted uppercase tracking-tighter">Poids: {c.weight}%</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3, 4, 5].map(v => (
                                            <button
                                                key={v}
                                                disabled={isLocked}
                                                onClick={() => handleScore(c.id, v)}
                                                className={clsx(
                                                    'flex-1 py-1.5 rounded-lg text-xs font-black transition-all border',
                                                    scores[c.id] === v ? 'border-tpgs-emerald bg-tpgs-emerald text-white shadow-lg' : 'border-themed bg-themed-hover text-themed-muted hover:border-themed-muted',
                                                    isLocked && 'cursor-not-allowed'
                                                )}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-themed">
                                <p className="text-[10px] text-themed-muted italic"><Info size={10} className="inline mr-1" /> Barème : 1 (Insuffisant) à 5 (Exceptionnel)</p>
                            </div>
                        </section>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 card">
                        <div className="flex items-center gap-3">
                            <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center', isLocked ? 'bg-tpgs-emerald/20 text-tpgs-emerald' : 'bg-themed-hover text-themed-muted')}>
                                {isLocked ? <Lock size={20} /> : <BookOpen size={20} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-themed">{isLocked ? 'Évaluation terminée' : 'Saisie en cours'}</p>
                                <p className="text-xs text-themed-muted">Dernière modification : {new Date().toLocaleTimeString()}</p>
                            </div>
                        </div>

                        {!isLocked ? (
                            <div className="flex gap-3">
                                <button className="btn-ghost" onClick={() => { playClick(); toast.info('Brouillon sauvegardé'); }}>
                                    <Save size={16} /> Sauver brouillon
                                </button>
                                <button className="btn-primary" onClick={handleValidation}>
                                    <CheckCircle2 size={16} /> Valider l'évaluation
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-tpgs-emerald font-black text-sm px-4 py-2 bg-tpgs-emerald/10 rounded-xl">
                                <CheckCircle2 size={16} /> TRANSMIS A LA DRH
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
