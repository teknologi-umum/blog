<script>
  export let title;
  export let author;
  export let date;
  export let cover;
</script>

<div class="container mx-auto">
  <div class="flex flex-col md:flex-row items-center py-3">
    <div class="flex-3 pr-4">
      <img src={cover} alt="" />
    </div>
    <div class="flex-1">
      <h1 class="text-4xl font-bold py-2">{title}</h1>
      <p class="font-light">Written by {author} &mdash; {date}</p>
    </div>
  </div>
  <div class="prose py-2 text-black dark:text-light-100">
    <slot />
  </div>
  <div class="flex flex-col md:flex-row items-center py-2">
    <div class="flex-1 pr-4">Share</div>
    <div class="flex-1">
      &copy; {author}
    </div>
  </div>
</div>
