<script>
  import { goto } from '$app/navigation';
  const links = [
    { name: 'New Tech', url: '/tech' },
    { name: 'Tutorials', url: '/tutorials' },
  ];
</script>

<nav class="container mx-auto py-8">
  <h1 class="text-4xl font-bold text-center pb-4 hover:cursor-pointer" on:click={() => goto('/')}>
    Teknologi Umum
  </h1>
  <ul class="flex flex-row items-center px-20">
    {#each links as link}
      <li
        class="flex-initial font-bold text-base pr-8 hover:cursor-pointer"
        on:click={() => goto(link.url)}
      >
        {link.name}
      </li>
    {/each}
  </ul>
</nav>
