<template>
  <div class="container">
    <div class="content">
      <Grid></Grid>
      <n-scrollbar style="max-height: 136px; width: 100px">
        <Grid :col="2" :row="8"></Grid>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts" name="Dialog">
import Grid from './grid'
</script>

<style lang="scss">
.container {
  padding: 10px;
}
.content {
  display: flex;
  justify-content: space-between;
  &-toolbox {
    background: #f1f1f1;
    width: 200px;
  }
}
</style>
