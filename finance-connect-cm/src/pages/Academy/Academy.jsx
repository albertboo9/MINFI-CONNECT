import React from 'react';
import { ExternalLink, GraduationCap, Award, BookOpen } from 'lucide-react';

export default function Academy() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="glass-card p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
                    <div className="relative z-10 flex-1">
                        <h1 className="text-4xl md:text-5xl font-heading font-black mb-6">
                            ACADÉMIE <span className="text-minfi-emerald">MINFI</span>
                        </h1>
                        <p className="text-white/40 text-lg mb-8 max-w-xl">
                            Formez-vous aux métiers de la finance publique, maîtrisez les outils fiscaux et obtenez des certifications officielles reconnues par l'État.
                        </p>
                        <a
                            href="https://campus.example.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-3 px-8 py-4 bg-minfi-emerald rounded-xl font-bold tracking-widest text-sm hover:bg-emerald-400 transition-colors shadow-xl shadow-minfi-emerald/20"
                        >
                            <span>ACCÉDER AU CAMPUS</span>
                            <ExternalLink size={18} />
                        </a>
                    </div>
                    <div className="relative flex-1 flex justify-center">
                        <div className="w-64 h-64 bg-minfi-emerald/10 rounded-full flex items-center justify-center p-8 animate-pulse-subtle">
                            <GraduationCap size={120} className="text-minfi-emerald" />
                        </div>
                    </div>
                </div>

                {/* Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AcademyCard
                        icon={BookOpen}
                        title="Formations Gratuites"
                        desc="Des modules interactifs pour tous les niveaux, de l'étudiant au chef d'entreprise."
                    />
                    <AcademyCard
                        icon={Award}
                        title="Certifications"
                        desc="Validez vos compétences et obtenez des badges numériques certifiés par le MINFI."
                    />
                    <AcademyCard
                        icon={GraduationCap}
                        title="Spécialisations"
                        desc="Découvrez des parcours avancés sur la dédouanement et le cycle budgétaire."
                    />
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
