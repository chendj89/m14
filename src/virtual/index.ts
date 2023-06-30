import router from '../router'
import usePermissionStore from '@/store/modules/permission'
import { capFirst } from '@/utils'
import { mapTwoLevelRouter } from '@/store/help'

/**
 * 加载虚拟组件
 * @param to
 * @returns
 */
export default async function loadVirtual(to: any) {
  return new Promise((resolve) => {
    const permissionStore = usePermissionStore()
    const name = to.name
    let virtualRoute = {
      path: `/index/${capFirst(name, false)}`,
      name: `${capFirst(name)}`,
      meta: {
        title: `动态路由`,
        iconPrefix: 'icon',
        icon: 'menu',
        cacheable: true,
        ...to?.meta
      },
      component: () =>
        import('@/virtual/index.vue').then((res) => {
          res.default.name = capFirst(name)
          return res
        })
    }
    const mapRoutes = mapTwoLevelRouter([virtualRoute])
    console.log('mapRoutes',mapRoutes)
    router.addRoute('Dashboard',virtualRoute)
    permissionStore.addVirtualPermissionRoute('Dashboard',virtualRoute)
    resolve(true)
  })
}
