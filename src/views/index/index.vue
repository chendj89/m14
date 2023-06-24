<template>
  <div>
    <n-button type="primary">添加路由</n-button>
    <n-button @click="addRoute">虚拟节点1</n-button>
  </div>
</template>
<script lang="ts" setup name="Index">
import loadVirtual from '@/virtual'
import { useRouter } from 'vue-router'
const router = useRouter()
/**
 * 添加动态路由
 */
const addRoute = () => {
  const name = 'virtual1'
  if (!router.hasRoute(name)) {
    loadVirtual({ name })
  }
  router.push(name)
}
</script>

<style scoped></style>
