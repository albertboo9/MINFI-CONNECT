import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    TrendingUp, Users, BookOpen, Award, AlertTriangle, CheckCircle2,
    Calendar, ArrowUpRight, DollarSign, Clock, LayoutDashboard,
    Target, Zap, Bell, FileText, Plus, Search, HelpCircle, Database,
    UserCheck, ShieldCheck
} from 'lucide-react';
import { useAppStore, ROLES } from '../store/index.js';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

/* ── Mock Data Extension ──────────────────────────────── */
const DASHBOARD_ALERTS = [
    { id: 'da1', type: 'critical', msg: 'Budget DR des Douanes épuisé à 102%', date: 'Il y a 10m', roles: [ROLES.HRM, ROLES.DIRECTOR] },
    { id: 'da2', type: 'warning', msg: '12 évaluations annuelles en retard (DSI)', date: 'Il y a 1h', roles: [ROLES.MANAGER, ROLES.HRM] },
    { id: 'da3', type: 'info', msg: 'Nouvelle formation "Cyber-sécurité" disponible', date: 'Aujourd\'hui', roles: [ROLES.OPERATOR, ROLES.MANAGER] },
];

const RECENT_ACTIVITY = [
    { id: 'act1', user: 'Clarisse Ngo', action: 'a approuvé la demande de', target: 'Armand Mballa', time: '14:05', type: 'approve' },
    { id: 'act2', user: 'Roger Essomba', action: 'a publié le plan de formation', target: 'N+1 v2', time: '11:20', type: 'publish' },
    { id: 'act3', user: 'System', action: 'Génération automatique du rapport', target: 'Audit Mensuel', time: '09:00', type: 'system' },
];

const TEAM_REQUESTS = [
    { id: 'tr1', user: 'Jean-Luc Balla', training: 'Audit Financier Avancé', date: 'Hier', priority: 'High' },
    { id: 'tr2', user: 'Sophie Nkoa', training: 'Management Lean', date: 'Ce matin', priority: 'Medium' },
];

const TEAM_TRAININGS = [
    { id: 'tt1', user: 'Marc Etoga', training: 'Cyber-sécurité', status: 65, lastActive: 'Aujourd\'hui' },
    { id: 'tt2', user: 'Cécile Atangana', training: 'Droit OHADA', status: 42, lastActive: 'Hier' },
];

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#F43F5E', '#8B5CF6'];

/* ── Components ───────────────────────────────────────── */

const StatCard = ({ label, value, trend, icon: Icon, color = 'emerald' }) => {
    const colorMap = {
        emerald: 'text-tpgs-emerald bg-tpgs-emerald/10 border-tpgs-emerald/20',
        blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        gold: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        red: 'text-red-400 bg-red-400/10 border-red-400/20',
        purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-5 group hover:border-tpgs-emerald/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
                    <Icon size={20} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${trend > 0 ? 'text-tpgs-emerald' : 'text-red-400'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                        <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
                    </div>
                )}
            </div>
            <p className="section-label mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="font-heading font-black text-2xl" style={{ color: 'var(--text-primary)' }}>{value}</h3>
            </div>
        </motion.div>
    );
};

