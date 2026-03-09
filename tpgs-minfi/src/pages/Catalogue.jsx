import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { catalogue as initialCatalogue, teamMembers } from '../data/mock.js';
import {
    Search, BookOpen, Clock, DollarSign, ExternalLink,
    Filter, Star, Globe, Shield, Zap, Send, FileText,
    ChevronRight, PlayCircle, Info, Target, Users, Plus, CheckCircle2,
    X, AlertCircle, Bookmark, Share2
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';
import { useAppStore, ROLES } from '../store/index.js';
import Modal from '../components/ui/Modal.jsx';

const CAT_THEMES = {
    job: { label: 'Métier', badge: 'badge-emerald', color: '#10B981' },
    transversal: { label: 'Transversale', badge: 'badge-blue', color: '#3B82F6' },
    specific: { label: 'Spécifique', badge: 'badge-gold', color: '#F59E0B' },
    executive: { label: 'Executive', badge: 'badge-purple', color: '#8B5CF6' },
};

/* ── Add Training Modal (Tech) ───────────────────────── */
function AddTrainingModal({ open, onClose, onAdd }) {
    const [form, setForm] = useState({ title: '', provider: '', duration: '', category: 'job', isFree: false, description: '' });
    const { playSuccess } = useSound();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.provider) { toast.error('Titre et prestataire obligatoires'); return; }
        onAdd(form);
        playSuccess();
        toast.success('Nouvelle formation référencée', { title: 'Catalogue mis à jour ✓' });
        onClose();
        setForm({ title: '', provider: '', duration: '', category: 'job', isFree: false, description: '' });
    };

    return (
        <Modal open={open} onClose={onClose} title="Référencer une formation" subtitle="Gestion du catalogue de sourcing" size="sm"
            footer={<>
                <button onClick={onClose} className="btn-ghost">Annuler</button>
                <button type="submit" form="add-cat-form" className="btn-primary">Ajouter au catalogue</button>
            </>}>
            <form id="add-cat-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="section-label mb-1.5 block">Titre de la formation *</label>
                    <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ex: Analyse de données financières" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="section-label mb-1.5 block">Prestataire *</label>
                        <input className="input" value={form.provider} onChange={e => setForm(f => ({ ...f, provider: e.target.value }))} placeholder="Ex: Cabinet Audit" />
                    </div>
                    <div>
                        <label className="section-label mb-1.5 block">Durée</label>
                        <input className="input" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="Ex: 3 jours" />
                    </div>
                </div>
                <div className="flex items-center gap-6 p-3 bg-themed-hover rounded-xl border border-dashed border-themed">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.isFree} onChange={e => setForm(f => ({ ...f, isFree: e.target.checked }))} className="w-4 h-4 accent-tpgs-emerald" />
                        <span className="text-xs font-bold text-themed">Formation gratuite</span>
                    </label>
                    <select className="bg-transparent text-xs font-bold text-themed outline-none border-none" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                        {Object.entries(CAT_THEMES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="section-label mb-1.5 block">Description succincte</label>
                    <textarea className="textarea" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
            </form>
        </Modal>
    );
}

