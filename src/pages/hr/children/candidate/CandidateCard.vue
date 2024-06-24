<template>
  <div class="candidate-card__header" v-if="candidate">
    <div class="candidate-card__header-info">
      <div class="flex flex-col">
        <p class="text-base font-bold">{{ getFullName(candidate, 'full') }}</p>
        <div class="flex gap-y-[5px] gap-x-[10px]">
          <span class="text-xs">{{ formatDate(candidate.dateOfBirth) }}, {{ candidate?.sex === 0 ? 'Мужчина' : 'Женщина' }}</span>
          <span class="text-xs text-gray" v-if="candidate?.position"
            >г. {{ candidate?.position?.name }}</span
          >
        </div>
      </div>

      <div class="flex flex-col" v-if="candidate?.resumes?.[0]">
        <div class="text-sm">
          <b class="font-bold">Опыт работы: </b>
          <span>{{ candidate.resumes[0].experience }}</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Регион: </b>
          <span>г. {{ candidate?.city?.name }}</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Желаемая должность: </b>
          <span>{{ candidate.resumes[0].position }}</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">E-mail: </b>
          <span>{{candidate.resumes[0].contactMail}}</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Телефон: </b>
          <span>{{candidate.resumes[0].contactPhone}}</span>
        </div>

        <div class="text-sm mt-[10px]">
          <b class="font-bold">Внутренние метки: </b>
          <Button plain text class="self-end mx-auto">
            <span class="underline text-sm text-red">Добавить</span>
          </Button>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <img class="candidate-card__header-img" :src="candidate?.image?.image"/>

      <Button plain text class="self-end mx-auto mt-[30px]">
        <span class="underline text-sm text-red">Скачать резюме</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { User } from '@/stores/types/schema'
  import {
    getFormattedTime,
    formatDate,
    getLocalDate,
  } from '@/utils/functions/get-formatted-time'
  import { getFullName } from '@/utils/functions/get-full-name'

  interface Props {
    candidate: User
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .candidate-card {
    @apply w-full h-full flex flex-col /* border-b border-light-gray */ gap-y-10;

    &__header {
      @apply grid gap-x-[20px];

      grid-template-columns: auto 130px;

      &-img {
        @apply w-full aspect-square rounded-[10px] bg-gray;
      }

      &-info {
        @apply flex flex-col gap-y-[25px] my-auto;
      }

      &-logo {
        @apply mt-[30px];
      }
    }
  }
</style>
