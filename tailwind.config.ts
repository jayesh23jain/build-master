import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        structura: {
          'bg-primary': '#160D08',
          'bg-surface': '#1F1611',
          'bg-elevated': '#161616',
          border: '#1F1F1F',
          'border-hover': '#2E2E2E',
          'text-primary': '#F0F0F0',
          'text-secondary': '#6B6B6B',
          accent: '#5E6AD2',
          success: '#4D9375',
        },
      },
      backgroundImage: {
        'structura-gradient': 'linear-gradient(135deg, #1F1611 0%, #160D08 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(94, 106, 210, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(94, 106, 210, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
export default config;
