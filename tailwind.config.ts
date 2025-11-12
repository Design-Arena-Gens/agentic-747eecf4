import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f4ff',
          100: '#ebe8ff',
          200: '#d7d1ff',
          300: '#b5a6ff',
          400: '#9474ff',
          500: '#7a47ff',
          600: '#6426f0',
          700: '#531cd1',
          800: '#461ca8',
          900: '#3b1886'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
