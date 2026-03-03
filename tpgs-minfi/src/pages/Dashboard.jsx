import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAppStore, ROLES } from '../store/index.js';
import {
    TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
    Clock, Award, BookOpen, Target, Users, DollarSign, BarChart3,
    ArrowRight, Bell
} from 'lucide-react';
import { globalKPIs, systemAlerts, myTrainings, teamMembers, planN1, completionTrendData } from '../data/mock.js';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { clsx } from 'clsx';

/* ── Shared Components ─────────────────────────────── */
function StatCard({ icon: Icon, label, value, sub, trend, color = 'emerald', delay = 0 }) {
    const colorMap = {
        emerald: 'text-tpgs-emerald bg-tpgs-emerald/10',
        gold: 'text-tpgs-gold bg-tpgs-gold/10',
        blue: 'text-tpgs-blue bg-tpgs-blue/10',
        red: 'text-tpgs-red bg-tpgs-red/10',
        purple: 'text-tpgs-purple bg-tpgs-purple/10',
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="stat-card"
        >
            <div className="flex items-start justify-between">
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', colorMap[color])}>
                    <Icon size={18} />
                </div>
                {trend !== undefined && (
                    <div className={clsx('flex items-center gap-1 text-xs font-semibold',
                        trend >= 0 ? 'text-tpgs-emerald' : 'text-tpgs-red')}>
                        {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-2xs font-black tracking-wider uppercase text-slate-500 mb-1">{label}</p>
                <p className="font-heading font-black text-3xl text-white leading-none">{value}</p>
                {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
            </div>
        </motion.div>
    );
}

function AlertItem({ alert }) {
    const icons = { warning: AlertTriangle, danger: AlertTriangle, info: Bell, success: CheckCircle2 };
    const colors = {
        warning: 'text-tpgs-gold bg-tpgs-gold/10 border-tpgs-gold/20',
        danger: 'text-tpgs-red bg-tpgs-red/10 border-tpgs-red/20',
        info: 'text-tpgs-blue bg-tpgs-blue/10 border-tpgs-blue/20',
        success: 'text-tpgs-emerald bg-tpgs-emerald/10 border-tpgs-emerald/20',
    };
    const Icon = icons[alert.type];
    return (
        <div className={clsx('flex items-start gap-3 p-3.5 rounded-xl border', colors[alert.type])}>
            <Icon size={15} className="flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium leading-snug">{alert.message}</p>
                <p className="text-2xs mt-1 opacity-60 font-mono">{alert.date}</p>
            </div>
        </div>
    );
}

function SectionHeader({ title, action, actionLabel }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-base text-white">{title}</h2>
            {action && (
                <button onClick={action} className="flex items-center gap-1.5 text-xs text-tpgs-emerald hover:text-white transition-colors font-semibold">
                    Voir tout <ArrowRight size={12} />
                </button>
            )}
        </div>
    );
}

/* ── OPERATOR Dashboard ─────────────────────────────── */
function OperatorDashboard({ t }) {
    const inProgress = myTrainings.filter(t => t.status === 'inProgress');
    const validated = myTrainings.filter(t => t.status === 'validated');

    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={BookOpen} label={t('metrics.trainingsPlanned')} value="3" sub="Cette année" color="blue" delay={0} />
                <StatCard icon={CheckCircle2} label={t('metrics.trainingsDone')} value="1" sub="Validée" trend={0} color="emerald" delay={0.05} />
                <StatCard icon={Award} label={t('metrics.certObtained')} value="2" sub="Total carrière" color="gold" delay={0.1} />
                <StatCard icon={Clock} label="Heures investies" value="34h" sub="Trimestre en cours" color="purple" delay={0.15} />
            </div>

            {/* In progress */}
            <div>
                <SectionHeader title="Formations en cours" />
                <div className="space-y-3">
                    {inProgress.map((tr) => (
                        <motion.div key={tr.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="card p-5 hover:border-tpgs-hover transition-all cursor-pointer group">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={clsx('badge', tr.modality === 'elearning' ? 'badge-blue' : 'badge-gold')}>
                                            {tr.modality === 'elearning' ? 'E-learning' : 'Présentiel'}
                                        </span>
                                        <span className="badge badge-slate">{tr.category}</span>
                                        {tr.pausesUsed > 0 && <span className="badge badge-gold">⏸ {tr.pausesUsed}/3 pauses</span>}
                                    </div>
                                    <h3 className="font-semibold text-white text-sm group-hover:text-tpgs-emerald transition-colors">{tr.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1 font-mono">{tr.provider}</p>
                                </div>
                                <span className="text-xs font-black text-tpgs-emerald font-mono">{tr.progress}%</span>
                            </div>
                            <div className="progress-bar">
                                <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${tr.progress}%` }} transition={{ duration: 1, delay: 0.2 }} />
                            </div>
                            <div className="flex justify-between mt-2 text-2xs text-slate-600 font-mono">
                                <span>Début: {tr.startDate}</span>
                                <span>Fin estimée: {tr.endDate}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Alerts */}
            <div>
                <SectionHeader title="Mes alertes" />
                <div className="space-y-2">
                    <AlertItem alert={{ type: 'warning', message: "Rapport hebdomadaire non soumis — Anglais Professionnel", date: '2026-03-01' }} />
                    <AlertItem alert={{ type: 'info', message: "Votre demande 'Excel Avancé' a été approuvée par votre chef de service", date: '2026-02-28' }} />
                </div>
            </div>
        </div>
    );
}

/* ── MANAGER Dashboard ──────────────────────────────── */
function ManagerDashboard({ t }) {
    const atRisk = teamMembers.filter(m => m.status === 'at_risk');
    const avgScore = Math.round(teamMembers.reduce((a, m) => a + m.score, 0) / teamMembers.length);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Agents dans l'équipe" value={teamMembers.length} color="blue" delay={0} />
                <StatCard icon={Target} label={t('metrics.avgScore')} value={`${avgScore}/100`} trend={5} color="emerald" delay={0.05} />
                <StatCard icon={AlertTriangle} label="Agents en risque" value={atRisk.length} color="red" delay={0.1} />
                <StatCard icon={Clock} label={t('metrics.pendingRequests')} value="3" color="gold" delay={0.15} />
            </div>

            {/* Team overview */}
            <div>
                <SectionHeader title="Aperçu de l'équipe" />
                <div className="card overflow-hidden">
                    <table className="tpgs-table">
                        <thead><tr>
                            <th>Agent</th>
                            <th>Score N</th>
                            <th>Score N-1</th>
                            <th>Formations</th>
                            <th>Statut</th>
                        </tr></thead>
                        <tbody>
                            {teamMembers.map((m) => (
                                <tr key={m.id} className="cursor-pointer">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-tpgs-emerald/20 to-tpgs-blue/20 flex items-center justify-center text-xs font-bold text-white">
                                                {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{m.name}</p>
                                                <p className="text-2xs text-slate-500 font-mono">{m.matricule}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={clsx('font-heading font-black', m.score >= 80 ? 'text-tpgs-emerald' : m.score >= 65 ? 'text-tpgs-gold' : 'text-tpgs-red')}>
                                            {m.score}
                                        </span>
                                    </td>
                                    <td><span className="font-mono text-slate-400">{m.scoreN1}</span></td>
                                    <td>
                                        <span className="badge badge-emerald">{m.trainingsCompleted} fait{m.trainingsCompleted > 1 ? 'es' : ''}</span>
                                    </td>
                                    <td>
                                        {m.status === 'top' && <span className="badge badge-emerald">⭐ Top</span>}
                                        {m.status === 'active' && <span className="badge badge-slate">Actif</span>}
                                        {m.status === 'at_risk' && <span className="badge badge-red">⚠ À risque</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Alerts */}
            <div>
                <SectionHeader title="Alertes équipe" />
                <div className="space-y-2">
                    {systemAlerts.filter(a => a.role === 'manager').map(a => <AlertItem key={a.id} alert={a} />)}
                </div>
            </div>
        </div>
    );
}

/* ── HRM Dashboard ──────────────────────────────────── */
function HRMDashboard({ t }) {
    const { budget } = planN1;
    const budgetPct = Math.round((budget.allocated / budget.total) * 100);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={BookOpen} label="Formations engagées N" value={planN1.entries.filter(e => e.status === 'engaged').length} trend={8} color="emerald" delay={0} />
                <StatCard icon={DollarSign} label="Budget alloué" value={`${(budget.allocated / 1000000).toFixed(1)}M`} sub={`/ ${(budget.total / 1000000).toFixed(0)}M FCFA`} color="gold" delay={0.05} />
                <StatCard icon={AlertTriangle} label={t('metrics.alerts')} value="14" color="red" delay={0.1} />
                <StatCard icon={Users} label="Bénéficiaires planifiés" value="195" trend={22} color="blue" delay={0.15} />
            </div>

            {/* Budget progress */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-heading font-bold text-white">Budget Plan N — 2026</h3>
                        <p className="text-xs text-slate-500">Consommation {(budget.spent / 1000000).toFixed(1)}M / {(budget.total / 1000000).toFixed(0)}M FCFA</p>
                    </div>
                    <span className="font-heading font-black text-2xl text-tpgs-emerald">{budgetPct}%</span>
                </div>
                <div className="progress-bar h-3 mb-2">
                    <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${budgetPct}%` }} transition={{ duration: 1.2 }} />
                </div>
                <div className="flex justify-between text-2xs text-slate-600 font-mono">
                    <span>Alloué: {(budget.allocated / 1000000).toFixed(1)}M FCFA</span>
                    <span>Reste: {((budget.total - budget.allocated) / 1000000).toFixed(1)}M FCFA</span>
                </div>
            </div>

            {/* Completion trend chart */}
            <div className="card p-6">
                <SectionHeader title="Évolution taux de réalisation (6 mois)" />
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={completionTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E3048" />
                        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 11 }} unit="%" domain={[50, 100]} />
                        <Tooltip
                            contentStyle={{ background: '#162032', border: '1px solid #1E3048', borderRadius: '12px', fontSize: '12px' }}
                            labelStyle={{ color: '#94a3b8' }}
                            itemStyle={{ color: '#10B981' }}
                        />
                        <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Alerts */}
            <div>
                <SectionHeader title="Alertes critiques" />
                <div className="space-y-2">
                    {systemAlerts.filter(a => a.role === 'hrm').map(a => <AlertItem key={a.id} alert={a} />)}
                </div>
            </div>
        </div>
    );
}

/* ── DIRECTOR Dashboard ─────────────────────────────── */
function DirectorDashboard({ t }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard icon={Users} label="Agents MINFI" value={globalKPIs.totalStaff} color="blue" delay={0} />
                <StatCard icon={BookOpen} label="Formés" value={globalKPIs.trainedThisYear} trend={18} color="emerald" delay={0.05} />
                <StatCard icon={CheckCircle2} label="Taux réalisation" value={`${globalKPIs.completionRate}%`} trend={5} color="emerald" delay={0.1} />
                <StatCard icon={Award} label="Certifications" value={globalKPIs.certObtained} trend={12} color="gold" delay={0.15} />
                <StatCard icon={DollarSign} label="Budget consommé" value={`${globalKPIs.budgetRate}%`} color="purple" delay={0.2} />
                <StatCard icon={AlertTriangle} label="Alertes actives" value={globalKPIs.alertsActive} color="red" delay={0.25} />
            </div>

            {/* Score ministry */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h3 className="font-heading font-bold text-white mb-4">Score moyen MINFI</h3>
                    <div className="flex items-end gap-6">
                        <div>
                            <p className="text-2xs text-slate-500 uppercase tracking-wider font-bold mb-1">Année N</p>
                            <p className="font-heading font-black text-5xl text-tpgs-emerald">{globalKPIs.avgScoreMinistry}</p>
                        </div>
                        <div className="text-slate-600">vs</div>
                        <div>
                            <p className="text-2xs text-slate-500 uppercase tracking-wider font-bold mb-1">N-1</p>
                            <p className="font-heading font-black text-5xl text-slate-400">{globalKPIs.avgScoreN1}</p>
                        </div>
                        <div className="flex items-center gap-1 text-tpgs-emerald text-sm font-bold mb-1 ml-auto">
                            <TrendingUp size={16} />
                            +{globalKPIs.avgScoreMinistry - globalKPIs.avgScoreN1} pts
                        </div>
                    </div>
                    <div className="progress-bar mt-6">
                        <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${globalKPIs.avgScoreMinistry}%` }} transition={{ duration: 1.2 }} />
                    </div>
                </div>

                {/* Trend */}
                <div className="card p-6">
                    <h3 className="font-heading font-bold text-white mb-4">Tendance taux de réalisation</h3>
                    <ResponsiveContainer width="100%" height={140}>
                        <LineChart data={completionTrendData}>
                            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                            <Tooltip contentStyle={{ background: '#162032', border: '1px solid #1E3048', borderRadius: '10px', fontSize: '11px' }} />
                            <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

/* ── TECH Dashboard ─────────────────────────────────── */
function TechDashboard({ t }) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={BookOpen} label="Inscriptions LMS en attente" value="8" color="gold" delay={0} />
                <StatCard icon={Award} label="Certificats à valider" value="5" color="emerald" delay={0.05} />
                <StatCard icon={AlertTriangle} label="Rapports en retard" value="3" color="red" delay={0.1} />
                <StatCard icon={CheckCircle2} label="Formations validées (mois)" value="12" trend={10} color="blue" delay={0.15} />
            </div>
            <div>
                <SectionHeader title="Alertes techniques" />
                <div className="space-y-2">
                    {systemAlerts.filter(a => a.role === 'tech').map(a => <AlertItem key={a.id} alert={a} />)}
                </div>
            </div>
        </div>
    );
}

/* ── Main Export ────────────────────────────────────── */
export default function Dashboard() {
    const { t } = useTranslation();
    const { activeRole, currentUser } = useAppStore();

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Bonjour';
        if (h < 18) return 'Bon après-midi';
        return 'Bonsoir';
    };

    return (
        <div>
            {/* Page header */}
            <div className="mb-8">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-2xs font-black tracking-[0.3em] uppercase text-tpgs-emerald mb-1">
                    {greeting()},
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="font-heading font-black text-3xl text-white leading-tight">
                    {currentUser.name}
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                    className="text-slate-500 text-sm mt-1">{currentUser.grade} · {currentUser.department}</motion.p>
            </div>

            {/* Role-adaptive content */}
            {activeRole === ROLES.OPERATOR && <OperatorDashboard t={t} />}
            {activeRole === ROLES.MANAGER && <ManagerDashboard t={t} />}
            {activeRole === ROLES.HRM && <HRMDashboard t={t} />}
            {activeRole === ROLES.TECH && <TechDashboard t={t} />}
            {activeRole === ROLES.DIRECTOR && <DirectorDashboard t={t} />}
        </div>
    );
}
