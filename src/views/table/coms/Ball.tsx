import gsap from 'gsap'
import MotionPathHelper from 'gsap-trial/MotionPathHelper'
gsap.registerPlugin(MotionPathHelper)

var drawCurve = function (startX, startY, endX, endY) {
  // 曲线控制点坐标
  var cp1x = startX
  var cp1y = startY + (endY - startY) / 2
  // 这里的除数2和曲线的曲率相关，数值绝大，曲率越小
  var cp2x = endX
  var cp2y = endY - (endY - startY) / 2

  console.log(startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY)
}

function calculateBezierPoint(startPoint, controlPoint, endPoint, t) {
  // 缓动函数 "easeOut"
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 2)
  }

  // 缓动 t 值
  var easedT = t

  var x =
    (1 - easedT) * (1 - easedT) * startPoint.x +
    2 * (1 - easedT) * easedT * controlPoint.x +
    easedT * easedT * endPoint.x
  var y =
    (1 - easedT) * (1 - easedT) * startPoint.y +
    2 * (1 - easedT) * easedT * controlPoint.y +
    easedT * easedT * endPoint.y
  return { x: x, y: y }
}

export default defineComponent({
  name: 'Ball',
  props: ['data'],
  setup() {
    const eleRef = ref()
    const list = ref([
      {
        text: 1,
        point: {
          start: { x: 0, y: 0 },
          mid: { x: 20, y: -300 },
          end: { x: 300, y: -50 }
        },
        style: {},
        z: 720,
        tick: 0.001
      },
      {
        text: 2,
        point: {
          start: { x: 0, y: 0 },
          mid: { x: 200, y: -300 },
          end: { x: 250, y: -50 }
        },
        z: 360,
        tick: 0.002,
        style: {},
        delay: 0.25
      }
    ])
    let timer: any = null

    const animate = () => {
      let tt = 0
      let duration = 1
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      timer = setInterval(() => {
        for (let n = 0; n < list.value.length; n++) {
          let item = list.value[n]
          let point = calculateBezierPoint(
            item.point.start,
            item.point.mid,
            item.point.end,
            tt
          )
          item.style = {
            left: point.x + 'px',
            top: point.y + 'px',
            transform: `rotateZ(${tt * item.z}deg)`
          }
        }

        if (tt >= duration) {
          clearInterval(timer)
        }
        tt += duration / 100
      }, 16)
    }

    let tikerCount = 0
    let hash: any = {}
    let isActive = false
    const clearRuner = () => {
      hash = {}
      tikerCount = 0
      isActive = false
      for (let i = 0; i < list.value.length; i++) {
        list.value[i].style = {}
      }
    }
    const runerHander = () => {
      isActive = true
      for (let i = 0; i < list.value.length; i++) {
        let item = list.value[i]
        if (hash[i] === null) {
          continue
        }
        if (item.delay && tikerCount * 0.016 < item.delay) {
          continue
        }
        if (hash[i] == undefined) {
          hash[i] = 0
        }
        let result = calculateBezierPoint(
          item.point.start,
          item.point.mid,
          item.point.end,
          hash[i]
        )
        item.style = {
          left: result.x + 'px',
          top: result.y + 'px'
        }
        hash[i] += 0.01
        if (hash[i] >= 1) {
          hash[i] = null
        }
      }
      let go = false
      for (let attr in hash) {
        if (hash[attr] !== null) {
          go = true
        }
      }
      tikerCount++
      if (go) {
        requestAnimationFrame(runerHander)
      } else {
        console.log('结束当红')
        isActive=false
      }
    }
    const play = () => {
      console.log(isActive)
      if (isActive) {
        return
      }
      clearRuner()
      runerHander()
    }

    onMounted(() => {
      // animate()
    })
    return { list, eleRef, animate, play }
  },
  render() {
    return (
      <div class="oball" ref="eleRef" onClick={this.play}>
        {this.list.map((item) => (
          <div class="oball-cell" style={item.style}>
            {item.text}
          </div>
        ))}
      </div>
    )
  }
})
