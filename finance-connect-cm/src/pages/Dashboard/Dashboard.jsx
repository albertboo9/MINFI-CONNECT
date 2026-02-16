import React, { useState } from 'react';
import {
    LayoutDashboard, UserCircle, Settings, GraduationCap,
    Bell, FileText, ChevronRight, ArrowUpRight,
    Target, Award, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue overflow-hidden text-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

                {/* Fixed Sidebar for Dashboard */}
                <aside className="lg:w-72 space-y-8">
                    <div className="glass-card p-8 border-white/5 space-y-8">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-minfi-emerald to-minfi-blue p-1 shadow-2xl">
                                <div className="w-full h-full rounded-[22px] bg-neutral-900 flex items-center justify-center overflow-hidden">
                                    <UserCircle size={48} className="text-white/20" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-heading font-black text-xl uppercase tracking-tighter italic">Agent Matricule</h3>
                                <p className="text-minfi-emerald text-[10px] font-black tracking-[0.2em] uppercase">Connecté • Service Central</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <DashboardNavLink icon={LayoutDashboard} label="Vue d'ensemble" active />
                            <DashboardNavLink icon={GraduationCap} label="Mes Formations" to="/agent-academy" />
                            <DashboardNavLink icon={FileText} label="Mes Documents" />
                            <DashboardNavLink icon={Bell} label="Notifications" badge="3" />
                            <DashboardNavLink icon={Settings} label="Paramètres" />
                        </nav>
                    </div>

                    <div className="glass-card p-6 border-white/5 bg-minfi-gold/5 space-y-4">
                        <h4 className="text-[10px] font-black text-minfi-gold uppercase tracking-widest">Alerte Prochain Examen</h4>
                        <p className="text-xs text-white/40 leading-relaxed font-medium">Certification Fiscalité II prévue pour le <span className="text-white">24 Mars 2024</span>.</p>
                        <button className="w-full py-3 bg-minfi-gold text-white rounded-xl text-[9px] font-black tracking-widest uppercase shadow-xl hover:scale-105 transition-all">Consulter</button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 space-y-12">
                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-heading font-black uppercase italic tracking-tight">Espace <span className="text-minfi-emerald">Agent</span></h2>
                            <p className="text-white/30 text-sm font-medium uppercase tracking-widest italic">Ravive du lundi — 24 Février 2025</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 glass-card border-white/10 text-[9px] font-black tracking-widest uppercase hover:bg-white/5">Signaler un Problème</button>
                            <Link to="/agent-academy" className="px-6 py-3 bg-minfi-emerald text-white rounded-xl text-[9px] font-black tracking-widest uppercase shadow-2xl shadow-minfi-emerald/20">Explorer les Formations</Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard icon={Target} label="Formations suivies" value="04" color="emerald" sub="Sur 08 recommandées" />
                        <StatCard icon={Award} label="Score Global" value="88%" color="gold" sub="Top 15% des agents" />
                        <StatCard icon={Clock} label="Heures de formation" value="124h" color="white" sub="Semestre en cours" />
                    </div>

                    {/* Resume Learning Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-heading font-black uppercase italic tracking-widest">En cours de lecture</h4>
                            <Link to="/agent-academy" className="text-[9px] font-black text-minfi-emerald hover:text-white transition-colors uppercase tracking-widest flex items-center space-x-2">
                                <span>Voir tout</span>
                                <ChevronRight size={12} />
                            </Link>
                        </div>

                        <div className="glass-card p-8 border-white/5 flex flex-col md:flex-row items-center gap-10 hover:border-minfi-emerald/20 transition-all group">
                            <div className="w-full md:w-64 aspect-video rounded-2xl bg-neutral-900 relative overflow-hidden flex items-center justify-center p-4">
                                <img src="/academy_taxation_digital_1771263315962.png" className="w-full h-full object-cover opacity-50 absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700" alt="course" />
                                <div className="relative z-10 w-12 h-12 bg-white text-minfi-blue rounded-full shadow-2xl flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-current border-b-[6px] border-b-transparent ml-1" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center space-x-3">
                                    <span className="px-2 py-0.5 bg-minfi-emerald/20 text-minfi-emerald text-[8px] font-black tracking-widest rounded-md uppercase">Avancé</span>
                                    <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest italic">Module 3 / 8</span>
                                </div>
                                <h3 className="text-2xl font-heading font-black italic tracking-tight group-hover:text-minfi-emerald transition-colors lowercase">Optimisation Fiscale Appliquée aux PME</h3>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '65%' }}
                                        className="h-full bg-minfi-emerald"
                                    />
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-white/40">Progression : 65%</span>
                                    <span className="text-minfi-emerald">Reprendre</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function DashboardNavLink({ icon: Icon, label, active, to, badge }) {
    const content = (
        <div className={`flex items-center justify-between p-4 rounded-2xl transition-all ${active
                ? 'bg-minfi-emerald text-white shadow-xl shadow-minfi-emerald/20 translate-x-1'
                : 'text-white/30 hover:text-white hover:bg-white/5'
            }`}>
            <div className="flex items-center space-x-4">
                <Icon size={18} className={active ? 'text-white' : 'text-white/20'} />
                <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
            </div>
            {badge && (
                <span className="px-1.5 py-0.5 bg-minfi-emerald text-white text-[8px] font-black rounded-md">{badge}</span>
            )}
        </div>
    );

    if (to) return <Link to={to}>{content}</Link>;
    return content;
}

function StatCard({ icon: Icon, label, value, color, sub }) {
    const colorClass = color === 'emerald' ? 'text-minfi-emerald' : color === 'gold' ? 'text-minfi-gold' : 'text-white';
    const bgClass = color === 'emerald' ? 'bg-minfi-emerald/5' : color === 'gold' ? 'bg-minfi-gold/5' : 'bg-white/5';

    return (
        <div className="glass-card p-8 border-white/5 space-y-6 group hover:border-white/10 transition-all">
            <div className={`w-12 h-12 ${bgClass} rounded-2xl flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <div className="space-y-1">
                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{label}</h4>
                <div className="text-4xl font-heading font-black tracking-tighter italic">{value}</div>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
            </div>
        </div>
    );
}
