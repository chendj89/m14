import type { Ref, AllowedComponentProps } from 'vue'
import type { InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
export function renderInput(
  value: Ref<string>,
  options: InputProps | AllowedComponentProps = {},
  slots: any = null,
  params?: any
) {
  // 表格展示、编辑表格、表单、编辑表单
  const { table, tableEdit, form, formEdit, search } = params
  if (table) {
    let disabled = true
    disabled = params?.disabled
      ? params?.disabled
      : params?.table?.disabled
      ? params?.table?.disabled
      : false
  }

  return h(
    NInput,
    {
      value: value.value,
      onUpdateValue: (newVal: string) => {
        value.value = newVal
      },
      ...options
    },
    slots
  )
}




