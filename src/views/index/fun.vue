<template>
  <div class="grid">
    <!-- <div class="menu" v-for="item in [0]" :key="item">
      <div class="menu-banner"></div>
      <div class="menu-content" v-if="abc">
        <n-space style="gap: 8px 8px">
          <div class="menu-item">
            <img
              class="menu-item-icon"
              src="https://api.iconify.design/logos:vue.svg?color=%2310b981"
              alt=""
              id="img1"
            />
          </div>
          <n-skeleton :sharp="false" :width="40" :height="40"></n-skeleton>
          <n-skeleton :sharp="false" :width="40" :height="40"></n-skeleton>
          <n-skeleton :sharp="false" :width="40" :height="40"></n-skeleton>
          <n-skeleton :sharp="false" :width="40" :height="40"></n-skeleton>
          <n-skeleton :sharp="false" :width="40" :height="40"></n-skeleton>
        </n-space>
      </div>
    </div> -->
    <MenuCard :info="list"></MenuCard>
  </div>
</template>

<script setup lang="ts" name="Fun">
import MenuCard from './menuCard'

const list=ref([
  {
    name:"vue",
    icon:"https://api.iconify.design/logos:vue.svg?color=%2310b981",
    url:"https://cn.vuejs.org/",
    children:[
      {
        name:'pinia',
        icon:'https://pinia.vuejs.org/logo.svg',
        url:'https://pinia.vuejs.org/zh/'
      }
    ]
  },
  {
    name:"vite",
    icon:"https://api.iconify.design/vscode-icons:file-type-vite.svg",
    url:"https://cn.vitejs.dev/",
  }
])
// import ColorThief from 'colorthief'
// const abc = ref(false)

// fetch('https://api.iconify.design/logos:vue.svg?color=%2310b981')
//   .then((res) => res.blob())
//   .then((blob) => {
//     console.log('blob', blob)
//     if (blob.type == 'image/svg+xml') {
//       let reader: any = new FileReader()
//       reader.readAsText(blob, 'utf-8')
//       reader.onload = function () {
//         console.log(reader.result)
//         let img=new Image()
//         img.src=`data:image/svg+xml;base64,${window.btoa(
//           unescape(encodeURIComponent(reader.result))
//         )}`
//         let color=new ColorThief()
//         // #44bb84
//         console.log(color.getPalette(img))
//       }
//     }
//   })
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
