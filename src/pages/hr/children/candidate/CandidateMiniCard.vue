<template>
  <div
    class="candidate-mini-card cursor-pointer"
    :class="{ selected: selected.includes(candidate.id) }"
    @click="$emit('update:selected', candidate.id)"
  >
    <EntityAvatar />

    <div class="flex flex-col">
      <p class="test-sm font-bold">{{ getFullName(candidate, 'full') }}</p>
      <p class="text-xs">
        {{ `${1} ${getDeclensionText(1, ['год', 'года', 'лет'])}` }}
      </p>

      <p class="text-xs text-gray">{{ candidate.position?.name }}</p>
      <p class="text-xs text-gray">{{ candidate.company?.name }}</p>
    </div>

    <div class="flex mt-[10px] h-[10px] items-center gap-x-[5px]">
      <span class="rounded-full bg-red w-2.5 h-2.5" />
      <span class="text-xs text-gray">{{
        getLocalDate(candidate.updatedAt).minutes
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { User } from '@/stores/types/schema'
  import { getFullName } from '@/utils/functions/get-full-name'
  import { getDeclensionText } from '@/utils/functions/get-declension-text'
  import { getLocalDate } from '@/utils/functions/get-formatted-time'

  interface Props {
    candidate: User
    selected: number[]
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:selected', value: number): void
  }>()
</script>

<style scoped lang="scss">
  .candidate-mini-card {
    @apply grid gap-x-[10px] px-[10px] py-[5px] border-b border-extra-light-gray;
    grid-template-columns: 60px auto 70px;
  }

  .candidate-mini-card.selected {
    @apply bg-extra-light-gray;
  }
</style>
