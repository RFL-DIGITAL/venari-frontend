<template>
  <AppMobileHeader hide-notification>
    <SecondRouterLink to="/vacancy" title="К вакансиям" />
  </AppMobileHeader>

  <div class="vacancy-item" v-if="vacancy">
    <div class="vacancy-item__main">
      <div class="vacancy-item__card-container">
        <div class="flex flex-col sm:gap-y-[10px] gap-y-[5px]">
          <p class="text-lg">{{ vacancy.position?.name }}</p>
          <p class="text-sm">{{ vacancy.department?.name }}</p>
          <p class="text-sm text-gray">{{ vacancy.city?.name }}</p>
        </div>
        <div class="sm:flex items-center gap-x-[20px]">
          <p
            class="text-base font-bold text-blue sm:mt-0 mt-[15px]"
            v-if="vacancy.lowerSalary || vacancy.higherSalary"
          >
            <span v-if="vacancy.lowerSalary">₽ {{ vacancy.lowerSalary }}</span>
            <span v-if="vacancy.higherSalary">
              — ₽ {{ vacancy.higherSalary }}
            </span>
          </p>

          <div
            class="flex gap-x-[10px] sm:mt-0 mt-[15px]"
            v-if="vacancy.experience || vacancy.employment"
          >
            <chip v-if="vacancy.employment" :label="vacancy.employment.name" />
            <chip v-if="vacancy.experience" :label="vacancy.experience.name" />
          </div>
        </div>

        <BaseButton
          class="sm:hidden block w-fit mt-[15px]"
          label="Откликнуться"
        />
      </div>

      <div class="vacancy-item__card-container gap-y-[15px]">
        <div v-if="vacancy.responsibilities">
          <p class="text-base font-bold mb-[15px]">Обязанности:</p>
          <div v-html="vacancy.responsibilities" />
        </div>

        <div v-if="vacancy.requirements">
          <p class="text-base font-bold mb-[15px]">Требования:</p>
          <div v-html="vacancy.requirements" />
        </div>

        <div v-if="vacancy.conditions">
          <p class="text-base font-bold mb-[15px]">Условия:</p>
          <div v-html="vacancy.conditions" />
        </div>

        <div v-if="vacancy.additional">
          <p class="text-base font-bold mb-[15px]">Дополнительно:</p>
          <div v-html="vacancy.additional" />
        </div>
      </div>

      <div class="vacancy-item__card-container">
        <p class="text-base font-bold mb-[15px]">Ключевые навыки:</p>

        <div class="flex flex-wrap gap-[10px]">
          <SkillChip
            v-for="skill in vacancy.skills"
            :key="skill.id"
            :label="skill.name"
          />
        </div>
      </div>

      <div class="sm:flex hidden justify-center w-full gap-x-[10px]">
        <BaseButton label="Откликнуться" />
        <SecondButton class="!bg-white" label="Сообщение работодателю" />
      </div>
    </div>

    <div class="vacancy-item__sidebar">
      <div class="vacancy-item__card-container sm:gap-y-[30px] gap-y-[15px]">
        <SmallUserCard :entity="vacancy.department.company" />

        <div class="flex flex-col gap-y-[20px]">
          <p
            class="sm:text-sm text-xs"
            v-if="vacancy.department.company.description"
          >
            {{ vacancy.department.company.description }}
          </p>

          <p class="sm:text-sm text-xs text-gray" v-if="vacancy.city">
            {{ vacancy.city.name }}
          </p>
        </div>

        <div class="flex w-full gap-x-[10px]">
          <BaseButton label="Откликнуться" />
          <SecondButton class="!bg-white" label="Сообщение работодателю" />
        </div>
      </div>

      <div class="vacancy-item__sidebar__image">
        <img v-if="vacancy.image" :src="vacancy.image.image" alt="logo" />
        <p>Размещено {{ getFormattedTime(vacancy.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Core
  import { useRoute } from 'vue-router'
  import { watch } from 'vue'
  import { storeToRefs } from 'pinia'

  // Hooks
  import useNotify from '@/utils/hooks/useNotify'
  import { getFormattedTime } from '@/utils/functions/get-formatted-time'
  import { isEqual } from 'lodash'

  // Store
  import { useVacancyStore } from '@/stores/modules/vacancy-store'

  const { vacancy } = storeToRefs(useVacancyStore())
  const { getVacancy } = useVacancyStore()
  const { notifyError } = useNotify()

  const $route = useRoute()

  fetchData()
  async function fetchData() {
    getVacancy(+$route.params.id).catch(notifyError)
  }

  watch(
    () => $route.params,
    (oldId, newId) => {
      if (!isEqual(oldId, newId)) fetchData()
    },
  )
</script>

<style scoped lang="scss">
  .vacancy-item {
    @include page-container-main-left;

    &__main,
    &__sidebar {
      @apply flex flex-col sm:gap-y-[25px];
    }

    &__sidebar__image {
      @apply flex flex-col w-full h-full;

      img {
        @apply aspect-square rounded-[10px] sm:w-full sm:mx-0 sm:mt-0 sm:mb-[15px] m-[15px];

        @media (max-width: 1024px) {
          width: calc(100% - 30px);
        }
      }

      p {
        @apply text-sm text-gray sm:text-left text-center;
      }
    }
  }

  .vacancy-item__card-container {
    @apply bg-white rounded-[15px] w-full flex flex-col p-[30px];

    @media (max-width: 1024px) {
      width: calc(100% - 30px);
      @apply p-[15px] m-[15px] mb-0 mx-auto;
      box-shadow: 4px 4px 44px 0px rgba(90, 90, 90, 0.25);
    }
  }
</style>
