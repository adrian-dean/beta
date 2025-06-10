import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}', // Include markdown files for Tailwind to scan
  ],
  darkMode: 'class', // Enable dark mode with class toggle
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // A nice vibrant purple
        secondary: '#8B5CF6', // A slightly lighter purple
        accent: '#EC4899', // A vibrant pink
        background: {
          DEFAULT: '#F9FAFB', // Light background
          dark: '#111827',    // Dark background
        },
        card: {
          DEFAULT: '#FFFFFF', // Light card background
          dark: '#1F2937',    // Dark card background
        },
        text: {
          DEFAULT: '#1F2937', // Dark text for light mode
          dark: '#E5E7EB',    // Light text for dark mode
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter font
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For styling markdown content
  ],
};

export default config;
