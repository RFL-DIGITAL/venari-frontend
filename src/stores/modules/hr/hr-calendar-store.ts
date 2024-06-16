import { defineStore } from 'pinia'
import { HrFilters, ICreateSlotsRequestParams, calendarLoginRequest, createSlotsRequest, getCalendarIdRequest, getHrFilterRequest } from '@/stores/types/schema'
import { ref } from 'vue'

export const useHrCalendarStore = defineStore('hrCalendarStore', () => {
  const calendarId = ref<string | null>()

  const isGoogleAuth = ref<boolean>(false);


  const calnedarLogin = async (code?: string|null) => {

    const { data } = await calendarLoginRequest(code);
    return data;
  }

  const getCalendarId = async () => {
    const { data } = await getCalendarIdRequest();
    return data;
   }

   const createSlots = async (body: ICreateSlotsRequestParams) => { 
     const { data } = await createSlotsRequest(body);
     return data;
   }
 
  return {
    calendarId,
    isGoogleAuth,
    calnedarLogin,
    getCalendarId,
    createSlots
  }
})