import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: "Execution Budgétaire", value: "94", suffix: "%", sub: "Taux de réalisation 2024" },
    { label: "Entreprises Digitalisées", value: "150", suffix: "k+", sub: "Utilisateurs actifs" },
    { label: "Points de Perception", value: "320", suffix: "", sub: "À travers tout le territoire" },
    { label: "Certifications Émises", value: "12", suffix: "k", sub: "Via FINANCE-CONNECT" },
];

export default function Statistics() {
    return (
        <section className="relative py-24 bg-neutral-900/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="flex items-baseline mb-2">
                                <span className="text-5xl md:text-7xl font-heading font-black text-gradient">
                                    {stat.value}
                                </span>
                                <span className="text-2xl md:text-4xl font-heading font-black text-minfi-gold ml-1">
                                    {stat.suffix}
                                </span>
                            </div>
                            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase text-white mb-2">
                                {stat.label}
                            </span>
                            <span className="text-[10px] font-medium text-white/20 uppercase tracking-widest">
                                {stat.sub}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
