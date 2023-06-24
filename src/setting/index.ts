import {
  type AppConfigState,
  DeviceType,
  LayoutMode,
  PageAnim,
  SideTheme,
  ThemeMode,
} from '@/store/types'

export const projectName = '九转灵山'

export default {
  theme: ThemeMode.LIGHT,
  sideTheme: SideTheme.WHITE,
  themeColor: '#18a058',
  layoutMode: LayoutMode.LTR,
  sideWidth: 210,
  deviceType: DeviceType.PC,
  pageAnim: PageAnim.OPACITY,
  isFixedNavBar: true,
  isCollapse: false,
  actionBar: {
    isShowSearch: true,
    isShowMessage: true,
    isShowRefresh: true,
    isShowFullScreen: true,
  },
  repos:"data",
  version:""
} as AppConfigState
