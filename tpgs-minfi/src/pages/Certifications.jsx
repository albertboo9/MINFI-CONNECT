import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Upload, CheckCircle2, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

const certs = [
    { id: 'ce1', title: 'Certification ANIF — Lutte Contre le Blanchiment', date: '2025-10-15', provider: 'ANIF / MINFI', file: 'anif-cert.pdf', score: 88 },
    { id: 'ce2', title: 'Attestation CEFAM — Gestion Axée sur les Résultats', date: '2024-06-20', provider: 'CEFAM', file: null, score: 92 },
];

export default function Certifications() {
    const { t } = useTranslation();
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading font-black text-3xl text-white">{t('common.certifications')}</h1>
                    <p className="text-slate-500 text-sm mt-1">{certs.length} certification{certs.length > 1 ? 's' : ''} obtenue{certs.length > 1 ? 's' : ''}</p>
                </div>
                <button className="btn-ghost"><Upload size={15} /> Téléverser un certificat</button>
            </div>

            <div className="space-y-4">
                {certs.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="card p-6 flex items-center gap-5 hover:border-tpgs-hover transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-tpgs-gold/10 border border-tpgs-gold/20 flex items-center justify-center flex-shrink-0">
                            <Award size={24} className="text-tpgs-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white mb-1">{c.title}</h3>
                            <p className="text-xs text-slate-500 font-mono">{c.provider} · {c.date}</p>
                            {c.score && <div className="mt-2 flex items-center gap-2">
                                <span className="badge badge-emerald">Score: {c.score}/100</span>
                                <CheckCircle2 size={13} className="text-tpgs-emerald" />
                            </div>}
                        </div>
                        {c.file ? (
                            <button className="btn-ghost flex-shrink-0 text-xs"><ExternalLink size={13} /> Voir</button>
                        ) : (
                            <button className="btn-ghost flex-shrink-0 text-xs border-tpgs-gold/20 text-tpgs-gold"><Upload size={13} /> Téléverser</button>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
