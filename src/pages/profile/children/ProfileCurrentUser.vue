<template>
  <ProfileForm me :entity="user"/>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useProfileStore } from '@/stores/modules/profile-store'
  import useNotify from '@/utils/hooks/useNotify'

  const { getUser } = useProfileStore()
  const { user } = storeToRefs(useProfileStore())

  const $route = useRoute()

  const { notifyError } = useNotify()


  fetchData()
  async function fetchData() {
    await getUser(+$route.params.id).catch(notifyError)
  }
</script>

<style scoped></style>
