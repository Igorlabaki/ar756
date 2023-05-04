/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'insta-yellow': '#feda75',
        'insta-orange': '#fa7e1e',
        'insta-pink': '#d62976',
        'insta-purple': '#962fbf',
        'insta-blue': '#4f5bd5',
      },
      backgroundImage: theme => ({
        'insta-gradient': 'linear-gradient(to right, ' + theme('colors.insta-yellow') + ', ' + theme('colors.insta-orange') + ', ' + theme('colors.insta-pink') + ', ' + theme('colors.insta-purple') + ', ' + theme('colors.insta-blue') + ')',
      }),
      keyframes: {
        openEffect: {
            '0%': { opacity: 0 },
            '25%': { opacity: 0.25 },
            '50%': { opacity: 0.5 },
            '75%': { opacity: 0.75 },
            '100%': { opacity: 1 },
        },
        openItems: {
            '0%': { transform: 'translateX(-500px)' },
            '100%': { transform: 'translateY(0)' },
        },
        closeEffect: {
            '0%': { opacity: 1 },
            '25%': { opacity: 0.75 },
            '50%': { opacity: 0.5 },
            '75%': { opacity: 0.25 },
            '100%': { opacity: 0 },
        },        
    },
    animation: {
        'openOpacity': 'openEffect 0.5s linear',
        'closeOpacity': 'closeEffect 1s linear',
        'openItems': 'openItems 0.5s linear',
        'closeCart': 'closeCartEffect 0.2s linear',
    }, 
    },
  },
  plugins: [],
}
