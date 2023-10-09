import './grid.scss'
import { handler } from '@/components/grid/ts/index.ts'
import Cell from '@/components/grid/cell'
import LogosNodejsIconAlt from '~icons/logos/nodejs-icon-alt'
export default defineComponent({
  name: 'Grid',
  props: {
    /**
     * 网格大小
     */
    size: {
      type: Number,
      default: () => 40
    },
    /**
     * 网格边框或间隙
     */
    border: {
      type: Number,
      default: () => 4
    },
    /**
     * 网格列数
     */
    col: {
      type: Number,
      default: () => 6
    },
    /**
     * 网格行数
     */
    row: {
      type: Number,
      default: () => 3
    },
    /**
     * 碰撞颜色
     */
    activeBg: {
      type: String,
      default: () => '#f00'
    },
    /**
     * 网格背景色
     */
    bg: {
      type: String,
      default: () => 'rgba(0, 0, 0, 0.8)'
    }
  },
  setup(props) {
    const gridRef = ref()
    const list: any = ref([{
      com:LogosNodejsIconAlt
    }])
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
