import { handler } from './ts'
import './index.scss'
import { NButton } from 'naive-ui'
export default defineComponent({
  name: 'Grid',
  props: {
    width: {
      type: Number,
      default: () => 600
    },
    height: {
      type: Number,
      default: () => 400
    },
    size: {
      type: Number,
      default: () => 50
    },
    activeBg: {
      type: String,
      default: () => '#f00'
    },
    bg: {
      type: String,
      default: () => 'rgba(0, 0, 0, 0.8)'
    },
    pd: {
      type: Number,
      default: () => 10
    }
  },
  setup(props) {
    const gridRef = ref()
    const list = ref([h(NButton, {type:'primary'}, ()=>'123')])
    onMounted(() => {
      handler(gridRef.value, props,list)
    })

    return {
      gridRef,
      list
    }
  },
  render() {
    return (
      <div
        ref="gridRef"
        class="grid"
        style={{
          width: this.width + 'px',
          height: this.height + 'px',
          '--size': this.size * 2 + 'px'
        }}
      >
        {this.list.map((item) => h(item))}
      </div>
    )
  }
})
