<script context="module" lang="ts">
  import type { Post } from '$lib/posts';
  import type { Load } from '@sveltejs/kit';

  export const prerender = true;
  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/api/post.json');

    if (res.ok) {
      const posts: Post[] = await res.json();
      return {
        status: 200,
        props: {
          posts,
        },
      };
    }
    return {
      status: res.status,
      error: await res.text(),
    };
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  export let posts: Post[];
</script>

<div class="flex flex-col items-center justify-center -mt-20 mx-auto">
  <div class="flex-initial pb-8">
    <p class="block text-2xl text-center">Kita membahas teknologi, dan kita membahas hal umum.</p>
  </div>
  <div class="flex-initial">
    <div class="grid grid-cols-3 col-auto row-auto">
      {#each posts as post}
        <div class="flex flex-col items-center" on:click={() => goto(`/post/${post.slug}`)}>
          <div class="flex-initial">
            <img src={post.cover} alt="" />
          </div>
          <div class="flex-initial pb-4">
            <h2 class="text-2xl font-bold">{post.title}</h2>
          </div>
          <div class="flex-initial pb-2">
            <p class="prose line-clamp-2">{post.content}</p>
          </div>
          <div class="flex-initial pb-2">
            <p>{post.author.toUpperCase()} - {post.date}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
