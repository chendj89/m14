import './auto-imports'
import { RouteMeta } from 'vue-router'
import { IRouteMeta } from '@/types/route'
import { IGlobalProperties } from '@/types/global'

// 全部配置
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends IGlobalProperties {}
}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 路由
declare module 'vue-router' {
  interface RouteMeta extends IRouteMeta {}
  interface RouteRecordRaw {
    /**
     * 图标
     */
    icon: string
  }
}
// 环境变量ts的智能提示
interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'virtual:icons/*' {
  import type { FunctionalComponent, SVGAttributes } from 'vue'

  const component: FunctionalComponent<SVGAttributes>
  export default component
}
declare module '~icons/*' {
  import type { FunctionalComponent, SVGAttributes } from 'vue'

  const component: FunctionalComponent<SVGAttributes>
  export default component
}
/// <reference types="vite/client" />
