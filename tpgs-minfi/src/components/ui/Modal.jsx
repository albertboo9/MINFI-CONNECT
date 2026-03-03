// src/components/ui/Modal.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, subtitle, children, size = 'md', footer }) {
    // ESC key close
    useEffect(() => {
        if (!open) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-6xl' };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={`modal-panel ${widths[size]} w-full`}
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
                            <div>
                                {title && <h2 className="font-heading font-black text-lg" style={{ color: 'var(--text-primary)' }}>{title}</h2>}
                                {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl transition-colors hover:bg-black/10 ml-4 flex-shrink-0"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">{children}</div>

                        {/* Footer */}
                        {footer && (
                            <div className="px-6 pb-6 pt-0 flex items-center justify-end gap-3">{footer}</div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
