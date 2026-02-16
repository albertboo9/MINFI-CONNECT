import React, { useState } from 'react';
import {
    ExternalLink, GraduationCap, Award, BookOpen, CheckCircle2,
    Star, Rocket, ShieldCheck, Clock, Layers, Users,
    ArrowRight, X, ChevronRight, Check, ListChecks
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { academyTrainings } from '../../data/academy.mock';

export default function Academy() {
    const [selectedTraining, setSelectedTraining] = useState(null);

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

                        <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight text-white">
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
                            <div className="text-white/20 text-[10px] font-bold tracking-widest uppercase">
                                Programmes 2024-2025 disponibles
                            </div>
                        </div>
                    </div>

                    <div className="relative flex-1 flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-white/5 rounded-full"
                        />
                        <div className="w-80 h-80 bg-gradient-to-br from-minfi-emerald/10 to-transparent rounded-full flex items-center justify-center p-8 backdrop-blur-3xl border border-white/5 relative shadow-2xl text-white">
                            <GraduationCap size={160} className="text-minfi-emerald drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]" />
                            <div className="absolute top-0 right-0 bg-minfi-gold p-4 rounded-2xl rotate-12 shadow-2xl">
                                <Award size={24} className="text-white" />
                            </div>
                            <div className="absolute bottom-8 -left-8 bg-minfi-emerald p-4 rounded-2xl -rotate-12 shadow-2xl">
                                <ShieldCheck size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 1. Catalog Section */}
                <div className="space-y-16">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center space-x-3 text-minfi-emerald text-[10px] font-black tracking-[0.4em] uppercase">
                            <div className="h-[1px] w-8 bg-minfi-emerald opacity-30" />
                            <span>Catalogue de Formation</span>
                            <div className="h-[1px] w-8 bg-minfi-emerald opacity-30" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white">Nos <span className="text-minfi-gold font-accent text-5xl md:text-7xl lowercase italic">Parcours d'État</span></h2>
                        <p className="text-white/30 max-w-2xl mx-auto text-lg leading-relaxed">Explorez nos programmes de spécialisation conçus pour forger les élites de la gestion publique.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {academyTrainings.map((training, idx) => (
                            <motion.div
                                key={training.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedTraining(training)}
                                className="glass-card overflow-hidden group cursor-pointer border-white/5 hover:border-minfi-emerald/30 transition-all duration-500"
                            >
                                {/* Training Image */}
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={training.image}
                                        alt={training.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-minfi-blue to-transparent opacity-80" />
                                    <div className="absolute top-6 left-6 flex space-x-2">
                                        <span className="px-3 py-1 bg-minfi-emerald/20 backdrop-blur-md border border-minfi-emerald/30 text-minfi-emerald text-[8px] font-black tracking-widest rounded-full uppercase">
                                            {training.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 text-white pr-6">
                                        <div className="flex items-center space-x-2 text-[10px] font-black tracking-widest text-white/60 mb-1">
                                            <Clock size={12} />
                                            <span>{training.duration}</span>
                                        </div>
                                        <h3 className="text-xl font-heading font-black group-hover:text-minfi-emerald transition-colors leading-tight">{training.title}</h3>
                                    </div>
                                </div>

                                {/* Training Info Preview */}
                                <div className="p-8 space-y-6">
                                    <p className="text-white/40 text-sm line-clamp-2 leading-relaxed font-medium">
                                        {training.shortDesc}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-minfi-gold">
                                                <training.icon size={16} />
                                            </div>
                                            <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">{training.level}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-minfi-gold group-hover:translate-x-2 transition-transform">
                                            <span className="text-[9px] font-black tracking-widest uppercase">Voir Détails</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Spécialisations Section (Stats & Info) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8 order-2 lg:order-1 relative">
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-minfi-emerald/5 rounded-full blur-[100px]" />
                        <div className="glass-card p-10 border-white/10 space-y-8 relative overflow-hidden">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-16 h-1 bg-minfi-emerald" />
                                <h4 className="text-2xl font-heading font-black italic text-white">Accompagnement & <span className="text-minfi-emerald">Souveraineté</span></h4>
                            </div>
                            <p className="text-white/40 leading-relaxed text-lg">Nos parcours sont conçus avec les directions opérationnelles du MINFI pour garantir une adéquation parfaite entre la formation et les besoins réels de l'État.</p>
                            <div className="grid grid-cols-2 gap-12">
                                <Stat label="Modules terminés" value="2.4k+" icon={CheckCircle2} color="emerald" />
                                <Stat label="Experts formateurs" value="120+" icon={Users} color="gold" />
                                <Stat label="Taux de réussite" value="95%" icon={Star} color="emerald" />
                                <Stat label="Postes pourvus" value="1.8k" icon={Rocket} color="gold" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10 order-1 lg:order-2">
                        <div className="text-[10px] font-black tracking-[0.4em] text-minfi-emerald uppercase flex items-center space-x-3">
                            <span className="p-2 bg-minfi-emerald/10 rounded-lg">Impact National</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-heading font-black leading-[1.1] text-white">Digitaliser la <br /> <span className="text-minfi-gold font-accent text-6xl md:text-8xl italic lowercase">Compétence.</span></h2>
                        <div className="space-y-6">
                            {[
                                "Cursus validés par l'Inspection Générale des Services.",
                                "Examens nationaux et diplômes homologués.",
                                "Alternance avec les administrations centrales."
                            ].map((text, i) => (
                                <div key={i} className="flex items-start space-x-4">
                                    <div className="p-1.5 bg-minfi-emerald/20 rounded-full text-minfi-emerald mt-1">
                                        <Check size={12} />
                                    </div>
                                    <p className="text-white/60 font-medium">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. CTA FAQ */}
                <div className="glass-card p-16 bg-gradient-to-br from-white/[0.04] to-transparent border-white/5 text-center space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-minfi-gold/5 rounded-full blur-[80px]" />
                    <div className="w-20 h-20 bg-minfi-gold/10 text-minfi-gold rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <Rocket size={40} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-4xl font-heading font-black uppercase tracking-tight text-white">Prêt à propulser votre carrière ?</h3>
                        <p className="max-w-xl mx-auto text-white/30 text-lg">Rejoignez des milliers d'agents publics déjà formés et certifiés sur notre plateforme Campus.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <a
                            href="https://campus.studieslearning.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="px-12 py-6 bg-minfi-emerald text-white rounded-2xl font-black tracking-widest text-xs uppercase shadow-2xl shadow-minfi-emerald/20 hover:scale-105 transition-all"
                        >
                            S'inscrire maintenant
                        </a>
                        <button className="px-12 py-6 glass-card border-white/10 text-white/60 hover:text-white rounded-2xl font-black tracking-widest text-xs uppercase transition-all">Consulter la FAQ</button>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedTraining && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-10"
                    >
                        <div
                            className="absolute inset-0 bg-neutral-950/90 backdrop-blur-xl"
                            onClick={() => setSelectedTraining(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            className="glass-card w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/10 relative z-10"
                        >
                            {/* Image Header / Side */}
                            <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-neutral-900">
                                <img
                                    src={selectedTraining.image}
                                    alt={selectedTraining.title}
                                    className="w-full h-full object-cover grayscale opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-minfi-blue via-minfi-blue/40 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-end p-10">
                                    <div className="px-4 py-1.5 bg-minfi-gold border border-white/20 text-white text-[10px] font-black tracking-widest rounded-full uppercase self-start mb-6 w-fit shadow-xl">
                                        Poursuite d'Excellence
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight text-white italic">{selectedTraining.title}</h2>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 overflow-y-auto p-12 bg-neutral-950 space-y-12">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap gap-10">
                                        <DetailItem label="Niveau" value={selectedTraining.level} />
                                        <DetailItem label="Durée" value={selectedTraining.duration} />
                                        <DetailItem label="Catégorie" value={selectedTraining.category} />
                                    </div>
                                    <button
                                        onClick={() => setSelectedTraining(null)}
                                        className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black tracking-[0.4em] text-minfi-emerald uppercase">Description du Programme</h4>
                                    <p className="text-white/50 text-lg leading-relaxed">{selectedTraining.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black tracking-[0.4em] text-minfi-emerald uppercase">Objectifs Clés</h4>
                                        <ul className="space-y-4">
                                            {selectedTraining.objectives.map((obj, i) => (
                                                <li key={i} className="flex items-start space-x-3 text-white/70 text-sm">
                                                    <Check size={16} className="text-minfi-emerald mt-1 shrink-0" />
                                                    <span>{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-black tracking-[0.4em] text-minfi-emerald uppercase">Contenu (Modules)</h4>
                                        <div className="space-y-3">
                                            {selectedTraining.program.map((item, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-all cursor-default">
                                                    <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{item.module}</span>
                                                    <span className="text-[10px] font-black text-minfi-gold">{item.hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-minfi-gold/10 rounded-2xl text-minfi-gold">
                                            <ListChecks size={24} />
                                        </div>
                                        <div>
                                            <h5 className="text-[10px] font-black text-white/20 uppercase tracking-widest">Débouchés</h5>
                                            <p className="text-white font-bold">{selectedTraining.outcomes}</p>
                                        </div>
                                    </div>
                                    <a
                                        href="https://campus.studieslearning.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full md:w-auto px-10 py-5 bg-white text-minfi-blue rounded-2xl font-black tracking-widest text-[10px] uppercase hover:bg-minfi-emerald hover:text-white transition-all shadow-xl text-center"
                                    >
                                        REJOINDRE CE PARCOURS
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="space-y-1">
            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</span>
            <p className="text-sm font-black text-white">{value}</p>
        </div>
    );
}

function Stat({ label, value, icon: Icon, color }) {
    return (
        <div className="space-y-3">
            <div className={`w-10 h-10 bg-minfi-${color}/10 rounded-xl flex items-center justify-center text-minfi-${color}`}>
                <Icon size={20} />
            </div>
            <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-heading font-black text-white tracking-tighter">{value}</div>
                <div className="text-[9px] font-black tracking-widest text-white/20 uppercase">{label}</div>
            </div>
        </div>
    );
}
