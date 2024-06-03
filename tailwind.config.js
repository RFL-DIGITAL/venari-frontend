/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      min: '320px',
      sm: '720px',
      md: '1280px',
      lg: '1680px',
      xl: '1920px',
    },
    fontSize: {
      '7xl': [
        '150px',
        {
          lineHeight: '150px',
          fontWeight: '500',
        },
      ],
      '6xl': [
        '120px',
        {
          lineHeight: '120px',
          fontWeight: '500',
        },
      ],
      '5xl': [
        '90px',
        {
          lineHeight: '90px',
          fontWeight: '700',
          letterSpacing: '-2.7px',
        },
      ],
      '4xl': [
        '60px',
        {
          lineHeight: '70px',
          fontWeight: '400',
          letterSpacing: '-1.8px',
        },
      ],
      '3xl': [
        '50px',
        {
          lineHeight: '60px',
          fontWeight: '400',
          letterSpacing: '-1.5px',
        },
      ],
      '2xl': [
        '40px',
        {
          lineHeight: '50px',
          fontWeight: '500',
          letterSpacing: '-1.2px',
        },
      ],
      xl: [
        '32px',
        {
          lineHeight: '40px',
          fontWeight: '500',
          letterSpacing: '-0.96px',
        },
      ],
      lg: [
        '26px',
        {
          lineHeight: '35px',
          fontWeight: '400',
          letterSpacing: '-0.78px',
        },
      ],
      base: [
        '20px',
        {
          lineHeight: '30px',
          fontWeight: '300',
          letterSpacing: '-0.6px',
        },
      ],
      sm: [
        '15px',
        {
          lineHeight: '20px',
          fontWeight: '300',
          letterSpacing: '-0.45px',
        },
      ],
    },
    fontFamily: {
      geologica: 'Inter',
    },
    colors: {
      black: '#222222', // чьорьный как шайтааан дон!
      white: '#FFFFFF', // Main BG Color
      
      'extra-light-gray': '#F2F2F7', // Secondary BG Color
      'light-gray': '#D2D2D2', //gray trietary (stc)
      gray: '#6E6E6E', // Gray (non-active, stc)
      'dark-gray': '#5A5A5A', // gray subtext (stc)
      red: '#D12E2E', // some red color (subject to change) */

      'blue': '#007AFF' // Blue (active)
    },
    extend: {},
  },
  plugins: [
    require('@choiceform/tailwindcss-svg-icon')({
      classPrefix: 'icon',
      defaultSize: 1,
      unit: 'rem',
    }),
  ],
}
