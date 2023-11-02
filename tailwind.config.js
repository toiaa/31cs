/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // main
        main: '#4338ca', //purple
        'button-main-border': '#8b5cf6', // dark purple
        'button-main-light': '#64748b', // gray
        'button-main-dark': '#c084fc', // purple
        'button-secondary-color': '#a78bfa', // light purple
        'tile-hover-border': '#c4b5fd', // pale purple
        'tile-selected-border': '#d8b4fe', // pink purple
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
    },
  },
  plugins: [],
}
