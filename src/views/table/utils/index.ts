// @ts-ignore
import Colorthief from 'colorthief'
export const rgbToHex = (r: any, g: any, b: any): string => {
  const rHex = r.toString(16).padStart(2, '0')
  const gHex = g.toString(16).padStart(2, '0')
  const bHex = b.toString(16).padStart(2, '0')
  const hexColor = `#${rHex}${gHex}${bHex}`
  return hexColor
}
/**
 * 创建新的图片主题
 * @param theme
 * @param content
 * @returns
 */
export const createImageTheme = ({
  theme,
  content = '',
  blob = { size: 0, type: '' }
}: {
  theme: number[][]
  content: string
  blob: {
    size: number
    type: string
  }
}) => {
  return {
    hex: rgbToHex(theme[0][0], theme[0][1], theme[0][2]),
    r: theme[0][0],
    g: theme[0][1],
    b: theme[0][2],
    theme: theme,
    content: content,
    blob
  }
}

export const getSvgUrlColor = (url: any) => {
  // 提取 color 参数的值
  const colorParam = decodeURIComponent(url.match(/color=([^&]+)/)[1])
  // 将颜色转换为 RGB 格式
  const hexColor = colorParam.slice(1)
  const rgbColor = [
    [
      parseInt(hexColor.substring(0, 2), 16),
      parseInt(hexColor.substring(2, 4), 16),
      parseInt(hexColor.substring(4, 6), 16)
    ]
  ]
  return rgbColor
}

/**
 * 保存图片
 * @param url
 * @returns {string} data base64/svg格式
 */
export const saveSrc = (url: string): Promise<unknown> => {
  return new Promise((resolve) => {
    if (url.startsWith('<svg')) {
      localStorage.setItem(url, url)
      resolve(url)
    } else {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          console.log('blob', blob)
          let reader: any = new FileReader()
          if (blob.type == 'image/svg+xml') {
            reader.readAsText(blob, 'utf-8')
            reader.onload = async () => {
              const svgData = reader.result.replace(/\"/gm, "'")
              let theme
              if (url.includes('color=')) {
                theme = getSvgUrlColor(url)
              } else {
                theme = await getThemeByBase64(svgData)
              }
              let value = createImageTheme({
                theme,
                content: svgData,
                blob: {
                  size: blob.size,
                  type: blob.type
                }
              })
              localStorage.setItem(url, JSON.stringify(value))
              resolve(value)
            }
          } else {
            reader.readAsDataURL(blob, 'utf-8')
            reader.onload = async () => {
              const base64String = reader.result as string
              const theme = await getThemeByBase64(base64String)
              let value = createImageTheme({
                theme,
                content: base64String,
                blob: {
                  size: blob.size,
                  type: blob.type
                }
              })
              localStorage.setItem(url, JSON.stringify(value))
              resolve(value)
            }
          }
        })
    }
  })
}
/**
 * 获取图片的主题颜色
 * @param base64
 * @returns
 */
export const getThemeByBase64 = async (base64: string): Promise<any[]> => {
  const image = new Image()
  if (base64.startsWith('<svg')) {
    base64 = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(base64))
    )}`
  }
  image.src = base64
  return new Promise((resolve, reject) => {
    image.onload = () => {
      let color = new Colorthief()
      let themes = color.getPalette(image, 3)
      color = null
      resolve(themes)
    }
    image.onerror = () => {
      reject(new Error('加载图片失败'))
    }
  })
}
