import React, { useState } from 'react';
import { Play, Clock, Eye, Share2, Film } from 'lucide-react';
import { mockVideos, mediaCategories } from '../../data/media.mock';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaHub() {
    const [activeCategory, setActiveCategory] = useState('Tous');

    const filteredVideos = activeCategory === 'Tous'
        ? mockVideos
        : mockVideos.filter(v => v.category === activeCategory);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16 space-y-6">
                    <div className="flex items-center space-x-3 text-[10px] font-black tracking-[0.4em] text-minfi-gold uppercase">
                        <div className="h-[1px] w-8 bg-minfi-gold opacity-30" />
                        <span>MINFI TV & RESSOURCES</span>
                        <div className="h-[1px] w-8 bg-minfi-gold opacity-30" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight">
                        L'ACTUALITÉ <br />
                        <span className="text-gradient font-accent text-4xl md:text-6xl lowercase italic">en image et en direct.</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-2xl leading-relaxed">
                        Décryptages, tutoriels et interviews exclusives pour tout comprendre sur les finances publiques du Cameroun.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {mediaCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest border transition-all duration-500 uppercase ${activeCategory === cat
                                ? 'bg-minfi-emerald border-minfi-emerald text-white shadow-xl shadow-minfi-emerald/20 scale-105'
                                : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30'
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
                        {filteredVideos.map((video, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                key={video.id}
                                className="group cursor-pointer space-y-6"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video rounded-[32px] overflow-hidden glass-card border border-white/5 shadow-2xl">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-minfi-blue to-transparent opacity-60" />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="w-20 h-20 bg-white text-minfi-blue rounded-full flex items-center justify-center shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <Play className="ml-1 fill-current" size={28} />
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-6 left-6 flex space-x-2">
                                        <div className="px-3 py-1 bg-minfi-emerald/20 backdrop-blur-md rounded-full text-[8px] font-black text-minfi-emerald tracking-widest uppercase border border-minfi-emerald/30">
                                            {video.category}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-black text-white tracking-widest">
                                        {video.duration}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="space-y-3 px-2">
                                    <h3 className="text-xl font-heading font-black leading-tight group-hover:text-minfi-emerald transition-colors line-clamp-2 italic">
                                        {video.title}
                                    </h3>
                                    <p className="text-white/30 text-[12px] line-clamp-2 leading-relaxed font-medium">
                                        {video.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center space-x-6 pt-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] border-t border-white/5">
                                        <div className="flex items-center space-x-2">
                                            <Eye size={14} className="text-minfi-emerald" />
                                            <span>{video.views} vues</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock size={14} className="text-minfi-gold" />
                                            <span>il y a {video.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Load More / Featured */}
                <div className="mt-32 glass-card p-12 border-minfi-gold/20 relative overflow-hidden flex flex-col items-center text-center space-y-8">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-minfi-gold/5 rounded-full blur-[80px]" />
                    <Film size={48} className="text-minfi-gold animate-pulse" />
                    <div className="space-y-2">
                        <h2 className="text-3xl font-heading font-black">Besoin d'un tutoriel spécifique ?</h2>
                        <p className="text-white/30 text-sm max-w-xl">Consultez notre base de connaissances complète ou contactez notre équipe média pour des demandes d'archives.</p>
                    </div>
                    <button className="px-10 py-5 bg-white text-minfi-blue rounded-2xl font-black tracking-widest text-[10px] uppercase shadow-2xl hover:bg-minfi-gold hover:text-white transition-all">Accéder aux archives</button>
                </div>
            </div>
        </div>
    );
}
