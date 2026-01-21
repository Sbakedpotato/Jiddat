/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Jiddat Brand Palette - Warm, Premium, Human
        brand: {
          black: '#1a1a1a',
          dark: '#2d2d2d',
          gray: '#6b6b6b',
          muted: '#9a9a9a',
          light: '#f5f0eb',      // Warm cream
          white: '#fdfcfa',      // Off-white
          accent: '#c9a87c',     // Warm gold
          'accent-dark': '#a88b5e',  // Darker gold for hover
          success: '#4a7c59',    // Forest green
          error: '#c75050',      // Soft red
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)',
        'float': '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 40px rgba(201, 168, 124, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #f5f0eb 0%, #fdfcfa 100%)',
        'gradient-accent': 'linear-gradient(135deg, #c9a87c 0%, #a88b5e 100%)',
      },
    },
  },
  plugins: [],
}
