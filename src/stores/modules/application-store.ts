import { defineStore } from 'pinia'
import { Application, ApplicationShort, getApplicationsRequest, getHrApplicationRequest } from '../types/schema'
import { ref } from 'vue'

export const useApplicationStore = defineStore('applicationStore', () => {

  const applications = ref<ApplicationShort[]>([])
  const application = ref<Application>()

  const getApplications = async (code: string) => {
    const { data } = await getApplicationsRequest(code)

    applications.value = data.response
  }

  const getApplication = async (applicationId: number) => {
    const { data } = await getHrApplicationRequest(applicationId)

    application.value = data.response
  }

  return {
    applications,
    application,
    getApplication,
    getApplications,
  }
})
