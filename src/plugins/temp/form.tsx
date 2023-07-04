import DataForm from '@/components/common/DataForm'
import { renderInput } from '@/hooks/form'
import type { FormItem } from '@/types/components'
import {
  NInput,
  type InputProps,
  type FormProps,
  NForm,
  NFormItem
} from 'naive-ui'
import { type AllowedComponentProps, h, type Ref } from 'vue'
export default defineComponent({
  name: 'form2',
  setup(props, ctx) {
    const formConfig = {
      labelWidth: 100,
      size: 'medium',
      labelAlign: 'right'
    } as FormProps
    let inputRef: any = ref('')
    let inputStatus = computed(() => {
      return inputRef.value ? '' : 'error'
    })
    return {
      inputRef,
      inputStatus
    }
  },
  render() {
    return h(
      NForm,
      {
        ref: 'dataForm',
        labelPlacement: 'left',
        size: 'medium',
        labelWidth: 100,
        labelAlign: 'right'
      },
      {
        default: () =>
          h(
            NFormItem,
            {
              label: '哈哈',
              feedback: this.inputStatus,
              'validation-status':this.inputStatus
            },
            {
              default: () =>
                h(NInput, {
                  value: this.inputRef,
                  onUpdateValue: (newVal: string) => {
                    this.inputRef = newVal
                  }
                })
            }
          )
      }
    )
  }
})
