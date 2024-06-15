<template>
  <div class="hr-publication-card">
    <div class="flex flex-col">
      <p class="text-title-small mb-[15px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p class="mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. adipiscing elit.adipiscing elit.adipiscin.
      </p>

      <div class="text-sm">
        <b class="font-bold">Категория: </b>
        <span>Бизнес</span>
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div class="flex flex-col gap-y-[10px] self-end">
        <p class="text-xs text-gray text-end">25.05.2024, 15:42</p>
        <div class="text-sm text-end">
          <b class="font-bold">Нравится: </b>
          <span>149</span>
        </div>
        <div class="text-sm text-end">
          <b class="font-bold">Комментариев: </b>
          <span>99</span>
        </div>
      </div>
      <div class="flex gap-x-[15px]">
        <BaseButton label="Редактировать" />
        <SecondButton label="Просмотр" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .hr-publication-card {
    @apply grid p-[15px] border-2 border-extra-light-gray rounded-[15px];
    grid-template-columns: auto min-content;
  }
</style>
