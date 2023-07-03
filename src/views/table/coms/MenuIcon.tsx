import { defineComponent, ref, watch, h } from 'vue'
import {
  getThemeByBase64,
  saveSrc,
  createImageTheme
} from '@/views/table/utils'
import { NSkeleton } from 'naive-ui'
export default defineComponent({
  name: 'MenuIcon',
  props: {
    /**
     * svg格式或者链接图片
     */
    src: {
      type: String,
      required: true
    },
    skeleton: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number || String,
      default: 40
    },
    padding: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    let timer: any = null
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
    const updateSrc = async (src: string) => {
      if (src.startsWith('<svg')) {
        let themes = await getThemeByBase64(src)
        theme.value = ref({
          ...createImageTheme({
            theme: themes,
            content: src,
            blob: {
              size: 0,
              type: ''
            }
          })
        }).value
      } else {
        const localSrc = localStorage.getItem(src)
        if (localSrc) {
          theme.value = ref(JSON.parse(localSrc)).value
        } else {
          const oTheme = await saveSrc(src)
          theme.value = ref(oTheme).value
        }
      }
      clearTimer()
      loading.value.skeleton = true
      loading.value.start = `rgba(${theme.value.r},${theme.value.g},${theme.value.b},0.2)`
      loading.value.end = `rgba(${theme.value.r},${theme.value.g},${theme.value.b},0.5)`
      timer = setTimeout(() => {
        loading.value.skeleton = false
      }, 1000)
    }
    const theme: any = ref({
      hex: '',
      r: '',
      g: '',
      b: '',
      theme: '',
      content: ''
    })
    const loading = ref({
      skeleton: !!props.skeleton,
      start: '',
      end: ''
    })

    updateSrc(props.src)
    watch(
      () => props.src,
      (newSrc) => {
        updateSrc(newSrc)
      }
    )
    return {
      theme,
      loading
    }
  },
  render() {
    const size = typeof this.size === 'number' ? `${this.size}px` : this.size
    if (this.loading.skeleton) {
      return h(NSkeleton, {
        sharp: false,
        style: {
          display: 'inline-block',
          width: size,
          height: size,
          '--n-color-start': this.loading.start,
          '--n-color-end': this.loading.end
        }
      })
    }
    const style: any = {
      '--borderRadius': '4px',
      '--size': size,
      '--backgroundColor': `rgba(${this.theme.r},${this.theme.g},${this.theme.b},0.25)`
    }
    if (this.theme.content.startsWith('<svg')) {
      return h('div', {
        innerHTML: this.theme.content,
        style: style
      })
    } else {
      return h(
        'div',
        {
          style: style
        },
        h('img', {
          src: this.theme.content
        })
      )
    }
  }
})