/* ── Request Training Modal (Hierarchical) ──────────── */
function RequestTrainingModal({ open, onClose, course, isManager, isHRM, currentUser }) {
    const [targetType, setTargetType] = useState('self'); // self | team
    const [selectedAgentId, setSelectedAgentId] = useState('');
    const [justification, setJustification] = useState('');
    const { playSuccess } = useSound();

    const canRequestForTeam = isManager || isHRM;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!justification.trim() || (targetType === 'team' && !selectedAgentId)) {
            toast.error('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        const targetName = targetType === 'self' ? 'vous-même' : teamMembers.find(m => m.id === selectedAgentId)?.name;

        playSuccess();
        toast.success(`Demande soumise pour ${targetName}`, {
            title: 'Requête transmise ✓',
            duration: 5000
        });
        onClose();
        setJustification('');
        setSelectedAgentId('');
    };

    if (!course) return null;

    return (
        <Modal open={open} onClose={onClose} title="Initier une demande" subtitle={course.title} size="md"
            footer={<>
                <button onClick={onClose} className="btn-ghost">Annuler</button>
                <button type="submit" form="request-cat-form" className="btn-primary">Confirmer la demande</button>
            </>}>
            <form id="request-cat-form" onSubmit={handleSubmit} className="space-y-6">

                {canRequestForTeam && (
                    <div className="flex p-1 bg-themed-hover rounded-2xl border border-themed">
                        <button type="button" onClick={() => setTargetType('self')} className={clsx("flex-1 py-2 rounded-xl text-xs font-bold transition-all", targetType === 'self' ? "bg-themed-card text-themed shadow-sm" : "text-themed-muted")}>
                            Pour moi
                        </button>
                        <button type="button" onClick={() => setTargetType('team')} className={clsx("flex-1 py-2 rounded-xl text-xs font-bold transition-all", targetType === 'team' ? "bg-themed-card text-themed shadow-sm" : "text-themed-muted")}>
                            Pour un collaborateur
                        </button>
                    </div>
                )}

                {targetType === 'team' && (
                    <div className="animate-slide-up">
                        <label className="section-label block mb-2">Choisir l'agent bénéficiaire *</label>
                        <select className="select" value={selectedAgentId} onChange={e => setSelectedAgentId(e.target.value)}>
                            <option value="">Sélectionner un collaborateur...</option>
                            {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name} ({m.grade})</option>)}
                        </select>
                    </div>
                )}

                <div className="p-4 rounded-xl bg-tpgs-emerald/5 border border-tpgs-emerald/20 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-themed-card flex items-center justify-center text-tpgs-emerald">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-themed truncate">{course.title}</p>
                        <p className="text-[10px] text-themed-muted font-bold uppercase tracking-wider">{course.provider} · {course.duration}</p>
                    </div>
                </div>

                <div>
                    <label className="section-label block mb-2">Justification du besoin *</label>
                    <textarea className="textarea" rows={4} value={justification} onChange={e => setJustification(e.target.value)} placeholder="En quoi cette formation est-elle pertinente pour le poste ?" />
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-themed-hover text-[10px] text-themed-muted italic">
                    <AlertCircle size={14} className="text-blue-400" />
                    Une notification sera envoyée à l'agent concerné et à la hiérarchie pour validation finale.
                </div>
            </form>
        </Modal>
    );
}

