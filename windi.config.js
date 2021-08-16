import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        body: ['Manrope', 'Roboto', 'Arial', 'sans-serif'],
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      },
    },
  },
  plugins: [typography],
});
