import React from 'react';
import {
    FileText, Download, Link as LinkIcon, ExternalLink,
    BookOpen, Shield, Bell, Search, Filter,
    ChevronRight, ArrowRight, FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const resourceCategories = [
    { id: 'all', label: 'Tous les documents' },
    { id: 'textes', label: 'Textes de Loi' },
    { id: 'communiques', label: 'Communiqués' },
    { id: 'guides', label: 'Guides Pratiques' },
    { id: 'formulaires', label: 'Formulaires' },
];

const resources = [
    {
        title: "Loi de Finances 2024",
        category: "Textes de Loi",
        type: "PDF",
        size: "2.4 MB",
        date: "Jan 2024",
        description: "Document complet relatif aux dispositions budgétaires et fiscales de l'année en cours.",
        icon: FileText
    },
    {
        title: "Communiqué : Paiement de la Taxe Foncière",
        category: "Communiqués",
        type: "PDF",
        size: "850 KB",
        date: "Fév 2024",
        description: "Rappel des délais et modalités de paiement pour l'exercice 2024.",
        icon: Bell
    },
    {
        title: "Guide de l'Investisseur au Cameroun",
        category: "Guides Pratiques",
        type: "Interactif",
        size: "Lien",
        date: "2024",
        description: "Toutes les facilités fiscales et douanières pour les nouveaux investisseurs.",
        icon: Shield
    },
    {
        title: "Formulaire de Télédéclaration (DGI)",
        category: "Formulaires",
        type: "Service",
        size: "Plateforme",
        date: "Permanent",
        description: "Accès direct au portail de déclaration en ligne des impôts.",
        icon: FileCheck
    },
    {
        title: "Répertoire des Douanes (SH 2024)",
        category: "Textes de Loi",
        type: "XLSX",
        size: "5.1 MB",
        date: "Déc 2023",
        description: "Nomenclature tarifaire complète pour l'import-export.",
        icon: Download
    }
];

export default function Tools() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue overflow-hidden text-white">
            <div className="max-w-7xl mx-auto space-y-20">
                {/* Hero / Headers */}
                <div className="space-y-6 relative">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-minfi-emerald/5 rounded-full blur-[100px]" />
                    <div className="flex items-center space-x-3 text-minfi-gold text-[10px] font-black tracking-[0.4em] uppercase">
                        <div className="h-[1px] w-8 bg-minfi-gold opacity-30" />
                        <span>Bibliothèque de Ressources</span>
                        <div className="h-[1px] w-8 bg-minfi-gold opacity-30" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight">
                        OUTILS & <br />
                        <span className="text-gradient font-accent text-4xl md:text-6xl lowercase italic font-light italic">Documentation Officielle.</span>
                    </h1>
                    <p className="text-white/30 text-lg max-w-2xl leading-relaxed">
                        Accédez aux supports PDF, communiqués ministériels et outils pratiques pour faciliter vos démarches financières et administratives.
                    </p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex flex-wrap gap-3">
                        {resourceCategories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`px-6 py-2.5 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all ${cat.id === 'all'
                                    ? 'bg-minfi-emerald text-white'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-minfi-emerald transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Rechercher un document..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs text-white outline-none focus:border-minfi-emerald transition-all"
                        />
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((res, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card group p-8 border-white/5 hover:border-minfi-emerald/20 transition-all flex flex-col justify-between space-y-6"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-minfi-emerald border border-white/10 group-hover:bg-minfi-emerald group-hover:text-white transition-all">
                                        <res.icon size={24} />
                                    </div>
                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black tracking-widest text-white/30 uppercase">{res.category}</span>
                                </div>
                                <h3 className="text-xl font-heading font-black group-hover:text-minfi-emerald transition-colors leading-tight uppercase tracking-tight">{res.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{res.description}</p>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                                        {res.type} <span className="mx-1">•</span> {res.size}
                                    </div>
                                </div>
                                <button className="flex items-center space-x-2 text-minfi-gold font-black text-[9px] tracking-widest uppercase hover:text-white transition-colors">
                                    <span>Accéder</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter / Notifications CTA */}
                <div className="glass-card p-12 bg-gradient-to-br from-minfi-emerald/10 to-transparent border-minfi-emerald/20 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-minfi-emerald/5 rounded-full blur-[100px]" />
                    <div className="space-y-4">
                        <h2 className="text-3xl font-heading font-black italic">Restez informé des nouveaux communiqués.</h2>
                        <p className="text-white/30 text-sm max-w-xl mx-auto">Inscrivez-vous pour recevoir les alertes officielles directement sur votre mobile ou par email.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="votre@email.com"
                            className="flex-1 w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-minfi-emerald transition-all"
                        />
                        <button className="w-full sm:w-auto px-8 py-4 bg-minfi-emerald text-white rounded-2xl font-black tracking-widest text-[10px] uppercase shadow-2xl hover:scale-105 transition-all">S'abonner</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
