<template>
  <!-- TODO: ПЕРЕДАТЬ ВЕЗДЕ ЮЗЕРОВ -->
  <routerLink :to="to" v-if="to">
    <img
      :src="image"
      shape="circle"
      class="user-avatar"
    />
  </routerLink>

  <img
    v-else
    :src="image"
    shape="circle"
    class="user-avatar"
  />
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from 'vue-router'
  import { Image } from '@/stores/types/schema'

  interface Props {
    image: string
    to?: RouteLocationRaw
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .user-avatar {
    @apply w-10 h-10 md:w-[58px] md:h-[58px] rounded-full;
    object-fit: cover;
  }
</style>
