import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-neutral-950 pt-24 pb-12 px-6 border-t-2 border-minfi-gold/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                <span className="text-minfi-blue font-black text-2xl">M</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-black text-lg tracking-tighter leading-none">MINFI</span>
                                <span className="text-[8px] text-minfi-gold font-black tracking-[0.3em] uppercase">Connect Cameroun</span>
                            </div>
                        </Link>
                        <p className="text-white/30 text-xs leading-relaxed max-w-xs">
                            La plateforme souveraine de pilotage économique et d'inclusion financière au service du développement durable de la République du Cameroun.
                        </p>
                        <div className="flex items-center space-x-4">
                            <SocialLink icon={Facebook} />
                            <SocialLink icon={Twitter} />
                            <SocialLink icon={Linkedin} />
                            <SocialLink icon={Youtube} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            <FooterLink to="/institution" label="Institution" />
                            <FooterLink to="/academie" label="Académie & Diplômes" />
                            <FooterLink to="/mediatheque" label="Médiathèque & Directs" />
                            <FooterLink to="/e-services" label="E-Services & Simulateurs" />
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-8">Ressources Loi</h4>
                        <ul className="space-y-4">
                            <FooterLink to="#" label="Loi de Finances 2024" />
                            <FooterLink to="#" label="Code Général des Impôts" />
                            <FooterLink to="#" label="Guide du Contribuable" />
                            <FooterLink to="#" label="Annuaire des Centres" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-[0.4em] text-white uppercase mb-8">Nous Contacter</h4>
                        <ul className="space-y-6">
                            <ContactItem icon={MapPin} label="Bvd de l'Indépendance, Yaoundé" />
                            <ContactItem icon={Phone} label="+237 222 23 40 30" />
                            <ContactItem icon={Mail} label="contact@minfi.gov.cm" />
                        </ul>
                    </div>
                </div>

                {/* Legal & Footer Bottom */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-3">
                        <img src="/flag-emblem.png" alt="Cameroon" className="w-6 h-6 object-contain grayscale opacity-50" />
                        <span className="text-[8px] font-bold text-white/20 tracking-[0.2em] uppercase">
                            © 2024 Ministère des Finances — Tous droits réservés.
                        </span>
                    </div>
                    <div className="flex items-center space-x-8">
                        <FooterLegalLink label="Missions Légales" />
                        <FooterLegalLink label="Accessibilité" />
                        <FooterLegalLink label="Cookies" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ to, label }) {
    return (
        <li>
            <Link to={to} className="text-[10px] font-bold text-white/30 hover:text-minfi-emerald transition-colors tracking-widest uppercase">
                {label}
            </Link>
        </li>
    );
}

function FooterLegalLink({ label }) {
    return (
        <Link to="#" className="text-[8px] font-bold text-white/20 hover:text-white transition-colors tracking-widest uppercase">
            {label}
        </Link>
    );
}

function SocialLink({ icon: Icon }) {
    return (
        <a href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:bg-minfi-emerald hover:text-white transition-all duration-300">
            <Icon size={16} />
        </a>
    );
}

function ContactItem({ icon: Icon, label }) {
    return (
        <li className="flex items-start space-x-3 group">
            <div className="mt-1 text-minfi-gold group-hover:text-minfi-emerald transition-colors">
                <Icon size={14} />
            </div>
            <span className="text-[10px] font-medium text-white/30 leading-tight">{label}</span>
        </li>
    );
}
