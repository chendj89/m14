import { NSpace } from 'naive-ui'
import MenuIcon from './menuIcon'
import bg from '@/assets/imgs/a2.png'
export default defineComponent({
  name: 'MenuCard',
  props: {
    info: {
      type: Array,
      require: true
    }
  },
  setup() {
    const defaultContent = () => {
      return h('div', {
        class: 'menuCard-banner-content',
        style: `background-image:url(${bg})`
      })
    }
    const content: any = ref(defaultContent)
    let id: any = null
    const getMsg = (params: any) => {
      if (id !== params.id) {
        content.value = params.render
      }
    }
    const onMouseleaver = () => {
      content.value = defaultContent
      id = null
    }
    return {
      getMsg,
      content,
      onMouseleaver
    }
  },
  render() {
    return h('div', { class: 'menuCard', onMouseleave: this.onMouseleaver }, [
      h('div', { class: 'menuCard-banner' }, this.content?.()),
      h(
        'div',
        {
          class: 'menuCard-content'
        },
        [
          h(
            NSpace,
            {
              style:`gap:8px`
            },
            ()=>this.info?.map((item) =>
              h(MenuIcon, {
                onMouseenter: this.getMsg,
                user: item
              })
            )
          )
        ]
      )
    ])
  }
})

interface RGBColor {
  r: number
  g: number
  b: number
}

async function extractThemeColorsFromBase64(
  base64: string
): Promise<RGBColor[]> {
  const image = new Image()
  image.src = base64

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Failed to get canvas context'))
        return
      }

      context.drawImage(image, 0, 0)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const pixelData = imageData.data

      const colorCounts: { [color: string]: number } = {}

      // 遍历每个像素，计算颜色出现的次数
      for (let i = 0; i < pixelData.length; i += 4) {
        const r = pixelData[i]
        const g = pixelData[i + 1]
        const b = pixelData[i + 2]

        const color = `rgb(${r},${g},${b})`
        if (color !== 'rgb(0,0,0)' && color !== 'rgb(255,255,255)') {
          colorCounts[color] = (colorCounts[color] || 0) + 1
        }
      }

      // 找到出现次数最多的颜色
      const sortedColors = Object.keys(colorCounts).sort(
        (a, b) => colorCounts[b] - colorCounts[a]
      )

      const dominantColors: RGBColor[] = sortedColors.map((color) => {
        const [r, g, b] = color.match(/\d+/g)!.map(Number)
        return { r, g, b }
      })
      resolve(dominantColors.slice(0, 3))
    }

    image.onerror = () => {
      reject(new Error('Failed to load image'))
    }
  })
}

export function getColors(url: string) {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        if (blob.type == 'image/svg+xml') {
          let reader: any = new FileReader()
          reader.readAsText(blob, 'utf-8')
          reader.onload = function () {
            let img = new Image()
            img.crossOrigin = 'Anonymous'
            let base64 = `data:image/svg+xml;base64,${window.btoa(
              unescape(encodeURIComponent(reader.result))
            )}`
            img.src = `data:image/svg+xml;base64,${window.btoa(
              unescape(encodeURIComponent(reader.result))
            )}`
            extractThemeColorsFromBase64(base64).then((res) => {
              resolve(res)
            })
          }
        }
      })
  })
}