/* ── Course Preview Modal ───────────────────────────── */
function CourseModal({ course, open, onClose, onShowRequest, onStartFree, isOp }) {
    if (!course) return null;
    const theme = CAT_THEMES[course.category] || CAT_THEMES.job;

    return (
        <Modal open={open} onClose={onClose} title={course.title} subtitle={course.provider} size="lg"
            footer={
                <>
                    <button onClick={onClose} className="btn-ghost">Fermer</button>
                    {course.isFree && isOp ? (
                        <button onClick={() => { onStartFree(course); onClose(); }} className="btn-approve animate-pulse">
                            <PlayCircle size={15} /> Démarrer immédiatement
                        </button>
                    ) : (
                        <button onClick={() => { onShowRequest(course); onClose(); }} className="btn-primary">
                            <Send size={15} /> Demander cette formation
                        </button>
                    )}
                </>
            }>
            <div className="space-y-8">
                <div className="flex flex-wrap gap-2">
                    <span className={clsx('badge', theme.badge)}>{theme.label}</span>
                    <span className="badge badge-slate">{course.certification || 'Attestation MINFI'}</span>
                    <span className="badge badge-blue">{course.duration}</span>
                    <span className="badge badge-indigo">{course.level || 'Tous niveaux'}</span>
                    {course.isFree && <span className="badge badge-emerald">Gratuité totale</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card p-4 flex items-center gap-3 border-themed bg-themed-hover/20">
                        <Clock size={18} className="text-themed-muted" />
                        <div>
                            <p className="section-label mb-0.5">Durée estimée</p>
                            <p className="text-sm font-bold text-themed">{course.duration}</p>
                        </div>
                    </div>
                    <div className="card p-4 flex items-center gap-3 border-themed bg-themed-hover/20">
                        <Globe size={18} className="text-themed-muted" />
                        <div>
                            <p className="section-label mb-0.5">Modalité</p>
                            <p className="text-sm font-bold text-themed capitalize">{course.modality || 'Hybride'}</p>
                        </div>
                    </div>
                    <div className="card p-4 flex items-center gap-3 border-tpgs-emerald/20 bg-tpgs-emerald/5">
                        <DollarSign size={18} className="text-tpgs-emerald" />
                        <div>
                            <p className="section-label mb-0.5">Frais de Sourcing</p>
                            <p className="text-sm font-black text-tpgs-emerald">{course.cost > 0 ? `${course.cost.toLocaleString()} FCFA` : 'Sourcing Interne (0 F)'}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-heading font-black text-lg text-themed mb-2">Description Opérationnelle</h3>
                        <p className="text-sm text-themed-muted leading-relaxed">{course.description || 'Formation spécialisée conçue pour renforcer les capacités opérationnelles des agents du Ministère des Finances dans un environnement dématérialisé.'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-4">
                            <p className="section-label flex items-center gap-2 font-black"><Target size={14} className="text-tpgs-emerald" /> Objectifs de Performance</p>
                            <ul className="space-y-3">
                                {[
                                    'Maîtrise des nouveaux workflows administratifs',
                                    'Optimisation des temps de traitement des dossiers',
                                    'Reporting précis et analytique à la hiérarchie'
                                ].map(i => (
                                    <li key={i} className="text-xs text-themed flex items-start gap-3">
                                        <CheckCircle2 size={14} className="text-tpgs-emerald flex-shrink-0 mt-0.5" /> <span>{i}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <p className="section-label flex items-center gap-2 font-black"><Users size={14} className="text-blue-400" /> Profils éligibles</p>
                            <p className="text-xs text-themed-muted leading-relaxed bg-themed-hover p-4 rounded-xl border border-themed">
                                Cette session s'adresse prioritairement aux agents de la Catégorie A et B en charge du pilotage financier ou de l'audit interne au sein du MINFI.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default function Catalogue() {
    const { activeRole, currentUser } = useAppStore();
    const { playClick, playSuccess, playNotify } = useSound();

    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [requestCourse, setRequestCourse] = useState(null);
    const [addMode, setAddMode] = useState(false);
    const [courses, setCourses] = useState(initialCatalogue);

    const isTech = activeRole === ROLES.TECH;
    const isOp = activeRole === ROLES.OPERATOR;
    const isManager = activeRole === ROLES.MANAGER;
    const isHRM = activeRole === ROLES.HRM;

    const filtered = courses.filter(c =>
        (catFilter === 'all' || c.category === catFilter) &&
        (c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.provider.toLowerCase().includes(search.toLowerCase()) ||
            (c.description && c.description.toLowerCase().includes(search.toLowerCase())))
    );

    const handleQuickRequest = (course) => {
        playClick();
        setRequestCourse(course);
    };

    const handleStartFree = (course) => {
        playNotify();
        toast.success(`Formation "${course.title}" démarrée !`, {
            title: 'Inscription instantanée 🚀',
            duration: 4000,
            icon: <Zap size={16} className="text-white" />
        });
    };

    const handleAddCourse = (data) => {
        const newC = { ...data, id: `c${Date.now()}`, modality: 'blended', cost: data.isFree ? 0 : 75000, certification: 'Certificat TPGS' };
        setCourses([newC, ...courses]);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <CourseModal course={selectedCourse} open={!!selectedCourse} onClose={() => setSelectedCourse(null)} onShowRequest={handleQuickRequest} onStartFree={handleStartFree} isOp={isOp} />
            <RequestTrainingModal course={requestCourse} open={!!requestCourse} onClose={() => setRequestCourse(null)} isManager={isManager} isHRM={isHRM} currentUser={currentUser} />
            <AddTrainingModal open={addMode} onClose={() => setAddMode(false)} onAdd={handleAddCourse} />

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
                <div>
                    <h1 className="font-heading font-black text-4xl text-themed tracking-tight">Catalogue des Formations</h1>
                    <p className="text-sm mt-1 text-themed-muted flex items-center gap-2">
                        <Target size={14} className="text-tpgs-emerald" />
                        Référentiel des compétences stratégiques du Ministère des Finances
                    </p>
                </div>
                <div className="flex gap-2">
                    {isTech && (
                        <button onClick={() => setAddMode(true)} className="btn-primary">
                            <Plus size={16} /> Référencer une formation
                        </button>
                    )}
                    <button className="btn-ghost flex items-center gap-2 px-4 border border-themed">
                        <Shield size={14} /> Prestataires Agréés
                    </button>
                </div>
            </section>

            {/* Intuitive Search Bar */}
            <section className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={20} className="text-themed-muted group-focus-within:text-tpgs-emerald transition-colors" />
                    </div>
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="input pl-12 h-14 text-lg font-bold placeholder:font-normal placeholder:text-themed-muted/50 focus:ring-2 focus:ring-tpgs-emerald/20 transition-all shadow-sm"
                        placeholder="Quelle compétence recherchez-vous ? (ex: Audit, Fiscalité, Debt...)"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                    {['all', 'job', 'transversal', 'specific', 'executive'].map(f => (
                        <button
                            key={f} onClick={() => { playClick(); setCatFilter(f); }}
                            className={clsx(
                                'px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border shadow-sm',
                                catFilter === f ? 'bg-tpgs-emerald text-white border-tpgs-emerald' : 'bg-themed-card text-themed-muted border-themed hover:border-themed-muted hover:bg-themed-hover'
                            )}
                        >
                            {f === 'all' ? 'TOUS LES TITRES' : CAT_THEMES[f]?.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filtered.map((c, i) => {
                        const theme = CAT_THEMES[c.category] || CAT_THEMES.job;
                        return (
                            <motion.div
                                key={c.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: i * 0.04 }}
                                className="card group hover:border-tpgs-emerald/40 transition-all cursor-pointer flex flex-col h-full bg-themed-card shadow-lg hover:shadow-tpgs-emerald/5 overflow-hidden border-2 border-transparent"
                                onClick={() => setSelectedCourse(c)}
                            >
                                <div className="p-7 flex-1 space-y-5">
                                    <div className="flex justify-between items-start">
                                        <span className={clsx('badge px-3 py-1 text-[9px] font-black', theme.badge)}>{theme.label}</span>
                                        <div className="flex gap-1.5 leading-none">
                                            {c.isFree && <span className="bg-tpgs-emerald/20 text-tpgs-emerald text-[9px] font-black py-1 px-2 rounded-lg">OFFERT</span>}
                                            <button onClick={(e) => { e.stopPropagation(); toast.info('Ajouté à vos favoris'); }} className="p-1.5 hover:bg-themed-hover rounded-lg text-themed-muted hover:text-amber-400 transition-colors">
                                                <Bookmark size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-heading font-black text-xl text-themed group-hover:text-tpgs-emerald transition-colors leading-tight">
                                            {c.title}
                                        </h3>
                                        <p className="text-xs text-themed-muted font-bold flex items-center gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-themed-muted" /> {c.provider}
                                        </p>
                                    </div>

                                    <p className="text-xs text-themed-muted line-clamp-3 leading-relaxed min-h-[50px] italic">
                                        {c.description || 'Description pédagogique en cours de rédaction par les services de la Direction des Ressources Humaines.'}
                                    </p>

                                    <div className="flex items-center gap-4 text-[10px] font-black text-themed-muted uppercase font-mono tracking-tighter">
                                        <span className="flex items-center gap-1.5 p-1.5 bg-themed-hover rounded-lg"><Clock size={12} className="text-blue-400" /> {c.duration}</span>
                                        <span className="flex items-center gap-1.5 p-1.5 bg-themed-hover rounded-lg"><Zap size={12} className="text-amber-400" /> {c.modality || 'Hybride'}</span>
                                    </div>
                                </div>

                                <div className="p-5 bg-themed-hover/40 border-t border-themed/50 flex items-center justify-between mt-auto group-hover:bg-themed-hover/60 transition-colors">
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-bold text-themed-muted uppercase tracking-widest">{c.cost > 0 ? 'Budget Estimé' : 'Sourcing'}</p>
                                        <p className="text-base font-black text-tpgs-emerald">{c.cost > 0 ? `${(c.cost / 1000).toFixed(0)}k FCFA` : 'GRATUIT'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-3 rounded-xl bg-themed-card border border-themed text-themed-muted hover:text-themed transition-all shadow-sm">
                                            <Share2 size={16} />
                                        </button>
                                        {c.isFree && isOp ? (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleStartFree(c); }}
                                                className="px-5 py-3 rounded-xl bg-tpgs-emerald text-white shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 font-black text-xs"
                                            >
                                                <PlayCircle size={18} /> GO
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleQuickRequest(c); }}
                                                className="px-5 py-3 rounded-xl bg-themed-card border-2 border-tpgs-emerald/30 text-themed font-black text-xs hover:bg-tpgs-emerald hover:text-white hover:border-tpgs-emerald transition-all shadow-sm active:scale-95"
                                            >
                                                DEMANDER
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </section>
            </AnimatePresence>

            {filtered.length === 0 && (
                <div className="card p-32 text-center animate-fade-in border-dashed border-4 border-themed">
                    <div className="w-20 h-20 bg-themed-hover rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={40} className="text-themed-muted opacity-30" />
                    </div>
                    <h3 className="font-heading font-black text-2xl text-themed mb-2">Aucun titre disponible</h3>
                    <p className="text-sm text-themed-muted max-w-sm mx-auto">Nous n'avons trouvé aucune formation correspondant à "{search}". Essayez des termes comme "Audit", "Fiscalité" ou "Gestion".</p>
                </div>
            )}
        </div>
    );
}
