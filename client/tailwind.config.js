/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A6A8FB',
          DEFAULT: '#6366F1',
          dark: '#3B3D9C',
        },
      },
      boxShadow: {
        primary: ' 0px 0px 10px #A6A8FB',
      },
    },
  },
  plugins: [],
};
