<template>
  <router-view />
</template>

<script setup lang="ts">
  import { useHrStore } from '@/stores/modules/hr/hr-store'
  import useNotify from '@/utils/hooks/useNotify'

  const { getFilters } = useHrStore()
  const { notifyError } = useNotify()

  fetchData()
  function fetchData() {
    getFilters().catch(notifyError)
  }
</script>

<style scoped></style>
