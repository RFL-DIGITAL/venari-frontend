<template>
  <router-link
    class="vacancy-card"
    :to="{ name: 'vacancy-item', params: { id: 1 } }"
  >
    <div class="vacancy-card__content">
      <p class="vacancy-card__content__title">
        {{ vacancy.position?.name }}
      </p>
      <div class="flex gap-x-[10px] items-center">
        <p
          class="vacancy-card__content__salary"
          v-if="vacancy.lowerSalary || vacancy.higherSalary"
        >
          <span v-if="vacancy.lowerSalary">₽ {{ vacancy.lowerSalary }}</span>
          <span v-if="vacancy.higherSalary">
            — ₽ {{ vacancy.higherSalary }}
          </span>
        </p>

        <chip
          class="tiny"
          v-if="vacancy.employment"
          :label="vacancy.employment.name"
        />
        <chip
          class="tiny"
          v-if="vacancy.experience"
          :label="vacancy.experience.name"
        />
      </div>

      <div class="flex gap-x-[16px] items-center">
        <p class="vacancy-card__content__company">
          {{ vacancy.department?.company?.name }}
        </p>
        <p class="vacancy-card__content__adress" v-if="vacancy.city">
          г. {{ vacancy.city?.name }}
        </p>
      </div>
    </div>
    <div
      class="w-[13px] h-[20px] self-center text-gray icon-[outlined/arrow-right]"
    ></div>
  </router-link>
</template>

<script setup lang="ts">
  import { Vacancy } from '@/stores/types/schema'

  interface Props {
    vacancy: Vacancy
  }

  defineProps<Props>()
</script>

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
