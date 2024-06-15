import { defineStore } from 'pinia'
import { getResumeByIdRequest, Resume } from '../types/schema'
import { computed, ref } from 'vue'

export const useResumeStore = defineStore('resumeStore', () => {
  const resume = ref<Resume | null>()

  const getResume = async (resumeId: number) => {
    const { data } = await getResumeByIdRequest(resumeId)

    resume.value = data.response
  }

  return {
    resume,
    getResume,
  }
})
