import { useBallAnimation } from '@/components/grid/animation/ts'
const { data, render, clear, init, start, stop } = useBallAnimation(15)
export default defineComponent({
  setup() {
    const eleRef = ref('')
    const list: typeof data = ref([])
    onMounted(() => {
      init(eleRef.value)
      list.value = data.value
      nextTick(() => {
        render()
      })
    })
    return {
      eleRef,
      list
    }
  },
  render() {
    return (
      <div
        ref="eleRef"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          userSelect: 'none'
        }}
      >
        {this.list.map((item: any) => (
          <div
            style={{
              width: item.size + 'px',
              height: item.size + 'px',
              left: item.x + 'px',
              top: item.y + 'px',
              transform: item.transform,
              borderRadius: item.radius + 'px',
              position: 'absolute'
            }}
          >
            <img style={{ width: '100%' }} src={item.text} alt="" />
          </div>
        ))}
      </div>
    )
  }
})
