import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Pause, CheckCircle2, Clock, ChevronRight, Play, FileText, Calendar, AlertTriangle, X, Send } from 'lucide-react';
import { myTrainings } from '../data/mock.js';
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

/* ─── Report Modal ──────────────────────────────────── */
function ReportModal({ training, open, onClose }) {
    const [week, setWeek] = useState('');
    const [hours, setHours] = useState('');
    const [note, setNote] = useState('');
    const { playSuccess } = useSound();

    if (!training) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!week || !hours || !note.trim()) { toast.error('Remplissez tous les champs du rapport.'); return; }
        playSuccess();
        toast.success(`Rapport semaine ${week} soumis`, { title: '📋 Rapport enregistré', duration: 5000 });
        setWeek(''); setHours(''); setNote('');
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="Rapport de progression" subtitle={training.title} size="sm"
            footer={<>
                <button onClick={onClose} className="btn-ghost">Annuler</button>
                <button type="submit" form="report-form" className="btn-primary"><Send size={15} /> Soumettre</button>
            </>}>
            <form id="report-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="section-label block mb-2">Semaine (ex: S09)</label>
                    <input className="input" placeholder="S09" value={week} onChange={e => setWeek(e.target.value)} />
                </div>
                <div>
                    <label className="section-label block mb-2">Heures de formation cette semaine</label>
                    <input className="input" type="number" min="0.5" max="40" step="0.5" placeholder="Ex: 4.5" value={hours} onChange={e => setHours(e.target.value)} />
                </div>
                <div>
                    <label className="section-label block mb-2">Contenu abordé & difficultés rencontrées</label>
                    <textarea className="textarea" rows={4} placeholder="Modules étudiés, points abordés, difficultés rencontrées..."
                        value={note} onChange={e => setNote(e.target.value)} />
                </div>
            </form>
        </Modal>
    );
}

/* ─── Pause Modal ───────────────────────────────────── */
function PauseModal({ training, open, onClose, onConfirm }) {
    const [reason, setReason] = useState('');
    const [resume, setResume] = useState('');
    const { playClick } = useSound();

    if (!training) return null;
    const pausesLeft = 3 - (training.pausesUsed || 0);

    const handlePause = () => {
        if (!reason.trim() || !resume) { toast.error('Motif et date de reprise obligatoires.'); return; }
        if (pausesLeft <= 0) { toast.error('Nombre maximum de pauses atteint (3/3).'); return; }
        onConfirm(reason, resume);
        playClick();
        toast.warning(`Formation mise en pause — Reprise le ${resume}`, { title: '⏸ Formation pausée', duration: 6000 });
        setReason(''); setResume('');
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} title="Mettre en pause" subtitle={`${training.title} · ${pausesLeft} pause${pausesLeft > 1 ? 's' : ''} restante${pausesLeft > 1 ? 's' : ''}`} size="sm"
            footer={<>
                <button onClick={onClose} className="btn-ghost">Annuler</button>
                <button onClick={handlePause} className="btn" style={{ background: '#F59E0B', color: 'white' }}>
                    <Pause size={15} /> Confirmer la pause
                </button>
            </>}>
            <div className="space-y-4">
                {pausesLeft === 1 && (
                    <div className="p-3 rounded-xl border border-amber-400/20" style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}>
                        <p className="text-xs font-semibold text-amber-400 flex items-center gap-2"><AlertTriangle size={13} /> Dernière pause disponible</p>
                    </div>
                )}
                <div>
                    <label className="section-label block mb-2">Motif de la pause *</label>
                    <textarea className="textarea" rows={3} placeholder="Mission urgente, raisons médicales, contrainte de service..."
                        value={reason} onChange={e => setReason(e.target.value)} />
                </div>
                <div>
                    <label className="section-label block mb-2">Date de reprise estimée *</label>
                    <input className="input" type="date" value={resume} onChange={e => setResume(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
            </div>
        </Modal>
    );
}

