import { ref, type Ref } from 'vue'
const circle =
  '<svg viewBox="0 0 11.4 11.9"><path class="circle" d="M5.7,0.1C2.6,0.1,0,2.8,0,6s2.6,5.9,5.7,5.9s5.7-2.7,5.7-5.9S8.9,0.1,5.7,0.1L5.7,0.1z M5.7,8.8 C4.2,8.8,3,7.6,3,6s1.2-2.8,2.7-2.8S8.4,4.4,8.4,6S7.2,8.8,5.7,8.8L5.7,8.8z"/></svg>'
const rect =
  '<svg viewBox="0 0 20 2"><rect fill="green" rx="2" ry="2" x="0" y="0" width="20" height="4"></rect></svg>'
const rhombus =
  '<svg viewBox="0 0 13 14"><path class="rhombus" d="M5.9,1.2L0.7,6.5C0.5,6.7,0.5,7,0.7,7.2l5.2,5.4c0.2,0.2,0.5,0.2,0.7,0l5.2-5.4 C12,7,12,6.7,11.8,6.5L6.6,1.2C6.4,0.9,6.1,0.9,5.9,1.2L5.9,1.2z M3.4,6.5L6,3.9c0.2-0.2,0.5-0.2,0.7,0l2.6,2.6 c0.2,0.2,0.2,0.5,0,0.7L6.6,9.9c-0.2,0.2-0.5,0.2-0.7,0L3.4,7.3C3.2,7.1,3.2,6.8,3.4,6.5L3.4,6.5z" /></svg>'

const pentahedron =
  '<svg viewBox="0 0 561.8 559.4"><path class="pentahedron" d="M383.4,559.4h-204l-2.6-0.2c-51.3-4.4-94-37-108.8-83l-0.2-0.6L6,276.7l-0.2-0.5c-14.5-50,3.1-102.7,43.7-131.4 L212.1,23C252.4-7.9,310.7-7.9,351,23l163.5,122.5l0.4,0.3c39,30.3,56,82.6,42.2,130.3l-0.3,1.1l-61.5,198 C480.4,525.6,435.5,559.4,383.4,559.4z M185.5,439.4h195.2l61.1-196.8c0-0.5-0.3-1.6-0.7-2.1L281.5,120.9L120.9,241.2 c0,0.3,0.1,0.7,0.2,1.2l60.8,195.8C182.5,438.5,183.7,439.1,185.5,439.4z M441,240.3L441,240.3L441,240.3z"/></svg>'
const x =
  '<svg viewBox="0 0 12 12"> <path class="x" d="M10.3,4.3H7.7V1.7C7.7,0.8,7,0,6,0S4.3,0.8,4.3,1.7v2.5H1.7C0.8,4.3,0,5,0,6s0.8,1.7,1.7,1.7h2.5v2.5 C4.3,11.2,5,12,6,12s1.7-0.8,1.7-1.7V7.7h2.5C11.2,7.7,12,7,12,6S11.2,4.3,10.3,4.3z"/></svg>'
