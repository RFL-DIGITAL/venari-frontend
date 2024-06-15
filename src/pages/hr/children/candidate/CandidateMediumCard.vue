<template>
  <div class="candidate-mini-card">
    <img class="candidate-mini-card-img" />

    <div class="flex flex-col gap-y-[20px] my-auto">
      <div class="flex flex-col">
        <p class="text-title-small font-bold">Федоров Михаил Евгеньевич</p>
        <div class="flex gap-y-[5px] gap-x-[10px]">
          <span class="text-xs">21.02.1992, Мужчина</span>
          <span class="text-xs text-gray"
            >г. Кемерово, Кемеровская область, Россия</span
          >
        </div>
      </div>

      <div class="flex flex-col">
        <div class="text-sm">
          <b class="font-bold">Опыт работы: </b>
          <span>9 лет, 6 месяцев</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Регион: </b>
          <span>г. Кемерово, Кемеровская область, Россия</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Желаемая должность: </b>
          <span>Технический директор</span>
        </div>

        
      </div>
      <div class="text-sm flex gap-x-2.5">
        <b class="font-bold">Внутренние метки: </b>
        <div class="flex gap-x-[5px]">
          <Chip class="tiny" label="Метка 1"/>
          <Chip class="tiny" label="Метка 2"/>
          <Chip class="tiny" label="Метка 3"/>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div class="text-lg self-end">₽150.000</div>

      <div class="flex gap-x-[15px] self-end">
        <BaseButton label="Добавить в список" />
        <SecondButton label="Резюме" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@/stores/types/schema'

interface Props {
  candidate: User
}

const props = defineProps<Props>()

console.log(props.candidate)
</script>

<style scoped lang="scss">
  .candidate-mini-card {
    @apply grid w-full gap-x-5 p-5 border-2 border-extra-light-gray rounded-[15px];
    grid-template-columns: 181px auto max-content;

    &-img {
      @apply w-full aspect-square rounded-[10px] bg-gray;
    }
  }
</style>
