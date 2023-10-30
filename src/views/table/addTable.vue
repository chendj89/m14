<template>
  <div>
    <div>add</div>
    <div ref="boxRef" class="box" @mouseenter="start" @mouseleave="stop">
      <div
        v-for="(ball, index) in ballList"
        :key="index"
        :class="['ball', { active: ball.cls }]"
        :style="{
          width: ball.size + 'px',
          height: ball.size + 'px',
          left: ball.x + 'px',
          top: ball.y + 'px',
          transform: ball.transform,
          borderRadius: ball.radius + 'px'
        }"
      >
        <img class="ball-img" :src="ball.text" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="AddTable">
import { usePluginDialog, usePluginApp } from '@/plugins/usePluginDialog'
import addRepo from '@/plugins/temp/addRepo.vue'
import { useBallAnimation } from '@/components/grid/animation/ts'
const boxRef = ref(null)
const { data, render, clear, init, start, stop } = useBallAnimation(15)
const ballList: typeof data = ref([])
onMounted(() => {
  init(boxRef.value)
  ballList.value = data.value
  nextTick(() => {
    render()
  })
})
// let dialog2 = usePluginDialog()
// dialog2({
//   tpl: addRepo,
//   opts: {
//     title: '添加仓库'
//   }
// })
const oApp = usePluginApp()
oApp({
  tpl: addRepo,
})
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: 312px;
  height: 136px;
  overflow: hidden;
  background: rgba(#000,0.75);
  border-radius: 4px;
}
.ball {
  position: absolute;
  // background: green;
  z-index: 88888;
 
  &.active {
    // background: #ff5c00;
  }
  &.pp {
    // background: blueviolet;
  }
  &-img {
    display:block;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
