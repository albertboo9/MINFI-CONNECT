// src/store/toastStore.js
import { create } from 'zustand';
let counter = 0;

export const useToastStore = create((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = ++counter;
        const type = toast.type || 'info';
        set((s) => ({ toasts: [...s.toasts, { id, type, ...toast }] }));
        setTimeout(() => {
            set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
        }, toast.duration || 4500);
        return id;
    },
    removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

// Convenience helper — use anywhere without hooks
export const toast = {
    success: (message, opts = {}) => useToastStore.getState().addToast({ type: 'success', message, ...opts }),
    error: (message, opts = {}) => useToastStore.getState().addToast({ type: 'error', message, ...opts }),
    info: (message, opts = {}) => useToastStore.getState().addToast({ type: 'info', message, ...opts }),
    warning: (message, opts = {}) => useToastStore.getState().addToast({ type: 'warning', message, ...opts }),
};
