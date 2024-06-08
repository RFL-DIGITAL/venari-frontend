<template>
    <div class="flex justify-between">
      <div class="flex items-center gap-x-[20px]">
        <RouterLink :to="{ name: 'feed-list' }" v-if="!preview">
          <div
            class="w-[18px] h-[36px] text-gray icon-[outlined/arrow-left]"
          ></div>
        </RouterLink>
        <UserCard />
      </div>
      <p class="text-gray text-base">10 часов назад</p>
    </div>
</template>

<script setup lang="ts">
import { PostProps } from './Post.vue';

defineProps<PostProps>()
</script>

<style scoped>

</style>