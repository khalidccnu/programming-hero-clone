/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./*.html', './asset/js/*.js'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '0.75rem'
    },
    extend: {
      screens: {
        'md': '782px'
      },
      fontFamily: {
        'body': ['Poppins', 'Hind Siliguri', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}