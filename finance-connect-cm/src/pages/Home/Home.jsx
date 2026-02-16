import Hero from './Hero';
import Missions from './Missions';
import Statistics from './Statistics';
import NewsPreview from './NewsPreview';
import Partners from './Partners';

export default function Home() {
    return (
        <main className="relative min-h-screen bg-minfi-blue overflow-x-hidden">
            {/* 1. Hero Section (Orbital 2.0) */}
            <Hero />

            {/* 2. Institutional Missions */}
            <Missions />

            {/* 3. Performance & Impact Statistics */}
            <Statistics />

            {/* 4. News & Media Preview */}
            <NewsPreview />

            {/* 5. Institutional Partners */}
            <Partners />
        </main>
    );
}

function FeatureCard({ title, desc }) {
    return (
        <div className="glass-card p-8 hover:border-minfi-emerald/30 transition-all duration-500 group">
            <h3 className="text-minfi-emerald font-bold tracking-widest text-xs mb-4 group-hover:text-white transition-colors uppercase">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
