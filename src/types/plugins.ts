import type { DefineComponent } from 'vue'
export interface UsePluginDialog {
  /**
   * 模板
   */
  tpl: DefineComponent<{}, {}, any>
  /**
   * 参数
   */
  opts?: {
    title?: string
    data?: any // 数据源或数组，数组内的每一项都是一个对象，包含“key”
    to?: string
    onSucceed?: (...args: any[]) => any
    onCancel?: (...args: any[]) => any
    onComplate?: (...args: any[]) => any
  }
}
