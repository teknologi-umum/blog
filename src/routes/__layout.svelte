<script lang="ts">
  import Navbar from '../../src/components/navbar.svelte';
  import 'virtual:windi.css';
</script>

<div
  class="font-body bg-gradient-to-r from-rose-100 to-teal-100 text-black dark:(bg-gradient-to-r from-gray-700 via-gray-900 to-black text-light-100) min-h-screen h-full w-full"
>
  <div class="container mx-auto lg:px-48 md:px-32 sm:px-20 px-8 py-8">
    <Navbar />
    <slot />
  </div>
</div>

<style>
  @import '@fontsource/manrope';
</style>
