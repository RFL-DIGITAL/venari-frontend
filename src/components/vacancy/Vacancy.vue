<!-- TODO: Шрифты. Пропсы -->
<template>
  <router-link :to="{ name: 'vacancy-item', params: { id: 1 } }">
    <div class="vacancy">
      <div class="vacancy__content">
        <p class="vacancy__content__title">
          Специалист по специальным специальностям
        </p>
        <div class="flex flex-wrap gap-x-[10px] gap-y-[12px] items-center">
          <p class="vacancy__content__salary">₽150.000 — ₽300.000</p>

          <div class="flex items-center sm:gap-x-[10px] gap-x-[5px]">
            <chip label="Полная занятость" />
            <chip label="Опыт от 1 года" />
          </div>
        </div>

        <div class="flex sm:gap-x-[16px] gap-x-[10px] items-center sm:mt-0 mt-[5px]">
          <p class="vacancy__content__company">Soft Engeneering</p>
          <p class="vacancy__content__adress">г. Кемерово</p>
        </div>

        <BaseButton
          class="w-fit sm:mt-0 mt-[5px]"
          label="Откликнуться"
          @click.prevent="handleClickButton"
        />
      </div>

      <div class="vacancy__image hidden sm:block">
        <!-- IMG -->
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
  interface Vacancy {}

  defineProps<Vacancy>()

  function handleClickButton() {
    console.log(1)
  }
</script>

<style scoped lang="scss">
  .vacancy {
    @apply grid bg-white rounded-[15px] w-full sm:min-h-[200px] sm:px-[28px] sm:py-[22px] p-[15px] gap-x-[80px];
    
    @media (min-width: 1024px) {
      grid-template-columns: auto 150px;
    }

    &__content {
      @apply flex flex-col sm:gap-y-[16px] gap-y-[10px];

      &__title {
        @apply text-blue sm:font-bold font-semibold sm:text-lg text-title-small;
      }

      &__salary {
        @apply sm:text-base text-sm;
      }

      &__company {
        @apply sm:text-sm text-xs;
      }

      &__adress {
        @apply text-gray sm:text-sm text-xs;
      }
    }

    &__image {
      @apply bg-light-gray rounded-[10px] w-[150px] h-[150px] my-auto;
    }
  }
</style>
