<template>
  <div class="hr-calendar-page">
    <div class="flex w-full items-center justify-between">
      <p class="w-[25%] font-medium">
        Чтобы назначать встречи с соискателями или использовать календарь,
        необходимо войти в аккаунт Google. Встречи будут автоматически
        синхронизироваться с вашим календарем
      </p>
      <div class="flex space-x-2">
        <Button severity="secondary" outlined v-if="!calendarID">Войти</Button>
        <BaseButton
          label="Добавить слоты для интервью"
          leftIcon="icon-[outlined/plus]"
        />
      </div>
    </div>
    <iframe v-if="calendarID" :src="getIframeSrc()" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
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
</template>

<script setup lang="ts">
  import { useHrCalendarStore } from '@/stores/modules/hr/hr-calendar-store'
  import { storeToRefs } from 'pinia'
  import Dialog from 'primevue/dialog'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'


  const $store = useHrCalendarStore()

  const calendarID = ref();

  const dialogVisible = ref<boolean>()

  const isAddSlots = ref<boolean>();

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
      } else { 
        const res = await $store.calnedarLogin()
        console.log(res);
        window.location = res.response.message
      } 
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
