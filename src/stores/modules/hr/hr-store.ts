import { defineStore } from 'pinia'
import { HrFilters, getHrFilterRequest } from '@/stores/types/schema'
import { ref } from 'vue'

export const useHrStore = defineStore('hrStore', () => {
  const filters = ref<HrFilters | null>()

  const getFilters = async () => {
    const { data } = await getHrFilterRequest()

    filters.value = data.response
    console.log(filters.value)
  }

  return {
    filters,
    getFilters,
  }
})
