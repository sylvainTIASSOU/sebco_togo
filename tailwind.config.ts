import type { Config } from 'tailwindcss'

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        cam1: 'url("/images/bg/cam5.jpg")',
        mobile: 'url("/images/app.png")',
        cam2: 'url("/images/bg/cam1.jpg")',
        meteriaux: 'url("/images/bg/materiaux-mysweetimmo.jpg")'
      },

      colors: {
        violet: '#FF5733',
        vert : '#33FF57',
         primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024',
        bgblue: '#171E5F',
        btnbg: '#DB7C0C',
        textbg: '#FF8A00',
        bgopacity: '#303CAD33',
        bluelight: '#33FFBD',
      },
    },
  },
  plugins: [],
}
