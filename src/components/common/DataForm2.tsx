import type { FormItem } from '../../types/components'
import { defineComponent, h, type PropType, ref, toRef } from 'vue'
import { type FormProps, NForm, NFormItem, useMessage, NSpin } from 'naive-ui'

function renderItem(formItem: FormItem, ref) {
  return function () {
    if (formItem.render) {
      return formItem.required
        ? [
            formItem.render(formItem, ref),
            h(
              'span',
              {
                class: 'ml-2 text-red-500 align-top'
              },
              '*'
            )
          ]
        : formItem.render(formItem, ref)
    } else {
      return ''
    }
  }
}

export default defineComponent({
  name: 'DataForm2',
  props: {
    formConfig: {
      type: Object as PropType<FormProps>,
      default: () => {}
    },
    options: {
      type: Array as PropType<Array<FormItem>>,
      require: true
    },
    ref: {
      type: [Object, String]
    }
  },
  setup(props) {
    const dataForm = ref<any>(props.ref)
    const options = toRef(props, 'options')
    const message = useMessage()
    const loading = ref(false)
    const itemsRef: any = ref([])
    function reset() {
      if (!options.value) return
      options.value.forEach((it: FormItem) => {
        if (it.reset) {
          it.reset(it)
        } else {
          it.value.value = null
        }
      })
    }
    function generatorParams() {
      if (!options.value) return
      return options.value.reduce((pre: any, cur: FormItem) => {
        pre[cur.key] = cur.value.value
        return pre
      }, {})
    }
    function validator() {
      if (!options.value) return
      let result= options.value.reduce((pre: any, cur: FormItem) => {
        pre[cur.key] = cur.value.value
        return pre
      }, {})
      console.log('result',result,options.value)
    }
    return {
      dataForm,
      reset,
      validator,
      generatorParams,
      loading,
      itemsRef
    }
  },
  render() {
    if (!this.options) {
      throw new Error('prop options must be not null')
    }
    return h(NSpin, { show: this.loading }, () =>
      h(
        NForm,
        {
          ref: 'dataForm',
          labelPlacement: 'left',
          size: 'medium',
          ...this.formConfig
        },
        {
          default: () => {
            return this.options?.map((it, index) => {
              return h(
                NFormItem,
                {
                  label: it.label,
                  path: it.path || (it.key as string)
                },
                {
                  default: renderItem(it, this.itemsRef[index])
                }
              )
            })
          }
        }
      )
    )
  }
})
