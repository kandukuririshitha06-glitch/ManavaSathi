/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: '#f45a43', // Warm care
          coralHover: '#e04730',
          orange: '#ea580c',
          amber: '#d97706',
          hope: '#10b981', // Hope green
          hopeDark: '#059669',
          hopeLight: '#ecfdf5',
          earth: '#78350f',
          sand: '#fdfbf7',
          surface: '#ffffff',
          dark: '#1e293b',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
