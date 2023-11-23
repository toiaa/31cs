/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // main
        main: '#4338ca', //purple
        'main-home': '#1F182F', //dark purple
        'button-main-light': '#64748b', // slate-500
        'button-main-dark': '#c084fc', // purple-400
        'button-gameboy-gray': '#2F312E', // buttons gray
        'tile-hover-border': '#c4b5fd', // violet-300
        'button-main-border': '#8b5cf6', // violet-500
        'button-secondary-color': '#5D379C', // violet-800
        'tile-selected-border': '#d8b4fe', // purple-300
        'subtitle-color': '#a78bfa', // violet-400
        'spinner-cube': '#a78bfa33', // violet-400 less opacity
        'color-selected': '#60a5fa', // blue-400
        // white
        white: '#ffffff',
        'button-text': '#ffffff',
        // red
        danger: '#F82F2F',
        'danger-bg': '#F0131326',
        'danger-lightest': '#FE9A9A',
        'danger-light': '#FF6060',
        'danger-darkest': '#321623',
        // Gray
        gray: '#D1D5DB',
        'gray-subtitle': '#818995',
        'gray-borders': '#4b5563',
        'gray-darker': '#5d5f63',
        input: '#1F2937',
        box: '#101726',
        'body-neutral': '#030712',
        'box-pale-neutral': '#4b5563',
        'box-dark-neutral': '#1f2937',
        'modal-neutral': '#111726',
        'card-neutral': '#1f2937', // '#403858', // #5D379C '#1f2937',
        //pink-pastel
        pink: '#f0abfc',
        //yelow-pastel,
        yellow: '#fef5ca',
        // Blues
        'blue-bg': '#0D1F3F',
      },

      fontSize: {
        'text-xs': '12px',
        'text-sm': '14px',
        'text-base': '16px',
        'text-lg': '18px',
        'text-xl': '20px',
      },
      animation: {
        glow: 'glow 3s ease infinite',
      },
      keyframes: {
        glow: {
          '0%,100%': {
            'background-color': 'transparent',
          },
          '50%': {
            'background-color': '#8b5cf6',
          },
        },
      },
    },
  },
  plugins: [],
}
