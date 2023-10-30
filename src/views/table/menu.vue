<template>
  <div>
    <div class="box" :style="boxStyle">
      <div
        class="box-cell"
        v-for="(item, index) in grid"
        :key="index"
        :style="item.style"
      >
        <TdCanvas class="box-canvas" v-if="item.icon == 'canvas'"></TdCanvas>
        <img v-else class="box-img" :src="item.icon" alt="" />
      </div>
    </div>
    <div class="box" :style="boxStyle">
      <div
        class="box-cell"
        v-for="(item, index) in grid2"
        :key="index"
        :style="item.style"
      >
        <img v-if="item.icon" class="box-img" :src="item.icon" alt="" />
        <video
          autoplay
          muted
          playsinline
          loop
          v-else-if="item.video"
          class="box-img box-video"
          :src="item.video"
        ></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TableMenu">
import TdCanvas from './td/index'
import gif from './c.gif'
const createRect = (
  { left = 0, col = 1, top = 0, row = 1 },
  { gap = 10, size = 40, border = 10, isContainer = false, unit = null }
) => {
  let oLeft = left * (gap + size)
  let oTop = top * (gap + size)
  let oWidth = col * size + (col - 1) * gap
  let oHeight = row * size + (row - 1) * gap
  let result: Record<string, any> = {
    left: oLeft,
    top: oTop,
    width: oWidth,
    height: oHeight
  }
  if (isContainer) {
    result.width += border * 2
    result.height += border * 2
  }
  if (unit) {
    for (let attr in result) {
      result[attr] = result[attr] + unit
    }
  }
  return result
}

let grid = [
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    extend: {
      type: 'user',
      iconType: 'http'
    },
    rect: {
      left: 0,
      top: 0,
      col: 1,
      row: 1
    },
    children: [
      {
        name: '双刃战意',
        icon: '',
        link: '',
        rect: {
          left: 0,
          rop: 0,
          col: 1,
          row: 1
        }
      }
    ]
  },
  {
    name: '九转灵山',
    icon: 'canvas',
    link: 'https://chendj89.github.io',
    rect: {
      left: 1,
      top: 0,
      col: 5,
      row: 2
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 6,
      top: 0,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 0,
      top: 1,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 0,
      top: 2,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 1,
      top: 2,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 2,
      top: 2,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 3,
      top: 2,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 4,
      top: 2,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 5,
      top: 2,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 6,
      top: 1,
      col: 1,
      row: 1
    }
  },
  {
    name: '九转灵山',
    icon: 'https://avatars.githubusercontent.com/u/105529957',
    link: 'https://chendj89.github.io',
    rect: {
      left: 6,
      top: 2,
      col: 1,
      row: 1
    }
  }
]
const container = {
  rect: {
    left: 0,
    top: 0,
    col: 7,
    row: 3
  }
}
let boxStyle = createRect(container.rect, { isContainer: true, unit: 'px' })
for (let i = 0; i < grid.length; i++) {
  let gridItem = grid[i]
  gridItem.style = createRect(gridItem.rect, { unit: 'px' })
}
const grid2 = [
  {
    icon: 'https://avatars.githubusercontent.com/u/11247099?v=4',
    rect: {
      left: 0,
      top: 0,
      col: 2,
      row: 2
    }
  },
  {
    video:
      'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/scene/c54460f10e8e2f2fa06c5d8c9d2aab08_preview.mp4',
    rect: {
      left: 2,
      top: 0,
      col: 5,
      row: 2
    }
  },
  {
    rect: {
      left: 0,
      top: 2,
      col: 1,
      row: 1
    }
  },
  {
    rect: {
      left: 1,
      top: 2,
      col: 1,
      row: 1
    }
  },
 
]
for (let i = 0; i < grid2.length; i++) {
  let gridItem = grid2[i]
  gridItem.style = createRect(gridItem.rect, { unit: 'px' })
}
</script>

<style lang="scss" scoped>
.box {
  display: inline-block;
  position: relative;
  border: 10px solid #fff;
  background: #fff;
  margin: 10px;
  border-radius: 4px;
  &-cell {
    position: absolute;
    background-color: seagreen;
    border-radius: 4px;
  }
  &-img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  &-canvas {
    width: 100%;
    height: 100%;
  }
  &-video {
    object-fit: cover;
  }
}
</style>
