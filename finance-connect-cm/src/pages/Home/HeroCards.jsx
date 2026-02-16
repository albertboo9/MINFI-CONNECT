import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Book, Activity, Smartphone } from 'lucide-react';

const heroCards = [
    {
        icon: Shield,
        title: "Souveraineté",
        desc: "Sécurisation et transparence absolue des fonds publics.",
        color: "emerald",
    },
    {
        icon: Book,
        title: "Éducation",
        desc: "Comprendre vos droits et devoirs en un clic.",
        color: "gold",
    },
    {
        icon: Activity,
        title: "Temps Réel",
        desc: "Suivez l'exécution du budget de l'État en direct.",
        color: "emerald",
    },
    {
        icon: Smartphone,
        title: "E-Services",
        desc: "Dématérialisation totale de vos démarches fiscales.",
        color: "gold",
    },
];

export default function HeroCards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-5xl px-6 relative z-20">
            {heroCards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + index * 0.1 }}
                    whileHover={{ y: -5, borderColor: `rgba(var(--minfi-${card.color}-rgb), 0.5)` }}
                    className="glass-card p-6 flex flex-col items-center text-center space-y-3 group border-white/5 hover:bg-white/[0.08] transition-all duration-500"
                >
                    <div className={`p-3 rounded-xl bg-minfi-${card.color}/10 text-minfi-${card.color} group-hover:scale-110 transition-transform`}>
                        <card.icon size={24} />
                    </div>
                    <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white">{card.title}</h4>
                    <p className="text-[10px] font-medium text-white/30 leading-tight">{card.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}
