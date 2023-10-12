import { handler } from './ts'
import './index.scss'
import { NButton } from 'naive-ui'
import Cell from './cell'
export default defineComponent({
  name: 'Grid',
  props: {
    size: {
      type: Number,
      default: () => 20
    },
    border: {
      type: Number,
      default: () => 4
    },
    col: {
      type: Number,
      default: () => 6
    },
    row: {
      type: Number,
      default: () => 2
    },
    activeBg: {
      type: String,
      default: () => '#f00'
    },
    bg: {
      type: String,
      default: () => 'rgba(0, 0, 0, 0.8)'
    },
    /**
     * 碰撞颜色
     */
    collision: {
      type: String,
      default: () => '#ff5c00'
    },
    pd: {
      type: Number,
      default: () => 10
    }
  },
  setup(props) {
    const gridRef = ref()
    const list: any = ref([])
    const rect = ref()
    onMounted(() => {
      rect.value = gridRef.value.getBoundingClientRect()
      handler(gridRef.value, props, list)
    })
    let width = props.col * props.size + props.border * (props.col + 1)
    let height = props.row * props.size + props.border * (props.row + 1)
    const dataSize = `${width} x ${height} - ${props.border}`
    const remove = (data: any) => {
      list.value = list.value.filter((item: any) => item.id !== data.id)
    }
    return {
      gridRef,
      list,
      dataSize,
      remove,
      rect
    }
  },
  render() {
    return (
      <div
        ref="gridRef"
        class="grid"
        style={{
          '--size': this.size + 'px',
          '--border': this.border + 'px',
          '--col': this.col,
          '--row': this.row
        }}
        data-size={this.dataSize}
      >
        {this.list.map((item: any) =>
          h(Cell, { ...item, rect: this.rect, onRemove: this.remove })
        )}
      </div>
    )
  }
})
