import React from 'react';
import { ShieldCheck, TrendingUp, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const missions = [
    {
        icon: ShieldCheck,
        title: "Souveraineté Financière",
        desc: "Garantir l'indépendance économique du Cameroun par une gestion rigoureuse et transparente des ressources publiques."
    },
    {
        icon: TrendingUp,
        title: "Performance Économique",
        desc: "Optimiser les recettes budgétaires et digitaliser les procédures pour un environnement propice à l'investissement."
    },
    {
        icon: Users,
        title: "Inclusion Citoyenne",
        desc: "Rapprocher le Ministère des citoyens à travers l'éducation et la simplification de l'accès aux services fiscaux."
    },
    {
        icon: Globe,
        title: "Rayonnement International",
        desc: "Assurer la crédibilité de la signature du Cameroun auprès des partenaires financiers mondiaux."
    }
];

export default function Missions() {
    return (
        <section className="relative py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-minfi-emerald font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">Nos Missions Fondamentales</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight">
                            Au service de la performance <br /> et de la <span className="text-gradient">probité publique.</span>
                        </h2>
                    </div>
                    <div className="md:w-1/3">
                        <p className="text-white/40 text-sm leading-relaxed border-l-2 border-minfi-emerald/20 pl-6">
                            Le Ministère des Finances coordonne la mise en œuvre de la politique budgétaire et fiscale de l'État, assurant l'équilibre financier nécessaire au développement de la Nation.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {missions.map((mission, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-10 hover:border-minfi-emerald/30 transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 bg-minfi-emerald/10 text-minfi-emerald rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <mission.icon size={28} />
                            </div>
                            <h3 className="text-xl font-heading font-black mb-4 group-hover:text-minfi-emerald transition-colors">{mission.title}</h3>
                            <p className="text-white/30 text-sm leading-relaxed group-hover:text-white/50 transition-colors">{mission.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-minfi-emerald/5 rounded-full blur-[120px] -z-10 translate-y-[-50%] translate-x-[-50%]" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-minfi-gold/5 rounded-full blur-[100px] -z-10 translate-y-[-20%] translate-x-[20%]" />
        </section>
    );
}
