import { NSpace } from 'naive-ui'
import MenuIcon from '@/views/table/coms/menuIcon'
import bg2 from '@/assets/imgs/a2.png'
export default defineComponent({
  name: 'MenuCard',
  props: {
    info: {
      type: Array,
      require: true
    }
  },
  setup(props) {
    const defaultContent = () => {
      return h('div', {
        class: 'menuCard-banner-content',
        style: `background:url(${bg2});background-size: cover;`
      })
    }
    const content: any = ref(defaultContent)
    let id: any = null
    const stop = ref(false)
    const getMsg = (params: any) => {
      if (id !== params.id) {
        content.value = params.render
      }
    }
    const onContent = (render: Function) => {
      content.value = render
    }
    const onMouseleaver = () => {
      if (!stop.value) {
        content.value = defaultContent
        id = null
      }
    }
    const clickHandle = () => {
      stop.value = true
    }
    return {
      stop,
      getMsg,
      content,
      onContent,
      onMouseleaver,
      clickHandle
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
              style: `gap:8px;line-height:0`,
            },
            () =>
              this.info?.map((item: any) =>
                h(MenuIcon, {
                  skeleton: true,
                  src: item.icon,
                  onContent: this.onContent,
                  href: item.url,
                  children: item.children,
                  clickHandle:this.clickHandle
                })
              )
          )
        ]
      )
    ])
  }
})
