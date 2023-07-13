const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{njk,md}'],
  darkMode: ['class', '[data-theme="black"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ['lofi', 'black'], // Specify the two themes
  },
  variants: {},
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
};
