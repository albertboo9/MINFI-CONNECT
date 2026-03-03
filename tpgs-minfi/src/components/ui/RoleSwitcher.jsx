import React from 'react';
import { clsx } from 'clsx';
import { useAppStore, ROLES } from '../../store/index.js';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const ROLE_OPTIONS = [
    { role: ROLES.OPERATOR, label: 'Opérateur', color: 'emerald' },
    { role: ROLES.MANAGER, label: 'Chef de Service', color: 'blue' },
    { role: ROLES.HRM, label: 'Service Formation DRH', color: 'gold' },
    { role: ROLES.TECH, label: 'Service Technique', color: 'cyan' },
    { role: ROLES.DIRECTOR, label: 'Direction / Pilotage', color: 'purple' },
];

const colorMap = {
    emerald: { dot: 'bg-tpgs-emerald', border: 'border-tpgs-emerald/30', bg: 'bg-tpgs-emerald/10 hover:bg-tpgs-emerald/20' },
    blue: { dot: 'bg-tpgs-blue', border: 'border-tpgs-blue/30', bg: 'bg-tpgs-blue/10 hover:bg-tpgs-blue/20' },
    gold: { dot: 'bg-tpgs-gold', border: 'border-tpgs-gold/30', bg: 'bg-tpgs-gold/10 hover:bg-tpgs-gold/20' },
    cyan: { dot: 'bg-tpgs-cyan', border: 'border-tpgs-cyan/30', bg: 'bg-tpgs-cyan/10 hover:bg-tpgs-cyan/20' },
    purple: { dot: 'bg-tpgs-purple', border: 'border-tpgs-purple/30', bg: 'bg-tpgs-purple/10 hover:bg-tpgs-purple/20' },
};

export default function RoleSwitcher() {
    const { activeRole, setRole } = useAppStore();
    const [open, setOpen] = React.useState(false);

    const current = ROLE_OPTIONS.find(r => r.role === activeRole);
    const colors = colorMap[current.color];

    return (
        <div className="relative mb-1">
            <button
                onClick={() => setOpen(o => !o)}
                className={clsx(
                    'w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all',
                    colors.border, colors.bg
                )}
            >
                <div className={clsx('w-2 h-2 rounded-full flex-shrink-0', colors.dot)} />
                <span className="text-xs font-semibold text-slate-300 truncate flex-1">{current.label}</span>
                <ChevronDown size={12} className={clsx('text-slate-500 transition-transform', open && 'rotate-180')} />
            </button>

            {open && (
                <div className="absolute bottom-full mb-2 left-0 right-0 bg-tpgs-card border border-tpgs-border rounded-xl overflow-hidden shadow-card-lg z-50">
                    <p className="px-3 py-2 text-2xs font-black tracking-widest uppercase text-slate-500 border-b border-tpgs-border">
                        Démo — Changer de rôle
                    </p>
                    {ROLE_OPTIONS.map((opt) => {
                        const c = colorMap[opt.color];
                        const isActive = opt.role === activeRole;
                        return (
                            <button
                                key={opt.role}
                                onClick={() => { setRole(opt.role); setOpen(false); window.location.href = '/'; }}
                                className={clsx(
                                    'w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors',
                                    isActive ? clsx(c.bg, 'text-white') : 'hover:bg-tpgs-hover text-slate-300'
                                )}
                            >
                                <div className={clsx('w-2 h-2 rounded-full flex-shrink-0', c.dot)} />
                                <span className="text-xs font-medium">{opt.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-tpgs-emerald" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
