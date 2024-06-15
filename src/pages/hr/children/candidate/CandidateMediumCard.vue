<template>
  <div class="candidate-mini-card">
    <img class="candidate-mini-card-img" :src="candidate?.image?.image" />

    <div class="flex flex-col gap-y-[20px] my-auto">
      <div class="flex flex-col">
        <p class="text-title-small font-bold">
          {{ getFullName(candidate, 'full') }}
        </p>
        <div class="flex gap-y-[5px] gap-x-[10px]">
          <span class="text-xs"
            >{{ formatDate(candidate.dateOfBirth) }},
            {{ candidate.sex === 0 ? 'Мужчина' : 'Женщина' }}</span
          >
          <span class="text-xs text-gray">г. </span>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="text-sm">
          <b class="font-bold">Опыт работы: </b>
          <span>9 лет, 6 месяцев</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Регион: </b>
          <span>г. {{ candidate.city.name }}</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Желаемая должность: </b>
          <span>Технический директор</span>
        </div>
      </div>
      <div class="text-sm flex gap-x-2.5">
        <b class="font-bold">Внутренние метки: </b>
        <div class="flex gap-x-[5px]">
          <Chip class="tiny" label="Метка 1" />
          <Chip class="tiny" label="Метка 2" />
          <Chip class="tiny" label="Метка 3" />
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div class="text-lg self-end">₽150.000</div>

      <div class="flex gap-x-[15px] self-end">
        <slot name="actions">
          <BaseButton label="Добавить в список" />
          <SecondButton label="Резюме" @click="$emit('resume', candidate.id)"/>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { User } from '@/stores/types/schema'
  import { getFullName } from '@/utils/functions/get-full-name'
  import { formatDate } from '@/utils/functions/get-formatted-time'

  interface Props {
    candidate: User
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'resume', value: number): void
  }>()

  console.log(props.candidate)
</script>

<style scoped lang="scss">
  .candidate-mini-card {
    @apply grid w-full gap-x-5 p-5 border-2 border-extra-light-gray rounded-[15px];
    grid-template-columns: 181px auto max-content;

    &-img {
      @apply w-full aspect-square rounded-[10px];
    }
  }
</style>