export default function Dashboard() {
    const { t } = useTranslation();
    const { activeRole, currentUser, toggleNotifPanel } = useAppStore();
    const { playClick, playNotify } = useSound();

    const handleQuickAction = (action) => {
        playClick();
        toast.info(`Action: ${action}`, { title: 'Accès rapide', duration: 3000 });
    };

    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Bonjour";
        if (hour < 18) return "Bon après-midi";
        return "Bonsoir";
    };

    // Roles filters for components
    const isManager = activeRole === ROLES.MANAGER;
    const isHRM = activeRole === ROLES.HRM;
    const isTech = activeRole === ROLES.TECH;
    const isOp = activeRole === ROLES.OPERATOR;

    return (
        <div className="space-y-8 pb-10">
            {/* ── Header ───────────────────────────────────── */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="animate-slide-up">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="badge badge-emerald bg-tpgs-emerald/10 text-tpgs-emerald px-3 py-1">2026 · SESSION ACTIVE</span>
                        <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>v0.9.1-enhanced</span>
                    </div>
                    <h1 className="font-heading font-black text-4xl" style={{ color: 'var(--text-primary)' }}>
                        {getTimeGreeting()}, {currentUser.name.split(' ')[0]}
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {isManager ? "Voici le récapitulatif de votre service." : isTech ? "État de santé de la plateforme TPGS." : "Votre parcours de formation aujourd'hui."}
                    </p>
                </div>

                <div className="flex gap-2">
                    {isTech && (
                        <button onClick={() => handleQuickAction('Logs Backend')} className="btn-primary text-xs">
                            <ShieldCheck size={14} /> Audit Sécurité
                        </button>
                    )}
                    <button onClick={() => handleQuickAction('Export Dashboard')} className="btn-ghost text-xs">
                        <FileText size={14} /> Export PDF
                    </button>
                </div>
            </section>

            {/* ── Key Indicators ───────────────────────────── */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {isOp && (
                    <>
                        <StatCard label="Formations suivies" value="12" trend={8} icon={BookOpen} color="emerald" />
                        <StatCard label="Certifications" value="03" trend={20} icon={Award} color="gold" />
                        <StatCard label="Heures d'apprentissage" value="45h" trend={12} icon={Clock} color="blue" />
                        <StatCard label="Score moyen" value="88/100" trend={-2} icon={Target} color="purple" />
                    </>
                )}
                {(isManager || isHRM) && (
                    <>
                        <StatCard label="Effectif total" value="1,248" trend={2} icon={Users} color="blue" />
                        <StatCard label="Budget consommé" value="74.2M" trend={15} icon={DollarSign} color="emerald" />
                        <StatCard label="Demandes en attente" value="18" trend={-5} icon={Bell} color="gold" />
                        <StatCard label="Risque performance" value="12%" trend={24} icon={AlertTriangle} color="red" />
                    </>
                )}
                {isTech && (
                    <>
                        <StatCard label="Serveurs LMS" value="Opérationnel" icon={Zap} color="emerald" />
                        <StatCard label="Utilisateurs actifs" value="452" trend={14} icon={Users} color="blue" />
                        <StatCard label="SLA Plateforme" value="99.9%" trend={0.1} icon={CheckCircle2} color="emerald" />
                        <StatCard label="Stockage média" value="1.2 TB" icon={Database} color="purple" />
                    </>
                )}
                {activeRole === ROLES.DIRECTOR && (
                    <>
                        <StatCard label="Progression Plan" value="68%" trend={10} icon={TrendingUp} color="emerald" />
                        <StatCard label="Coût moyen / agent" value="84k" trend={-5} icon={DollarSign} color="blue" />
                        <StatCard label="Satisfaction" value="4.2/5" trend={3} icon={Target} color="gold" />
                        <StatCard label="Alertes Budget" value="02" trend={100} icon={AlertTriangle} color="red" />
                    </>
                )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Main content (Chart or Lists) ─────────────────────────────── */}
                <div className="lg:col-span-2 space-y-6">
                    {(isManager || isHRM) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Team Requests List */}
                            <div className="card overflow-hidden h-fit">
                                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                                    <h3 className="section-label">Demandes à valider</h3>
                                    <button className="text-[10px] font-bold text-tpgs-emerald">GERER</button>
                                </div>
                                {TEAM_REQUESTS.map(req => (
                                    <div key={req.id} className="p-4 border-b last:border-0 hover:bg-themed-hover transition-colors cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-xs font-bold text-themed">{req.user}</p>
                                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${req.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                {req.priority.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-themed-muted leading-tight">{req.training}</p>
                                        <p className="text-[9px] text-themed-muted font-mono mt-2">{req.date}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Team Progress List */}
                            <div className="card overflow-hidden h-fit">
                                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                                    <h3 className="section-label">Suivi des formations (Equipe)</h3>
                                    <button className="text-[10px] font-bold text-tpgs-emerald">DETAIL</button>
                                </div>
                                {TEAM_TRAININGS.map(tr => (
                                    <div key={tr.id} className="p-4 border-b last:border-0 hover:bg-themed-hover transition-colors" style={{ borderColor: 'var(--border)' }}>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs font-bold text-themed">{tr.user}</p>
                                            <span className="text-[10px] font-black text-tpgs-emerald">{tr.status}%</span>
                                        </div>
                                        <p className="text-[11px] text-themed-muted mb-3 truncate">{tr.training}</p>
                                        <div className="progress-bar h-1.5"><div className="progress-fill" style={{ width: `${tr.status}%` }} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-heading font-black text-lg" style={{ color: 'var(--text-primary)' }}>Participation aux formations</h3>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Moyenne mensuelle par rapport à l'année N-1</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] uppercase font-bold" style={{ borderColor: 'var(--border)' }}>
                                        <div className="w-2 h-2 rounded-full bg-tpgs-emerald" /> N (2026)
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] uppercase font-bold" style={{ borderColor: 'var(--border)' }}>
                                        <div className="w-2 h-2 rounded-full bg-blue-400" /> N-1 (2025)
                                    </div>
                                </div>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[
                                        { m: 'Jan', n: 45, p: 38 }, { m: 'Fév', n: 52, p: 48 }, { m: 'Mar', n: 68, p: 55 },
                                        { m: 'Avr', n: 61, p: 52 }, { m: 'Mai', n: 72, p: 58 }, { m: 'Juin', n: 85, p: 62 },
                                    ]}>
                                        <defs>
                                            <linearGradient id="colorN" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                                        <YAxis hide />
                                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '12px', fontSize: '10px' }} />
                                        <Area type="monotone" dataKey="n" stroke="#10B981" fillOpacity={1} fill="url(#colorN)" strokeWidth={3} />
                                        <Area type="monotone" dataKey="p" stroke="#3B82F6" fillOpacity={1} fill="url(#colorP)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Bottom Grid Actions/Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card p-6">
                            <h3 className="section-label mb-4">Accès Rapide</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => toggleNotifPanel()} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-themed-hover border-themed hover:border-tpgs-emerald/40 transition-all group">
                                    <Bell size={20} className="text-tpgs-emerald mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Alertes</span>
                                </button>
                                <button onClick={() => handleQuickAction('New Request')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-themed-hover border-themed hover:border-tpgs-emerald/40 transition-all group">
                                    <Plus size={20} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Demande</span>
                                </button>
                                {isTech ? (
                                    <button onClick={() => handleQuickAction('Add Training')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-themed-hover border-themed hover:border-tpgs-emerald/40 transition-all group">
                                        <Database size={20} className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Catalogue+</span>
                                    </button>
                                ) : (
                                    <button onClick={() => handleQuickAction('Catalog')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-themed-hover border-themed hover:border-tpgs-emerald/40 transition-all group">
                                        <Search size={20} className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Catalogue</span>
                                    </button>
                                )}
                                <button onClick={() => handleQuickAction('Support')} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-themed-hover border-themed hover:border-tpgs-emerald/40 transition-all group">
                                    <HelpCircle size={20} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Support</span>
                                </button>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h3 className="section-label mb-4">Focus Compétences</h3>
                            <div className="h-[140px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={[
                                            { name: 'Technique', value: 45 }, { name: 'Comport.', value: 30 }, { name: 'Transv.', value: 25 },
                                        ]} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                                            {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-2 space-y-1.5">
                                <div className="flex items-center justify-between text-[10px]">
                                    <span style={{ color: 'var(--text-muted)' }}>Technique</span>
                                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>45%</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px]">
                                    <span style={{ color: 'var(--text-muted)' }}>Comportemental</span>
                                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>30%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Sidebar ────────────────────────── */}
                <div className="space-y-6">
                    <div className="card overflow-hidden">
                        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                            <h3 className="section-label">Mes Alertes</h3>
                            <button onClick={() => toggleNotifPanel()} className="text-[10px] font-bold text-tpgs-emerald">VOIR TOUT</button>
                        </div>
                        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                            {DASHBOARD_ALERTS.filter(a => !a.roles || a.roles.includes(activeRole)).map((alert) => (
                                <div key={alert.id} className="p-4 flex gap-3 hover:bg-themed-hover transition-colors cursor-pointer" onClick={() => { playNotify(); toggleNotifPanel(); }}>
                                    <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${alert.type === 'critical' ? 'bg-red-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : alert.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                                    <div>
                                        <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text-primary)' }}>{alert.msg}</p>
                                        <p className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-faint)' }}>{alert.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="section-label mb-6">Fil d'activité</h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-themed-hover" />
                            {RECENT_ACTIVITY.map((act) => (
                                <div key={act.id} className="relative pl-6 flex flex-col">
                                    <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-themed flex-shrink-0 ${act.type === 'approve' ? 'border-tpgs-emerald' : act.type === 'publish' ? 'border-blue-400' : 'border-purple-400'}`} />
                                    <p className="text-xs leading-none" style={{ color: 'var(--text-primary)' }}>
                                        <span className="font-black">{act.user}</span> {act.action}
                                    </p>
                                    <p className="text-xs font-semibold mt-1" style={{ color: 'var(--text-muted)' }}>{act.target}</p>
                                    <p className="text-[10px] font-mono mt-1.5 uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>{act.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
