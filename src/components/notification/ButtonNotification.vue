<template>
  <Button
    text
    plain
    aria-label="Notification"
    class="icon button-notification sm:!pt-[10px] !pt-[6px] sm:!pr-[15px] !pr-[5px]"
  >
    <div class="flex items-center justify-center relative">
      <i class="w-[26px] h-[30px] text-black icon-[outlined/notification]" />
      <div
        class="absolute sm:-top-[8px] -top-[6px] sm:-right-[15px] -right-[5px] bg-red !w-[20px] !h-[20px] !text-xs text-white rounded-full flex items-center justify-center leading-[12px]"
      >
        3
      </div>
    </div>
  </Button>
</template>

<script setup></script>
