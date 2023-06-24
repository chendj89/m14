import { useUserStoreContext } from '@/store/modules/user'
import type { AxiosRequestConfig } from 'axios'

export default function (config: AxiosRequestConfig) {
  const useStore = useUserStoreContext()
  if (config) {
    if (!config.headers) {
      config.headers = {}
    }
    if (!config.headers['Auth']) {
      config.headers['Auth'] = useStore.token
    }
  }
  return config
}
