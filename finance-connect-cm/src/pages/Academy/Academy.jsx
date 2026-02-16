import React from 'react';
import { ExternalLink, GraduationCap, Award, BookOpen, CheckCircle2, Star, Rocket, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const diplomas = [
    { title: "BTS Comptabilité", duration: "2 ans", level: "Bac+2", icon: BookOpen },
    { title: "DESS Fiscalité", duration: "1 an", level: "Bac+5", icon: Award },
    { title: "Diplôme du Trésor", duration: "3 ans", level: "Concours", icon: ShieldCheck },
];

const specialties = [
    {
        title: "Administration Fiscale",
        desc: "Maîtriser le Code Général des Impôts et les télé-procédures.",
        tags: ["Télédéclaration", "Contrôle", "Audit"]
    },
    {
        title: "Gestion Douanière",
        desc: "Régimes douaniers, transit international et guichet unique.",
        tags: ["Régimes", "Transit", "Sydonia"]
    },
    {
        title: "Finances Publiques",
        desc: "Exécution budgétaire, comptabilité matières et trésorerie.",
        tags: ["Budget", "Trésor", "Matière"]
    }
];

export default function Academy() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-minfi-blue overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-32">
                {/* Hero / Portal Entry */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group"
                >
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-minfi-emerald/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-minfi-emerald/10" />

                    <div className="relative z-10 flex-1 space-y-8">
                        <div className="flex items-center space-x-3">
                            <span className="px-3 py-1 bg-minfi-emerald/10 text-minfi-emerald text-[10px] font-black tracking-widest rounded-full uppercase">Plateforme Certifiée</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">République du Cameroun</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight">
                            L'EXCELLENCE <br />
                            <span className="text-gradient font-accent text-4xl md:text-6xl lowercase">par la formation souveraine.</span>
                        </h1>

                        <p className="text-white/40 text-lg max-w-xl leading-relaxed">
                            Accédez au <span className="text-white font-bold">Campus MINFI</span>, l'espace d'apprentissage digital dédié aux professionnels de la finance publique et aux futurs cadres de l'administration.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <a
                                href="https://campus.studieslearning.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-5 bg-white text-minfi-blue rounded-2xl font-black tracking-widest text-xs hover:bg-minfi-emerald hover:text-white transition-all shadow-2xl shadow-white/5"
                            >
                                <span>REJOINDRE LE CAMPUS</span>
                                <ExternalLink size={18} />
                            </a>
                            <div className="text-white/20 text-[10px] font-bold tracking-widest">
                                PROGRAMMES 2024-2025 DISPONIBLES
                            </div>
                        </div>
                    </div>

                    <div className="relative flex-1 flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-white/5 rounded-full"
                        />
                        <div className="w-80 h-80 bg-gradient-to-br from-minfi-emerald/10 to-transparent rounded-full flex items-center justify-center p-8 backdrop-blur-3xl border border-white/5 relative shadow-2xl">
                            <GraduationCap size={160} className="text-minfi-emerald drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]" />
                            {/* Floating Badges */}
                            <div className="absolute top-0 right-0 bg-minfi-gold p-4 rounded-2xl rotate-12 shadow-2xl">
                                <Award size={24} className="text-white" />
                            </div>
                            <div className="absolute bottom-8 -left-8 bg-minfi-emerald p-4 rounded-2xl -rotate-12 shadow-2xl">
                                <ShieldCheck size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 1. Diplômes d'État Section */}
                <div className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-heading font-black">Diplômes & <span className="text-minfi-gold font-accent text-4xl md:text-6xl lowercase italic">Parcours d'État</span></h2>
                        <p className="text-white/30 max-w-2xl mx-auto text-sm">Des certifications reconnues au niveau national et international pour propulser votre carrière dans l'administration publique.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {diplomas.map((dip, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="glass-card p-8 group border-white/5 hover:border-minfi-gold/30 hover:bg-minfi-gold/[0.02] transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-minfi-gold/10 text-minfi-gold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <dip.icon size={24} />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-2 uppercase tracking-tighter">{dip.title}</h3>
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">{dip.level}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span className="text-[10px] font-black tracking-widest text-minfi-gold uppercase">{dip.duration}</span>
                                </div>
                                <a
                                    href="https://campus.studieslearning.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-full text-center py-4 border border-white/5 rounded-xl text-[10px] font-black tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    CONSULTER LE RÉFÉRENTIEL
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Spécialisations Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        {specialties.map((spec, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 border-white/5 flex gap-6 group hover:translate-x-2 transition-all duration-300"
                            >
                                <div className="h-full flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-minfi-emerald/20 flex items-center justify-center text-minfi-emerald text-xs font-black">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 w-[1px] bg-white/5 my-2" />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xl font-heading font-black">{spec.title}</h4>
                                    <p className="text-white/40 text-[13px] leading-relaxed">{spec.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {spec.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black tracking-widest text-white/30 group-hover:text-minfi-emerald transition-colors">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="text-[10px] font-black tracking-[0.4em] text-minfi-emerald uppercase">Cœur de Métier</div>
                        <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight">Expertise <br /> <span className="text-minfi-emerald">Financière</span> Digitale</h2>
                        <p className="text-white/40 leading-relaxed text-lg">Nos parcours sont conçus avec les directions opérationnelles du MINFI pour garantir une adéquation parfaite entre la formation et les besoins réels de l'État.</p>
                        <div className="grid grid-cols-2 gap-8">
                            <Stat label="Modules terminés" value="2.4k+" />
                            <Stat label="Experts formateurs" value="120+" />
                        </div>
                    </div>
                </div>

                {/* 3. CTA FAQ */}
                <div className="glass-card p-12 bg-gradient-to-r from-white/[0.03] to-transparent border-white/5 text-center space-y-8">
                    <div className="w-16 h-16 bg-minfi-gold/10 text-minfi-gold rounded-full flex items-center justify-center mx-auto">
                        <Rocket size={32} />
                    </div>
                    <h3 className="text-3xl font-heading font-black uppercase">Prêt à propulser votre carrière ?</h3>
                    <p className="max-w-xl mx-auto text-white/30 text-sm">Rejoignez des milliers d'agents publics déjà formés et certifiés sur notre plateforme Campus.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="https://campus.studieslearning.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-10 py-5 bg-minfi-emerald text-white rounded-2xl font-black tracking-widest text-[10px] uppercase shadow-2xl shadow-minfi-emerald/20 hover:scale-105 transition-all"
                        >
                            S'inscrire maintenant
                        </a>
                        <button className="px-10 py-5 glass-card border-white/10 text-white/60 hover:text-white rounded-2xl font-black tracking-widest text-[10px] uppercase transition-all">Consulter la FAQ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AcademyCard({ icon: Icon, title, desc }) {
    return (
        <div className="glass-card p-8 hover:border-minfi-emerald/30 transition-all duration-300">
            <div className="w-12 h-12 bg-minfi-emerald/10 text-minfi-emerald rounded-lg flex items-center justify-center mb-6">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold mb-4">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-heading font-black text-white">{value}</div>
            <div className="text-[9px] font-black tracking-widest text-white/20 uppercase">{label}</div>
        </div>
    );
}
