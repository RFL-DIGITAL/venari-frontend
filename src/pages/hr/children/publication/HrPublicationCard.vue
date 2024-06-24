<template>
  <div class="hr-publication-card">
    <div class="flex flex-col">
      <p class="text-title-small mb-[15px]">
        {{publication.title}}
      </p>
      <p class="mb-5">
        {{publication.description}}
      </p>

      <div class="text-sm">
        <b class="font-bold">Категория: </b>
        <span>{{publication?.category?.name}}</span>
      </div>
    </div>

    <div class="flex flex-col justify-between">
      <div class="flex flex-col gap-y-[10px] self-end">
        <p class="text-xs text-gray text-end">{{getFormattedTime(publication.createdAt)}}</p>
        <div class="text-sm text-end">
          <b class="font-bold">Нравится: </b>
          <span>{{publication.likes}}</span>
        </div>
        <div class="text-sm text-end">
          <b class="font-bold">Комментариев: </b>
          <span>{{ publication.commentCount }}</span>
        </div>
      </div>
      <div class="flex gap-x-[15px] mt-[36px]">
        <BaseButton label="Редактировать" @click="$emit('edit', publication.id)"/>
        <SecondButton label="Просмотр" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from '@/stores/types/schema'
import { getFormattedTime } from '@/utils/functions/get-formatted-time'

interface Props {
  publication: Post
}

defineProps<Props>()
</script>

<style scoped lang="scss">
  .hr-publication-card {
    @apply grid p-[15px] border-2 border-extra-light-gray rounded-[15px];
    grid-template-columns: auto min-content;
  }
</style>
