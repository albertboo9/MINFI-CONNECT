import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, CheckCircle2, XCircle, Clock, ChevronRight, MessageSquare, AlertCircle, Send, User, BookOpen, FileText } from 'lucide-react';
import { myRequests, pendingRequests as initialPending, catalogue } from '../data/mock.js';
import { clsx } from 'clsx';
import { useAppStore, ROLES } from '../store/index.js';
import Modal from '../components/ui/Modal.jsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';

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

/* ─── New Request Modal ──────────────────────────────── */
function NewRequestModal({ open, onClose, onSubmit }) {
    const [form, setForm] = useState({ trainingId: '', priority: 'medium', justification: '' });
    const { playSuccess } = useSound();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.trainingId || !form.justification.trim()) {
            toast.error('Veuillez compléter tous les champs obligatoires.');
            return;
        }
        onSubmit(form);
        playSuccess();
        toast.success('Demande soumise avec succès', { title: 'Demande envoyée ✓', duration: 5000 });
        onClose();
        setForm({ trainingId: '', priority: 'medium', justification: '' });
    };

    const selected = catalogue.find(c => c.id === form.trainingId);

    return (
        <Modal open={open} onClose={onClose} title="Nouvelle demande de formation" subtitle="Votre demande sera soumise à validation de votre chef de service" size="md"
            footer={<>
                <button type="button" onClick={onClose} className="btn-ghost">Annuler</button>
                <button type="submit" form="new-req-form" className="btn-primary"><Send size={15} /> Soumettre la demande</button>
            </>}>
            <form id="new-req-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Formation selector */}
                <div>
                    <label className="section-label block mb-2">Formation souhaitée *</label>
                    <select className="select" value={form.trainingId} onChange={e => setForm(f => ({ ...f, trainingId: e.target.value }))}>
                        <option value="">Sélectionner une formation du catalogue...</option>
                        {catalogue.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                </div>

                {/* Selected training preview */}
                <AnimatePresence>
                    {selected && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-hover)', borderColor: 'var(--border)' }}>
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-tpgs-emerald/10 flex items-center justify-center flex-shrink-0">
                                    <BookOpen size={16} className="text-tpgs-emerald" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{selected.title}</p>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{selected.provider} · {selected.duration} · {selected.cost > 0 ? `${selected.cost.toLocaleString()} FCFA` : 'Gratuit'}</p>
                                    <p className="text-xs mt-1 leading-snug" style={{ color: 'var(--text-muted)' }}>{selected.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Priority */}
                <div>
                    <label className="section-label block mb-2">Niveau de priorité</label>
                    <div className="grid grid-cols-4 gap-2">
                        {Object.entries(PRIORITY_CFG).map(([key, cfg]) => (
                            <button type="button" key={key} onClick={() => setForm(f => ({ ...f, priority: key }))}
                                className={clsx('py-2 px-3 rounded-xl border text-xs font-semibold transition-all', cfg.badge,
                                    form.priority === key ? 'ring-2 ring-offset-2 ring-tpgs-emerald' : 'opacity-50 hover:opacity-80')}>
                                {cfg.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Justification */}
                <div>
                    <label className="section-label block mb-2">Justification professionnelle *</label>
                    <textarea className="textarea" rows={4}
                        placeholder="Expliquez en quoi cette formation contribue à vos objectifs professionnels et ceux de votre service..."
                        value={form.justification} onChange={e => setForm(f => ({ ...f, justification: e.target.value }))} />
                    <p className="text-[10px] mt-1.5 font-mono" style={{ color: 'var(--text-muted)' }}>{form.justification.length}/500 caractères · minimum 50 recommandés</p>
                </div>
            </form>
        </Modal>
    );
}

/* ─── Request Detail + Approve/Reject Modal (Manager) ── */
function RequestActionModal({ request, open, onClose, onApprove, onReject }) {
    const [comment, setComment] = useState('');
    const { playApprove, playReject } = useSound();

    const handleApprove = () => {
        if (!comment.trim()) { toast.warning("Ajoutez un commentaire avant de valider."); return; }
        onApprove(request, comment);
        playApprove();
        toast.success(`Demande de ${request.agentName} approuvée`, { title: '✅ Demande validée', duration: 5000 });
        setComment('');
        onClose();
    };

    const handleReject = () => {
        if (!comment.trim()) { toast.warning("Ajoutez un motif de rejet avant de rejeter."); return; }
        onReject(request, comment);
        playReject();
        toast.error(`Demande de ${request.agentName} rejetée`, { title: '❌ Demande rejetée', duration: 5000 });
        setComment('');
        onClose();
    };

    if (!request) return null;

    return (
        <Modal open={open} onClose={onClose} title="Répondre à la demande" subtitle={`${request.agentName} · ${request.date}`} size="md"
            footer={<>
                <button onClick={onClose} className="btn-ghost">Fermer</button>
                <button onClick={handleReject} className="btn-danger"><XCircle size={15} /> Rejeter</button>
                <button onClick={handleApprove} className="btn-approve"><CheckCircle2 size={15} /> Approuver</button>
            </>}>
            <div className="space-y-5">
                {/* Agent info */}
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-hover)' }}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tpgs-emerald/20 to-tpgs-blue/20 flex items-center justify-center text-sm font-black text-white flex-shrink-0">
                        {request.agentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{request.agentName}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Score annuel : <strong className="text-tpgs-emerald">{request.agentScore}/100</strong></p>
                    </div>
                    <div className="ml-auto text-right">
                        <span className={clsx('badge', PRIORITY_CFG[request.priority]?.badge)}>{PRIORITY_CFG[request.priority]?.label}</span>
                        {request.cost > 0 && <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>{request.cost.toLocaleString()} FCFA</p>}
                    </div>
                </div>

                {/* Training info */}
                <div>
                    <p className="section-label mb-2">Formation demandée</p>
                    <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{request.trainingTitle}</p>
                        <div className="flex gap-2 mt-2">
                            <span className={clsx('badge', request.modality === 'elearning' ? 'badge-blue' : 'badge-gold')}>
                                {request.modality === 'elearning' ? 'E-learning' : 'Présentiel'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Justification */}
                <div>
                    <p className="section-label mb-2">Justification de l'agent</p>
                    <blockquote className="p-4 rounded-xl border-l-4 border-tpgs-emerald text-sm italic" style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)' }}>
                        "{request.justification}"
                    </blockquote>
                </div>

                {/* Comment */}
                <div>
                    <label className="section-label block mb-2">Votre commentaire / décision *</label>
                    <textarea className="textarea" rows={3}
                        placeholder="Expliquez votre décision (approuver ou rejeter) avec un commentaire circonstancié..."
                        value={comment} onChange={e => setComment(e.target.value)} />
                </div>
            </div>
        </Modal>
    );
}

/* ─── Request Detail Modal (Operator) ───────────────── */
function MyRequestDetailModal({ request, open, onClose }) {
    if (!request) return null;
    const cfg = STATUS_CFG[request.status];
    const StatusIcon = cfg?.icon || Clock;
    return (
        <Modal open={open} onClose={onClose} title={request.title} subtitle={`Soumise le ${request.date}`} size="md">
            <div className="space-y-5">
                <div className="flex gap-2">
                    <span className={clsx('badge', cfg?.badge)}><StatusIcon size={10} /> {cfg?.label}</span>
                    <span className={clsx('badge', PRIORITY_CFG[request.priority]?.badge)}>{PRIORITY_CFG[request.priority]?.label}</span>
                </div>

                <div>
                    <p className="section-label mb-2">Votre justification</p>
                    <p className="text-sm p-4 rounded-xl italic" style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)' }}>
                        "{request.justification}"
                    </p>
                </div>

                {request.managerComment && (
                    <div>
                        <p className="section-label mb-2">Commentaire du chef de service</p>
                        <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-hover)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <MessageSquare size={13} className="text-tpgs-emerald" />
                                <span className="text-xs font-semibold text-tpgs-emerald">Réponse officielle</span>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{request.managerComment}</p>
                        </div>
                    </div>
                )}

                {request.status === 'pending' && (
                    <div className="p-4 rounded-xl border border-amber-400/20" style={{ backgroundColor: 'rgba(245,158,11,0.06)' }}>
                        <div className="flex items-center gap-2">
                            <AlertCircle size={14} className="text-amber-400" />
                            <p className="text-xs font-semibold text-amber-400">En attente de validation par votre chef de service</p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function Requests() {
    const { t } = useTranslation();
    const { activeRole } = useAppStore();
    const isManager = activeRole === ROLES.MANAGER || activeRole === ROLES.HRM;

    const [pending, setPending] = useState(initialPending);
    const [myReqs, setMyReqs] = useState(myRequests);
    const [newReqOpen, setNewReqOpen] = useState(false);
    const [actionTarget, setActionTarget] = useState(null);
    const [detailTarget, setDetailTarget] = useState(null);

    const handleApprove = (req, comment) => {
        setPending(p => p.filter(r => r.id !== req.id));
    };

    const handleReject = (req, comment) => {
        setPending(p => p.filter(r => r.id !== req.id));
    };

    const handleNewRequest = (form) => {
        const cat = catalogue.find(c => c.id === form.trainingId);
        if (!cat) return;
        const newReq = { id: `r${Date.now()}`, title: cat.title, date: new Date().toISOString().split('T')[0], status: 'pending', priority: form.priority, justification: form.justification, managerComment: null };
        setMyReqs(r => [newReq, ...r]);
    };

    return (
        <div>
            {/* Modals */}
            <NewRequestModal open={newReqOpen} onClose={() => setNewReqOpen(false)} onSubmit={handleNewRequest} />
            <RequestActionModal request={actionTarget} open={!!actionTarget} onClose={() => setActionTarget(null)} onApprove={handleApprove} onReject={handleReject} />
            <MyRequestDetailModal request={detailTarget} open={!!detailTarget} onClose={() => setDetailTarget(null)} />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading font-black text-3xl" style={{ color: 'var(--text-primary)' }}>
                        {isManager ? "Demandes de formation" : t('nav.myRequests')}
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {isManager ? `${pending.length} demande${pending.length > 1 ? 's' : ''} en attente de décision` : 'Vos demandes de formation'}
                    </p>
                </div>
                {!isManager && (
                    <button className="btn-primary" onClick={() => setNewReqOpen(true)}>
                        <Plus size={16} /> Nouvelle demande
                    </button>
                )}
            </div>

            {/* Manager — pending to validate */}
            {isManager && (
                <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>En attente de décision</h2>
                        {pending.length > 0 && <span className="badge badge-gold">{pending.length}</span>}
                    </div>

                    {pending.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="card p-12 text-center">
                            <CheckCircle2 size={40} className="text-tpgs-emerald mx-auto mb-3" />
                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Toutes les demandes ont été traitées !</p>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Excellent travail 🎉</p>
                        </motion.div>
                    ) : (
                        pending.map((r, i) => (
                            <motion.div key={r.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.07 }}
                                className="card p-5">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className={clsx('badge', PRIORITY_CFG[r.priority]?.badge)}>{PRIORITY_CFG[r.priority]?.label}</span>
                                            <span className={clsx('badge', r.modality === 'elearning' ? 'badge-blue' : 'badge-gold')}>{r.modality === 'elearning' ? 'E-learning' : 'Présentiel'}</span>
                                            <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>Score: <span className="text-tpgs-emerald font-bold">{r.agentScore}/100</span></span>
                                            <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{r.date}</span>
                                        </div>
                                        <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{r.trainingTitle}</h3>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Agent : <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{r.agentName}</span>
                                            {' '}· {r.cost > 0 ? <span className="font-mono">{r.cost.toLocaleString()} FCFA</span> : <span className="text-tpgs-emerald font-semibold">Gratuit</span>}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs italic mb-4" style={{ color: 'var(--text-muted)' }}>"{r.justification}"</p>
                                <div className="flex gap-2">
                                    <button className="btn-approve text-xs py-2 px-4" onClick={() => setActionTarget(r)}>
                                        <CheckCircle2 size={13} /> Répondre à la demande
                                    </button>
                                    <button className="btn-ghost text-xs py-2 px-4" onClick={() => setActionTarget(r)}>
                                        <MessageSquare size={13} /> Commenter
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}

            {/* My requests list */}
            <div>
                {isManager && (
                    <h2 className="font-heading font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Historique des demandes traitées</h2>
                )}
                <AnimatePresence>
                    <div className="space-y-3">
                        {myReqs.map((r, i) => {
                            const cfg = STATUS_CFG[r.status] || STATUS_CFG.pending;
                            const StatusIcon = cfg.icon;
                            return (
                                <motion.div key={r.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                    className="card p-5 cursor-pointer hover:border-tpgs-emerald/30 transition-all group"
                                    onClick={() => setDetailTarget(r)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <span className={clsx('badge', cfg.badge)}><StatusIcon size={10} /> {cfg.label}</span>
                                                <span className={clsx('badge', PRIORITY_CFG[r.priority]?.badge)}>{PRIORITY_CFG[r.priority]?.label}</span>
                                                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{r.date}</span>
                                            </div>
                                            <h3 className="font-semibold text-sm group-hover:text-tpgs-emerald transition-colors" style={{ color: 'var(--text-primary)' }}>{r.title}</h3>
                                            {r.managerComment && (
                                                <p className="text-xs mt-1.5 italic flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                                                    <MessageSquare size={11} className="flex-shrink-0" /> {r.managerComment}
                                                </p>
                                            )}
                                        </div>
                                        <ChevronRight size={15} className="text-tpgs-emerald/40 group-hover:text-tpgs-emerald group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
