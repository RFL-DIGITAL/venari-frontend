<template>
  <div class="chat-window">
    <ScrollPanel ref="scrollPanel" class="chat-window__scroll-panel">
      <div ref="observer" class="observer"></div>
      <ChatMessage
        v-for="(i, index) in messages"
        :key="index"
        :me="index % 3 === 1"
      />
    </ScrollPanel>
    <ChatInputBlock class="chat-window__input-block" />
  </div>
</template>

<script setup lang="ts">
  import ScrollPanel from 'primevue/scrollpanel'
  import { nextTick, onMounted, ref } from 'vue'

  const scrollPanel = ref<InstanceType<typeof ScrollPanel> | null>(null)
  let scrollPanelElement : HTMLElement | null = null
  const observer = ref<HTMLElement | null>(null)

  const messages = ref(['', '', '', '', '', ''])

  const fetchMoreData = () => {
    console.log('Fetch more data')
    addItems()
    // Ваша функция fetch здесь
  }

  const addItems = () => {
    if (scrollPanelElement) {
      const scrollTopBefore = scrollPanelElement.scrollHeight - scrollPanelElement.scrollTop

      // Добавляем новые элементы в начало списка
      const newItems = ['', '', '', '', '', '']
      messages.value = [...newItems, ...messages.value]

      // Восстанавливаем положение скролла
      nextTick(() => {
        scrollPanelElement!.scrollTop = scrollPanelElement!.scrollHeight - scrollTopBefore
      })
    }
  }

  onMounted(() => {
    if (scrollPanel.value) {
      scrollPanelElement = scrollPanel.value.$el.querySelector('.p-scrollpanel-content')
      scrollToBottom()
      initObserver()
    }
  })

  function scrollToBottom() {
    if (scrollPanel.value && scrollPanelElement) {
      scrollPanelElement.scrollTop = scrollPanelElement.scrollHeight
    }
  }

  function initObserver() {
    const options = {
      root: scrollPanelElement,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchMoreData()
        }
      })
    }, options)

    if (observer.value) {
      intersectionObserver.observe(observer.value)
    }
  }
</script>

<style scoped lang="scss">
  .chat-window {
    @apply h-full grid gap-y-[20px] relative overflow-hidden;

    &__scroll-panel {
      height: 100%;
      max-height: calc(100vh - 268px);
    }

    &__input-block {
      @apply absolute bottom-0 left-0 right-0 w-full bg-white h-[60px] items-end z-[10];
    }
  }

  :deep(.p-scrollpanel-bar) {
    @apply rounded;
    background: var(--extra-light-gray);
    opacity: 1;
    outline: none;
    outline-offset: 0;
  }

  :deep(.p-scrollpanel-wrapper) {
    @apply border-r-[15px] border-white;
  }

  .observer {
    @apply absolute w-full h-20;
  }
</style>
