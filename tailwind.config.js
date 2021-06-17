const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: process.env.NODE_ENV && 'jit',
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    enabled: 'process.env.NODE_ENV' === 'somethiing',
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'red-grad-dark': '#ff416c',
        'red-grad-light': '#ff4b2b',
        'sexy-red': '#F20631',
      },
      fontFamily: {
        sans: ['Merriweather Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
