<template>
  <router-link class="vacancy-card" :to="{ name: 'vacancy-item', params: { id: 1 } }">
      <div class="vacancy-card__content">
        <p class="vacancy-card__content__title">
          Специалист по специальным специальностям
        </p>
        <div class="flex gap-x-[10px] items-center">
          <p class="vacancy-card__content__salary">₽150.000 — ₽300.000</p>

          <chip class="tiny" label="Полная занятость" />
          <chip class="tiny" label="Опыт от 1 года" />
        </div>

        <div class="flex gap-x-[16px] items-center">
          <p class="vacancy-card__content__company">Soft Engeneering</p>
          <p class="vacancy-card__content__adress">г. Кемерово</p>
        </div>
      </div>
      <div class="w-[13px] h-[20px] self-center text-gray icon-[outlined/arrow-right]"></div>
  </router-link>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .vacancy-card {
    @apply flex gap-x-[10px];

    &__content {
      @apply flex flex-col gap-y-[10px];

      &__title {
        @apply text-blue font-bold text-title-small;
      }

      &__salary {
        @apply text-sm;
      }

      &__company {
        @apply text-xs;
      }

      &__adress {
        @apply text-gray text-xs;
      }
    }
  }

  .vacancy-card:not(:nth-last-child(1)) {
    @apply border-b-2 border-light-gray pb-[9px];
  }
</style>
