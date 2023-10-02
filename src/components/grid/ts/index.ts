export const collision = (ele: any, props: any) => {
  let has = false
  if (ele.parentNode) {
    const siblings: any = Array.from(ele.parentNode.children).filter(
      (child) => child !== ele
    )
    const rect1 = ele.getBoundingClientRect()
    for (const sibling of siblings) {
      const rect2 = sibling.getBoundingClientRect()
      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        sibling.style.backgroundColor = props.activeBg
        has = true
      } else {
        sibling.style.backgroundColor = props.bg
      }
    }
  }
  return has
}

const dragover = (event: MouseEvent) => {
  event.preventDefault()
}
const drop = (event: MouseEvent) => {
  event.preventDefault()
  let btn=event.dataTransfer.getData('btn')
  event.target.append(btn)
}

export const createEle = (params: any, props: any) => {
  const ele: HTMLDivElement = document.createElement('div')
  ele.className = 'grid-ele'
  ele.style.position = 'absolute'
  ele.style.minWidth = props.size + 'px'
  ele.style.minHeight = props.size + 'px'
  ele.style.width = props.size + 'px'
  ele.style.height = props.size + 'px'
  ele.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
  ele.style.borderRadius = '5px'
  ele.style.zIndex = '1'
  ele.style.padding = props.pd + 'px'
  if (params.left !== undefined) {
    ele.style.left = params.left + 'px'
  }
  if (params.top !== undefined) {
    ele.style.top = params.top + 'px'
  }

  // 缩放
  const resizeEle = document.createElement('div')
  resizeEle.className = 'grid-resize'
  resizeEle.style.display = 'none'
  // 关闭
  const closeEle = document.createElement('div')
  closeEle.className = 'grid-close'
  closeEle.style.display = 'none'
  closeEle.addEventListener('click', () => {
    ele.parentNode?.removeChild(ele)
  })
  // 移动
  const contentEle = document.createElement('div')
  contentEle.className = 'grid-content'
  contentEle.setAttribute('display', 'flex')
  contentEle.style.display = 'none'
  ele.append(closeEle, resizeEle, contentEle)
  // 添加拖拽
  contentEle.addEventListener('drop', drop)
  contentEle.addEventListener('dragover', dragover)
  return ele
}

export const handler = (grid: any, props: any) => {
  let initX: any
  let initY: any
  let lastX: any
  let lastY: any
  let left: any
  let top: any
  let type: any
  let rect: any
  let target: any
  const reset = () => {
    initX = null
    initY = null
    lastX = null
    lastY = null
    left = 0
    top = 0
    type = ''
    rect = null
    target = null
  }
  document.addEventListener('mousedown', (event: any) => {
    // event.preventDefault()
    const classList = Array.from(event.target.classList)
    /**
     * 鼠标移动
     * @param event
     */
    const mousemove = (event: MouseEvent) => {
      event.preventDefault()
      if (target && type == 'create') {
        lastX = Math.round((event.pageX - rect.left) / props.size) * props.size
        lastY = Math.round((event.pageY - rect.top) / props.size) * props.size
        if (lastX >= rect.right - rect.left) {
          lastX = rect.right - rect.left
        }
        if (lastY >= rect.bottom - rect.top) {
          lastY = rect.bottom - rect.top
        }
        if (lastX <= 0) {
          lastX = props.size
        }
        if (lastY <= 0) {
          lastY = props.size
        }
        collision(target, props)
        target.style.width = lastX - initX + 'px'
        target.style.height = lastY - initY + 'px'
      }
      if (target && type == 'resize') {
        lastX = Math.round((event.pageX - rect.left) / props.size) * props.size
        lastY = Math.round((event.pageY - rect.top) / props.size) * props.size
        if (left + lastX >= props.width) {
          lastX = props.width - left
        }
        if (top + lastY >= props.height) {
          lastY = props.height - top
        }
        if (lastX <= 0) {
          lastX = props.size
        }
        if (lastY <= 0) {
          lastY = props.size
        }
        collision(target, props)
        target.style.width = lastX + 'px'
        target.style.height = lastY + 'px'
      }
      if (target && type == 'move') {
        let difX = Math.floor((event.pageX - initX) / props.size) * props.size
        let difY = Math.floor((event.pageY - initY) / props.size) * props.size
        difX = left + difX
        difY = top + difY
        if (difX + rect.width > props.width) {
          difX = props.width - rect.width
        }
        if (difY + rect.height > props.height) {
          difY = props.height - rect.height
        }
        if (difX < 0) {
          difX = 0
        }
        if (difY < 0) {
          difY = 0
        }
        collision(target, props)
        target.style.left = difX + 'px'
        target.style.top = difY + 'px'
      }
    }
    /**
     * 鼠标结束
     * @param event
     */
    const mouseup = (event: MouseEvent) => {
      event.preventDefault()
      if (target && type == 'create') {
        let hasCollision = collision(target, props)
        Array.from(target.parentNode.children).forEach((child: any) => {
          child.style.backgroundColor = props.bg
        })
        if (hasCollision) {
          target.parentNode.removeChild(target)
        } else {
          if (target.children) {
            Array.from(target.children).forEach((child: any) => {
              child.style.display = child.getAttribute('display') || 'block'
            })
          }
        }
      }
      if (target && type == 'resize') {
        if (collision(target, props) && rect) {
          target.style.width = rect.width + 'px'
          target.style.height = rect.height + 'px'
        }
        Array.from(target.parentNode.children).forEach((child: any) => {
          child.style.backgroundColor = props.bg
        })
        target.style.zIndex = '1'
      }
      if (target && type == 'move') {
        if (collision(target, props) && rect) {
          target.style.left = left + 'px'
          target.style.top = top + 'px'
        }
        Array.from(target.parentNode.children).forEach((child: any) => {
          child.style.backgroundColor = props.bg
        })
        target.style.zIndex = '1'
      }
      reset()
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }
    if (event.target == grid) {
      rect = grid.getBoundingClientRect()
      type = 'create'
      // 获得相对于父类的相对坐标
      initX = Math.floor((event.pageX - rect.left) / props.size) * props.size
      initY = Math.floor((event.pageY - rect.top) / props.size) * props.size
      target = createEle({ left: initX, top: initY }, props)
      event.target.append(target)
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
    if (classList.includes('grid-resize')) {
      type = 'resize'
      target = event.target.parentNode
      rect = target.getBoundingClientRect()
      left = parseInt(target.style.left)
      top = parseInt(target.style.top)
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
    if (classList.includes('grid-content')) {
      type = 'move'
      target = event.target
      rect = target.getBoundingClientRect()
      left = parseInt(target.style.left)
      top = parseInt(target.style.top)
      initX = event.pageX
      initY = event.pageY
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
  })
}
