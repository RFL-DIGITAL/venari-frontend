<template>
  <Tabs :value="modelValue">
    <swiper :space-between="7" slidesPerView="auto">
      <swiper-slide class="!w-fit" v-for="item in tabs" :key="item.label">
        <BaseTab v-bind="{ ...item }"/>
      </swiper-slide>
    </swiper>
  </Tabs>
</template>

<script setup lang="ts">
  import type { BaseTab } from './BaseTab.vue'

  interface Props {
    tabs: BaseTab[]
    modelValue: string
  }

  defineProps<Props>()

  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'

  import { Swiper, SwiperSlide } from 'swiper/vue'

  import { ref } from 'vue'
</script>
