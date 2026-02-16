import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Share2,
    ThumbsUp, Eye, Clock,
    Bookmark, Flag, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { infoVideos } from '../../data/info.mock';

export default function VideoPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const video = infoVideos.find(v => v.id === id) || infoVideos[0];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue text-white overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Back Button & Nav */}
                <button
                    onClick={() => navigate('/info-point')}
                    className="flex items-center space-x-3 text-white/40 hover:text-white transition-colors group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black tracking-widest uppercase">Retour au point d'information</span>
                </button>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Video Area */}
                    <div className="flex-1 space-y-8">
                        {/* Player Placeholder */}
                        <div className="relative aspect-video rounded-[40px] overflow-hidden glass-card border-2 border-white/10 bg-neutral-900 group shadow-2xl">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-white text-minfi-blue rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-current border-b-[10px] border-b-transparent ml-2" />
                                </div>
                            </div>

                            {/* Player Bar Overlay (Visual only) */}
                            <div className="absolute bottom-8 left-8 right-8 flex items-center space-x-6 px-6 py-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5">
                                <div className="w-2 h-2 rounded-full bg-minfi-emerald" />
                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-1/3 h-full bg-minfi-emerald shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                                <span className="text-[10px] font-black tracking-widest">01:45 / {video.duration}</span>
                            </div>
                        </div>

                        {/* Video Info */}
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="space-y-4">
                                    <span className="px-3 py-1 bg-minfi-emerald/10 text-minfi-emerald text-[9px] font-black tracking-[0.2em] rounded-full uppercase border border-minfi-emerald/20">
                                        {video.category}
                                    </span>
                                    <h1 className="text-3xl md:text-5xl font-heading font-black italic tracking-tight leading-tight uppercase">
                                        {video.title}
                                    </h1>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <ActionButton icon={ThumbsUp} label="Like" />
                                    <ActionButton icon={Share2} label="Partager" />
                                    <ActionButton icon={Bookmark} label="Sauver" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-8 py-6 border-y border-white/5">
                                <div className="flex items-center space-x-2">
                                    <Eye size={16} className="text-minfi-emerald" />
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{video.views} vues</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock size={16} className="text-minfi-gold" />
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">il y a {video.date}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">À propos de cette vidéo</h4>
                                <p className="text-white/50 text-lg leading-relaxed max-w-4xl italic">
                                    {video.description} Cette vidéo fait partie de l'engagement du Ministère des Finances pour une plus grande transparence et inclusion financière de tous les citoyens camerounais.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Recommendations */}
                    <div className="lg:w-96 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Vidéos suggérées</h3>
                        </div>

                        <div className="space-y-6">
                            {infoVideos.filter(v => v.id !== id).slice(0, 4).map((rec) => (
                                <motion.div
                                    key={rec.id}
                                    onClick={() => navigate(`/video/${rec.id}`)}
                                    className="flex gap-4 group cursor-pointer"
                                >
                                    <div className="w-32 aspect-video rounded-xl overflow-hidden glass-card shrink-0 bg-neutral-900 border border-white/5">
                                        <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-heading font-black leading-tight group-hover:text-minfi-emerald transition-colors line-clamp-2 uppercase italic tracking-tight">{rec.title}</h4>
                                        <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">{rec.duration} • {rec.category}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="glass-card p-8 border-minfi-emerald/20 bg-minfi-emerald/5 space-y-6">
                            <div className="flex items-center space-x-3 text-minfi-emerald">
                                <Flag size={20} />
                                <span className="text-[10px] font-black tracking-widest uppercase">Signalement Officiel</span>
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed font-medium lowercase italic">En cas de contenu inexact ou obsolète, veuillez nous en informer pour mise à jour immédiate.</p>
                            <button className="w-full py-3 border border-minfi-emerald/20 text-minfi-emerald rounded-xl text-[9px] font-black tracking-widest uppercase hover:bg-minfi-emerald hover:text-white transition-all">Signaler</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon: Icon, label }) {
    return (
        <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/30 group-hover:bg-white/10 group-hover:text-minfi-emerald transition-all border border-white/5">
                <Icon size={20} />
            </div>
            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
        </button>
    );
}
