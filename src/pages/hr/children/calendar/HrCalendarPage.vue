<template>
  <div class="hr-calendar-page">
    <div class="flex w-full items-center justify-between">
      <p class="w-[45%] font-bold mb-4">
        Чтобы назначать встречи с соискателями или использовать календарь,
        необходимо войти в аккаунт Google. Встречи будут автоматически
        синхронизироваться с вашим календарем
      </p>
      <div class="flex space-x-2">
        <Button severity="secondary" outlined v-if="!calendarID">Войти</Button>
        <Button severity="secondary" class="font-semibold text-hr-black" outlined @click="exportCalendar">Скачать .ics</Button>
        <BaseButton
          @click="isAddSlots = !isAddSlots"
          label="Добавить слоты для интервью"
          leftIcon="icon-[outlined/plus]"
        />
      </div>
    </div>
    <iframe id="calendarFrame" v-if="calendarID" :src="getIframeSrc()" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
  </div>

  <Dialog
    :visible="dialogVisible"
    header="Войти в профиль"
    modal
    closable
    :draggable="false"
  >
    <div class="flex w-[27vw] flex-col space-y-4 justify-center items-center">
      <p class="w-[80%] text-center">
        Для работы с календарем и автоматического назначения встреч с
        кандидатами необходимо войти в аккаунт Google
      </p>

      <BaseButton @click="switchDialogVisible">Войти</BaseButton>
    </div>
  </Dialog>

  <Dialog 
  header="Назначить доступные слоты для интервью"
  :closable="true"
  :draggable="false"
  v-model:visible="isAddSlots"
  >
    <div class="flex flex-col space-y-6 z-5 justify-center items-center">
        <div class="flex flex-row space-x-6">
        <div class="flex-auto">
            <label for="calendar-timeonly" class="font-bold block mb-2">Время начала</label>
            <Calendar id="slot" v-model="startTime" timeOnly />
        </div>
        <div class="flex-auto">
            <label for="calendar-timeonly" class="font-bold block mb-2">Время конца</label>
            <Calendar id="slot" v-model="endTime" timeOnly  />
        </div>
        </div>
        <div class="flex flex-row space-x-6">
           <div class="flex-auto">
              <label for="calendar-timeonly" class="font-bold block mb-2">Длительность интервью</label>
              <InputNumber v-model="durationSlots" showButtons  :min="15" :max="120" :step="15" />
           </div>
           <div class="flex-auto">
              <label for="calendar-timeonly" class="font-bold block mb-2">Перерыв между интервью</label>
              <InputNumber v-model="breakTime" showButtons  :min="5" :max="30" :step="5" />
           </div>
        </div>
        <div class="flex justify-between w-full">
            <div class="w-[35%]">
                <p class="font-bold">
                    Выберите одну или несколько дат
                </p>
            </div>
            <div>
                <Calendar v-model="days" selectionMode="multiple" :manualInput="false" dateFormat="dd-mm-yy" />
            </div>
        </div>
        <BaseButton :disabled="formDisabled" @click="createSlots">Назначить</BaseButton>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
  import { useHrCalendarStore } from '@/stores/modules/hr/hr-calendar-store'
  import { storeToRefs } from 'pinia'
  import Dialog from 'primevue/dialog'
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Calendar from 'primevue/calendar';
  import InputNumber from 'primevue/inputnumber';
import { createSlotsRequest, exportCalendarRequest, ICreateSlotsRequestParams } from '@/stores/types/schema'
import fromat, { format } from 'date-fns';
import saveFile from '@/utils/functions/save-file';
  const $store = useHrCalendarStore()

  const calendarID = ref();

  const dialogVisible = ref<boolean>()

  const isAddSlots = ref<boolean>(false);

  const startTime = ref<Date| null>(new Date());

  const endTime = ref<Date| null>(new Date());

  const durationSlots = ref<number | null>(15);

  const breakTime = ref<number | null>(5);

  const days = ref<Date[]>([]);

  const formDisabled = ref<boolean>(false);

  const $router = useRouter();


  const createSlots = async () => {
    formDisabled.value = true;
    console.log(days.value.map(date => date.toLocaleDateString()));
    
   if(startTime.value && endTime.value && durationSlots.value && breakTime.value) {
    const requestBody: ICreateSlotsRequestParams = {
        start_time: format(startTime.value, 'HH:mm'),
        end_time: format(endTime.value, 'HH:mm'),
        slot_duration: +durationSlots.value,
        break_duration: +breakTime.value,
        days: days.value.map(date => date.toLocaleDateString()),
        is_create_meet: true,
    }
    console.log(startTime);
    const response = await createSlotsRequest(requestBody);
    console.log(response);
    const calendarFrame = document.querySelector<any>('#calendarFrame');
    calendarFrame.src = calendarFrame.src;
    clearRefs();
    formDisabled.value = false;
    isAddSlots.value = false;
   }

  }


    const clearRefs = () => { 
        startTime.value = null;
        endTime.value = null;
        durationSlots.value = null;
        breakTime.value = null;
        days.value = [];
    }


  const switchDialogVisible = () => {
    dialogVisible.value = !dialogVisible.value
    loginGoogle()
  }


  const getIframeSrc = () => { 
    const src = `https://calendar.google.com/calendar/embed?src=${calendarID.value}&ctz=Asia%2FMoscow`
    return src
  }

  const $route = useRoute()

  const loginGoogle = async(code?: string|null|undefined) => { 
    if(code) {
        const res = await $store.calnedarLogin(code)
        console.log(res);
        const calendarId = await $store.getCalendarId();
        console.log(calendarId?.response?.calendarId);
        calendarID.value = calendarId?.response?.calendarId;
        localStorage.setItem('venari-calendar-id', calendarID.value);
        $router.replace({'query': undefined})
      } else { 
        const res = await $store.calnedarLogin()
        console.log(res);
        window.location = res.response.message
      } 
  }


  const exportCalendar = async () => {
    const data = await exportCalendarRequest()
    console.log(data.data);
    const file = new Blob([data.data], { type: "text/calendar" });
    const url = window.URL.createObjectURL(file);
    saveFile(url, "export-calendar-venari.ics");
    window.URL.revokeObjectURL(url);
    
  }


  onMounted(async () => {
    if ($route.query.code) {
      dialogVisible.value = false
      loginGoogle(String($route.query.code))
    } else {
     if(localStorage.getItem('venari-calendar-id')) {
        dialogVisible.value = false;
        calendarID.value = localStorage.getItem('venari-calendar-id');
     } else { 
        dialogVisible.value = true;
     }
    }
  })
</script>

<style lang="scss">
  .hr-calendar-page {
    @apply w-full mt-5;
  }

  :deep(.p-dialog-header) {
    @apply flex justify-evenly;
  }

  .p-dialog-header {
    @apply flex-1 justify-center;
  }

  iframe {
    width: 100%;
    filter:  saturate(0.9) hue-rotate(18deg);
  }
</style>
