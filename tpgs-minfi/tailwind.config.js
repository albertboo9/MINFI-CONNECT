/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Brand */
        tpgs: {
          navy: '#0A1628',
          slate: '#111C2E',
          card: '#162032',
          border: '#1E3048',
          hover: '#243858',
          emerald: '#10B981',
          gold: '#F59E0B',
          red: '#EF4444',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
        },
        /* Light Mode */
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#F1F5F9',
          border: '#E2E8F0',
          hover: '#E8EDF4',
          text: '#0F172A',
          muted: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(8px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        slideIn: { '0%': { transform: 'translateX(-8px)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
        pulseRing: { '0%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.4)' }, '70%': { boxShadow: '0 0 0 10px rgba(16,185,129,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'card-lg': '0 4px 20px rgba(0,0,0,0.4)',
        'glow-em': '0 0 20px rgba(16,185,129,0.25)',
        'glow-go': '0 0 20px rgba(245,158,11,0.25)',
        'glow-bl': '0 0 20px rgba(59,130,246,0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
