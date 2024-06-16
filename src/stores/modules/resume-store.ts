import { defineStore } from 'pinia'
import { getResumeByIdRequest, Resume, ResumeFilters, getResumeFiltersRequest, ResumeCreateRequestBody, postResumeCreateRequest } from '../types/schema'
import { computed, ref } from 'vue'

export const useResumeStore = defineStore('resumeStore', () => {
  const resume = ref<Resume | null>()

  const getResume = async (resumeId: number) => {
    const { data } = await getResumeByIdRequest(resumeId)

    resume.value = data.response
  }

  const filters = ref<ResumeFilters | null>()

  const getFilters = async () => {
    const { data } = await getResumeFiltersRequest()

    filters.value = data.response
  }

  const postResume = async (_body: ResumeCreateRequestBody) => {
    const { data } = await postResumeCreateRequest(_body)
    
  }

  return {
    resume,
    filters,
    getResume,
    getFilters,
    postResume,
  }
})
