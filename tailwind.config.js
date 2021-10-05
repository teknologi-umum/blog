/**
 * @type {import('tailwindcss').TailwindConfig}
 */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#D5D6FD',
          200: '#ACAEFB',
          300: '#8184F5',
          400: '#6063EB',
          500: '#3033DE',
          600: '#2325BE',
          700: '#181A9F',
          800: '#0F1080',
          900: '#090A6A',
        },
        aqua: {
          100: '#CBFEFC',
          200: '#99FAFD',
          300: '#65EBFB',
          400: '#3FD7F8',
          500: '#02B8F4',
          600: '#018FD1',
          700: '#016BAF',
          800: '#004C8D',
          900: '#003775',
        },
        sunset: {
          100: '#FFF4CD',
          200: '#FFE69B',
          300: '#FFD56A',
          400: '#FFC445',
          500: '#FFA807',
          600: '#DB8805',
          700: '#B76B03',
          800: '#935102',
          900: '#7A3E01',
        },
        crimson: {
          100: '#FFE6D1',
          200: '#FFC7A4',
          300: '#FFA176',
          400: '#FF7D54',
          500: '#FF411C',
          600: '#DB2514',
          700: '#B70F0E',
          800: '#930812',
          900: '#7A0516',
        },
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      },
    },
    fontFamily: {
      sans: ['Sarabun', 'Poppins', 'Roboto', 'Arial', 'sans-serif'],
      serif: ['Lusitana', 'PT Serif', 'Times New Roman', 'serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
};
