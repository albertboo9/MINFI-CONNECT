import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { planN1 } from '../data/mock.js';
import { DollarSign, Users, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

const STATUS_CFG = {
    engaged: { label: 'Engagée', badge: 'badge-emerald' },
    planned: { label: 'Planifiée', badge: 'badge-blue' },
    pending: { label: 'En attente', badge: 'badge-gold' },
};

const CAT_CFG = {
    job: { label: 'Métier', badge: 'badge-emerald' },
    transversal: { label: 'Transversale', badge: 'badge-blue' },
    specific: { label: 'Spécifique', badge: 'badge-gold' },
    executive: { label: 'Executive', badge: 'badge-slate', cls: 'text-tpgs-purple' },
};

export default function Planning() {
    const { t } = useTranslation();
    const { budget, entries, year } = planN1;
    const budgetPct = Math.round((budget.allocated / budget.total) * 100);

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl text-white">{t('nav.planN1')} — {year}</h1>
                <p className="text-slate-500 text-sm mt-1">Plan de formation annuel MINFI</p>
            </div>

            {/* Budget overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card p-5">
                    <p className="section-label mb-2">Budget total</p>
                    <p className="font-heading font-black text-2xl text-white">{(budget.total / 1000000).toFixed(0)}M <span className="text-sm text-slate-500">FCFA</span></p>
                </div>
                <div className="card p-5">
                    <p className="section-label mb-2">Alloué</p>
                    <p className="font-heading font-black text-2xl text-tpgs-emerald">{(budget.allocated / 1000000).toFixed(1)}M <span className="text-sm text-slate-500">FCFA</span></p>
                    <p className="text-xs text-slate-500 mt-1">{budgetPct}% du budget total</p>
                </div>
                <div className="card p-5">
                    <p className="section-label mb-2">Consommé</p>
                    <p className="font-heading font-black text-2xl text-tpgs-gold">{(budget.spent / 1000000).toFixed(1)}M <span className="text-sm text-slate-500">FCFA</span></p>
                    <p className="text-xs text-slate-500 mt-1">{Math.round((budget.spent / budget.allocated) * 100)}% de l'alloué</p>
                </div>
            </div>

            {/* Budget bar */}
            <div className="card p-5 mb-8">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-white">Taux d'allocation</p>
                    <span className="font-heading font-black text-xl text-tpgs-emerald">{budgetPct}%</span>
                </div>
                <div className="progress-bar h-3">
                    <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${budgetPct}%` }} transition={{ duration: 1.2 }} />
                </div>
            </div>

            {/* Plan entries */}
            <div className="card overflow-hidden">
                <div className="p-4 border-b border-tpgs-border flex items-center justify-between">
                    <h2 className="font-heading font-bold text-white">Entrées du plan</h2>
                    <span className="badge badge-blue">{entries.length} formations</span>
                </div>
                <table className="tpgs-table">
                    <thead><tr>
                        <th>Formation</th>
                        <th>Catégorie</th>
                        <th>Direction</th>
                        <th>Bénéficiaires</th>
                        <th>Coût total</th>
                        <th>Période</th>
                        <th>Statut</th>
                    </tr></thead>
                    <tbody>
                        {entries.map((e, i) => {
                            const cat = CAT_CFG[e.category] || {};
                            const st = STATUS_CFG[e.status] || {};
                            return (
                                <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <BookOpen size={13} className="text-slate-500 flex-shrink-0" />
                                            <span className="font-medium text-white text-xs leading-snug max-w-[200px] truncate">{e.title}</span>
                                        </div>
                                    </td>
                                    <td><span className={clsx('badge', cat.badge)}>{cat.label}</span></td>
                                    <td><span className="text-xs text-slate-400">{e.direction}</span></td>
                                    <td>
                                        <div className="flex items-center gap-1.5">
                                            <Users size={12} className="text-slate-500" />
                                            <span className="font-mono text-sm">{e.beneficiaries}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="font-mono text-xs">
                                            {e.cost > 0 ? `${(e.cost / 1000).toFixed(0)}k` : <span className="text-tpgs-emerald">Gratuit</span>}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-slate-500" />
                                            <span className="text-xs text-slate-400">{e.period}</span>
                                        </div>
                                    </td>
                                    <td><span className={clsx('badge', st.badge)}>{st.label}</span></td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
