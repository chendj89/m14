import gsap from 'gsap-trial'
import { GSDevTools } from 'gsap-trial/GSDevTools'
interface IBanner {
  animation: any
  brand: any
  mark: any
  close: Function
  play: any
}

export default defineComponent({
  name: 'Banner',
  setup() {
    const el = ref<HTMLDivElement | null>(null)
    let gp: gsap.Context

    onMounted(() => {
      gp = gsap.context((value) => {
        let tl = gsap.timeline({ paused: true })
        tl.play()
      }, el.value!)
      let gpDev = GSDevTools.create()
    })
    onUnmounted(() => {
      if (gp) {
        gp.kill()
      }
    })
    return {
      el
    }
  },
  render() {
    return <div ref="el"></div>
  }
})
