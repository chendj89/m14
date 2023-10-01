<template>
  <div>
    <Grid></Grid>
  </div>
</template>
<script lang="ts" setup name="Index">
import loadVirtual from '@/virtual'
import { useRouter } from 'vue-router'
import Grid from '@/components/grid'
const router = useRouter()
/**
 * 添加动态路由
 */
const addRoute = () => {
  const name = 'virtual'+new Date().getSeconds()
  if (!router.hasRoute(name)) {
    loadVirtual({
      name,
      meta: {
        title: '动态路由' + new Date().getSeconds(),
        isForce:true
      }
    })
  }
  router.push(name)
}
</script>

<style scoped></style>
