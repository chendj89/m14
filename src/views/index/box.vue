<template>
  <div>box</div>
</template>

<script setup lang="ts" name="Box">
import { usePluginDialog } from '@/plugins/usePluginDialog'
import dialog from './hp/dialog.vue'
let dialog2 = usePluginDialog()
dialog2({
  tpl: dialog,
  opts: {
    title: '添加',
    width: '800px'
  }
})
</script>

<style scoped></style>
