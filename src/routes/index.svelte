<script>
  import { goto } from '$app/navigation';
</script>

<div class="w-full min-h-screen h-full flex items-center justify-center -mt-20 mx-auto">
  <div class="">
    <p class="block">Kita membahas teknologi, dan kita membahas hal umum.</p>
    <p class="block hover:underline" on:click={() => goto('/post/hello-world')}>
      Klik disini buat post yg bisa
    </p>
  </div>
</div>
