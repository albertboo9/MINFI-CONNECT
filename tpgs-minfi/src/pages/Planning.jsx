import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { planN1, catalogue } from '../data/mock.js';
import {
    DollarSign, Users, Calendar, BookOpen, TrendingUp,
    Download, FileText, Filter, Search, ChevronRight,
    MoreVertical, Edit3, Trash2, CheckCircle, Clock
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';
import Modal from '../components/ui/Modal.jsx';

const STATUS_CFG = {
    engaged: { label: 'Engagée', badge: 'badge-emerald', icon: CheckCircle },
    planned: { label: 'Planifiée', badge: 'badge-blue', icon: Clock },
    pending: { label: 'En attente', badge: 'badge-gold', icon: Clock },
};

const CAT_CFG = {
    job: { label: 'Métier', badge: 'badge-emerald' },
    transversal: { label: 'Transversale', badge: 'badge-blue' },
    specific: { label: 'Spécifique', badge: 'badge-gold' },
    executive: { label: 'Executive', badge: 'badge-purple' },
};

/* ── Entry Detail Modal ─────────────────────────────── */
function EntryDetail({ entry, open, onClose }) {
    if (!entry) return null;
    const cat = CAT_CFG[entry.category] || {};
    const st = STATUS_CFG[entry.status] || {};

    return (
        <Modal open={open} onClose={onClose} title={entry.title} subtitle={`Réf: PLN-${entry.id.toUpperCase()}`} size="md">
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    <span className={clsx('badge', cat.badge)}>{cat.label}</span>
                    <span className={clsx('badge', st.badge)}>{st.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="card p-4">
                        <p className="section-label mb-1">Direction Bénéficiaire</p>
                        <p className="text-sm font-bold text-themed">{entry.direction}</p>
                    </div>
                    <div className="card p-4">
                        <p className="section-label mb-1">Nombre d'agents</p>
                        <div className="flex items-center gap-2">
                            <Users size={16} className="text-blue-400" />
                            <p className="text-xl font-black text-themed">{entry.beneficiaries}</p>
                        </div>
                    </div>
                </div>

                <div className="card p-5 border-tpgs-emerald/20 bg-tpgs-emerald/5">
                    <div className="flex justify-between items-center mb-4">
                        <p className="section-label">Estimation Budgétaire</p>
                        <DollarSign size={16} className="text-tpgs-emerald" />
                    </div>
                    <p className="text-3xl font-black text-tpgs-emerald">
                        {entry.cost > 0 ? `${(entry.cost).toLocaleString()} FCFA` : 'Coût Interne'}
                    </p>
                </div>

                <div>
                    <p className="section-label mb-2">Période d'exécution</p>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-themed-hover text-sm font-mono text-themed-muted">
                        <Calendar size={16} /> {entry.period}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default function Planning() {
    const { t } = useTranslation();
    const { playClick, playSuccess } = useSound();
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [year, setYear] = useState(2026);
    const { budget, entries } = planN1;
    const budgetPct = Math.round((budget.allocated / budget.total) * 100);

    const handleExport = (format) => {
        playClick();
        toast.info(`Préparation de l'export ${format}...`, { title: 'Exportation', duration: 2000 });
        setTimeout(() => {
            playSuccess();
            toast.success(`Le fichier ${format} a été généré avec succès.`, { title: 'Export terminé ✓' });
        }, 2500);
    };

    return (
        <div className="space-y-8">
            <EntryDetail entry={selectedEntry} open={!!selectedEntry} onClose={() => setSelectedEntry(null)} />

            {/* Header */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="font-heading font-black text-3xl text-themed">Plan de Développement des Compétences</h1>
                        <select
                            value={year} onChange={e => setYear(Number(e.target.value))}
                            className="bg-themed-hover border border-themed text-[10px] font-bold px-2 py-1 rounded-lg outline-none cursor-pointer"
                        >
                            <option value={2026}>ANNEE 2026 (N+1)</option>
                            <option value={2025}>ANNEE 2025 (N)</option>
                        </select>
                    </div>
                    <p className="text-sm text-themed-muted">Pilotage stratégique du Plan de Formation du MINFI</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => handleExport('EXCEL')} className="btn-ghost text-xs group">
                        <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Excel
                    </button>
                    <button onClick={() => handleExport('PDF')} className="btn-ghost text-xs group">
                        <FileText size={14} className="group-hover:scale-110 transition-transform" /> Rapport PDF
                    </button>
                </div>
            </section>

            {/* Budget Overview */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 bg-gradient-to-br from-themed-card to-themed-hover">
                    <p className="section-label mb-2">Budget Total Alloué</p>
                    <p className="text-3xl font-black text-themed">{(budget.total / 1000000).toFixed(1)}M <span className="text-xs font-mono text-themed-muted">FCFA</span></p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-tpgs-emerald bg-tpgs-emerald/10 w-fit px-2 py-1 rounded">
                        <TrendingUp size={12} /> +12% vs 2025
                    </div>
                </div>
                <div className="card p-6 border-tpgs-emerald/20">
                    <div className="flex justify-between items-center mb-2">
                        <p className="section-label">Taux d'engagement</p>
                        <span className="text-lg font-black text-tpgs-emerald">{budgetPct}%</span>
                    </div>
                    <div className="progress-bar h-2 mb-4"><div className="progress-fill" style={{ width: `${budgetPct}%` }} /></div>
                    <p className="text-[10px] text-themed-muted">{(budget.allocated / 1000000).toFixed(1)}M FCFA engagés sur {entries.length} actions</p>
                </div>
                <div className="card p-6 border-amber-400/20">
                    <p className="section-label mb-2">Coût d'opportunité</p>
                    <p className="text-3xl font-black text-amber-400">18.5M <span className="text-xs font-mono text-themed-muted">FCFA</span></p>
                    <p className="text-[10px] text-themed-muted mt-2 uppercase font-bold text-amber-500/80">Economie via Training Interne</p>
                </div>
            </section>

            {/* Main Table */}
            <section className="card overflow-hidden">
                <div className="p-4 border-b border-themed flex items-center justify-between bg-themed-card">
                    <div className="flex items-center gap-4">
                        <h2 className="font-heading font-bold text-lg text-themed">Tableau de Bord du Plan</h2>
                        <div className="flex gap-1">
                            <span className="badge badge-emerald">{entries.filter(e => e.status === 'engaged').length} Engagées</span>
                            <span className="badge badge-blue">{entries.filter(e => e.status === 'planned').length} Planifiées</span>
                        </div>
                    </div>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-themed-muted" />
                        <input className="bg-themed-hover border border-themed text-[10px] pl-9 pr-4 py-2 rounded-xl outline-none focus:border-tpgs-emerald/40 transition-all w-48" placeholder="RECHERCHER..." />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="tpgs-table">
                        <thead>
                            <tr>
                                <th className="pl-6">Action de formation</th>
                                <th>Catégorie</th>
                                <th>Cible</th>
                                <th>Direction</th>
                                <th>Budget Est.</th>
                                <th>Période</th>
                                <th>Statut</th>
                                <th className="pr-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((e, i) => {
                                const cat = CAT_CFG[e.category] || {};
                                const st = STATUS_CFG[e.status] || {};
                                return (
                                    <motion.tr
                                        key={e.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => { playClick(); setSelectedEntry(e); }}
                                        className="group"
                                    >
                                        <td className="pl-6 min-w-[200px]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-themed-hover flex items-center justify-center flex-shrink-0 group-hover:bg-tpgs-emerald/10 transition-colors">
                                                    <BookOpen size={14} className="text-themed-muted group-hover:text-tpgs-emerald transition-colors" />
                                                </div>
                                                <span className="font-bold text-xs text-themed truncate">{e.title}</span>
                                            </div>
                                        </td>
                                        <td><span className={clsx('badge', cat.badge)}>{cat.label}</span></td>
                                        <td>
                                            <div className="flex items-center gap-1.5 font-mono text-themed-muted text-[10px] font-bold">
                                                <Users size={12} /> {e.beneficiaries} agents
                                            </div>
                                        </td>
                                        <td><span className="text-[10px] font-bold text-themed-muted uppercase">{e.direction}</span></td>
                                        <td>
                                            <span className="text-xs font-black text-themed whitespace-nowrap">
                                                {e.cost > 0 ? `${(e.cost / 1000).toFixed(0)}k` : <span className="text-tpgs-emerald">INTERNE</span>}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-themed-muted">
                                                <Calendar size={12} /> {e.period}
                                            </div>
                                        </td>
                                        <td><span className={clsx('badge', st.badge)}>{st.label}</span></td>
                                        <td className="pr-6 text-right">
                                            <button className="p-2 hover:bg-themed-hover rounded-xl text-themed-muted opacity-0 group-hover:opacity-100 transition-all">
                                                <ChevronRight size={14} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
