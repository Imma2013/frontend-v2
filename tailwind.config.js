
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cryzo: {
          dark: '#0f172a',
          primary: '#2563eb',
          accent: '#10b981',
          light: '#f8fafc'
        }
      }
    },
  },
  plugins: [],
}
