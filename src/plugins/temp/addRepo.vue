<template>
  <div class="temp">
    <Grid style="margin-top: 20px" :col="7" :row="3" :size="40"></Grid>
    <n-button style="margin-top: 40px;" @click="submit">确定</n-button>
  </div>
</template>

<script setup lang="ts" name="AddRepo">
import Grid from '@/components/grid'
import Form2 from './form'
const form2Ref: any = ref(null)
const submit = () => {
  // form2Ref.value.thatRef.validator()
  console.log(form2Ref.value.listRef)
}
</script>

<style lang="scss" scoped>
.temp {
  padding: 16px;
}
</style>
