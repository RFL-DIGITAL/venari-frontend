<template>
    <div class="flex justify-between">
      <div class="flex items-center gap-x-[20px]">
        <RouterLink :to="{ name: 'feed-list' }" v-if="!preview">
          <div
            class="w-[18px] h-[36px] text-gray icon-[outlined/arrow-left]"
          ></div>
        </RouterLink>
        <UserCard :user="post.user" :username="post.userName"/>
      </div>
      <p class="text-gray sm:text-base text-xs">{{ getFormattedTime(post.createdAt)  }}</p>
    </div>
</template>

<script setup lang="ts">
import { getFormattedTime } from '@/utils/functions/get-formatted-time';
import { PostProps } from './Post.vue';

defineProps<PostProps>()
</script>

<style scoped>

</style>