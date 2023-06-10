/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['solidStencil2023', 'sans-serif'],
      },
      colors: {
        'gray-dark': '#1E1F22',
        'gray-reg': '#2B2D31',
        'gray-ligth': '#313338',
        'text-gray': 'rgb(156 163 175)',
      },
      backgroundImage: theme => ({
        'insta-gradient': 'linear-gradient(to right, ' + theme('colors.insta-yellow') + ', ' + theme('colors.insta-orange') + ', ' + theme('colors.insta-pink') + ', ' + theme('colors.insta-purple') + ', ' + theme('colors.insta-blue') + ')',
        'gallery': "url('/images/churrasqueira.jpeg')",
        'facilities': "url('/images/tresguardasol.jpeg')",
        'ar756':  "url('/images/piscina-cima.jpeg')",
        'tijolo':  "url('/images/tijolo-bg.png')",
      }),
      height: {
        "map-container": "500px",
      },
      boxShadow: {
        map: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "map-popup": "0.375rem",
      },
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
        buttonClick: {
            '0%': { scale: 1 },
            '50%': { scale: 0.5 },
            '100%': { scale: 1 },
        },
        closeEffect: {
            '0%': { opacity: 1 },
            '25%': { opacity: 0.75 },
            '50%': { opacity: 0.5 },
            '75%': { opacity: 0.25 },
            '100%': { opacity: 0 },
        },
        grow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
      },       
    },
    animation: {
        'openOpacity': 'openEffect 0.5s linear',
        'openDiv': 'grow 2s linear',
        'closeOpacity': 'closeEffect 1s linear',
        'openItems': 'openItems 0.5s linear',
        'closeCart': 'closeCartEffect 0.2s linear',
        'buttonClick': 'buttonClick 2s linear',
    }, 
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
