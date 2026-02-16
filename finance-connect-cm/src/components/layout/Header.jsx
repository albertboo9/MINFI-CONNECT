import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, GraduationCap, Video, ShieldQuestion, Search, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const navItems = [
    { label: 'INSTITUTION', path: '/institution', icon: LayoutGrid },
    { label: 'ACADÉMIE', path: '/academie', icon: GraduationCap },
    { label: 'MÉDIATHÈQUE', path: '/mediatheque', icon: Video },
    { label: 'E-SERVICES', path: '/e-services', icon: ShieldQuestion },
];

export default function Header() {
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 w-full z-50">
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
                        <div className="w-12 h-12 bg-gradient-to-br from-minfi-emerald to-minfi-gold rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <span className="text-white font-black text-2xl tracking-tighter">M</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-black text-lg tracking-tighter leading-none group-hover:text-minfi-emerald transition-colors">MINFI</span>
                            <span className="text-[8px] text-minfi-emerald font-black tracking-[0.3em] uppercase">Connect Cameroun</span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
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
                        <button className="hidden lg:flex items-center space-x-2 text-white/30 hover:text-white transition-colors">
                            <Search size={16} />
                            <span className="text-[10px] font-bold tracking-widest">RECHERCHER</span>
                        </button>
                        <Link
                            to="/login"
                            className="px-6 py-2 bg-white text-minfi-blue hover:bg-minfi-emerald hover:text-white transition-all duration-300 text-[10px] font-black rounded-lg tracking-[0.2em] uppercase shadow-xl shadow-white/10"
                        >
                            Portail Agent
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
