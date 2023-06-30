import { LAYOUT } from "@/store/keys";
export default [
  {
    path: '/index',
    component: LAYOUT,
    name: 'Dashboard',
    meta: {
      title: '控制台',
      iconPrefix: 'icon',
      icon: 'dashboard'
    },
    redirect: '/index/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          affix: true,
          cacheable: true,
          iconPrefix: 'icon',
          icon: 'menu'
        }
      },
      {
        path: 'box',
        name: 'Box',
        component: () => import('@/views/index/box.vue'),
        meta: {
          title: '盒子',
          affix: false,
          cacheable: true,
          iconPrefix: 'icon',
          icon: 'menu'
        }
      }
    ]
  },
  {
    path: '/table',
    component: LAYOUT,
    name: 'Table',
    meta: {
      title: '表格',
      iconPrefix: 'icon',
      icon: 'table'
    },
    redirect: '/table/menu',
    children: [
      {
        path: 'menu',
        name: 'TableMenu',
        component: () => import('@/views/table/menu.vue'),
        meta: {
          title: '菜单',
          affix: true,
          cacheable: true,
          iconPrefix: 'icon',
          icon: 'menu'
        }
      }
    ]
  }
]
