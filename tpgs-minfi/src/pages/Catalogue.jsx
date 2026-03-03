import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { catalogue as initialCatalogue } from '../data/mock.js';
import {
    Search, BookOpen, Clock, DollarSign, ExternalLink,
    Filter, Star, Globe, Shield, Zap, Send, FileText,
    ChevronRight, PlayCircle, Info, Target, Users, Plus, CheckCircle2
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
                    {course.isFree && <span className="badge badge-emerald">Gratuité totale</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card p-4 flex items-center gap-3">
                        <Clock size={18} className="text-themed-muted" />
                        <div>
                            <p className="section-label mb-0.5">Durée</p>
                            <p className="text-sm font-bold text-themed">{course.duration}</p>
                        </div>
                    </div>
                    <div className="card p-4 flex items-center gap-3">
                        <Globe size={18} className="text-themed-muted" />
                        <div>
                            <p className="section-label mb-0.5">Modalité</p>
                            <p className="text-sm font-bold text-themed capitalize">{course.modality || 'Mixte'}</p>
                        </div>
                    </div>
                    <div className="card p-4 flex items-center gap-3 border-tpgs-emerald/20">
                        <DollarSign size={18} className="text-tpgs-emerald" />
                        <div>
                            <p className="section-label mb-0.5">Coût</p>
                            <p className="text-sm font-black text-tpgs-emerald">{course.cost > 0 ? `${course.cost.toLocaleString()} FCFA` : 'Sourcing Interne'}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-heading font-black text-lg text-themed">Objectifs pédagogiques</h3>
                    <p className="text-sm text-themed-muted leading-relaxed">{course.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="space-y-3">
                            <p className="section-label flex items-center gap-2"><Target size={12} /> Compétences visées</p>
                            <ul className="space-y-2">
                                {['Maîtrise opérationnelle', 'Expertise métier', 'Leadership'].map(i => (
                                    <li key={i} className="text-xs text-themed flex items-center gap-2">
                                        <CheckCircle2 size={12} className="text-tpgs-emerald" /> {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <p className="section-label flex items-center gap-2"><Users size={12} /> Public cible</p>
                            <p className="text-xs text-themed-muted leading-relaxed">Agents et cadres de la Direction concernée par le référentiel métier.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default function Catalogue() {
    const { activeRole } = useAppStore();
    const { playClick, playSuccess, playNotify } = useSound();
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [addMode, setAddMode] = useState(false);
    const [courses, setCourses] = useState(initialCatalogue);

    const isTech = activeRole === ROLES.TECH;
    const isOp = activeRole === ROLES.OPERATOR;

    const filtered = courses.filter(c =>
        (catFilter === 'all' || c.category === catFilter) &&
        (c.title.toLowerCase().includes(search.toLowerCase()) || c.provider.toLowerCase().includes(search.toLowerCase()))
    );

    const handleQuickRequest = (course) => {
        playSuccess();
        toast.success(`Demande pour "${course.title}" initiée`, { title: 'Soumission Rapide ✓', duration: 3000 });
    };

    const handleStartFree = (course) => {
        playNotify();
        toast.success(`Formation "${course.title}" démarrée !`, { title: 'Inscription instantanée 🚀', duration: 4000 });
    };

    const handleAddCourse = (data) => {
        const newC = { ...data, id: `c${Date.now()}`, modality: 'blended', cost: data.isFree ? 0 : 75000 };
        setCourses([newC, ...courses]);
    };

    return (
        <div className="space-y-8">
            <CourseModal course={selectedCourse} open={!!selectedCourse} onClose={() => setSelectedCourse(null)} onShowRequest={handleQuickRequest} onStartFree={handleStartFree} isOp={isOp} />
            <AddTrainingModal open={addMode} onClose={() => setAddMode(false)} onAdd={handleAddCourse} />

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-themed">
                <div>
                    <h1 className="font-heading font-black text-3xl text-themed">Catalogue de Formations</h1>
                    <p className="text-sm mt-1 text-themed-muted">Exploration et gestion du référentiel pédagogique</p>
                </div>
                <div className="flex gap-2">
                    {isTech && (
                        <button onClick={() => setAddMode(true)} className="btn-primary">
                            <Plus size={16} /> Référencer une formation
                        </button>
                    )}
                    <button className="btn-ghost text-xs"><Shield size={14} /> Prestataires agréés</button>
                </div>
            </section>

            {/* Search & Filters */}
            <section className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-themed-muted" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="input pl-12 h-12 text-base font-medium"
                        placeholder="Rechercher une compétence, un titre..."
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {['all', 'job', 'transversal', 'specific', 'executive'].map(f => (
                        <button
                            key={f} onClick={() => { playClick(); setCatFilter(f); }}
                            className={clsx(
                                'px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border',
                                catFilter === f ? 'bg-tpgs-emerald text-white border-tpgs-emerald shadow-lg' : 'bg-themed-card text-themed-muted border-themed hover:border-themed-muted'
                            )}
                        >
                            {f === 'all' ? 'TOUTES' : CAT_THEMES[f]?.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((c, i) => {
                        const theme = CAT_THEMES[c.category] || CAT_THEMES.job;
                        return (
                            <motion.div
                                key={c.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, delay: i * 0.03 }}
                                className="card group hover:border-tpgs-emerald/30 transition-all cursor-pointer flex flex-col h-full"
                                onClick={() => setSelectedCourse(c)}
                            >
                                <div className="p-6 flex-1 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className={clsx('badge', theme.badge)}>{theme.label}</span>
                                        {c.isFree && <span className="badge badge-emerald py-0.5 px-2 text-[9px]">OFFERT</span>}
                                    </div>

                                    <h3 className="font-bold text-lg text-themed group-hover:text-tpgs-emerald transition-colors leading-tight">
                                        {c.title}
                                    </h3>

                                    <p className="text-xs text-themed-muted line-clamp-2 leading-relaxed">
                                        {c.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-[10px] font-bold text-themed-muted uppercase font-mono">
                                        <span className="flex items-center gap-1.5"><Clock size={12} /> {c.duration}</span>
                                        <span className="flex items-center gap-1.5"><Globe size={12} /> {c.modality || 'Hybride'}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-themed-hover/30 border-t border-themed flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <p className="text-[9px] font-bold text-themed-muted uppercase">{c.provider}</p>
                                        <p className="text-sm font-black text-tpgs-emerald">{c.cost > 0 ? `${(c.cost / 1000).toFixed(0)}k FCFA` : 'GRATUIT'}</p>
                                    </div>
                                    {c.isFree && isOp ? (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleStartFree(c); }}
                                            className="p-3 rounded-xl bg-tpgs-emerald text-white shadow-lg hover:brightness-110 transition-all"
                                            title="Démarrer maintenant"
                                        >
                                            <PlayCircle size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleQuickRequest(c); }}
                                            className="p-3 rounded-xl bg-themed-card border border-themed text-themed hover:bg-tpgs-emerald hover:text-white hover:border-tpgs-emerald transition-all shadow-sm"
                                            title="Demande rapide"
                                        >
                                            <Send size={16} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </section>
            </AnimatePresence>

            {filtered.length === 0 && (
                <div className="card p-32 text-center animate-fade-in">
                    <BookOpen size={48} className="text-themed-muted mx-auto mb-4 opacity-10" />
                    <h3 className="font-heading font-bold text-themed mb-2">Aucun titre disponible</h3>
                    <p className="text-sm text-themed-muted">Désolé, aucune formation ne correspond à vos critères actuels.</p>
                </div>
            )}
        </div>
    );
}
