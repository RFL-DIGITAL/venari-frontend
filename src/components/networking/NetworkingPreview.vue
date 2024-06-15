<template>
  <div class="vacancy-preview">
    <NetworkingCard v-for="networking in networkings.slice(0,5)" :key="networking.id" :networking="networking" />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useNetworkingStore } from '@/stores/modules/networking-store'

  const { networkings } = storeToRefs(useNetworkingStore())
  const { getNetworkings } = useNetworkingStore()

  fetchData()

  function fetchData() {
    getNetworkings()
  }
</script>

<style scoped>
  .vacancy-preview {
    @apply flex flex-col gap-y-[15px];
  }
</style>
