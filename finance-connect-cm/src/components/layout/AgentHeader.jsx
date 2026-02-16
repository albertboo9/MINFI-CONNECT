import React from 'react';
import {
    Search, Bell, UserCircle, LogOut,
    Menu, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AgentHeader({ pageTitle }) {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-minfi-blue/80 backdrop-blur-2xl border-b border-white/5 py-4 px-8">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                {/* Brand / Context */}
                <div className="flex items-center space-x-6">
                    <Link to="/dashboard" className="flex items-center space-x-3 group">
                        <img src="/MINFI_LOGO.png" className="h-10 w-auto group-hover:scale-110 transition-transform" alt="MINFI" />
                        <div className="hidden md:block">
                            <h2 className="text-white font-heading font-black text-sm tracking-tight leading-none italic uppercase">
                                MINFI<span className="text-minfi-emerald">CONNECT</span>
                            </h2>
                            <p className="text-[8px] font-black text-white/30 tracking-[0.3em] uppercase mt-1">Plateforme Agent</p>
                        </div>
                    </Link>

                    <div className="h-6 w-[1px] bg-white/10 hidden md:block" />

                    <h1 className="text-minfi-emerald font-heading font-black text-lg md:text-xl uppercase italic tracking-tighter">
                        {pageTitle || "Tableau de Bord"}
                    </h1>
                </div>

                {/* Dashboard Search */}
                <div className="hidden lg:flex flex-1 max-w-xl mx-12">
                    <div className="relative w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-minfi-emerald transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Rechercher une formation, un agent ou un document..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-xs text-white outline-none focus:border-minfi-emerald focus:bg-white/10 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Account & Actions */}
                <div className="flex items-center space-x-6">
                    <button className="relative group">
                        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:bg-minfi-emerald/20 group-hover:text-minfi-emerald transition-all text-white/40">
                            <Bell size={18} />
                        </div>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-minfi-emerald rounded-full border-2 border-minfi-blue" />
                    </button>

                    <div className="flex items-center space-x-4 pl-6 border-l border-white/10">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-white uppercase tracking-tight">Agent Matricule</p>
                            <p className="text-[8px] font-bold text-minfi-emerald uppercase tracking-widest mt-0.5">Service Central</p>
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                            title="Se déconnecter"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
