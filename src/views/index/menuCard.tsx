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
    const getMsg = (params: any) => {
      if (id !== params.id) {
        content.value = params.render
      }
    }
    const onMouseenter = (config: any) => {
      const list: any = props.info?.find((item: any) => {
        return item.icon == config.src
      })
      content.value = () =>
        h(
          'div',
          {
            class: 'menuCard-banner-content',
            style: `background:rgba(${config.theme.r},${config.theme.g},${config.theme.b},0.25)`
          },
          list?.children?.map((child: any) =>
            h(MenuIcon, {
              src: child.icon,
              href: child.url
            })
          )
        )
    }
    const onMouseleaver = () => {
      content.value = defaultContent
      id = null
    }
    return {
      getMsg,
      content,
      onMouseenter,
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
              style: `gap:8px`
            },
            () =>
              this.info?.map((item: any) =>
                h(MenuIcon, {
                  skeleton: true,
                  src: item.icon,
                  onMouseenter: this.onMouseenter,
                  href: item.url
                })
              )
          )
        ]
      )
    ])
  }
})