const dribble =
  '<svg viewBox="0 0 184.3 184.3"> <path class="dribble" d="M92.2,184.3C41.3,184.3,0,143,0,92.2S41.3,0,92.2,0s92.2,41.3,92.2,92.2S143,184.3,92.2,184.3z M169.9,104.8 c-2.7-0.9-24.4-7.3-49-3.4c10.3,28.3,14.5,51.3,15.3,56.1C153.8,145.6,166.4,126.7,169.9,104.8z M122.9,164.7 c-1.2-6.9-5.7-31-16.8-59.7c-0.2,0.1-0.3,0.1-0.5,0.2c-44.4,15.5-60.3,46.3-61.8,49.2C57.2,164.8,74,171,92.2,171 C103.1,171,113.5,168.8,122.9,164.7z M33.7,144.9c1.8-3.1,23.4-38.8,64-51.9c1-0.3,2.1-0.6,3.1-0.9c-2-4.5-4.1-8.9-6.4-13.4 C55.1,90.4,16.9,89.9,13.5,89.9c0,0.8,0,1.6,0,2.4C13.4,112.5,21.1,131,33.7,144.9z M15.1,76.2c3.5,0,36,0.2,72.8-9.6 C74.8,43.4,60.8,23.9,58.7,21C36.7,31.4,20.2,51.7,15.1,76.2z M73.7,15.7c2.2,2.9,16.5,22.4,29.4,46.1c28-10.5,39.8-26.4,41.3-28.4 c-13.9-12.3-32.2-19.8-52.2-19.8C85.8,13.6,79.6,14.3,73.7,15.7z M153.1,42.5c-1.7,2.2-14.8,19.2-44,31c1.8,3.7,3.6,7.6,5.2,11.4 c0.6,1.4,1.1,2.7,1.7,4.1c26.2-3.3,52.2,2,54.8,2.5C170.7,73,164,55.9,153.1,42.5z"/> </svg>'
  const media = [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAM1BMVEUAAAD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQCEzyW/AAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAShJREFUeAHt2uFq7CAQxfGj5kYz68bz/k97l9KWTTcupHikH+b3An8mIUFwcEXMtfGh1RyhEY1PTJLJ/CFjOOMLkzcElcJTBQMldiSMU9lRBYMoR9nYtWGUnV07Bgl8I2CMhW8sEyMe8YhHPOIRj3jEI8uZPDCy2s7r8nIu4FUojWPtW8LRv0aBesgYRQq+hDtlDJ9upLxSKJXxECkWARjFDIiUi8iUy6iUq2iUa+AEHrlkzouvlKtzPsZIuTjnBykfpUU8ZEqt+GDqh6WuGL4VarQVT1KlgAUcpW3nULcccCIs535z4I64iO8s6POIRzziEY94xCMeaTMidUakzLhgTuzbMcp9xqX/yq4E/SgV4yzsSPOXY/RrPqKKYbjceJT/+hKZYB3uPxidICnZQ31BAAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABcCAMAAACvFeCmAAAAM1BMVEUAAADtQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3qGOtVAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAk5JREFUeAHd2N2y2yoMBeDFDxgDRnr/pz374kzb3dh4YbkznX73mZXIchDCEh//5/FHxNKG/mL0khxe5Leup4494B2568QoHlauiN6p0R5B6IaqbaKs6vBIOHSBbHig6KLmsMh1XSYRS8LQJzIWJNFnKmhZH6v2DD7FnmFPSUowpgRRG6LH3FC7gLmuLxgOM5u+omEi6EsSrh36EnH2Yhn62Im+JxhOEOlfRO91nPJ64yjx5xR26I2IM7tO1YBvQuXbmHwizeODbzrjF1tL0oPDbcenoZcOjwv+0Euy9LIfDpfcsfLa73wGm1L5ask0Y9Ywwlcr4kakP1oMh2ll+6vzxeIL1vGdXiimsZl8JA4EpxcCNQc1UBo1txTbBJ2pYtdJtQz1akxzHSAdeqozIQ2kxoRMa2po4r8mJIGUDCERpKjn/tFnchivmZV5zzrT5xPU55ueA4n6Wym29orUM838gLYy4WbqqwgowhVCL2TTeoG8yA0Qhp472AFyw62NHYmSXhCPG17oYZi/l/H7BfJsI/5b6sJdK/O3GfYSmKleJ35LXboEofLbWG7nWldv2JJxIotO+PUtVE/4TeoPtgVR58Ye8EPYh87Fpws16Xv5shOLj05su8wC0Y9WlbiXWYkjBkGrREznVs2+FraubN/psECc11aZmTiNKgjVnPF6imFGt2fYU+wZhoX6hiVJdJkkLPJdF3WPdUV0gRQ84rv9ZxDiUMqIsMiDiMiwik2nWsQb3Nb1Qt8cXuPS3j8C9uTwuhBLKb33VkqJAbz/ANmIMSZWkWGiAAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAQCAMAAADXjyqxAAAASFBMVEUAAAABAAIBAQMCAQUBAAIBAQMDAgZ+SP98R/99R/97Rv59R/97Rv58R/9/SP97Rv57Rv57Rv57Rv58R/97Rv57Rv57Rv57Rv5jZm49AAAAF3RSTlMAAAAAAQECEyMkMVRhY2aHr7/F0tTk84juFNUAAABRSURBVHja7dTJFYAgFEPRqDjgjArpv1NpIjkuvA1k8/9DNewXRfIxdqja+FCoLD3QTIVaW0C4qTZjpdyJRD3wH/ncSKKe5YQtz2jJiiWQltS/EgmMXd6s1GYAAAAASUVORK5CYII=",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABjCAMAAABaOVXeAAAAM1BMVEUAAAA+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvezXsREAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAjxJREFUeAG1muGunCAQRgcQVESG93/apjetyU3vBA87Pb83qxyZ79vICiDuVx9faDuS/A9KG9/oexBnch//oLt4Eq7xI3cUN1IfBprFiX0Mmxr8VNncyU+VjRZ/VVwZV8WVcVVcGVfFlXFVXBlXxZVxVVwZV8WVcVVcGVfFlXFVXJm/KqaMqwLKgCr9TNn2QlVP8f5E2THmXEFEzmVloY05u3yRF5Vt+kaV/GFN2f5O1cM7ZfKN+lrVQ1Z4lUpUEWVVHgpT9XCC5Seiiir7K+DGqh5iGxPuRxZWBSa4yG86V0UGrD8LAapwVBQRuVgEcWVNJNAw5cqiZFoLXFmRk6riyqo0qoora9KxKq5MuCquTLgqrkzswFmhEl1R1jBWcvO8sjGGztjCzdPWbe2IIBQ70C/JZnRyktUVwSgq4VgRlcyoF4zV490urSyYOH7kFLF8VbeXC5u9SPWypZMbIEyUmCoZk4fbjU0BMbZpmGxvhjFws0ElTKOje5RKnYRg9SgVndxpdvC1Tb9DWUiCcIwvfL5n/lzLx6WS5hPNQhKEY5pPq3pUyfRG8odVUvmHuK3Ml2tj68YPjlcJ2YIGfARwSIJwBLGAw/HiAcerZOdRzW1F7pWHI69PG1Tfw5lkTK0nHUzUMifIhmU20AmrKMjrZSppHs6k725XWwbF1ZZB0OFFwu+SOI3/suEknHWcA7c158YFxNFIa46jyeF8mZyDgDNNQgvyjnAMDv+jVKw6OHoEQYRC6/gq1iV+ATaATiIKa4OvAAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABsCAMAAACrb+cLAAAAM1BMVEUAAAAtqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8MEU6JAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAY1JREFUeAHt2MGK8yAUQOGb2FjrX6vv/7Q/sxsY4RCOWQyTs9cPLqVyE3d3f6q9lMfVRupjjNe1xtbGV/lqgxVvsOINVrzBijdY8QYr3mDFG5Mey41JPa01hCKMxcq/MS5X6hiseIMVb3jFG6x4gxVvaAUMoYDRn/teulAmxvyuNFP2tcZcadtaQytgLFQKGCuUzAYr3mDFG6x4gxVvsOINVryhFTSEIgxWhAFK1YZQ2PDKwYZWUmfDKmx4JXW946TJBS9+CGuc6jW5Yo9vfWbIcQ550Czago3woCvK8Mvte/LL4Y2tnTIyDnyuVGnkCK+w8UPprFgjIpEiDFDKKYPPzZXMBk9AK2AIRRikCIMfyGwMPgYKGqjwG5n5H88qc2MLr3iDFW+wIoxJlRRhgLKx4ZW28TiXKGx4ZY+IAoZWxrt+2PCfndcasTVvLFPY8EqOsIowhAKGUMDwSmfDl7owvFKC8kqNWK+w4RU2vMKG72BjQZmNtUoLyitti8sVNrzyBkO3P8sRv7W7u7v/sSm7FcXgsvQAAAAASUVORK5CYII="
  ]
