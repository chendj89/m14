import DataForm2 from '@/components/common/DataForm2'
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
  props: ['ref'],
  setup(props, ctx) {
    const thisRef = ref(props.ref)
    const formConfig = {
      labelWidth: 100,
      size: 'medium',
      labelAlign: 'right'
    } as FormProps
    const listRef=ref([])
    const formItems: any = [
      {
        label: '会议名称',
        key: 'name',
        required: true,
        value: ref(null),
        render: (formItem: any,ref:any) =>
          renderInput(formItem.value, {
            placeholder: '请输入会议名称',
            clearable: true,
            ref:listRef.value[0]
          })
      },
      {
        label: '名称',
        key: 'label',
        required: true,
        value: ref(null),
        render: (formItem: any,ref:any) =>
          renderInput(formItem.value, {
            placeholder: '请输入会议名称',
            clearable: true,
            ref:listRef.value[1]
          })
      }
    ]
    return {
      formConfig,
      formItems,
      thisRef,
      listRef
    }
  },
  render() {
    return h(DataForm2, {
      formConfig: this.formConfig,
      options: this.formItems,
      ref: 'thisRef'
    })
  }
})
