<template>
  <div class="grid">
    <MenuCard :info="list"></MenuCard>
  </div>
</template>

<script setup lang="ts" name="Fun">
import MenuCard from './menuCard'

const list = ref([
  {
    name: 'vue',
    icon: 'https://api.iconify.design/logos:vue.svg?color=%2310b981',
    url: 'https://cn.vuejs.org/',
    children: [
      {
        name: 'pinia',
        icon: 'https://www.naiveui.com/assets/naivelogo-93278402.svg',
        url: 'https://pinia.vuejs.org/zh/'
      },
      {
        name: 'pinia',
        icon: 'https://avatars.githubusercontent.com/u/105529957',
        url: 'https://pinia.vuejs.org/zh/'
      },
      {
        name: 'pinia',
        icon: 'https://api.iconify.design/twemoji:zany-face.svg',
        url: 'https://pinia.vuejs.org/zh/'
      }
    ]
  },
  {
    name: 'vite',
    icon: 'https://api.iconify.design/vscode-icons:file-type-vite.svg',
    url: 'https://cn.vitejs.dev/',
    children: [
      {
        name: 'pinia',
        icon: 'https://api.iconify.design/line-md:image-twotone.svg?color=%231a7f37',
        url: 'https://pinia.vuejs.org/zh/'
      },
      {
        name: 'pinia',
        icon: 'https://p11.douyinpic.com/aweme/200x200/aweme-avatar/tos-cn-avt-0015_359f46e359567d7bc0cfd279cd2d376f',
        url: 'https://www.douyin.com/user/MS4wLjABAAAAvRTJJLAhIKm_WHqpmpc4iG4w_JbWcxobGdAiMfP5zJPms_cSusbsSD0e0m3ZbPn0?is_search=0&list_name=follow&nt=1'
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 16px;
  padding: 16px 0;
  max-width: 296px * 4 + 12px * 5;
  margin: 0 auto;
}
.menu {
  $width: 296px;
  $gap: 8px;
  display: inline-block;
  padding: $gap;
  background: #fff;
  width: $width;
  min-height: $width * 0.6;
  border-radius: $gap * 0.5;
  // width:createGrid(8px,40px,6,1);
  &-box {
    display: none;
  }
  &-banner {
    display: block;
    width: 100%;
    height: 130px;
    border-radius: $gap * 0.5;
    background-image: url('@/assets/imgs/a2.png');
    background-size: cover;
    background-position: center center;
    overflow: hidden;
    &-content {
      display: block;
      width: 100%;
      height: 100%;
      // background-color: rgba(#fff, 0.25);
      // backdrop-filter: blur(2px);
    }
  }
  &-content {
    padding-top: $gap;
  }
  &-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: rgba(#41b883, 0.2);
    // #44bb84
    border-radius: $gap * 0.5;
    &-icon {
      display: block;
      width: 60%;
    }
  }
}
</style>
