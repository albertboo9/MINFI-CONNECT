import React from 'react';
import { Play, Clock, Eye, Share2 } from 'lucide-react';
import { mockVideos, mediaCategories } from '../../data/media.mock';
import { motion } from 'framer-motion';

export default function MediaHub() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-black mb-4">
                        MÉDIATHÈQUE <span className="text-minfi-emerald">MINFI TV</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-2xl">
                        Décryptages, tutoriels et interviews exclusives pour tout comprendre sur les finances publiques du Cameroun.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {mediaCategories.map((cat, i) => (
                        <button
                            key={cat}
                            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest border transition-all duration-300 ${i === 0
                                    ? 'bg-minfi-emerald border-minfi-emerald text-white'
                                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30'
                                }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockVideos.map((video, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={video.id}
                            className="group cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden glass-card mb-4 border border-white/5">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                                />
                                <div className="absolute inset-0 bg-minfi-blue/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-minfi-emerald rounded-full flex items-center justify-center shadow-xl shadow-minfi-emerald/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <Play className="text-white ml-1 fill-current" />
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold">
                                    {video.duration}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-2">
                                <span className="text-minfi-gold font-bold text-[10px] tracking-widest uppercase">{video.category}</span>
                                <h3 className="text-lg font-heading font-bold leading-tight group-hover:text-minfi-emerald transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                                <p className="text-white/40 text-xs line-clamp-2 leading-relaxed">
                                    {video.description}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center space-x-4 pt-2 text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                                    <div className="flex items-center space-x-1">
                                        <Eye size={12} />
                                        <span>{video.views} vues</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock size={12} />
                                        <span>il y a {video.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
