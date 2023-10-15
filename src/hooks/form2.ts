export function renderInput(
  value: Ref<string>,
  options: InputProps | AllowedComponentProps = {},
  slots: any = null,
  params: any = {}
) {
  const { table = {}, tableEdit = {}, form = {} } = params
  let opts = Object.assign({}, options, table, tableEdit, form)
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
