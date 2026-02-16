import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, GraduationCap, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCards from '../../pages/Home/HeroCards';

const bubbles = [
    {
        id: 'informer',
        title: 'INFORMER',
        subtitle: 'Lois & Réformes',
        icon: LayoutGrid,
        color: 'emerald',
        angle: 0,
        path: '/institution'
    },
    {
        id: 'former',
        title: 'FORMER',
        subtitle: 'Académie Campus',
        icon: GraduationCap,
        color: 'emerald',
        angle: 120,
        path: '/academie'
    },
    {
        id: 'sensibiliser',
        title: 'SENSIBILISER',
        subtitle: 'MINFI TV & Blog',
        icon: Video,
        color: 'gold',
        angle: 240,
        path: '/mediatheque'
    },
];

export default function OrbitalSystem() {
    return (
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
            {/* Central Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute w-[450px] h-[450px] border border-white/10 rounded-full"
            />

            {/* Outer Glow Ring */}
            <div className="absolute w-[500px] h-[500px] border border-minfi-emerald/10 rounded-full blur-xl" />

            {/* Main Title Center */}
            <div style={{ marginTop: '90px' }} className="z-10 text-center animate-fade-in flex flex-col items-center">
                <span className="text-minfi-gold text-2xl md:text-3xl mb-0 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    Bienvenue sur le
                </span>
                <h1 className="text-6xl md:text-8xl font-accent  font-black tracking-tighter text-white leading-[0.8]">
                    FINANCE<span className="text-minfi-emerald">CONNECT</span>
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                    <div className="h-[1px] w-8 bg-white/20" />
                    <p className="text-minfi-emerald font-black tracking-[0.5em] text-[30px] uppercase opacity-60">
                        Cameroun
                    </p>
                    <div className="h-[1px] w-8 bg-white/20" />

                </div>
                <h3 className="text-xl md:text-3xl font-heading font-black mb-6 tracking-tight leading-tight">
                    Maîtriser l'économie par l'éducation financière, <br />
                    <span className="text-gradient font-accent text-3xl md:text-5xl lowercase">bâtir le futur avec transparence.</span>
                </h3>
                {/* Value Proposition Cards */}
                <HeroCards />
            </div>

            {/* Orbiting Bubbles */}
            <div className="absolute w-full h-full animate-orbital-rotate">
                {bubbles.map((bubble) => {
                    const isExternal = bubble.id === 'former';
                    const linkProps = isExternal
                        ? { href: 'https://campus.studieslearning.com/', target: '_blank', rel: 'noreferrer' }
                        : { to: bubble.path };
                    const Component = isExternal ? 'a' : Link;

                    return (
                        <div
                            key={bubble.id}
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${bubble.angle}deg) translateX(250px) rotate(-${bubble.angle}deg)`,
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="relative -translate-x-1/2 -translate-y-1/2"
                            >
                                <Component {...linkProps}>
                                    {/* Capsule Glass Effect */}
                                    <div className="w-28 h-44 capsule-glass group cursor-pointer transition-all duration-500 hover:border-minfi-emerald/50">
                                        <div className={`p-3 rounded-xl bg-minfi-${bubble.color}/20 text-minfi-${bubble.color} mb-3 group-hover:scale-110 transition-transform`}>
                                            <bubble.icon size={24} />
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest text-white/40 mb-1 group-hover:text-white transition-colors">{bubble.title}</span>
                                        <span className="text-[8px] font-medium text-white/20 text-center uppercase tracking-tighter leading-none">{bubble.subtitle}</span>

                                        {/* Decorative particles */}
                                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-minfi-gold animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                    </div>
                                </Component>
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* Background Glow */}
            <div className="absolute w-64 h-64 bg-minfi-emerald/20 rounded-full blur-[120px] -z-10" />
        </div>
    );
}
