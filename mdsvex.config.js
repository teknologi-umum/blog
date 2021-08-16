const config = {
  extensions: ['.svelte.md', '.md', '.svx'],
  layout: {
    _: './src/layout/default.svelte',
  },
  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [],
  rehypePlugins: [],
};

export default config;
