import type { DataTableColumn, TreeSelectOption } from 'naive-ui'
import type { TablePropsType } from '@/types/components'

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function uuid(len = 0) {
  const s: Array<any> = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return len ? uuid.slice(0, len) : uuid
}

export function randomString(length: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str: string): string {
  if (!str) return str
  return str
    .replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    })
    .replace(/(\s|^)[a-z]/g, function (char) {
      return char.toUpperCase()
    })
}

export function sortColumns(
  originColumns: DataTableColumn[],
  newColumns: TablePropsType[]
) {
  if (!originColumns || !newColumns) {
    return
  }
  if (newColumns.length === 0) {
    originColumns.length = 0
  } else {
    const selectionItem = originColumns.find((it) => it.type === 'selection')
    originColumns.length = 0
    if (selectionItem) {
      originColumns.push(selectionItem)
    }
    originColumns.push(...newColumns)
  }
}

export function transformTreeSelect(
  origin: any[],
  labelName: string,
  keyName: string
): TreeSelectOption[] {
  const tempSelections: TreeSelectOption[] = []
  origin.forEach((it) => {
    const selection = {
      label: it[labelName],
      key: it[keyName]
    } as TreeSelectOption
    if (it.children) {
      selection.children = transformTreeSelect(it.children, labelName, keyName)
    }
    tempSelections.push(selection)
  })
  return tempSelections
}

/**
 * 开头大小写
 * @param str 字符串
 * @param upperCase 大写
 * @returns
 */
export function capFirst(str: string, upperCase = true) {
  if (upperCase) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } else {
    return str.charAt(0).toLowerCase() + str.slice(1)
  }
}
/**
 * 生成emoji
 * @returns
 */
function getRandomEmoji() {
  const min = 0x1f600
  const max = 0x1f64f
  const randomCodePoint = Math.floor(Math.random() * (max - min + 1)) + min
  const emoji = String.fromCodePoint(randomCodePoint)

  return emoji
}

function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as unknown as T
  }
  const newObj = {} as T
  for (let key in obj) {
    newObj[key] = deepCopy(obj[key])
  }
  return newObj
}
