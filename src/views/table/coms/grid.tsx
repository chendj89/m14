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
      default: () => 2
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
    },
    /**
     * 容器编辑
     */
    pd: {
      type: Number,
      default: () => 10
    }
  },
  setup(props, ctx) {
    const params = {
      parent: props,
      props: {},
      // 关闭按钮 品牌 角标
      children: []
    }
    const list = ref([])
  },
  render() {}
})
