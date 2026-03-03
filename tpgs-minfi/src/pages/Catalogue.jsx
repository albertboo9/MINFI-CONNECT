import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { catalogue } from '../data/mock.js';
import { Search, BookOpen, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

const CAT = {
    job: { label: 'Métier', badge: 'badge-emerald' },
    transversal: { label: 'Transversale', badge: 'badge-blue' },
    specific: { label: 'Spécifique', badge: 'badge-gold' },
    executive: { label: 'Executive', badge: 'badge-slate' },
};
const MOD = {
    elearning: { label: 'E-learning', badge: 'badge-blue' },
    classroom: { label: 'Présentiel', badge: 'badge-gold' },
    blended: { label: 'Blended', badge: 'badge-slate' },
};

export default function Catalogue() {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('all');

    const cats = ['all', 'job', 'transversal', 'specific', 'executive'];
    const filtered = catalogue.filter(c =>
        (catFilter === 'all' || c.category === catFilter) &&
        (c.title.toLowerCase().includes(search.toLowerCase()) || c.provider.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl text-white">{t('nav.sourcing')}</h1>
                <p className="text-slate-500 text-sm mt-1">{catalogue.length} formations disponibles</p>
            </div>

            {/* Search + filter */}
            <div className="flex gap-4 mb-6 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input value={search} onChange={e => setSearch(e.target.value)} className="input pl-11" placeholder={t('common.search')} />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {cats.map(c => (
                        <button key={c} onClick={() => setCatFilter(c)}
                            className={clsx('px-3 py-2 rounded-xl text-xs font-semibold transition-all',
                                catFilter === c ? 'bg-tpgs-emerald text-white' : 'bg-tpgs-card border border-tpgs-border text-slate-400 hover:text-white')}>
                            {c === 'all' ? 'Toutes' : CAT[c]?.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="card p-6 hover:border-tpgs-hover transition-all cursor-pointer group">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex gap-2 flex-wrap">
                                <span className={clsx('badge', CAT[c.category]?.badge)}>{CAT[c.category]?.label}</span>
                                <span className={clsx('badge', MOD[c.modality]?.badge)}>{MOD[c.modality]?.label}</span>
                            </div>
                            <ExternalLink size={14} className="text-slate-600 group-hover:text-tpgs-emerald transition-colors flex-shrink-0" />
                        </div>
                        <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-tpgs-emerald transition-colors leading-snug">{c.title}</h3>
                        <p className="text-xs text-slate-500 mb-3 leading-relaxed">{c.description}</p>
                        <div className="flex items-center gap-4 text-2xs text-slate-500 font-mono">
                            <span className="flex items-center gap-1"><Clock size={11} /> {c.duration}</span>
                            <span className="flex items-center gap-1">
                                <DollarSign size={11} />
                                {c.cost > 0 ? `${c.cost.toLocaleString()} FCFA /agent` : <span className="text-tpgs-emerald font-bold">Gratuit</span>}
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-tpgs-border text-2xs text-slate-600 flex justify-between">
                            <span>{c.provider}</span>
                            <span className="text-tpgs-gold">{c.certification}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
