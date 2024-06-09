<template>
  <swiper
    class="base-swiper"
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{
      clickable: true,
    }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(slide, i) in slides" :key="i">
      <Image src="/images/post.png" alt="logo"/>
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
  import { computed, onMounted } from 'vue'

  interface BaseSwiperProps {
    slides: any[]
  }

  const props = withDefaults(defineProps<BaseSwiperProps>(), {
    slides: () => ['1', '2', '3', '4', '5', '6', '7', '5', '6', '7'],
  })

  import { Navigation, Pagination } from 'swiper/modules'

  import { Swiper, SwiperSlide } from 'swiper/vue'

  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'

  const onSwiper = (swiper) => {
    /* console.log(swiper) */
  }
  const onSlideChange = () => {
    console.log('slide change')
    hideDots()
  }

  const modules = [Navigation, Pagination]

  const slidesLenght = computed(() => props.slides.length)
</script>

<style>
  .base-swiper {
    @apply sm:min-h-[450px] h-full ;
  }

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
    img {
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

</style>
