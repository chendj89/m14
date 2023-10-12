import type { PropType } from 'vue'

type Mode = 'look' | 'edit'
type Base = 'banner' | 'icon'
interface IDataItem {
  // icon: string
  // mode: Mode
  // name: string
  // link: string
  // children?: IDataItem[]
  base: Base
  /**
   * 品牌
   */
  brand: any
  mark: any
  // close?: any
}
type AddProperties<T extends IDataItem, U extends Base> = T extends { type: U } ? { brand: any; mark: any } : {};

type ExtendedDataItem<T extends IDataItem> = T & AddProperties<T, 'banner'>;

const dataItem: ExtendedDataItem<IDataItem>={
  base:"banner",
  mark:1,
  brand:2,
}
const dataItem2: ExtendedDataItem<IDataItem>={
  base:"icon",
  mark:2
}

export default defineComponent({
  name: 'Orange',
  props: {
    /**
     * 模式
     */
    mode: {
      type: String as PropType<Mode>,
      default: 'look'
    },
    data: {
      type: Array as PropType<IDataItem[]>,
      default: []
    },
    size: {
      type: Number,
      default: 40
    },
    col: {
      type: Number,
      default: 6
    },
    row: {
      type: Number,
      default: 3
    },
    gap: {
      type: Number,
      default: 6
    },
    bg: {
      type: String,
      default: 'rgba(0, 0, 0, 0.8)'
    },
    /**
     * 碰撞颜色
     */
    collision: {
      type: String,
      default: () => '#ff5c00'
    }
  },
  setup(props, ctx) {
    const lt = ref()
    const bt = ref()
    const rt = ref()
  }
})
