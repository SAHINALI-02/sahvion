/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#040406',
          900: '#07070a',
          850: '#0c0c12',
          800: '#12121b',
          700: '#1b1b28',
          600: '#262638',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(168, 85, 247, 0.35)',
        },
        metallic: {
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
        violet: {
          glow: '#a855f7',
          electric: '#8b5cf6',
          bright: '#c084fc',
          deep: '#3b0764',
          subtle: 'rgba(168, 85, 247, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.2))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.45))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'metallic-linear': 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%)',
        'metallic-purple': 'linear-gradient(135deg, #f8fafc 0%, #d8b4fe 40%, #8b5cf6 80%, #3b0764 100%)',
      }
    },
  },
  plugins: [],
}
