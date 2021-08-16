import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';
import clamp from 'windicss/plugin/line-clamp';
import aspectRatio from 'windicss/plugin/aspect-ratio';

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
  plugins: [typography, clamp, aspectRatio],
});
