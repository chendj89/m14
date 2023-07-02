import { uuid } from '@/utils'
import { getColors } from './menuCard'
export default defineComponent({
  name: 'MenuIcon',
  props: {
    /**
     * 鼠标移入
     */
    onMouseenter: {
      type: Function
    },
    user: {
      type: Object,
      require: true
    }
  },
  setup(props) {
    const id = uuid()
    const renderContent = () => {
      console.log(props.user?.children)
      return h(
        'div',
        {
          style: `width:100%;height:100%;background:${bg.value}`
        },
        h(
          'div',
          {},
          props.user?.children?.map((item) => {
            return h('div', {
              style: `width:40px;height:40px;background-size: 60% 60%;
              background-repeat: no-repeat;
              background-position: center;background-image:url(${item.icon});
              background-color:${bg.value}`
            })
          })
        )
      )
    }
    const mouseEnter = () => {
      props.onMouseenter && props.onMouseenter({ render: renderContent, id })
    }
    const bg = ref()
    const colors = getColors(props.user?.icon).then((theme: any) => {
      bg.value = `rgba(${theme[0].r},${theme[0].g},${theme[0].b},0.5)`
    })

    return {
      mouseEnter,
      bg
    }
  },
  render() {
    return (
      <div
        class="menuCard-item"
        style={{ background: this.bg }}
        onMouseenter={this.mouseEnter}
      >
        <img src={this.user?.icon} alt="" />
      </div>
    )
  }
})
