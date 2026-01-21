/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0F172A", // Deep Navy/Black
          800: "#1E293B", // Card BG
          700: "#334155", // Border/Inactive
        },
        brand: {
          teal: "#2DD4BF", // Teal-400
          green: "#22C55E", // Green-500
          orange: "#F97316", // Orange-500
          pink: "#EC4899", // Pink-500
        },
        // Match specific colors from screenshot
        success: "#22C55E",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)', // Orange to Pink
        'gradient-ocean': 'linear-gradient(135deg, #2DD4BF 0%, #06B6D4 100%)', // Teal to Cyan
        'gradient-dark': 'linear-gradient(to bottom, #1E293B 0%, #0F172A 100%)', // Card gradient
        'bg-main': 'linear-gradient(to bottom, #111827 0%, #0B1121 100%)', // App BG
      },
    },
  },
  plugins: [],
}
