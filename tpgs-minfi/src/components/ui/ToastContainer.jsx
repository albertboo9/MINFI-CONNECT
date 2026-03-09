// src/components/ui/ToastContainer.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToastStore } from '../../store/toastStore.js';
import { clsx } from 'clsx';

const ICONS = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
};

const COLORS = {
    success: { icon: 'text-tpgs-emerald', bar: 'bg-tpgs-emerald' },
    error: { icon: 'text-red-400', bar: 'bg-red-400' },
    warning: { icon: 'text-amber-400', bar: 'bg-amber-400' },
    info: { icon: 'text-blue-400', bar: 'bg-blue-400' },
};

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((t) => {
                    const Icon = ICONS[t.type] || Info;
                    const color = COLORS[t.type] || COLORS.info;
                    return (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, x: 60, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 60, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                            className="toast pointer-events-auto relative overflow-hidden"
                        >
                            {/* Progress bar */}
                            <motion.div
                                className={clsx('absolute bottom-0 left-0 h-0.5', color.bar)}
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: (t.duration || 4500) / 1000, ease: 'linear' }}
                            />
                            <Icon size={17} className={clsx('flex-shrink-0 mt-0.5', color.icon)} />
                            <div className="flex-1 min-w-0">
                                {t.title && <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>{t.title}</p>}
                                <p className="text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{t.message}</p>
                            </div>
                            <button onClick={() => removeToast(t.id)} className="flex-shrink-0 p-0.5 rounded-lg hover:bg-black/10 transition-colors mt-0.5">
                                <X size={13} style={{ color: 'var(--text-muted)' }} />
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
