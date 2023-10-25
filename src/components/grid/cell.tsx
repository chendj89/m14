import SimpleIconsTiktok from '~icons/simple-icons/tiktok'
import SimpleIconsXbox from '~icons/simple-icons/xbox'
import LogosNodejsIconAlt from '~icons/logos/nodejs-icon-alt'
import SimpleIconsNike from '~icons/simple-icons/nike'
import BiXCircle from '~icons/bi/x-circle'
import gsap from 'gsap'
import { GSDevTools } from 'gsap-trial/GSDevTools'
gsap.registerPlugin(GSDevTools)
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
    }
    const eleRef = ref<HTMLDivElement | null>()
    const st = ref(props.style)
    let gp: gsap.Context
    onMounted(() => {
      // gp = gsap.context((self) => {
      //   let tl = gsap.to(self, {
      //     x: 200,
      //     duration: 0.5
      //   })
      //   // GSDevTools.create()
      // }, eleRef.value!)
      // gsap.to(eleRef.value!,{x:200,duration:1})
      // gsap.context((self) => {
      //   // self.selector!('.grid-slot')
      //   let slot: HTMLDivElement = self.selector!('.grid-slot')
      //   let tl = gsap.timeline({
      //     // paused: true
      //   })
      //   tl.add(gsap.to(slot, { scale: 0.8, duration: 0.5 }))
      //     .add(gsap.to(slot, { x: '-=50', duration: 0.5 }))
      //     .add(gsap.to(slot, { x: '+=100', rotateX: '+=360', duration: 1 }))
      //     .add(gsap.to(slot, { x: '-=50', rotateX: '-=360', duration: 1 }))
      //     .add(gsap.to(slot, { scale: 1, duration: 1 }))
      //     .add(
      //       gsap.to(slot, {
      //         scale: 0.7,
      //         rotateZ: 360,
      //         ease: 'outIn',
      //         duration: 1
      //       })
      //     )
      //   // GSDevTools.create({
      //   //   animation: tl,
      //   //   container: eleRef.value!,
      //   //   minimal: true,
      //   //   hideGlobalTimeline:true,
      //   //   keyboard:true,
      //   //   persist:true,
      //   //   css: 'bottom:-42px;position: absolute;'
      //   // })
      // }, eleRef.value!)
    })
    const asyncComponent = ref(null)
    const drop = async (event) => {
      asyncComponent.value = await defineAsyncComponent(
        () => import('~icons/bi/cpu')
      )
    }
    const allowDrop = (event) => {
      event.preventDefault()
    }
    return {
      close,
      eleRef,
      st,
      drop,
      allowDrop,
      asyncComponent
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
        <SimpleIconsTiktok class="grid-band"></SimpleIconsTiktok>
        <BiXCircle class="grid-close" onClick={this.close}></BiXCircle>
        <SimpleIconsNike class="grid-type"></SimpleIconsNike>
        {h('div', [
          this.asyncComponent
            ? h(this.asyncComponent,{class:'grid-async'})
            : h('button', {}, 'Load Async Component')
        ])}
      </div>
    )
  }
})