console.log(media.length)
const svgData = [rhombus, pentahedron, circle, rect, x]

function getRandomEmoji() {
  const min = 0x1f600
  const max = 0x1f64f
  const randomCodePoint = Math.floor(Math.random() * (max - min + 1)) + min
  const emoji = String.fromCodePoint(randomCodePoint)

  return emoji
}

interface Ball {
  speed: number
  vx: number
  vy: number
  size: number
  w: number
  h: number
  x: number
  y: number
  transform: string
  cls: string
  radius: number
  text: string
}
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export const useBallAnimation = (len: number) => {
  const ballList = ref<Ball[]>([])
  const active = ref(true)
  const init = (ele: any) => {
    let rect = ele.getBoundingClientRect()
    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        ballList.value.push(create(rect))
      }, 100 * i)
    }
  }
  const create = (rect: any) => {
    let speed = 3 + Math.random() * 3
    let vx = Math.random() * speed - Math.random() * speed
    let vy = Math.random() * speed - Math.random() * speed
    let size = 20 + Math.round(Math.random() * 10)
    let w = rect.width
    let h = rect.height
    let x = (w - size) / 2
    let y = (h - size) / 2
    let radius = 0
    return {
      speed,
      vx,
      vy,
      size,
      w,
      h,
      x,
      y,
      radius,
      cls: '',
      transform: '',
      text: media[randomInt(0, media.length-1)]
    }
  }
  const update = () => {
    ballList.value.forEach((ball: Ball, index: number) => {
      // ballList.value.forEach((child: Ball, n: number) => {
      //   if (index !== n) {
      //     if (
      //       ball.x < child.x + child.size &&
      //       ball.x + ball.size > child.x &&
      //       ball.y < child.y + child.size &&
      //       ball.y + ball.size > child.y
      //     ) {
      //       ball.cls = 'pp'
      //       child.cls = 'pp'
      //       ball.vx = ball.x > child.x ? ball.vx : -ball.vx
      //       ball.vy = ball.y > child.y ? -ball.vy : ball.vy
      //     }
      //   }
      // })
      ball.x = ball.x + ball.vx
      ball.y = ball.y + ball.vy
      ball.transform = `rotate(${ball.y + ball.x}deg)`
      if (ball.x < 1 || ball.x > ball.w - ball.size - 1) {
        ball.vx = -ball.vx
        ball.cls = ball.cls ? '' : 'active'
        ball.radius++
      }
      if (ball.y < 1 || ball.y > ball.h - ball.size - 1) {
        ball.vy = -ball.vy
        ball.cls = ball.cls ? '' : 'active'
        ball.radius++
      }
      if (ball.radius >= ball.size / 2) {
        ball.radius = 0
      }

      // rect1.left < rect2.right &&
      //   rect1.right > rect2.left &&
      //   rect1.top < rect2.bottom &&
      //   rect1.bottom > rect2.top
    })
  }

  const clear = () => {
    stop.value = true
    ballList.value = []
  }
  const render = () => {
    if (active.value) {
      update()
      requestAnimationFrame(render)
    }
  }
  const stop = () => {
    if (ballList.value.length == len) {
      active.value = false
    }
  }
  const start = () => {
    if (!active.value) {
      active.value = true
      render()
    }
  }
  return {
    render,
    clear,
    init,
    start,
    stop,
    data: ballList
  }
}
