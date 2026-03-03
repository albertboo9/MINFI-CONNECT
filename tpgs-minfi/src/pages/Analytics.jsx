import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { comparisonData, budgetComparisonData, categoryDistribution } from '../data/mock.js';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'];

export default function Analytics() {
    const { t } = useTranslation();
    return (
        <div>
            <div className="mb-8">
                <h1 className="font-heading font-black text-3xl text-white">{t('common.analytics')}</h1>
                <p className="text-slate-500 text-sm mt-1">Comparaison N / N-1 — Rappport analytique 2025-2026</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Formations N vs N-1 */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                    <h3 className="font-heading font-bold text-white mb-1">Formations réalisées N vs N-1</h3>
                    <p className="text-2xs text-slate-500 mb-5">Par trimestre</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={comparisonData} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1E3048" />
                            <XAxis dataKey="quarter" tick={{ fill: '#64748b', fontSize: 11 }} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                            <Tooltip contentStyle={{ background: '#162032', border: '1px solid #1E3048', borderRadius: '10px', fontSize: '12px' }} />
                            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
                            <Bar dataKey="nMinus1" name="N-1 (2025)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="n" name="N (2026)" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Category distribution */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
                    <h3 className="font-heading font-bold text-white mb-1">Répartition par catégorie</h3>
                    <p className="text-2xs text-slate-500 mb-5">Plan N+1 2026</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                                {categoryDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#162032', border: '1px solid #1E3048', borderRadius: '10px', fontSize: '12px' }} />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Budget by direction */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
                <h3 className="font-heading font-bold text-white mb-1">Budget formation par direction — N vs N-1</h3>
                <p className="text-2xs text-slate-500 mb-5">En FCFA</p>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={budgetComparisonData} layout="vertical" barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E3048" horizontal={false} />
                        <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                        <YAxis dataKey="label" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={145} />
                        <Tooltip contentStyle={{ background: '#162032', border: '1px solid #1E3048', borderRadius: '10px', fontSize: '12px' }}
                            formatter={(v) => [`${(v / 1000).toFixed(0)}k FCFA`]} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="nMinus1" name="N-1 (2025)" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="n" name="N (2026)" fill="#10B981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
