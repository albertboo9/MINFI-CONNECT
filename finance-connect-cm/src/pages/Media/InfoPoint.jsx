import React, { useState } from 'react';
import { Play, Clock, Eye, Film, Search, ArrowRight, Share2, MessageSquare } from 'lucide-react';
import { infoVideos, infoCategories } from '../../data/info.mock';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function InfoPoint() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVideos = infoVideos.filter(v => {
        const matchesCategory = activeCategory === 'Tous' || v.category === activeCategory;
        const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue overflow-hidden text-white">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="space-y-6 max-w-3xl">
                        <div className="flex items-center space-x-3 text-minfi-emerald text-[10px] font-black tracking-[0.4em] uppercase">
                            <div className="h-[1px] w-8 bg-minfi-emerald opacity-30" />
                            <span>Guide Citoyen & Réponses</span>
                            <div className="h-[1px] w-8 bg-minfi-emerald opacity-30" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight">
                            POINT <br />
                            <span className="text-gradient font-accent text-4xl md:text-6xl lowercase italic">d'information interactive.</span>
                        </h1>
                        <p className="text-white/40 text-lg leading-relaxed">
                            Nous répondons à vos questions en images. Trouvez les tutoriels et explications nécessaires pour maîtriser vos démarches financières.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative group w-full sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-minfi-emerald" size={16} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Une question ? Tapez ici..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-xs outline-none focus:border-minfi-emerald transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex flex-wrap gap-3 pb-4 border-b border-white/5">
                    {infoCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${activeCategory === cat
                                    ? 'bg-minfi-emerald text-white shadow-xl shadow-minfi-emerald/20'
                                    : 'bg-white/5 text-white/30 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredVideos.map((video, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                key={video.id}
                                onClick={() => navigate(`/video/${video.id}`)}
                                className="group cursor-pointer space-y-6"
                            >
                                <div className="relative aspect-video rounded-[32px] overflow-hidden glass-card border border-white/5 bg-neutral-900">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-minfi-blue via-transparent to-transparent opacity-60" />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white text-minfi-blue rounded-full flex items-center justify-center shadow-2xl scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                                            <Play className="ml-1 fill-current" size={24} />
                                        </div>
                                    </div>

                                    <div className="absolute top-6 left-6">
                                        <span className="px-3 py-1 bg-minfi-emerald/20 backdrop-blur-md border border-minfi-emerald/30 text-[8px] font-black text-minfi-emerald rounded-full uppercase tracking-widest">
                                            {video.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 right-6 text-[9px] font-black bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                                        {video.duration}
                                    </div>
                                </div>

                                <div className="space-y-4 px-2">
                                    <h3 className="text-xl font-heading font-black leading-tight group-hover:text-minfi-emerald transition-colors tracking-tight italic">
                                        {video.title}
                                    </h3>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center space-x-4 text-[9px] font-black text-white/20 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1">
                                                <Eye size={12} className="text-minfi-emerald" />
                                                <span>{video.views} vues</span>
                                            </div>
                                            <span>•</span>
                                            <span>il y a {video.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-minfi-gold group-hover:translate-x-1 transition-transform">
                                            <span className="text-[9px] font-black uppercase tracking-widest">Lire la vidéo</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredVideos.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/10">
                            <Search size={32} />
                        </div>
                        <p className="text-white/30 font-medium uppercase tracking-widest">Aucun résultat pour votre recherche.</p>
                        <button onClick={() => setSearchQuery('')} className="text-minfi-emerald font-black text-[10px] uppercase tracking-widest decoration-minfi-emerald underline underline-offset-4">Réinitialiser</button>
                    </div>
                )}

                {/* Citizen Help CTA */}
                <div className="glass-card p-12 md:p-16 border-white/10 bg-gradient-to-br from-minfi-gold/10 to-transparent relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-minfi-gold/5 rounded-full blur-[120px]" />
                    <div className="w-24 h-24 bg-minfi-gold text-white rounded-3xl flex items-center justify-center shadow-2xl rotate-3 shrink-0">
                        <MessageSquare size={48} />
                    </div>
                    <div className="space-y-4 flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-heading font-black italic">Une question spécifique ? Nos experts vous répondent.</h2>
                        <p className="text-white/40 text-lg max-w-xl">Si vous ne trouvez pas la réponse dans nos vidéos, utilisez notre chat interactif ou envoyez-nous une demande d'explication.</p>
                    </div>
                    <button className="px-10 py-5 bg-white text-minfi-blue rounded-2xl font-black tracking-widest text-[10px] uppercase shadow-2xl hover:bg-minfi-gold hover:text-white transition-all whitespace-nowrap">Poser ma question</button>
                </div>
            </div>
        </div>
    );
}
