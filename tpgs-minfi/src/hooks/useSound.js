// src/hooks/useSound.js
// Web Audio API — no external files needed

function createContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
}

function playTone(type = 'notify') {
    try {
        const ctx = createContext();
        const g = ctx.createGain();
        g.connect(ctx.destination);

        const configs = {
            notify: [{ f: 880, t: 0.0, d: 0.12 }, { f: 1100, t: 0.12, d: 0.15 }],
            success: [{ f: 660, t: 0.0, d: 0.1 }, { f: 880, t: 0.1, d: 0.1 }, { f: 1100, t: 0.2, d: 0.15 }],
            error: [{ f: 330, t: 0.0, d: 0.2 }, { f: 220, t: 0.2, d: 0.25 }],
            approve: [{ f: 523, t: 0.0, d: 0.08 }, { f: 659, t: 0.09, d: 0.08 }, { f: 784, t: 0.18, d: 0.12 }],
            reject: [{ f: 330, t: 0.0, d: 0.15 }, { f: 262, t: 0.15, d: 0.2 }],
            click: [{ f: 1200, t: 0.0, d: 0.06 }],
            alert: [{ f: 440, t: 0.0, d: 0.1 }, { f: 440, t: 0.15, d: 0.1 }, { f: 440, t: 0.3, d: 0.1 }],
        };

        const notes = configs[type] || configs.notify;
        notes.forEach(({ f, t, d }) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.connect(gainNode);
            gainNode.connect(g);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, ctx.currentTime + t);
            gainNode.gain.setValueAtTime(0, ctx.currentTime + t);
            gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + t + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);
            osc.start(ctx.currentTime + t);
            osc.stop(ctx.currentTime + t + d + 0.05);
        });

        setTimeout(() => ctx.close(), 1500);
    } catch (_) {
        // Audio not supported — silent fail
    }
}

export const useSound = () => ({
    playNotify: () => playTone('notify'),
    playSuccess: () => playTone('success'),
    playError: () => playTone('error'),
    playApprove: () => playTone('approve'),
    playReject: () => playTone('reject'),
    playClick: () => playTone('click'),
    playAlert: () => playTone('alert'),
});

export default useSound;
