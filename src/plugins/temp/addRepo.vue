<template>
  <div class="temp">
    <Grid style="margin-top: 20px" :col="7" :row="3" :size="40"></Grid>
    <div class="drag">
      <div
        class="drag-ele"
        draggable="true"
        @dragstart="dragstart($event, 'bi-cpu')"
      >
        <BiCpu></BiCpu>
      </div>
      <div
        class="drag-ele"
        draggable="true"
        @dragstart="dragstart($event, 'bi-messenger')"
      >
        <BiMessenger></BiMessenger>
      </div>
      <div
        class="drag-ele"
        draggable="true"
        @dragstart="dragstart($event, 'MenuIcon')"
      >
        <MenuIcon
          skeleton
          src="https://avatars.githubusercontent.com/u/105529957"
        ></MenuIcon>
      </div>
    </div>
    <n-button style="margin-top: 10px" @click="submit">确定</n-button>
  </div>
</template>

<script setup lang="ts" name="AddRepo">
import MenuIcon from '@/views/table/coms/menuIcon'
import Grid from '@/components/grid'
import Form2 from './form'
const form2Ref: any = ref(null)
import BiCpu from '~icons/bi/cpu'
import BiMessenger from '~icons/bi/messenger'
console.log(BiCpu)
const submit = () => {
  // form2Ref.value.thatRef.validator()
  console.log(form2Ref.value.listRef)
}
const dragstart = (event, icon) => {
  if (icon == 'bi-cpu') {
    event.dataTransfer.setData('text/plain', {
      id: 0,
      type: 'bi/cpu',
      ele: BiCpu
    })
  } else if (icon == 'bi/message') {
    event.dataTransfer.setData('text/plain', {
      id: 0,
      type: 'bi/cpu',
      ele: BiMessenger
    })
  } else if (icon == 'MenuIcon') {
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        id: 0,
        type: 'MenuIcon',
        ele: 'https://avatars.githubusercontent.com/u/105529957'
      })
    )
  }
}
</script>

<style lang="scss" scoped>
.temp {
  padding: 16px;
}
.drag {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  &-ele {
    display: inline-flex;
  }
}
</style>
