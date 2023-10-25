import { type InputProps, NInput } from 'naive-ui'
import { type AllowedComponentProps, h, type Ref, render } from 'vue'
import { deepCopy } from '@/utils'

export function renderInput(
  value: Ref<string>,
  options: InputProps | AllowedComponentProps = {},
  slots: any = null,
  params: any = {}
) {
  const { table = {}, tableEdit = {}, form = {}, type = 'form' } = params
  let opts = {}
  switch (type) {
    case 'table':
      opts = deepCopy({}, options, table)
      break
    case 'tableEdit':
      opts = deepCopy({}, options, tableEdit)
      break
    case 'form':
      opts = deepCopy({}, options, form)
      break
    default:
      opts = deepCopy({}, options)
      break
  }
  return h(
    NInput,
    {
      value: value.value,
      onUpdateValue: (newVal: string) => {
        value.value = newVal
      },
      ...opts
    },
    slots
  )
}

