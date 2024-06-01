import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { baseURL, devApiUrl } from 'src/utils/services/config.js'
import { useRoute } from 'vue-router'


export const useAuthStore = defineStore('authStore', () => {

    const user = ref('user')


  return {
    user,
  }
})