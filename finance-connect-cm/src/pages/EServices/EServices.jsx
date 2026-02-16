import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    CreditCard,
    Calculator,
    ClipboardCheck,
    ArrowRight,
    ShieldCheck,
    ChevronRight,
    Search,
    Download
} from 'lucide-react';

const services = [
    {
        id: 'taxes',
        title: 'FISCALITÉ & IMPÔTS',
        icon: FileText,
        color: 'emerald',
        items: [
            'Télédéclaration mensuelle',
            'Paiement IRPP / IS',
            'Demande d\'exonération',
            'Quittance de paiement'
        ]
    },
    {
        id: 'douane',
        title: 'DOUANES & TRANSIT',
        icon: ShieldCheck,
        color: 'gold',
        items: [
            'Calcul de droits de douane',
            'Suivi SYDONIA',
            'Manifeste de cargaison',
            'Certificat d\'origine'
        ]
    },
    {
        id: 'tresor',
        title: 'TRÉSOR & PENSIONS',
        icon: Calculator,
        color: 'emerald',
        items: [
            'Simulateur de retraite',
            'Suivi de dossier matricule',
            'Bons du Trésor',
            'Attestation de virement'
        ]
    },
    {
        id: 'repertoire',
        title: 'RÉPERTOIRE & GUIDES',
        icon: ClipboardCheck,
        color: 'gold',
        items: [
            'Annuaire des percepteurs',
            'Calendrier fiscal',
            'Modèles de documents',
            'Centres des impôts'
        ]
    }
];

export default function EServices() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-24">

                {/* 1. Portal Header */}
                <div className="relative text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center space-x-3 text-[10px] font-black tracking-[0.4em] text-minfi-emerald uppercase"
                    >
                        <div className="h-[1px] w-8 bg-minfi-emerald opacity-30" />
                        <span>GUICHET UNIQUE DIGITAL</span>
                        <div className="h-[1px] w-8 bg-minfi-emerald opacity-30" />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight">
                        VOS SERVICES <br />
                        <span className="text-gradient font-accent text-4xl md:text-6xl lowercase">à portée de clic.</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-white/40 text-sm leading-relaxed">
                        Simplifiez vos démarches administratives, déclarez vos impôts et suivez vos dossiers en temps réel sur la plateforme officielle du Ministère des Finances.
                    </p>

                    {/* Quick Search */}
                    <div className="max-w-2xl mx-auto mt-12 relative">
                        <div className="glass-card p-1.5 flex items-center shadow-2xl border-white/10 group focus-within:border-minfi-emerald/50 transition-all">
                            <div className="pl-6 text-white/30">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un service, un formulaire ou une démarche..."
                                className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-sm font-medium placeholder:text-white/20"
                            />
                            <button className="px-8 py-4 bg-minfi-emerald text-white rounded-xl font-black tracking-widest text-[10px] uppercase shadow-lg hover:scale-105 transition-transform">
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Primary Service Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-10 group border-white/5 hover:bg-white/[0.03] transition-all duration-500 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <service.icon size={160} />
                            </div>

                            <div className="relative z-10 flex flex-col h-full space-y-8">
                                <div className={`w-14 h-14 bg-minfi-${service.color}/10 text-minfi-${service.color} rounded-2xl flex items-center justify-center`}>
                                    <service.icon size={28} />
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-heading font-black tracking-tight uppercase italic">{service.title}</h3>
                                    <div className="h-0.5 w-12 bg-minfi-emerald opacity-30" />
                                </div>

                                <ul className="space-y-4 flex-1">
                                    {service.items.map((item, i) => (
                                        <li key={i} className="flex items-center justify-between group/item cursor-pointer">
                                            <span className="text-[12px] font-bold text-white/40 group-hover/item:text-white transition-colors tracking-tight">{item}</span>
                                            <ChevronRight size={14} className="text-white/10 group-hover/item:text-minfi-emerald transition-colors" />
                                        </li>
                                    ))}
                                </ul>

                                <button className="inline-flex items-center space-x-3 text-[10px] font-black tracking-widest text-minfi-gold hover:text-white transition-colors group/btn">
                                    <span>ACCÉDER À TOUS LES SERVICES</span>
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 3. Interactive Tools Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ToolCard
                        title="Simulateur Fiscal"
                        desc="Calculez votre impôt sur le revenu en quelques étapes simples."
                        icon={Calculator}
                    />
                    <ToolCard
                        title="Téléchargements"
                        desc="Retrouvez tous les formulaires et CERFA officiels en PDF."
                        icon={Download}
                    />
                    <ToolCard
                        title="Paiement Mobile"
                        desc="Payez vos taxes via Orange Money, MTN ou Cartes."
                        icon={CreditCard}
                    />
                </div>

                {/* 4. Support CTA */}
                <div className="glass-card p-12 text-center space-y-8 border-minfi-emerald/20 bg-minfi-emerald/[0.02]">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-heading font-black">Besoin d'aide pour vos démarches ?</h2>
                        <p className="text-white/30 text-sm">Nos conseillers vous accompagnent par chat ou par téléphone du lundi au vendredi.</p>
                    </div>
                    <div className="flex justify-center gap-6">
                        <button className="px-10 py-5 bg-white text-minfi-blue rounded-2xl font-black tracking-widest text-[10px] uppercase">Contacter le support</button>
                        <button className="px-10 py-5 glass-card border-white/10 text-white rounded-2xl font-black tracking-widest text-[10px] uppercase">Consulter le guide</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ToolCard({ title, desc, icon: Icon }) {
    return (
        <div className="glass-card p-8 flex items-start space-x-6 border-white/5 hover:border-white/10 transition-all cursor-pointer">
            <div className="p-4 bg-white/5 rounded-xl text-white/60">
                <Icon size={24} />
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-black tracking-widest text-white uppercase">{title}</h4>
                <p className="text-[11px] text-white/30 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
