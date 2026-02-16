import React from 'react';

const partners = [
    { name: "APME", logo: "Agency for PMEs" },
    { name: "CUD", logo: "Communauté Urbaine Douala" },
    { name: "BEAC", logo: "Banque Centrale" },
    { name: "DGI", logo: "Direction Générale Impôts" },
    { name: "DGD", logo: "Direction Générale Douanes" },
    { name: "CAA", logo: "Caisse Autonome" },
];

export default function Partners() {
    return (
        <section className="py-24 px-6 border-t border-white/5 opacity-80">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase">Notre Écosystème Institutionnel</span>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                    {partners.map((partner) => (
                        <div key={partner.name} className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-help">
                            <span className="text-xl md:text-2xl font-heading font-black tracking-tighter text-white/80">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
