<script context="module" lang="ts">
  import type { Post } from '$lib/posts';
  import type { Load } from '@sveltejs/kit';

  export const prerender = true;
  export const load: Load = async ({ fetch, page: { params } }) => {
    const post: Post = await (await fetch(`/api/post.json?slug=${params.slug}`)).json();
    return {
      props: {
        ...post,
      },
    };
  };
</script>

<script lang="ts">
  // Using this solution for now, until it's fixed
  // https://github.com/pngwn/MDsveX/issues/255#issuecomment-880873964
  import * as mdsvex from 'mdsvex/dist/browser-umd.js';
  export let title: string;
  export let author: string;
  export let date: string | Date;
  export let cover: string;
  export let content: string;

  let postContent = async () => (await mdsvex.compile(content)).code;
</script>

<div class="container mx-auto">
  <div class="flex flex-col md:flex-row items-center py-3">
    <div class="flex-3 pr-4">
      <img src={cover} alt="" />
    </div>
    <div class="flex-1">
      <h1 class="text-4xl font-bold py-2">{title}</h1>
      <p class="font-light">Written by {author.toUpperCase()} &mdash; {date}</p>
    </div>
  </div>
  <div class="prose py-2 text-black dark:text-light-100">
    {postContent}
  </div>
  <div class="flex flex-col md:flex-row items-center py-2">
    <div class="flex-1 pr-4">Share</div>
    <div class="flex-1">
      &copy; {author}
    </div>
  </div>
</div>
