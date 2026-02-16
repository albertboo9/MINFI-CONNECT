import React from 'react';
import OrbitalSystem from '../../components/orbital/OrbitalSystem';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroCards from './HeroCards';

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                {/* Overlays */}
                <div className="absolute inset-0 bg-neutral-950/75 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-minfi-blue/40 to-minfi-blue" />
                <div className="absolute inset-0 bg-gradient-to-r from-minfi-blue via-transparent to-minfi-blue opacity-40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full">


                {/* The Orbital System */}
                <OrbitalSystem />


                {/* Bottom Text / CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-8 text-center max-w-3xl px-6"
                >


                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
     
                    </div>
                </motion.div>


            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 animate-bounce">
                <span className="text-[10px] font-bold tracking-widest uppercase">Découvrir</span>
                <ChevronDown size={16} />
            </div>

            {/* Assistant Position Placeholder */}
            <div className="absolute bottom-12 right-12 z-20">
                {/* Assistant component will go here */}
            </div>
        </section>
    );
}
