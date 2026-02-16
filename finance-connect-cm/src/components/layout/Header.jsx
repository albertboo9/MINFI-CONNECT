import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, GraduationCap, Video, ShieldQuestion, Search, Star, X, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const navItems = [
    { label: 'ACCUEIL', path: '/', icon: Home },
    { label: "POINT D'INFORMATION", path: '/info-point', icon: Video },
    { label: 'OUTILS & DOCS', path: '/outils', icon: GraduationCap },
    { label: 'SERVICES', path: '/e-services', icon: ShieldQuestion },
    { label: 'INSTITUTION', path: '/institution', icon: LayoutGrid },
];

export default function Header() {
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-0 h-screen bg-minfi-blue/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center px-6"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-12 right-12 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X size={24} className="text-white" />
                        </button>
                        <div className="w-full max-w-3xl space-y-8 text-center">
                            <h2 className="text-4xl font-heading font-black text-white italic">Que recherchez-vous ?</h2>
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-minfi-emerald" size={24} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Tapez votre recherche (ex: impôts, douane, budget...)"
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-3xl py-6 pl-16 pr-8 text-xl text-white outline-none focus:border-minfi-emerald transition-all"
                                />
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['Loi de finances', 'Paiement impôts', 'Télédéclaration', 'Concours Trésor'].map(tag => (
                                    <button key={tag} className="px-5 py-2 bg-white/5 rounded-full text-[10px] font-black tracking-widest text-white/40 hover:text-minfi-emerald hover:bg-minfi-emerald/10 transition-all uppercase">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Official Top Bar with Flag Stripes */}
            <div className="h-1.5 w-full flex">
                <div className="flex-1 bg-[#007A5E]" /> {/* Green */}
                <div className="flex-1 bg-[#CE1126] flex items-center justify-center relative"> {/* Red */}
                    <Star size={8} className="text-[#FCD116] fill-current absolute" />
                </div>
                <div className="flex-1 bg-[#FCD116]" /> {/* Yellow */}
            </div>

            <div className="bg-neutral-900/90 backdrop-blur-md border-b border-white/5 py-1.5 px-6 text-[8px] md:text-[9px] flex justify-between items-center text-white/50 tracking-[0.3em] font-black uppercase">
                <div className="flex items-center space-x-3">
                    <img src="flag-emblem.png" alt="cmr" className="w-5 h-5" />
                    <span>RÉPUBLIQUE DU CAMEROUN</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Paix — Travail — Patrie</span>
                </div>
                <div className="hidden md:block">
                    Ministère des Finances — FINANCE-CONNECT CM
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="glass-card px-8 py-3 flex items-center justify-between shadow-2xl shadow-black/50 border-white/10">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden p-1.5">
                            <img src="/MINFI_LOGO.png" alt="MINFI Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-black text-xl tracking-tighter leading-none group-hover:text-minfi-emerald transition-colors italic uppercase">MINFI</span>
                            <span className="text-[8px] text-minfi-emerald font-black tracking-[0.3em] uppercase">Connect Cameroun</span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            if (item.isExternal) {
                                return (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="relative py-2 flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] text-white/40 hover:text-white transition-all duration-300"
                                    >
                                        <item.icon size={14} className="text-white/20" />
                                        <span>{item.label}</span>
                                    </a>
                                );
                            }
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        "relative py-2 flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] transition-all duration-300",
                                        isActive ? "text-minfi-emerald" : "text-white/40 hover:text-white"
                                    )}
                                >
                                    <item.icon size={14} className={isActive ? "text-minfi-emerald" : "text-white/20"} />
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-minfi-emerald rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Search & Actions */}
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center space-x-2 text-white/30 hover:text-white transition-colors"
                        >
                            <Search size={16} />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Rechercher</span>
                        </button>

                        <Link
                            to="/login"
                            className="px-6 py-2.5 bg-minfi-emerald/10 border border-minfi-emerald/20 text-minfi-emerald rounded-xl text-[9px] font-black tracking-widest hover:bg-minfi-emerald hover:text-white transition-all uppercase"
                        >
                            Espace Agent
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
