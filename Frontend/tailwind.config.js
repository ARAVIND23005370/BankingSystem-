/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['DM Serif Display', 'serif'],
      },
      colors: {
        slate: {
          950: '#0f0f13',
        }
      }
    },
  },
  plugins: [],
}
