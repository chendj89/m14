import SimpleIconsTiktok from '~icons/simple-icons/tiktok'
import SimpleIconsXbox from '~icons/simple-icons/xbox'
import LogosNodejsIconAlt from '~icons/logos/nodejs-icon-alt'
import SimpleIconsNike from '~icons/simple-icons/nike'
import BiXCircle from '~icons/bi/x-circle'
import gsap from 'gsap'
import { GSDevTools } from 'gsap-trial/GSDevTools'
import BiPlayFill from '~icons/bi/play-fill'
import MenuIcon from '@/views/table/coms/menuIcon'
gsap.registerPlugin(GSDevTools)

import biList from '~icons/bi/x-circle'
import Bg from './bg'
export default defineComponent({
  name: 'cell',
  props: {
    style: {
      type: Object,
      default: () => {}
    },
    cls: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      defalut: () => ''
    },
    rect: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const close = (event: MouseEvent) => {
      let parent: any = event.target.parentNode.parentNode
      const rect = parent.getBoundingClientRect()
      console.log(props.rect)
      emit('remove', props)
      hasAnimation.value = false
      hasContainer.value = 0
    }
    const eleRef = ref<HTMLDivElement | null>()
    const st = ref(props.style)
    let gp: gsap.Context
    const bg=ref(null)
    let tl: any = null
    const run = () => {
      // self.selector!('.grid-slot')
      let slot: HTMLDivElement = eleRef.value!.querySelector!('.grid-async')
      tl = gsap.timeline({})
      tl.add(gsap.to(slot, { scale: 0.8, duration: 0.5 }))
        .add(gsap.to(slot, { x: '-=50', duration: 0.5 }))
        .add(gsap.to(slot, { x: '+=100', rotateX: '+=360', duration: 1 }))
        .add(gsap.to(slot, { x: '-=50', rotateX: '-=360', duration: 1 }))
        .add(gsap.to(slot, { scale: 1, duration: 1, rotate: 360 }))
    }
    const replay = () => {
      if (!tl.isActive()) {
        tl.restart()
      }
    }
    const asyncComponent = ref(null)
    const hasAnimation = ref(false)
    const hasContainer = ref(null)
    const animationName = ref('')
    const drop = async (event) => {
      event.preventDefault()
      let strdata = event.dataTransfer.getData('data')
      if (strdata) {
        let odata = JSON.parse(strdata)

        if (odata.type == 'icon') {
          asyncComponent.value = h(MenuIcon, { src: odata.icon })
          nextTick(() => {
            if (animationName.value == 'gsap') {
              // run()
            } else {
              // asyncComponent.value = Bg
            }
          })
        }
        if (odata.type == 'animation') {
          hasAnimation.value = true
          animationName.value = odata.name
          bg.value = Bg
        }
        if (odata.type == 'container') {
          hasContainer.value = odata.count
        }
      }
    }
    const allowDrop = (event) => {
      event.preventDefault()
    }
    return {
      bg,
      close,
      eleRef,
      st,
      drop,
      allowDrop,
      asyncComponent,
      replay,
      hasAnimation,
      hasContainer
    }
  },
  render() {
    return (
      <div
        onDrop={this.drop}
        onDragover={this.allowDrop}
        style={this.style}
        class={this.cls}
        ref="eleRef"
      >
        {this.bg && h(this.bg)}
        {this.hasContainer && (
          <SimpleIconsTiktok class="grid-band"></SimpleIconsTiktok>
        )}
        <BiXCircle class="grid-close" onClick={this.close}></BiXCircle>
        {this.hasAnimation && (
          <BiPlayFill class="grid-type" onClick={this.replay}></BiPlayFill>
        )}
        {this.asyncComponent &&
          h('div', { class: 'grid-async' }, h(this.asyncComponent))}
      </div>
    )
  }
})
