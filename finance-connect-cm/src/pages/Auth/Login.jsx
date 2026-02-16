import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, User, ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate auth
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue flex items-center justify-center relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-minfi-emerald/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass-card p-10 md:p-12 space-y-10 border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-minfi-emerald/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-minfi-emerald border border-minfi-emerald/20 shadow-2xl">
                            <ShieldCheck size={40} />
                        </div>
                        <h1 className="text-3xl font-heading font-black text-white italic">PORTAIL AGENT</h1>
                        <p className="text-white/30 text-xs font-bold tracking-widest uppercase">Ministère des Finances — Cameroun</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Matricule / Identifiant</label>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-minfi-emerald transition-colors" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Ex: 123456-X"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-minfi-emerald transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Mot de passe</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-minfi-emerald transition-colors" size={18} />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-minfi-emerald transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-minfi-emerald focus:ring-minfi-emerald" />
                                <span className="text-[10px] font-bold text-white/30 group-hover:text-white transition-colors uppercase tracking-widest">Rester connecté</span>
                            </label>
                            <button type="button" className="text-[10px] font-black text-minfi-gold hover:text-white transition-colors uppercase tracking-widest">Oublié ?</button>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full py-5 bg-white text-minfi-blue rounded-2xl font-black tracking-[0.2em] text-[10px] uppercase hover:bg-minfi-emerald hover:text-white transition-all shadow-2xl flex items-center justify-center space-x-3 group"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-minfi-blue border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>SE CONNECTER</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-8 border-t border-white/5 text-center">
                        <p className="text-[9px] font-bold text-white/20 leading-relaxed uppercase tracking-widest">
                            Accès restreint aux agents du MINFI.<br />
                            Toute tentative de connexion non autorisée est enregistrée.
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 flex items-center space-x-2 text-white/30 hover:text-white transition-colors mx-auto"
                >
                    <ChevronRight size={16} className="rotate-180" />
                    <span className="text-[10px] font-black tracking-widest uppercase">Retour au portail public</span>
                </button>
            </motion.div>
        </div>
    );
}
