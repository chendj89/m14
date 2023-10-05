<template>
  <div>
    <!-- <Grid :size="40" :row="1"></Grid>
    <Grid style="margin-top: 20px" :size="40" :row="2"></Grid>
    <Grid style="margin-top: 20px" :size="40" :row="3"></Grid> -->
    <Grid style="margin-top: 20px" :col="6" :row="4" :size="40"></Grid>
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
  const name = 'virtual' + new Date().getSeconds()
  if (!router.hasRoute(name)) {
    loadVirtual({
      name,
      meta: {
        title: '动态路由' + new Date().getSeconds(),
        isForce: true
      }
    })
  }
  router.push(name)
}
// 开始拖拽
const drag = (event: any) => {
  event.dataTransfer.setData('btn', event.target.outerHTML)
}
</script>

<style scoped></style>
