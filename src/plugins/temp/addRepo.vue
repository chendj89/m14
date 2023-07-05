<template>
  <div class="temp">
    <Form2 ref="form2Ref"></Form2>
    <n-button @click="submit">确定</n-button>
  </div>
</template>

<script setup lang="ts" name="AddRepo">
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
