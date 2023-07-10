import { defineComponent, ref, watch, h } from 'vue'
import {
  getThemeByBase64,
  saveSrc,
  createImageTheme
} from '@/views/table/utils'
import { NButton, NSkeleton } from 'naive-ui'
import './menuIcon.scss'
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
    },
    onMouseenter: {
      type: Function
    },
    href: {
      type: String,
      default: ''
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

    const onMouseleaver = () => {
      return theme
    }
    const onClick = () => {
      if (props.href) {
        window.open(props.href)
      }
    }
    return {
      theme,
      loading,
      onMouseleaver,
      onClick
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
    const buttonStyle = {
      '--n-padding': 0,
      '--n-width': size,
      '--n-height': size
    }
    const rgba = `rgba(${this.theme.r},${this.theme.g},${this.theme.b},0.25)`
    const rgb = `rgb(${this.theme.r},${this.theme.g},${this.theme.b})`
    if (this.theme.content.startsWith('<svg')) {
      return h(
        NButton,
        {
          onClick: this.onClick,
          class: 'menuIcon',
          color: rgba,
          style: buttonStyle,
          onMouseenter: () =>
            this.onMouseenter?.({
              theme: this.theme,
              src: this.src
            })
        },
        {
          default: () =>
            h('div', {
              innerHTML: this.theme.content,
              class: 'menuIcon-content menuIcon-svg'
            })
        }
      )
    } else {
      return h(
        NButton,
        {
          onClick: this.onClick,
          class: 'menuIcon',
          color: rgb,
          style: buttonStyle,
          onMouseenter: () =>
            this.onMouseenter?.({
              theme: this.theme,
              src: this.src
            })
        },
        {
          default: () =>
            h(
              'div',
              {
                class: 'menuIcon-content menuIcon-img'
              },
              h('img', {
                src: this.theme.content
              })
            )
        }
      )
    }
  }
})
