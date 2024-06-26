<template>
  <div class="user-profile-card" v-if="entity">
    <div
      class="user-profile-card__background"
      :style="`background-image: url(${entity.preview?.image});`"
    />
    <div class="user-profile-card__content">
      <div class="user-profile-card__content__avatar-container">
        <EntityAvatar
          :entity="entity?.image?.image"
          class="absolute sm:top-[-58px] top-[-15px] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]"
        />
      </div>

      <div class="flex-col">
        <div class="sm:flex sm:mb-[7px] mb-[5px] gap-x-[10px] items-center">
          <p class="sm:text-lg font-semibold title-small">
            {{ getFullName(entity, 'full') }}
          </p>
          <p class="sm:text-base text-xs text-gray sm:mt-0 mt-[5px]">
            @{{ entity.userName }}
          </p>
        </div>
        <div class="flex mb-[10px]">
          <p class="sm:text-sm text-xs text-gray">
            Senior frontend-developer, Lucas Software
          </p>
        </div>
        <div class="sm:flex hidden gap-x-[10px]">
          <Chip
            :label="`${entity.postCount} ${getDeclensionText(entity.postCount, ['публикация', 'публикации', 'публикаций'])}`"
          />

          <Button class="p-0" plain text @click="cvDialogVisible = true">
            <i class="mr-[4px] w-[18px] h-[18px] icon-[outlined/notation]" />
            <span class="!text-xs">Посмотреть резюме</span>
          </Button>
        </div>
      </div>

      <div class="mt-auto sm:flex hidden flex-col items-center gap-y-[14px]">
        <Button text plain aria-label="Share" @click="handleShare">
          <div class="text-gray flex items-center gap-x-[10px]">
            <i
              class="w-[18px] h-[18px] icon-[outlined/share]"
            />
            <p class="text-xs font-medium">Поделиться профилем</p>
          </div>
        </Button>

        <RouterLink
          class="h-fit sm:flex hidden"
          :to="me ? { name: 'profile-resume.edit' } : { name: 'chats-active', params: { id: entity.id }, query: { chatType: 'message' } }"
        >
          <BaseButton v-if="me" label="Настройки профиля" />
          <BaseButton v-else label="Написать сообщение" />
        </RouterLink>
      </div>


    </div>
    <div class="flex justify-between items-center sm:hidden">
      <Button
        class="p-0 sm:hidden flex self-end"
        plain
        text
        @click="cvDialogVisible = true"
      >
        <i class="mr-[4px] w-[18px] h-[18px] icon-[outlined/notation]" />
        <span class="!text-xs">Посмотреть резюме</span>
      </Button>

      <div class="mt-auto flex flex-col items-center gap-y-[6px]">
        <Button text plain aria-label="Share" @click="handleShare">
          <div class="text-gray flex items-center gap-x-[5px]">
            <i
              class="sm:w-[14px] sm:h-[14px] w-[14px] h-[14px] icon-[outlined/share]"
            />
            <p class="text-xs font-medium">Поделиться профилем</p>
          </div>
        </Button>

        <RouterLink
          class="mt-auto h-fit w-[]"
          :to="
            me
              ? { name: 'profile-resume.edit' }
              : {
                  name: 'chats-active',
                  params: { id: entity.id },
                  query: { chatType: 'message' },
                }
          "
        >
          <BaseButton v-if="me" label="Настройки профиля" />
          <BaseButton v-else label="Написать сообщение" />
        </RouterLink>
      </div>

    </div>
  </div>

  <ProfileCvDialog v-if="cvDialogVisible" v-model:visible="cvDialogVisible" />
  <ShareDialog ref="shareDialog"/>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Company, User } from '@/stores/types/schema'

  import { getFullName } from '@/utils/functions/get-full-name'
  import { getDeclensionText } from '@/utils/functions/get-declension-text'

  import ShareDialog from '@/components/_ui_kit/ShareDialog.vue'

  interface Props {
    me: boolean
    entity: User | Company
  }

  defineProps<Props>()

  const cvDialogVisible = ref(false)

  const shareDialog = ref<InstanceType<typeof ShareDialog> | null>(null)

  async function handleShare() {
    await shareDialog.value?.open('Поделиться профилем', 'Ссылка на профиль')
  }
</script>

<style scoped lang="scss">
  .user-profile-card {
    @apply bg-white sm:p-[25px] p-[15px] rounded-[15px];
    &__background {
      @apply h-[180px] sm:mx-[-25px] mx-[-15px] sm:mt-[-25px] mt-[-15px] rounded-t-[15px];
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
    }

    &__content {
      @apply grid sm:pt-[20px] pt-[10px] sm:gap-x-[20px] gap-x-[15px];
      grid-template-columns: 150px auto max-content;

      &__avatar-container {
        @apply relative;
      }
    }
  }

  @media (max-width: 1024px) {
    .user-profile-card {
      @apply m-[15px];
      width: calc(100% - 30px);
      box-shadow: 4px 4px 44px 0px rgba(90, 90, 90, 0.25);

      &__content {
        grid-template-columns: 100px auto;
      }
    }
  }
</style>
