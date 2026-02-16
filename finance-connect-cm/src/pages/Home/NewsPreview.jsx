import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockVideos } from '../../data/media.mock';

export default function NewsPreview() {
    // Take last 3 videos for preview
    const recentNews = mockVideos.slice(0, 3);

    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-16 px-4 border-l-4 border-minfi-gold pl-6">
                    <div>
                        <span className="text-minfi-gold font-black tracking-[0.5em] text-[10px] uppercase mb-2 block">Actualités & Directs</span>
                        <h2 className="text-4xl font-heading font-black">MINFI <span className="text-minfi-emerald">MEDIA</span> CENTER</h2>
                    </div>
                    <Link
                        to="/mediatheque"
                        className="hidden md:flex items-center space-x-3 text-xs font-black tracking-widest hover:text-minfi-emerald transition-colors"
                    >
                        <span>VOIR TOUTES LES VIDÉOS</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentNews.map((news) => (
                        <div key={news.id} className="glass-card overflow-hidden group">
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={news.thumbnail}
                                    alt={news.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                                />
                                <div className="absolute top-4 left-4 px-2 py-1 bg-minfi-emerald rounded text-[8px] font-black tracking-widest uppercase">
                                    {news.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-lg font-heading font-black mb-4 line-clamp-2 leading-tight group-hover:text-minfi-emerald transition-colors">
                                    {news.title}
                                </h3>
                                <div className="flex items-center justify-between mt-6">
                                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">il y a {news.date}</span>
                                    <Link to="/mediatheque" className="text-minfi-emerald">
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 md:hidden px-4">
                    <Link
                        to="/mediatheque"
                        className="flex items-center justify-center space-x-3 w-full py-4 glass-card text-xs font-black tracking-widest"
                    >
                        <span>TOUTES LES ACTUALITÉS</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
