<template>
  <div class="list-container relative">
    <slot name="default"></slot>

    <div ref="interceptor" class="absolute bottom-0 w-full h-[600px]" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  interface Props {
    perPage: number
    total: number
    to: number
  }

  defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'intersect'): void
  }>()

  const setObserver = () => {
    const options = {
      root: null,
      threshold: 0.01,
    }
    const observer = new IntersectionObserver(handleIntersect, options)
    const interceptorElement = interceptor.value as Element
    observer.observe(interceptorElement)
  }

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if (entry.isIntersecting /* total !== to */) {
      $emit('intersect')
    }
  }

  const interceptor = ref<HTMLElement | null>(null)

  onMounted(() => {
    setObserver()
  })
</script>

<style scoped></style>
