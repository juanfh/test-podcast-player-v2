module.exports = {
  content: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      cursor: {
        'not-allowed': 'not-allowed',
      },
      leading: {
        '0': '0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
