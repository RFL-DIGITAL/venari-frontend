<template>
  <swiper
    class="base-swiper"
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    v-bind="slides.length > 1 ? { pagination: { clickable: true } } : undefined"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(slide, i) in slides" :key="i" class="!h-fit">
      <Image :src="slide.image" alt="logo"/>
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import type { Image } from '@/stores/types/schema'

  interface BaseSwiperProps {
    slides: Image[]
  }

  const props = withDefaults(defineProps<BaseSwiperProps>(), {
    slides: () => [],
  })

  import { Navigation, Pagination } from 'swiper/modules'

  import { Swiper, SwiperSlide } from 'swiper/vue'

  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'

  const onSwiper = (swiper: any) => {
    if(props.slides.length < 2)
      console.log(Pagination)
  }
  const onSlideChange = () => {
  }

  const modules = [Navigation, Pagination]

  const slidesLenght = computed(() => props.slides.length)
</script>

<style lang="scss">
  .base-swiper {
    @apply h-full ;

    .swiper-pagination {
      @apply rounded-full flex items-center justify-center;
      width: calc(16px + v-bind(slidesLenght) * 16px) !important;
      height: 24px;
      left: calc(50% - calc(16px + v-bind(slidesLenght) * 16px) / 2) !important;
      background-color: #2525258c;
    }
  
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background-color: var(--white);
      opacity: 0.3;
      transform: none !important;
    }
  
    .swiper-pagination-bullet-active {
      opacity: 1;
    }
  
    .swiper-slide  {
      @apply select-none h-fit flex justify-center;
      
      :deep(img) {
        object-fit: cover;
  
      }
    }
  
    .swiper-button-prev::after, .swiper-button-next::after {
      content: none;
    }
  
    .swiper-button-next, .swiper-button-prev {
      @apply bg-gray w-[35px] h-[35px] rounded-full;
    }
  
    .swiper-button-next::before {
      @apply icon-[outlined/arrow-forward];
    }
  
    .swiper-button-prev::before {
      @apply icon-[outlined/arrow-backward];
    }
  
    .swiper-button-next::before, .swiper-button-prev::before {
      left: calc(50% - 10px) !important;
      position: absolute;
      content: '';
      @apply text-white w-[20px] h-[20px];
    }
  }


</style>
