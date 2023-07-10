import { defineComponent, ref, watch, h } from 'vue'
import {
  getThemeByBase64,
  saveSrc,
  createImageTheme
} from '@/views/table/utils'
import { NButton, NSkeleton } from 'naive-ui'
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
      type: [Number, String],
      default: 40
    },
    padding: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props) {
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
      if (props.skeleton) {
        clearTimer()
        loading.value.skeleton = true
        loading.value.start = `rgba(${theme.value.r},${theme.value.g},${theme.value.b},0.1)`
        loading.value.end = `rgba(${theme.value.r},${theme.value.g},${theme.value.b},0.25)`
        timer = setTimeout(() => {
          loading.value.skeleton = false
        }, 1000)
      }
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
      skeleton: props.skeleton,
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
    if (this.loading.skeleton || !this.theme.content) {
      return h(NSkeleton, {
        sharp: false,
        style: this.loading.start
          ? {
              display: 'inline-block',
              width: size,
              height: size,
              '--n-color-start': this.loading.start,
              '--n-color-end': this.loading.end
            }
          : {
              display: 'inline-block',
              width: size,
              height: size
            }
      })
    }
    const style: any = {
      '--borderRadius': '4px',
      '--size': size,
      '--backgroundColor': `rgba(${this.theme.r},${this.theme.g},${this.theme.b},0.25)`
    }
    if (this.padding) {
      style['--padding'] = `${Number(this.padding)}px`
    }
    const rgb = `rgb(${this.theme.r},${this.theme.g},${this.theme.b})`
    if (this.theme.content.startsWith('<svg')) {
      return h(
        NButton,
        {
          ghost:true,
          style: `--n-width: 40px;--n-color: rgba(${this.theme.r},${this.theme.g},${this.theme.b},0.25);--n-padding: 0;--n-height:40px;--n-border-radius:4px;--n-ripple-color:${rgb}`
        },
        {
          default: () =>
            h('div', {
              class: 'menuCard-item',
              style: `width:40px;height:40px;border-radius:var(--n-border-radius);overflow: hidden;
              `,
              innerHTML: this.theme.content
            })
        }
      )

      return h('div', {
        innerHTML: this.theme.content,
        style: { ...style, width: size, height: size }
      })
    } else {
      return h(
        NButton,
        {
          color: `rgb(${this.theme.r},${this.theme.g},${this.theme.b})`,
          style: `--n-width: 40px; --n-padding: 0;--n-height:40px;--n-border-radius:4px;--n-ripple-color:${rgb}`
        },
        {
          default: () =>
            h(
              'div',
              {
                style: `width:100%;height:100%;border-radius:var(--n-border-radius);overflow: hidden;`
              },
              h('img', {
                src: this.theme.content,
                style: `width:100%;height:100%;display: block;`
              })
            )
        }
      )
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
