import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    Award, Upload, CheckCircle2, ExternalLink, ShieldCheck,
    FileText, Plus, Database, Download, AlertTriangle, X, Clock
} from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from '../store/toastStore.js';
import { useSound } from '../hooks/useSound.js';
import Modal from '../components/ui/Modal.jsx';

const INITIAL_CERTS = [
    { id: 'ce1', title: 'Certification ANIF — Lutte Contre le Blanchiment', date: '2025-10-15', provider: 'ANIF / MINFI', file: 'anif-cert.pdf', score: 88, status: 'validated' },
    { id: 'ce2', title: 'Attestation CEFAM — Gestion Axée sur les Résultats', date: '2024-06-20', provider: 'CEFAM', file: null, score: 92, status: 'validated' },
];

/* ── Upload Modal ───────────────────────────────────── */
function UploadModal({ open, onClose, onUpload }) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);
    const { playSuccess, playClick } = useSound();

    const handleSimulatedUpload = () => {
        if (!file) { toast.error('Veuillez sélectionner un fichier.'); return; }
        setIsUploading(true);
        playClick();

        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 30;
            if (p >= 100) {
                setProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    onUpload({ title: file.name.split('.')[0], provider: 'Source Externe (Vérification en cours)' });
                    setIsUploading(false);
                    setProgress(0);
                    setFile(null);
                    playSuccess();
                    toast.success('Document téléversé avec succès', { title: 'Soumission terminée ✓', duration: 4000 });
                    onClose();
                }, 800);
            } else {
                setProgress(p);
            }
        }, 400);
    };

    return (
        <Modal open={open} onClose={onClose} title="Téléverser une certification" subtitle="Format PDF, PNG ou JPG (max. 5 Mo)" size="sm"
            footer={!isUploading && (
                <>
                    <button onClick={onClose} className="btn-ghost">Annuler</button>
                    <button onClick={handleSimulatedUpload} className="btn-primary" disabled={!file}>
                        Soumettre pour validation
                    </button>
                </>
            )}>
            <div className="space-y-6">
                {!isUploading ? (
                    <div
                        className={clsx(
                            'border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer',
                            file ? 'border-tpgs-emerald bg-tpgs-emerald/5' : 'border-themed hover:border-tpgs-emerald/40 hover:bg-themed-hover'
                        )}
                        onClick={() => { if (!file) setFile({ name: 'Certification_FINANCE_2026.pdf' }); }}
                    >
                        {file ? (
                            <div className="space-y-3">
                                <FileText size={40} className="text-tpgs-emerald mx-auto" />
                                <p className="text-sm font-bold text-themed">{file.name}</p>
                                <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-xs text-red-400 font-bold uppercase hover:underline">Supprimer</button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <Upload size={40} className="text-themed-muted mx-auto" />
                                <p className="text-sm font-bold text-themed">Cliquez pour parcourir ou déposez ici</p>
                                <p className="text-xs text-themed-muted">Les documents sont vérifiés par la DRH avant validation finale.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6 py-4">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-themed">
                            <span>Chiffrement & Transfert...</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="progress-bar h-2"><div className="progress-fill" style={{ width: `${progress}% ` }} /></div>
                        <p className="text-[10px] text-themed-muted text-center italic">"Sécurisation du document via le coffre-fort numérique MINFI..."</p>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default function Certifications() {
    const { t } = useTranslation();
    const { playClick } = useSound();
    const [certs, setCerts] = useState(INITIAL_CERTS);
    const [uploadOpen, setUploadOpen] = useState(false);

    const handleNewCert = (data) => {
        const newCert = {
            id: `ce${Date.now()} `,
            title: data.title,
            date: new Date().toISOString().split('T')[0],
            provider: data.provider,
            file: 'document.pdf',
            score: null,
            status: 'pending'
        };
        setCerts([newCert, ...certs]);
    };

    return (
        <div className="space-y-8">
            <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUpload={handleNewCert} />

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="font-heading font-black text-3xl text-themed">Portefeuille de Certifications</h1>
                    <p className="text-sm mt-1 text-themed-muted">Gestion du passeport sécurisé des compétences</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setUploadOpen(true)} className="btn-primary">
                        <Plus size={16} /> Ajouter un certificat
                    </button>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="card p-6 bg-gradient-to-br from-themed-card to-themed-hover flex items-center gap-4 border-tpgs-emerald/20">
                    <div className="w-12 h-12 rounded-xl bg-tpgs-emerald/10 flex items-center justify-center text-tpgs-emerald shadow-lg shadow-tpgs-emerald/10">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="section-label mb-0.5">Validées</p>
                        <p className="text-2xl font-black text-themed">{certs.filter(c => c.status === 'validated').length}</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="section-label mb-0.5">En cours de vérif.</p>
                        <p className="text-2xl font-black text-themed">{certs.filter(c => c.status === 'pending').length}</p>
                    </div>
                </div>
                <div className="card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                        <Database size={24} />
                    </div>
                    <div>
                        <p className="section-label mb-0.5">Points de crédit</p>
                        <p className="text-2xl font-black text-themed">1240 <span className="text-xs font-mono text-themed-muted">XP</span></p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="section-label px-2">Référentiel des titres obtenus</h3>
                <AnimatePresence>
                    {certs.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.08 }}
                            className="card p-6 flex flex-col md:flex-row md:items-center gap-5 group hover:border-tpgs-emerald/30 transition-all cursor-pointer"
                        >
                            <div className={clsx(
                                "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105",
                                c.status === 'validated' ? "bg-tpgs-gold/10 text-tpgs-gold border border-tpgs-gold/20" : "bg-themed-hover text-themed-muted"
                            )}>
                                <ShieldCheck size={32} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h3 className="font-bold text-themed leading-tight">{c.title}</h3>
                                    {c.status === 'pending' && <span className="badge badge-gold animate-pulse">En vérification</span>}
                                    {c.status === 'validated' && <span className="badge badge-emerald">Validé ✓</span>}
                                </div>
                                <p className="text-xs text-themed-muted font-mono">{c.provider} · Délivré le {c.date}</p>
                                {c.score && (
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="badge badge-emerald bg-tpgs-emerald/10 text-tpgs-emerald">Score: {c.score}/100</span>
                                        <div className="w-1 h-1 rounded-full bg-themed-muted opacity-40" />
                                        <span className="text-[10px] font-bold text-themed-muted uppercase tracking-wider">Identifiant: #CER-{c.id.slice(-4).toUpperCase()}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
                                {c.file ? (
                                    <button onClick={() => { playClick(); toast.info('Ouverture du coffre-fort...'); }} className="btn-ghost text-xs px-4">
                                        <Download size={14} /> Télécharger
                                    </button>
                                ) : (
                                    <button onClick={() => setUploadOpen(true)} className="btn-primary text-xs px-4">
                                        <Upload size={14} /> Téléverser
                                    </button>
                                )}
                                <button className="btn-ghost p-2.5 rounded-xl"><ExternalLink size={14} /></button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {certs.length === 0 && (
                    <div className="card p-20 text-center">
                        <Award size={48} className="text-themed-muted mx-auto mb-4 opacity-20" />
                        <p className="text-themed-muted">Aucune certification enregistrée pour le moment.</p>
                    </div>
                )}
            </div>

            {/* Safety Notice */}
            <div className="p-4 rounded-2xl border border-blue-400/20 bg-blue-400/5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <AlertTriangle size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-blue-400">Sécurité des données</p>
                    <p className="text-xs text-themed-muted leading-relaxed">Conformément à la politique de sécurité SI du MINFI, vos certifications sont archivées dans un environnement souverain et hautement sécurisé.</p>
                </div>
            </div>
        </div>
    );
}
