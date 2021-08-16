// import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import adapterNetlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess(),
    // mdsvex(mdsvexConfig),
  ],

  kit: {
    adapter: adapterNetlify(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    trailingSlash: 'never',
    vite: {
      plugins: [WindiCSS.default()],
    },
    files: {
      assets: './static',
      routes: './src/routes',
      lib: './src/lib',
    },
  },
};

export default config;
