<template>
  <div>add</div>
</template>

<script setup lang="ts" name="AddTable">
import { usePluginDialog, usePluginApp } from '@/plugins/usePluginDialog'
import addRepo from '@/plugins/temp/addRepo.vue'
let dialog2 = usePluginDialog()
// dialog2({
//   tpl: addRepo,
//   opts: {
//     title: '添加仓库'
//   }
// })
const oApp = usePluginApp()
oApp({
  tpl: addRepo
})
</script>

<style scoped></style>
