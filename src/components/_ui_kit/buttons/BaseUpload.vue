<template>
  <FileUpload
    mode="basic"
    accept="image/*"
    customUpload
    :uploadLabel="label"
    :label="label"
    :chooseLabel="label"
    @select="fileUpload"
  />
</template>

<script setup lang="ts">
  import { FileUploadSelectEvent } from 'primevue/fileupload'
  import { computed } from 'vue'

  type FileType = string | ArrayBuffer | null

  interface Props {
    files: FileType
    label: string
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:file', value: FileType): void
  }>()

  const fileUpload = async (event: FileUploadSelectEvent) => {
    event.files.forEach(async (_file: any) => {
      const reader = new FileReader()
      let blob = await fetch(_file.objectURL).then((r) => r.blob()) //blob:url

      reader.readAsDataURL(blob)

      reader.onloadend = function () {
        const base64data = reader.result

        _files.value = base64data
      }
    })
  }

  const _files = computed<FileType>({
    get() {
      return props.files
    },
    set(value: FileType) {
      $emit('update:file', value)
    },
  })
</script>

<style lang="scss" scoped>
  :deep(.p-fileupload-choose) {
    @apply text-gray p-0 flex space-x-2 items-center;
    box-shadow: none !important;
    background: transparent !important;
    border: none !important;

    .p-button-label {
      @apply text-red text-xs underline max-w-[50px];
    }

    svg {
      display: none;
    }
  }

  :deep(.p-fileupload-choose:not(:disabled):hover),
  :deep(.p-fileupload-choose:not(:disabled):active) {
    @apply text-black;
    background: transparent;
  }
</style>
