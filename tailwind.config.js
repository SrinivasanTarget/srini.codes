/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sign: ['Dancing Script'],
      inter: ['Inter'],
      lora: ['Lora'],
    },
    fontWeight: {
      hairline: 100,
      'extra-light': 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
    },
    extend: {
      colors: {
        'custom-black': '#121212',
        'custom-gray-light': '#E0E0E0',
        'custom-gray-medium': '#A9A9A9',
        'custom-gray-dark': '#555555',
        'custom-highlight': '#BB86FC',
      },
    },
  },
  plugins: [],
}
