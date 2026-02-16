import { Shield, FileText, Landmark, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroCards = [
    {
        icon: FileText,
        title: "FISCALITÉ",
        desc: "Déclarations d'impôts & Taxes.",
        color: "emerald",
        path: "/e-services"
    },
    {
        icon: Shield,
        title: "DOUANES",
        desc: "Import - Export & Portails dédouanement.",
        color: "gold",
        path: "/e-services"
    },
    {
        icon: Landmark,
        title: "TRÉSOR",
        desc: "Paiements, Retraites & Budget.",
        color: "emerald",
        path: "/e-services"
    },
    {
        icon: Scale,
        title: "RÉFORMES",
        desc: "Lois de Finances & Législation.",
        color: "gold",
        path: "/institution"
    },
];

export default function HeroCards() {
    return (
        <div style={{gap:"260px", transform:"translateX(-100px)"}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-40 mt-8 w-full max-w-6xl px-6 relative z-20">
            {heroCards.map((card, index) => (
                <Link key={index} to={card.path}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        style={{width:"250px"}}
                        whileHover={{ y: -5, borderColor: `rgba(var(--minfi-${card.color}-rgb), 0.3)` }}
                        className="glass-card  px-6 py-4 flex items-center space-x-4 group border-white/5 hover:bg-white/[0.08] transition-all duration-500 cursor-pointer h-full"
                    >
                        <div className={`flex-shrink-0 p-3 rounded-xl bg-minfi-${card.color}/10 text-minfi-${card.color} group-hover:scale-110 transition-transform`}>
                            <card.icon size={20} />
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white truncate">{card.title}</h4>
                            <p className="text-[9px] font-medium text-white/30 truncate leading-tight mt-0.5">{card.desc}</p>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
