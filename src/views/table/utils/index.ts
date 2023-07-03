export const rgbToHex = (r: number, g: number, b: number): string => {
  // 将 r、g、b 值转换为十六进制字符串
  const rHex = r.toString(16).padStart(2, '0')
  const gHex = g.toString(16).padStart(2, '0')
  const bHex = b.toString(16).padStart(2, '0')
  // 拼接十六进制颜色码
  const hexColor = `#${rHex}${gHex}${bHex}`
  return hexColor
}
/**
 * 创建新的图片主题
 * @param theme
 * @param content
 * @returns
 */
export const createImageTheme = (theme: RGBColor[], content: string = '') => {
  return {
    hex: rgbToHex(theme[0].r, theme[0].g, theme[0].b),
    r: theme[0].r,
    g: theme[0].g,
    b: theme[0].b,
    theme: theme,
    content: content
  }
}

export const getSvgUrlColor = (url: string): RGBColor[] => {
  // 提取 color 参数的值
  const colorParam = decodeURIComponent(url.match(/color=([^&]+)/)[1])
  // 将颜色转换为 RGB 格式
  const hexColor = colorParam.slice(1)
  const rgbColor = [
    {
      r: parseInt(hexColor.substring(0, 2), 16),
      g: parseInt(hexColor.substring(2, 4), 16),
      b: parseInt(hexColor.substring(4, 6), 16)
    }
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
          let reader: any = new FileReader()
          if (blob.type == 'image/svg+xml') {
            reader.readAsText(blob, 'utf-8')
            reader.onload = async () => {
              const svgData = reader.result.replace(/\"/gm, "'")
              let theme: RGBColor[]
              if (url.includes('color=')) {
                theme = getSvgUrlColor(url)
              } else {
                theme = await getThemeByBase64(svgData)
              }
              let value = createImageTheme(theme, svgData)
              localStorage.setItem(url, JSON.stringify(value))
              resolve(value)
            }
          } else {
            reader.readAsDataURL(blob, 'utf-8')
            reader.onload = async () => {
              const base64String = reader.result as string
              const theme = await getThemeByBase64(base64String)
              let value = createImageTheme(theme, base64String)
              localStorage.setItem(url, JSON.stringify(value))
              resolve(value)
            }
          }
        })
    }
  })
}

interface RGBColor {
  r: number
  g: number
  b: number
}
/**
 * 获取图片的主题颜色
 * @param base64
 * @returns
 */
export const getThemeByBase64 = async (base64: string): Promise<RGBColor[]> => {
  const image = new Image()
  if (base64.startsWith('<svg')) {
    base64 = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(base64))
    )}`
  }
  image.src = base64
  return new Promise((resolve, reject) => {
    image.onload = () => {
      let canvas: HTMLCanvasElement | null = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let context = canvas.getContext('2d')
      if (!context) {
        reject(new Error('Failed to get canvas context'))
        return
      }
      context.drawImage(image, 0, 0)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const pixelData = imageData.data
      const colorCounts: { [color: string]: number } = {}
      // 遍历每个像素，计算颜色出现的次数
      for (let i = 0; i < pixelData.length; i += 4) {
        const r = pixelData[i]
        const g = pixelData[i + 1]
        const b = pixelData[i + 2]
        const a = pixelData[i + 3]
        const color = `rgba(${r},${g},${b},${a})`
        colorCounts[color] = (colorCounts[color] || 0) + 1
      }
      // 找到出现次数最多的颜色
      const sortedColors = Object.keys(colorCounts).sort(
        (a, b) => colorCounts[b] - colorCounts[a]
      )
      const themes: RGBColor[] = sortedColors.map((color) => {
        const [r, g, b, a] = color.match(/\d+/g)!.map(Number)
        return { r, g, b, a }
      })
      // 清内存
      canvas = null
      context = null
      resolve(themes.slice(0, 3))
    }
    image.onerror = () => {
      reject(new Error('加载图片失败'))
    }
  })
}
