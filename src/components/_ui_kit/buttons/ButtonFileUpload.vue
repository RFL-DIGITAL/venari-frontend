<template>
  <FileUpload
    mode="basic"
    accept="image/*"
    customUpload
    multiple
    @select="fileUpload"
  />
</template>

<script setup lang="ts">
import { FileUploadSelectEvent } from 'primevue/fileupload';
import { computed } from 'vue';

  type FileType = string | ArrayBuffer | null

  interface Props {
    files: FileType[]
  }

  const props = withDefaults(defineProps<Props>(),{
    files: () => [],
  })

  const $emit = defineEmits<{
    (e: 'update:files', value: FileType[]): void
  }>()

  const fileUpload = async (event: FileUploadSelectEvent) => {
    event.files.forEach(async (_file: any) => {
      const reader = new FileReader()
      let blob = await fetch(_file.objectURL).then((r) => r.blob()) //blob:url
  
      reader.readAsDataURL(blob)
  
      reader.onloadend = function () {
        const base64data = reader.result
  
        console.log(_files.value)
        _files.value = [..._files.value, base64data]
      }
    });
  }

  const _files = computed<FileType[]>({
    get() {
      return props.files
    },
    set(value: FileType[]) {
      console.log(value)
      $emit('update:files', value)
    },
  })
</script>

<style lang="scss" scoped>
:deep(.p-fileupload-choose) {
  @apply text-gray p-0;
  box-shadow: none !important;
  background: transparent !important;
  border: none !important;

  .p-button-label {
    display: none;
  }

  svg {
    @apply m-0 icon-[outlined/file-pin] w-[30px] h-[30px];
  }
}

:deep(.p-fileupload-choose:not(:disabled):hover),
:deep(.p-fileupload-choose:not(:disabled):active) {
  @apply text-black;
  background: transparent;
}
</style>