/* ─── Training Detail Modal ─────────────────────────── */
function TrainingDetailModal({ training, open, onClose, onOpenReport, onOpenPause }) {
    if (!training) return null;
    const cfg = STATUS_CONFIG[training.status] || STATUS_CONFIG.planned;
    const StatusIcon = cfg.icon;

    const moduleDone = training.modulesCompleted || 0;
    const moduleTotal = training.modules || 0;

    return (
        <Modal open={open} onClose={onClose} title={training.title} subtitle={`${training.provider} · ${MODALITY_LABEL[training.modality] || training.modality}`} size="lg"
            footer={
                training.status === 'inProgress' ? (
                    <>
                        <button onClick={onClose} className="btn-ghost">Fermer</button>
                        <button onClick={onOpenPause} className="btn" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>
                            <Pause size={15} /> Mettre en pause
                        </button>
                        <button onClick={onOpenReport} className="btn-primary"><FileText size={15} /> Soumettre un rapport</button>
                    </>
                ) : (
                    <button onClick={onClose} className="btn-ghost">Fermer</button>
                )
            }>
            <div className="space-y-6">
                {/* Status + badges row */}
                <div className="flex flex-wrap gap-2">
                    <span className={clsx('badge', cfg.badge)}><StatusIcon size={10} /> {cfg.label}</span>
                    <span className={clsx('badge', training.modality === 'elearning' ? 'badge-blue' : training.modality === 'classroom' ? 'badge-gold' : 'badge-slate')}>
                        {MODALITY_LABEL[training.modality]}
                    </span>
                    <span className="badge badge-slate">{training.category}</span>
                    {training.pausesUsed > 0 && <span className="badge badge-gold">⏸ {training.pausesUsed}/3 pauses</span>}
                </div>

                {/* Progress (if in progress or paused) */}
                {['inProgress', 'paused'].includes(training.status) && (
                    <div className="p-5 rounded-2xl" style={{ backgroundColor: 'var(--bg-hover)' }}>
                        <div className="flex justify-between text-xs mb-3">
                            <span style={{ color: 'var(--text-muted)' }}>{moduleDone}/{moduleTotal} modules complétés</span>
                            <span className="font-black" style={{ color: 'var(--text-primary)' }}>{training.progress}%</span>
                        </div>
                        <div className="progress-bar h-3">
                            <motion.div className="progress-fill" style={{ backgroundColor: training.status === 'paused' ? '#F59E0B' : '#10B981', width: `${training.progress}%` }} />
                        </div>
                        {/* Module grid */}
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                            {Array.from({ length: moduleTotal }).map((_, i) => (
                                <div key={i} className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all"
                                    style={i < moduleDone
                                        ? { backgroundColor: training.status === 'paused' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)', color: training.status === 'paused' ? '#F59E0B' : '#10B981' }
                                        : { backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-hover)' }}>
                        <p className="section-label mb-1">Date de début</p>
                        <p className="text-sm font-semibold font-mono" style={{ color: 'var(--text-primary)' }}>{training.startDate}</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-hover)' }}>
                        <p className="section-label mb-1">Date de fin estimée</p>
                        <p className="text-sm font-semibold font-mono" style={{ color: 'var(--text-primary)' }}>{training.endDate}</p>
                    </div>
                </div>

                {/* Certification */}
                {training.certification && (
                    <div className="p-4 rounded-xl border border-tpgs-emerald/20" style={{ backgroundColor: 'rgba(16,185,129,0.06)' }}>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-tpgs-emerald" />
                            <div>
                                <p className="text-sm font-semibold text-tpgs-emerald">Formation validée</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Certificat disponible · {training.certification}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dernier rapport */}
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <Calendar size={12} />
                    <span>Dernier rapport soumis : <strong style={{ color: 'var(--text-primary)' }}>{training.lastReport || 'Aucun'}</strong></span>
                </div>
            </div>
        </Modal>
    );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function Trainings() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('all');
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [reportOpen, setReportOpen] = useState(false);
    const [pauseOpen, setPauseOpen] = useState(false);
    const [trainings, setTrainings] = useState(myTrainings);

    const statuses = ['all', 'inProgress', 'paused', 'validated', 'planned'];
    const filtered = filter === 'all' ? trainings : trainings.filter(tr => tr.status === filter);

    const openDetail = (tr) => { setSelectedTraining(tr); };

    const handlePauseConfirm = (reason, resumeDate) => {
        setTrainings(ts => ts.map(t => t.id === selectedTraining.id ? { ...t, status: 'paused', pausesUsed: (t.pausesUsed || 0) + 1, endDate: resumeDate } : t));
        setSelectedTraining(prev => prev ? { ...prev, status: 'paused', pausesUsed: (prev.pausesUsed || 0) + 1 } : null);
    };

    return (
        <div>
            <TrainingDetailModal training={selectedTraining} open={!!selectedTraining} onClose={() => setSelectedTraining(null)}
                onOpenReport={() => { setReportOpen(true); }}
                onOpenPause={() => { setPauseOpen(true); }} />
            <ReportModal training={selectedTraining} open={reportOpen} onClose={() => setReportOpen(false)} />
            <PauseModal training={selectedTraining} open={pauseOpen} onClose={() => setPauseOpen(false)} onConfirm={handlePauseConfirm} />

            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl" style={{ color: 'var(--text-primary)' }}>{t('nav.myTrainings')}</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{trainings.length} formation{trainings.length > 1 ? 's' : ''} — Cliquez pour voir les détails</p>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
                {statuses.map(s => (
                    <button key={s} onClick={() => setFilter(s)}
                        className={clsx('px-4 py-2 rounded-xl text-xs font-semibold transition-all',
                            filter === s ? 'bg-tpgs-emerald text-white shadow-[0_0_12px_rgba(16,185,129,0.25)]' : 'btn-ghost')}>
                        {s === 'all' ? 'Toutes' : STATUS_CONFIG[s]?.label || s}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filtered.map((tr, i) => {
                    const cfg = STATUS_CONFIG[tr.status] || STATUS_CONFIG.planned;
                    const StatusIcon = cfg.icon;
                    return (
                        <motion.div key={tr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                            className="card p-5 cursor-pointer hover:border-tpgs-emerald/30 hover:shadow-[0_0_16px_rgba(16,185,129,0.08)] transition-all group"
                            onClick={() => openDetail(tr)}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className={clsx('badge', cfg.badge)}><StatusIcon size={10} /> {cfg.label}</span>
                                        <span className={clsx('badge', tr.modality === 'elearning' ? 'badge-blue' : tr.modality === 'classroom' ? 'badge-gold' : 'badge-slate')}>
                                            {MODALITY_LABEL[tr.modality]}
                                        </span>
                                        <span className="badge badge-slate">{tr.category}</span>
                                        {tr.pausesUsed > 0 && <span className="badge badge-gold">⏸ {tr.pausesUsed}/3</span>}
                                    </div>
                                    <h3 className="font-semibold text-sm mb-1 group-hover:text-tpgs-emerald transition-colors" style={{ color: 'var(--text-primary)' }}>{tr.title}</h3>
                                    <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{tr.provider}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    {['inProgress', 'paused'].includes(tr.status) && (
                                        <span className="text-xs font-black font-mono" style={{ color: tr.status === 'paused' ? '#F59E0B' : '#10B981' }}>{tr.progress}%</span>
                                    )}
                                    <ChevronRight size={15} className="text-tpgs-emerald/30 group-hover:text-tpgs-emerald group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>

                            {['inProgress', 'paused'].includes(tr.status) && (
                                <div className="mt-3 progress-bar">
                                    <motion.div className="progress-fill" style={{ backgroundColor: tr.status === 'paused' ? '#F59E0B' : '#10B981', width: `${tr.progress}%` }}
                                        initial={{ width: 0 }} animate={{ width: `${tr.progress}%` }} transition={{ duration: 0.8 }} />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
