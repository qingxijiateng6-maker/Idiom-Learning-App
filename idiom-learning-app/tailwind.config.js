/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#1a1a1a',
        'bg-tertiary': '#2a2a2a',
        'accent-primary': '#3b82f6',
        'accent-success': '#10b981',
        'accent-error': '#ef4444',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
      },
    },
  },
  plugins: [],
}
