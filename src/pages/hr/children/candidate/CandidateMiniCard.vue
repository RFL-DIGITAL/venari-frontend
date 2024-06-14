<template>
  <div class="candidate-mini-card">
    <EntityAvatar />

    <div class="flex flex-col">
      <p class="test-sm font-bold">Михаил Федоров</p>
      <p class="text-xs">31 год</p>

      <p class="text-xs text-gray">Senior frontend-developer</p>
      <p class="text-xs text-gray">Lucas Software</p>
    </div>

    <div class="flex mt-[10px] h-[10px] items-center gap-x-[5px]">
      <span class="rounded-full bg-red w-2.5 h-2.5" />
      <span class="text-xs text-gray">15:42</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .candidate-mini-card {
    @apply grid gap-x-[10px] px-[10px] py-[5px];
    grid-template-columns: 60px auto 70px;
  }

  .candidate-mini-card:not(.selected) {
    @apply border-b border-extra-light-gray;
  }

  .candidate-mini-card.selected {
    @apply bg-extra-light-gray;
  }
</style>
