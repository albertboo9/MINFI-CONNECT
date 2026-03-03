import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-tpgs-navy">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-tpgs-emerald/10 border border-tpgs-emerald/20 flex items-center justify-center">
                    <Loader2 size={24} className="text-tpgs-emerald animate-spin" />
                </div>
                <p className="text-2xs font-black tracking-[0.3em] uppercase text-slate-500">Chargement…</p>
            </div>
        </div>
    );
}
