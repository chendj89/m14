import type { CSSProperties } from 'vue'
import './index.scss'
import gsap from 'gsap'
const bg = defineComponent({
  name: 'Bg',
  props: {
    size: {
      type: Number,
      default: () => 32
    },
    row: {
      type: Number,
      default: () => 3
    },
    col: {
      type: Number,
      default: () => 7
    },
    border: {
      type: Number,
      default: () => 10
    },
    gap: {
      type: Number,
      default: () => 5
    },
    rect: {
      type: Object,
      default: () => ({ left: 0, top: 0 })
    },
    mode: {
      type: String,
      default: () => 'look'
    }
  },
  setup(props) {
    let list = []
    const listRef = ref()
    for (let i = 0; i < props.row; i++) {
      for (let j = 0; j < props.col; j++) {
        list.push({
          position: 'absolute',
          top: i * props.size + i * props.gap + props.gap + 'px',
          left: j * props.size + j * props.gap + props.gap + 'px',
          width: props.size + 'px',
          height: props.size + 'px',
          text: `${i}*${j}`
        })
      }
    }
 
    onMounted(() => {
      gsap.to('.vp-bg-cell',{rotateY:'-360deg',duration:0.45,stagger:0.1})
    })
    return {
      list,
      listRef,
    }
  },
  render() {
    return (
      <>
        {this.list.map((item, index) => (
          <div
            class="vp-bg-cell"
            style={item}
            key={index}
          >
            {item.text}
          </div>
        ))}
      </>
    )
  }
})

export default defineComponent({
  name: 'VpGrid',
  props: {
    size: {
      type: Number,
      default: () => 36
    },
    row: {
      type: Number,
      default: () => 3
    },
    col: {
      type: Number,
      default: () => 7
    },
    border: {
      type: Number,
      default: () => 6
    },
    gap: {
      type: Number,
      default: () => 5
    },
    rect: {
      type: Object,
      default: () => ({ left: 0, top: 0 })
    },
    mode: {
      type: String,
      default: () => 'look'
    }
  },
  setup(props) {
    const style = ref({
      position: 'absolute',
      left: props.rect.left + 'px',
      top: props.rect.top + 'px',
      '--col': props.col,
      '--row': props.row,
      '--gap': props.gap + 'px',
      '--size': props.size + 'px',
      '--border': props.border + 'px'
    })
    const cls = ref('vp-grid')
    cls.value += ' ' + props.mode
    const bgCom = ref(true)
    return {
      style,
      cls,
      bgCom
    }
  },
  render(props) {
    return (
      <div class={this.cls} style={this.style}>
        {this.bgCom && h(bg, { ...props })}
      </div>
    )
  }
})
