<!-- TODO: Шрифты. Пропсы -->
<template>
  <router-link :to="{ name: 'vacancy-item', params: { id: vacancy.id } }">
    <div class="vacancy">
      <div class="vacancy__content">
        <p class="vacancy__content__title">
          {{ vacancy.position?.name }}
        </p>
        <div
          class="flex flex-wrap gap-x-[10px] gap-y-[12px] items-center"
          v-if="
            vacancy.lowerSalary ||
            vacancy.higherSalary ||
            vacancy.experience ||
            vacancy.employment
          "
        >
          <p
            class="vacancy__content__salary"
            v-if="vacancy.lowerSalary || vacancy.higherSalary"
          >
            <span v-if="vacancy.lowerSalary">₽ {{ vacancy.lowerSalary }}</span>
            <span v-if="vacancy.higherSalary">
              — ₽ {{ vacancy.higherSalary }}
            </span>
          </p>

          <div
            class="flex items-center sm:gap-x-[10px] gap-x-[5px]"
            v-if="vacancy.experience || vacancy.employment"
          >
            <chip v-if="vacancy.employment" :label="vacancy.employment.name" />
            <chip v-if="vacancy.experience" :label="vacancy.experience.name" />
          </div>
        </div>

        <div
          class="flex sm:gap-x-[16px] gap-x-[10px] items-center sm:mt-0 mt-[5px]"
        >
          <p class="vacancy__content__company">
            {{ vacancy.department?.company?.name }}
          </p>
          <p class="vacancy__content__adress">{{ vacancy.city?.name }}</p>
        </div>

        <BaseButton
          class="w-fit sm:mt-0 mt-[5px]"
          label="Откликнуться"
          @click.prevent="applyVacancy"
        />
      </div>

      <div class="vacancy__image hidden sm:block">
        <img :src="vacancy.department?.company?.image?.image" />
      </div>
    </div>
  </router-link>

  <ConfirmDialog ref="confirmDialog">
    <div class="flex items-center justify-center gap-x-[15px]">
      <i class="icon-[success-red] w-[42px] h-[42px] text-red" />
      <p class="text-lg !font-semibold">Отклик отправлен</p>
    </div>

    <p class="text-sm text-center w-[60%] mx-auto mt-[17px]">
      Как только появится обновление статуса вашего отклика, вы получите
      уведомление
    </p>

    <template #footer="{ handleConfirm }">
      <div class="flex w-full grow justify-center">

        <BaseButton class="mx-auto" @click="handleConfirm" label="Закрыть" />
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
  import { Vacancy } from '@/stores/types/schema'
  // Core
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  // Hooks
  import useNotify from '@/utils/hooks/useNotify'

  // Store
  import { applyVacancyRequest } from '@/stores/types/schema'

  import ConfirmDialog from '@/components/_ui_kit/ConfirmationDialog.vue'

  const { notifyError } = useNotify()

  interface Props {
    vacancy: Vacancy
  }

  const props = defineProps<Props>()

  const confirmDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null)

  const applyVacancy = async () => {
    await applyVacancyRequest(Number(props.vacancy?.id)).catch(notifyError)
    confirmDialog.value?.open(' ')
  }
</script>

<style scoped lang="scss">
  .vacancy {
    @apply grid bg-white rounded-[15px] w-full sm:min-h-[200px] sm:px-[28px] sm:py-[22px] p-[15px] gap-x-[80px];

    @media (max-width: 1024px) {
      box-shadow: 4px 4px 44px 0px rgba(90, 90, 90, 0.25);
    }

    @media (min-width: 1024px) {
      grid-template-columns: auto 150px;
    }

    &__content {
      @apply flex flex-col sm:gap-y-[16px] gap-y-[10px];

      &__title {
        @apply text-red sm:font-bold font-semibold sm:text-lg text-title-small;
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
      @apply rounded-[10px] w-[150px] h-[150px] my-auto;

      img {
        @apply w-full h-full rounded-[10px];
        object-fit: contain;
      }
    }
  }
</style>
