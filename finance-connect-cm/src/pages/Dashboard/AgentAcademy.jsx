import React, { useState } from 'react';
import {
    BookOpen, Clock, Target, Award,
    ArrowRight, Search, Filter, PlayCircle,
    CheckCircle2, Lock, ChevronRight, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { academyTrainings } from '../../data/academy.mock';

export default function AgentAcademy() {
    const [filter, setFilter] = useState('Tous');

    return (
        <div className="min-h-screen pt-28 pb-20 px-8 bg-minfi-blue text-white overflow-hidden">
            <div className="max-w-[1600px] mx-auto space-y-12">

                {/* Dashboard Sub-Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 py-10 border-b border-white/5">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-minfi-emerald text-[10px] font-black uppercase tracking-[0.3em]">
                            <GraduationCap size={16} />
                            <span>Formation Continue & Certification</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-black italic tracking-tighter uppercase leading-none">
                            Catalogue <span className="text-minfi-emerald">Professionnel</span>
                        </h1>
                        <p className="text-white/30 text-sm font-medium italic lowercase">Développez vos compétences souveraines et validez vos acquis ministériels.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="p-1.5 bg-white/5 rounded-2xl border border-white/5 flex">
                            {['Tous', 'En cours', 'Terminés'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    className={`px-6 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${filter === item ? 'bg-minfi-emerald text-white shadow-xl' : 'text-white/40 hover:text-white'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Training List - Professional View */}
                <div className="grid grid-cols-1 gap-6">
                    {academyTrainings.map((training, i) => (
                        <motion.div
                            key={training.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card group p-6 border-white/5 hover:border-minfi-emerald/20 transition-all flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden"
                        >
                            {/* Visual Indicator */}
                            <div className="w-full lg:w-48 aspect-video rounded-2xl bg-neutral-900 shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <img src={training.image} alt={training.title} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white text-minfi-blue rounded-full shadow-2xl flex items-center justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all">
                                        <PlayCircle size={24} />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center space-x-4">
                                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest uppercase ${training.category === 'Fiscalité' ? 'bg-minfi-emerald/10 text-minfi-emerald' : 'bg-minfi-gold/10 text-minfi-gold'
                                        }`}>
                                        {training.category}
                                    </span>
                                    <div className="flex items-center space-x-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                                        <Clock size={12} />
                                        <span>{training.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                                        <BarChart3 size={12} />
                                        <span>Niveau {training.level}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl font-heading font-black italic tracking-tight group-hover:text-minfi-emerald transition-colors">{training.title}</h3>
                                    <p className="text-white/40 text-xs leading-relaxed max-w-2xl font-medium">{training.description}</p>
                                </div>
                            </div>

                            {/* Progress & Actions */}
                            <div className="w-full lg:w-72 space-y-4 pt-6 lg:pt-0 lg:pl-8 lg:border-l border-white/5">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                        <span className="text-white/30">Progression</span>
                                        <span className="text-minfi-emerald">65%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-minfi-emerald w-[65%]" />
                                    </div>
                                </div>

                                <button className="w-full py-3.5 bg-white text-minfi-blue rounded-xl font-black tracking-widest text-[10px] uppercase hover:bg-minfi-emerald hover:text-white transition-all shadow-xl flex items-center justify-center space-x-3 group/btn">
                                    <span>Reprendre le cours</span>
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Certif Badge Mockup */}
                            <div className="absolute top-4 right-4 text-white/5 group-hover:text-minfi-emerald/10 transition-colors">
                                <Award size={64} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Help */}
                <div className="pt-20 text-center space-y-6">
                    <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">Besoin d'assistance informatique ?</p>
                    <button className="px-10 py-4 border border-white/5 text-white/40 rounded-2xl text-[9px] font-black tracking-widest uppercase hover:bg-white/5 hover:text-white transition-all">Support Technique Agent</button>
                </div>
            </div>
        </div>
    );
}

function GraduationCap({ size }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
}
