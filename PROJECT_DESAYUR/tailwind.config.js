/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Green — aksi utama, tombol, sukses
        green: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
        },
        // Primary Blue — kepercayaan, info, navigasi
        blue: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Background & Surface
        bg: {
          DEFAULT: '#F0F9FF',
          soft:    '#F8FAFC',
          page:    '#EFF6FF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft:    '#F8FAFC',
          muted:   '#F1F5F9',
        },
        // Text
        text: {
          primary:   '#0F172A',
          secondary: '#475569',
          muted:     '#94A3B8',
          inverse:   '#FFFFFF',
        },
        // Semantic
        amber:  { 50: '#FFFBEB', 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706' },
        rose:   { 50: '#FFF1F2', 400: '#FB7185', 500: '#F43F5E', 600: '#E11D48' },
        border: { DEFAULT: '#E2E8F0', soft: '#F1F5F9', blue: '#BFDBFE', green: '#BBF7D0' },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out both',
        'fade-in':   'fadeIn 0.5s ease-out both',
        'scale-in':  'scaleIn 0.4s ease-out both',
        'slide-up':  'slideUp 0.5s ease-out both',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
    },
  },
  plugins: [],
};
