<template>
  <n-el style="padding: 50px" @click="onLogin"> login </n-el>
</template>

<script setup lang="ts" name="Login">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { UserState } from '@/store/types'
import useUserStore from '@/store/modules/user'
import { randomString } from '@/utils'
const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
const onLogin = () => {
  const data: any = {}
  data.nickName = '超级管理员'
  data.userName = 'admin'
  data.userId = 1
  data.roleId = 1
  data.token = randomString(100)
  data.roles = [
    {
      roleCode: 'ROLE_admin',
      roleId: 1,
      roleName: '超级管理员'
    }
  ]
  userStore.saveUser(data as UserState).then(() => {
    router
      .replace({
        path: route.query.redirect ? (route.query.redirect as string) : '/'
      })
      .then(() => {
        loading.value = false
      })
  })
}
onLogin()
</script>

<style lang="scss" scoped></style>
