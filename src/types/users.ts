import type { CSSProperties } from 'vue'

/**
 * 用户信息
 */
export interface userInfo {
  key: string
  label?: string
  type?: string
  render?: () => any
}

export interface IUser {
  name: string
  url: string
  desc: string
  icon: string
}
export interface IInfo {
  url?: string
  icon?: string
  [x: string]: any
}

export interface IUserMenu {
  style: {
    theme: string
    header: string
    width: number
    padding: number
    radius: number
    iconRadius: number
    color: string
    gap: number
    cols: number
    iconSize: number
  }
  user: IUser
  info?: IInfo
  children?: { user: IUser; info?: IInfo; children?: IUser[] }[]
}
