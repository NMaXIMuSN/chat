/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./apps/client/src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'nav-bg': '#202020',
        'chat-bg': '#282828',
        'grey': '#A1AAB3',
        'grey-dark': '#888888',
        'grey-primary': '#8A8A8A',
        'blue': '#1566A3'
      },
    },
    fontFamily: {
      'main': ['SegoeUIVariableStaticSmall', 'Arial', 'sans-serif'],
      'text': ['SegoeUIVariableStaticText', 'Arial', 'sans-serif'],
      'display': ['SegoeUIVariableStaticDisplay', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}

