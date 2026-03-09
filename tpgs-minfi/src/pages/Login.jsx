import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, Lock, ArrowRight, Globe, Sun, Moon } from 'lucide-react';
import { useAppStore, ROLES } from '../store/index.js';

const DEMO_ROLES = [
    { role: ROLES.OPERATOR, label: 'Opérateur', labelEn: 'Operator', color: '#10B981' },
    { role: ROLES.MANAGER, label: 'Chef de Service', labelEn: 'Service Manager', color: '#3B82F6' },
    { role: ROLES.HRM, label: 'Service Formation DRH', labelEn: 'HR Training', color: '#F59E0B' },
    { role: ROLES.TECH, label: 'Service Technique', labelEn: 'Technical Service', color: '#06B6D4' },
    { role: ROLES.DIRECTOR, label: 'Direction / Pilotage', labelEn: 'Directorate', color: '#8B5CF6' },
];

export default function Login() {
    const navigate = useNavigate();
    const { setRole, isDark, toggleTheme, lang, setLang } = useAppStore();
    const [selected, setSelected] = useState(ROLES.OPERATOR);
    const [isLoading, setIsLoading] = useState(false);
    const isFr = lang === 'fr';

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setRole(selected);
        setTimeout(() => navigate('/'), 1000);
    };

    return (
        <div className="min-h-screen flex bg-tpgs-navy overflow-hidden">
            {/* Left panel — brand */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="hidden lg:flex w-1/2 flex-col justify-between p-12 bg-tpgs-slate border-r border-tpgs-border relative overflow-hidden"
            >
                {/* BG pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-tpgs-emerald/5 to-transparent" />

                {/* Logo */}
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-tpgs-emerald flex items-center justify-center shadow-glow-em">
                        <Shield size={24} className="text-white" />
                    </div>
                    <div>
                        <p className="font-heading font-black text-xl text-white leading-none">TMS · MINFI</p>
                        <p className="text-2xs text-tpgs-emerald font-bold tracking-widest uppercase mt-0.5">
                            {isFr ? 'Ministère des Finances — Cameroun' : 'Ministry of Finance — Cameroon'}
                        </p>
                    </div>
                </div>

                {/* Main text */}
                <div className="relative z-10 space-y-6">
                    <div>
                        <p className="text-2xs font-black tracking-[0.3em] uppercase text-tpgs-emerald mb-3">
                            {isFr ? 'Système de Gouvernance de la Formation' : 'Training Governance System'}
                        </p>
                        <h1 className="font-heading font-black text-5xl text-white leading-tight">
                            {isFr ? 'Piloter la montée en' : 'Drive competency'}<br />
                            <span className="text-tpgs-emerald">{isFr ? 'compétences.' : 'development.'}</span>
                        </h1>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                        {isFr
                            ? 'Planifiez, suivez et analysez les formations de vos collaborateurs dans un système unifié de gouvernance RH.'
                            : 'Plan, track, and analyze staff training in a unified HR governance system.'}
                    </p>

                    {/* Stat pills */}
                    <div className="flex gap-4 flex-wrap">
                        {[
                            { value: '847', label: isFr ? 'Agents' : 'Staff' },
                            { value: '78%', label: isFr ? 'Taux réalisation' : 'Completion rate' },
                            { value: '6', label: isFr ? 'Domaines métier' : 'Business domains' },
                        ].map(s => (
                            <div key={s.value} className="px-4 py-2 bg-tpgs-card border border-tpgs-border rounded-xl">
                                <p className="font-heading font-black text-xl text-white">{s.value}</p>
                                <p className="text-2xs text-slate-500 font-medium uppercase tracking-wider">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer text */}
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-tpgs-emerald/20 border border-tpgs-emerald/30" />
                    <p className="text-2xs text-slate-600 font-mono">V0 · Prototype Demo · Mars 2026</p>
                </div>
            </motion.div>

            {/* Right panel — login form */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex-1 flex flex-col"
            >
                {/* Top bar */}
                <div className="flex items-center justify-between px-8 py-4 border-b border-tpgs-border">
                    <div className="lg:hidden flex items-center gap-2">
                        <Shield size={18} className="text-tpgs-emerald" />
                        <span className="font-heading font-black text-sm text-white">TMS MINFI</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tpgs-card border border-tpgs-border text-slate-400 hover:text-white text-xs font-semibold transition-colors">
                            <Globe size={13} />
                            {lang === 'fr' ? 'EN' : 'FR'}
                        </button>
                        <button onClick={toggleTheme}
                            className="p-2 rounded-lg bg-tpgs-card border border-tpgs-border text-slate-400 hover:text-white transition-colors">
                            {isDark ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="flex-1 flex items-center justify-center px-8">
                    <div className="w-full max-w-md">
                        <div className="mb-10">
                            <h2 className="font-heading font-black text-3xl text-white mb-2">
                                {isFr ? 'Connexion Agent' : 'Agent Login'}
                            </h2>
                            <p className="text-slate-500 text-sm">
                                {isFr ? 'Accès réservé aux agents du MINFI' : 'Restricted to MINFI staff only'}
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Matricule */}
                            <div className="space-y-1.5">
                                <label className="text-2xs font-black tracking-[0.2em] uppercase text-slate-500">
                                    {isFr ? 'Matricule / Identifiant' : 'Badge number'}
                                </label>
                                <div className="relative">
                                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input defaultValue="125847-A" className="input pl-11" placeholder="Ex: 125847-A" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-2xs font-black tracking-[0.2em] uppercase text-slate-500">
                                    {isFr ? 'Mot de passe' : 'Password'}
                                </label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input type="password" defaultValue="••••••••" className="input pl-11" />
                                </div>
                            </div>

                            {/* Demo role selector */}
                            <div className="space-y-2">
                                <p className="text-2xs font-black tracking-[0.2em] uppercase text-tpgs-gold">
                                    🎭 {isFr ? 'Mode démo — Choisir un profil' : 'Demo mode — Select a profile'}
                                </p>
                                <div className="grid grid-cols-1 gap-2">
                                    {DEMO_ROLES.map((r) => (
                                        <button
                                            type="button"
                                            key={r.role}
                                            onClick={() => setSelected(r.role)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${selected === r.role
                                                    ? 'border-opacity-50 bg-opacity-10'
                                                    : 'border-tpgs-border hover:border-tpgs-hover bg-transparent'
                                                }`}
                                            style={selected === r.role ? { borderColor: r.color + '50', backgroundColor: r.color + '12' } : {}}
                                        >
                                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                                            <span className="text-sm font-semibold text-slate-200">
                                                {isFr ? r.label : r.labelEn}
                                            </span>
                                            {selected === r.role && (
                                                <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: r.color }}>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={isLoading} className="btn-primary w-full py-4 text-sm">
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>{isFr ? 'Accéder au système' : 'Access system'}</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-2xs text-slate-600 font-mono">
                            {isFr
                                ? 'Toute tentative d\'accès non autorisée est enregistrée et journalisée.'
                                : 'All unauthorized access attempts are recorded and logged.'}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
