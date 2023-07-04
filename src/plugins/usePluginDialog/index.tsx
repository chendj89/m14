import {
  Teleport,
  createVNode,
  inject,
  type ComponentInternalInstance,
  render,
  h
} from 'vue'
import type { UsePluginDialog } from '@/types/plugins'
import { drag, unDrag } from '@/hooks/useDialogDragger'
import { NIcon, NMessageProvider } from 'naive-ui'
import './index.scss'
import { NBaseClose } from 'naive-ui/es/_internal/close'
const dialog = defineComponent({
  name: 'UsePluginDialog',
  props: {
    onClose: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: () => ''
    }
  },
  setup() {
    const headerRef = ref()
    onMounted(() => {
      drag(headerRef.value)
    })
    onBeforeUnmount(() => {
      unDrag(headerRef.value)
    })
    return {
      headerRef
    }
  },
  render() {
    return h(
      Teleport,
      {
        to: 'body'
      },
      h(
        NMessageProvider,
        {},
        {
          default: () =>
            h(
              'div',
              {
                class: 'usePluginDialog',
                style: 'z-index:1000;left:100px;top:100px'
              },
              [
                h(
                  'div',
                  {
                    class: 'usePluginDialog-content'
                  },
                  [
                    h('div', { class: 'usePluginDialog-header' }, [
                      h('div', {}, this.$props.title),
                      h('div', {
                        class: 'usePluginDialog-header-drag',
                        ref: 'headerRef'
                      }),
                      h(NBaseClose, {
                        clsPrefix: 'n',
                        onClick: () => this.$props.onClose()
                      })
                    ]),
                    h(
                      'div',
                      { class: 'usePluginDialog-body' },
                      this.$slots.default?.()
                    )
                  ]
                )
              ]
            )
        }
      )
    )
  }
})
const pluginsSet = new Set()
export function usePluginDialog() {
  const ins = inject('ins') as ComponentInternalInstance
  return (params: UsePluginDialog) =>
    new Promise((resolve) => {
      const container = document.createElement('div')
      const onClose = (result: any) => {
        render(null, container)
        container.parentNode?.removeChild(container)
        resolve(result || false)
      }
      let app = createVNode(
        h(
          Teleport,
          { to: params?.opts?.to || 'body' },
          h(
            dialog,
            {
              onClose: onClose,
              title: params?.opts?.title
            },
            {
              default: () =>
                h(params.tpl, { onClose: onClose, data: params?.opts?.data })
            }
          )
        )
      )
      app.appContext = ins.appContext.app._context
      render(app, container)
    })
}
