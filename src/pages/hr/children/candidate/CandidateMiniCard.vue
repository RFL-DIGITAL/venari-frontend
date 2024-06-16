<template>
  <div
    class="application-mini-card cursor-pointer"
    :class="{ selected: selected?.map(s => s?.id)?.includes(application?.id) }"
    @click="$emit('update:selected', application)"
  >
    <EntityAvatar :image="application?.resume?.user?.image?.image"/>

    <div class="flex flex-col">
      <p class="test-sm font-bold">{{ getFullName(application?.resume?.user, 'full') }}</p>
      <p class="text-xs">
        {{ `${application?.resume?.experience?.split(' ')?.[0]} ${getDeclensionText(+application?.resume?.experience?.split(' ')?.[0], ['год', 'года', 'лет'])}` }}
      </p>

      <p class="text-xs text-gray">{{ application?.resume?.user?.position?.name }}</p>
      <p class="text-xs text-gray">{{ application?.resume?.user?.company?.name }}</p>
    </div>

    <div class="flex mt-[10px] h-[10px] items-center gap-x-[5px]">
      <span class="rounded-full bg-red w-2.5 h-2.5" v-if="application?.hasUpdated"/>
      <span class="text-xs text-gray">{{
        getLocalDate(application?.createdAt)?.minutes
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ApplicationShort } from '@/stores/types/schema'
  import { getFullName } from '@/utils/functions/get-full-name'
  import { getDeclensionText } from '@/utils/functions/get-declension-text'
  import { getLocalDate } from '@/utils/functions/get-formatted-time'

  interface Props {
    application: ApplicationShort
    selected: ApplicationShort[]
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:selected', value: ApplicationShort): void
  }>()
</script>

<style scoped lang="scss">
  .application-mini-card {
    @apply grid gap-x-[10px] px-[10px] py-[5px] border-b border-extra-light-gray;
    grid-template-columns: 60px auto 70px;
  }

  .application-mini-card.selected {
    @apply bg-extra-light-gray;
  }
</style>
