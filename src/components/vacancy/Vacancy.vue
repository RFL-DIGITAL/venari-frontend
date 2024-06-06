<template>
  <div class="vacancy">
    <div class="vacancy__content">
        <p class="vacancy__content__title">Специалист по специальным специальностям</p>
        <div class="flex gap-x-[10px]">
            <p class="vacancy__content__salary">₽150.000 — ₽300.000</p>

            <chip label="Полная занятость"/>
            <chip label="Опыт от 1 года"/>
        </div>

        <div class="flex gap-x-[16px]">
            <p class="vacancy__content__company">Soft Engeneering</p>
            <p class="vacancy__content__adress">г. Кемерово</p>
        </div>

        <Button class="w-fit" label="Откликнуться"/>
    </div>

    <div class="vacancy__image">
      <!-- IMG -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .vacancy {
    @apply grid bg-white rounded-[15px] w-full min-h-[200px] px-[28px] py-[22px] gap-x-[80px];
    grid-template-columns: auto 150px;

    &__content {
        @apply flex flex-col gap-y-[16px];
    }

    &__image {
        @apply bg-light-gray rounded-[10px] w-[150px] h-[150px] my-auto;
    }
  }
</style>
