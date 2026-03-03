import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Plus, CheckCircle2, XCircle, Clock, ChevronRight, MessageSquare,
    AlertCircle, Send, User, BookOpen, FileText, Users
} from 'lucide-react';
import { myRequests, pendingRequests as initialPending, catalogue, teamMembers } from '../data/mock.js';
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
function NewRequestModal({ open, onClose, onSubmit, isManager }) {
    const [form, setForm] = useState({ trainingId: '', priority: 'medium', justification: '', requestedForId: '' });
    const { playSuccess } = useSound();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.trainingId || !form.justification.trim() || (isManager && !form.requestedForId)) {
            toast.error('Veuillez compléter tous les champs obligatoires.');
            return;
        }
        onSubmit(form);
        playSuccess();
        toast.success('Demande soumise avec succès', {
            title: isManager ? 'Soumission d\'équipe ✓' : 'Demande envoyée ✓',
            duration: 5000
        });
        onClose();
        setForm({ trainingId: '', priority: 'medium', justification: '', requestedForId: '' });
    };

    const selected = catalogue.find(c => c.id === form.trainingId);

    return (
        <Modal open={open} onClose={onClose} title={isManager ? "Soumettre un besoin pour l'équipe" : "Nouvelle demande de formation"} subtitle={isManager ? "Identifiez un besoin pour l'un de vos collaborateurs" : "Votre demande sera soumise à validation de votre chef de service"} size="md"
            footer={<>
                <button type="button" onClick={onClose} className="btn-ghost">Annuler</button>
                <button type="submit" form="new-req-form" className="btn-primary"><Send size={15} /> Soumettre la demande</button>
            </>}>
            <form id="new-req-form" onSubmit={handleSubmit} className="space-y-5">

                {isManager && (
                    <div>
                        <label className="section-label block mb-2">Collaborateur concerné *</label>
                        <div className="relative">
                            <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-themed-muted" />
                            <select className="select pl-10" value={form.requestedForId} onChange={e => setForm(f => ({ ...f, requestedForId: e.target.value }))}>
                                <option value="">Sélectionner un agent...</option>
                                {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name} ({m.grade})</option>)}
                            </select>
                        </div>
                    </div>
                )}

                <div>
                    <label className="section-label block mb-2">Formation souhaitée *</label>
                    <select className="select" value={form.trainingId} onChange={e => setForm(f => ({ ...f, trainingId: e.target.value }))}>
                        <option value="">Sélectionner une formation du catalogue...</option>
                        {catalogue.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                </div>

                <AnimatePresence>
                    {selected && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-hover)', borderStyle: 'dashed', borderColor: 'var(--border)' }}>
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-tpgs-emerald/10 flex items-center justify-center flex-shrink-0">
                                    <BookOpen size={16} className="text-tpgs-emerald" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{selected.title}</p>
                                    <p className="text-[10px] mt-0.5 font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{selected.provider} · {selected.duration}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div>
                    <label className="section-label block mb-2">Niveau de priorité</label>
                    <div className="grid grid-cols-4 gap-2">
                        {Object.entries(PRIORITY_CFG).map(([key, cfg]) => (
                            <button type="button" key={key} onClick={() => setForm(f => ({ ...f, priority: key }))}
                                className={clsx('py-2 px-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all',
                                    form.priority === key ? 'bg-tpgs-emerald text-white border-tpgs-emerald shadow-lg' : 'bg-themed-card text-themed-muted border-themed opacity-60')}>
                                {cfg.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="section-label block mb-2">{isManager ? "Justification managériale *" : "Justification professionnelle *"}</label>
                    <textarea className="textarea" rows={4}
                        placeholder={isManager ? "Expliquez pourquoi ce collaborateur a besoin de cette formation (montée en compétence, lacune identifiée...)" : "Expliquez votre besoin..."}
                        value={form.justification} onChange={e => setForm(f => ({ ...f, justification: e.target.value }))} />
                </div>
            </form>
        </Modal>
    );
}

/* ─── Request Action Modal (Manager) ── */
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
            <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-themed-hover">
                    <div className="w-12 h-12 rounded-xl bg-tpgs-emerald text-white flex items-center justify-center text-lg font-black">{request.agentName[0]}</div>
                    <div>
                        <p className="text-sm font-bold text-themed">{request.agentName}</p>
                        <p className="text-xs text-themed-muted">Dernier score évaluation : <span className="text-tpgs-emerald font-black">{request.agentScore}/100</span></p>
                    </div>
                </div>

                <div>
                    <p className="section-label mb-2">Formation demandée</p>
                    <div className="p-4 rounded-xl border border-themed bg-themed-card">
                        <p className="font-bold text-sm text-themed">{request.trainingTitle}</p>
                        <p className="text-xs text-themed-muted mt-1 uppercase font-mono tracking-tighter">{request.cost > 0 ? `${request.cost.toLocaleString()} FCFA` : 'Frais de transport uniquement (Gratuite)'}</p>
                    </div>
                </div>

                <div>
                    <p className="section-label mb-2">Justification de l'agent</p>
                    <p className="text-sm text-themed-muted italic bg-themed-hover p-4 rounded-xl border-l-4 border-tpgs-emerald">"{request.justification}"</p>
                </div>

                <div>
                    <label className="section-label block mb-2">Votre commentaire / décision *</label>
                    <textarea className="textarea" rows={3} placeholder="Saisir votre commentaire pour l'agent..." value={comment} onChange={e => setComment(e.target.value)} />
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
        <Modal open={open} onClose={onClose} title={request.title} subtitle={`Requête soumise le ${request.date}`} size="md">
            <div className="space-y-6">
                <div className="flex gap-2">
                    <span className={clsx('badge', cfg?.badge)}><StatusIcon size={12} /> {cfg?.label}</span>
                    <span className={clsx('badge', PRIORITY_CFG[request.priority]?.badge)}>{PRIORITY_CFG[request.priority]?.label}</span>
                </div>

                <div>
                    <p className="section-label mb-2">Historique décisionnel</p>
                    {request.managerComment ? (
                        <div className="p-4 rounded-xl bg-themed-hover border border-themed">
                            <p className="text-xs font-bold text-tpgs-emerald mb-2 uppercase tracking-widest">Commentaire Manager</p>
                            <p className="text-sm text-themed">{request.managerComment}</p>
                        </div>
                    ) : (
                        <div className="p-4 rounded-xl bg-themed-hover text-center italic text-xs text-themed-muted">
                            En attente d'arbitrage par le Chef de Service...
                        </div>
                    )}
                </div>

                <div>
                    <p className="section-label mb-2">Votre motivation initiale</p>
                    <p className="text-sm text-themed-muted italic">"{request.justification}"</p>
                </div>
            </div>
        </Modal>
    );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function Requests() {
    const { activeRole } = useAppStore();
    const isManager = activeRole === ROLES.MANAGER;
    const isHRM = activeRole === ROLES.HRM;

    const [pending, setPending] = useState(initialPending);
    const [myReqs, setMyReqs] = useState(myRequests);
    const [newReqOpen, setNewReqOpen] = useState(false);
    const [actionTarget, setActionTarget] = useState(null);
    const [detailTarget, setDetailTarget] = useState(null);

    const handleApprove = (req, comment) => setPending(p => p.filter(r => r.id !== req.id));
    const handleReject = (req, comment) => setPending(p => p.filter(r => r.id !== req.id));

    const handleNewRequest = (f) => {
        const cat = catalogue.find(c => c.id === f.trainingId);
        const agent = isManager ? teamMembers.find(m => m.id === f.requestedForId) : null;
        const newReq = {
            id: `r${Date.now()}`,
            title: cat?.title || 'Formation externe',
            date: new Date().toLocaleDateString('fr-FR'),
            status: isManager ? 'approved' : 'pending', // Manager requests are auto-approved at their level
            priority: f.priority,
            justification: f.justification,
            requestedFor: agent?.name
        };
        setMyReqs(prev => [newReq, ...prev]);
    };

    return (
        <div className="space-y-8">
            <NewRequestModal open={newReqOpen} onClose={() => setNewReqOpen(false)} onSubmit={handleNewRequest} isManager={isManager} />
            <RequestActionModal request={actionTarget} open={!!actionTarget} onClose={() => setActionTarget(null)} onApprove={handleApprove} onReject={handleReject} />
            <MyRequestDetailModal request={detailTarget} open={!!detailTarget} onClose={() => setDetailTarget(null)} />

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
                <div>
                    <h1 className="font-heading font-black text-3xl text-themed">
                        {isManager || isHRM ? "Gestion des Besoins" : "Mes Demandes"}
                    </h1>
                    <p className="text-sm mt-1 text-themed-muted">
                        {isManager ? `Arbitrage des demandes et planification d'équipe` : "Suivi de vos requêtes de formation"}
                    </p>
                </div>
                <button className="btn-primary" onClick={() => setNewReqOpen(true)}>
                    <Plus size={16} /> {isManager ? "Inscrire un agent" : "Nouvelle demande"}
                </button>
            </section>

            {/* Managers & HR View - Pending Approval */}
            {(isManager || isHRM) && (
                <section className="space-y-4">
                    <h2 className="section-label flex items-center gap-2 px-2"><Clock size={14} className="text-amber-400" /> Requêtes à traiter</h2>
                    {pending.length === 0 ? (
                        <div className="card p-12 text-center opacity-40">
                            <CheckCircle2 size={40} className="mx-auto text-tpgs-emerald mb-3" />
                            <p className="text-sm font-bold text-themed">Aucune demande en attente</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {pending.map((r, i) => (
                                <motion.div key={r.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="card p-5 group flex flex-col md:flex-row md:items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={clsx('badge', PRIORITY_CFG[r.priority]?.badge)}>{PRIORITY_CFG[r.priority]?.label}</span>
                                            <span className="text-[10px] font-mono text-themed-muted">{r.date}</span>
                                        </div>
                                        <h3 className="font-bold text-themed">{r.trainingTitle}</h3>
                                        <p className="text-xs text-themed-muted mt-1">Émis par <span className="text-themed font-bold">{r.agentName}</span> · Score Évaluation : <span className="text-tpgs-emerald font-bold">{r.agentScore}/100</span></p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setActionTarget(r)} className="btn-approve text-xs px-5">Traiter la demande</button>
                                        <button className="btn-ghost p-2.5 rounded-xl"><MessageSquare size={16} /></button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* User's History / Archive */}
            <section className="space-y-4">
                <h2 className="section-label flex items-center gap-2 px-2"><FileText size={14} className="text-blue-400" /> {isManager || isHRM ? "Historique des dossiers" : "Tableau de suivi"}</h2>
                <div className="grid grid-cols-1 gap-3">
                    {myReqs.map((r, i) => (
                        <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} onClick={() => setDetailTarget(r)} className="card p-4 flex items-center justify-between hover:border-tpgs-emerald/30 cursor-pointer transition-all group">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className={clsx("badge", STATUS_CFG[r.status]?.badge)}>{STATUS_CFG[r.status]?.label}</span>
                                    <h3 className="text-sm font-bold text-themed group-hover:text-tpgs-emerald transition-colors">{r.title}</h3>
                                </div>
                                {r.requestedFor && <p className="text-[10px] font-bold text-tpgs-emerald uppercase">Concernant : {r.requestedFor}</p>}
                                <p className="text-[10px] text-themed-muted font-mono">{r.date}</p>
                            </div>
                            <ChevronRight size={16} className="text-themed-muted group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
