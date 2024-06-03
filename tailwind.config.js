/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
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
