import SimpleIconsTiktok from '~icons/simple-icons/tiktok'
import SimpleIconsXbox from '~icons/simple-icons/xbox'
import LogosNodejsIconAlt from '~icons/logos/nodejs-icon-alt'
import SimpleIconsNike from '~icons/simple-icons/nike'
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
      gsap.context((self) => {
        // self.selector!('.grid-slot')
        let slot: HTMLDivElement = self.selector!('.grid-slot')
        let tl = gsap.timeline({
          // paused: true
        })
        tl.add(gsap.to(slot, { scale: 0.8, duration: 0.5 }))
        .add(
          gsap.to(slot, { x: "-=50", duration: 0.5 })
        )
        .add(
          gsap.to(slot, { x: "+=100",rotateX:"+=360", duration: 1 })
        )
        .add(
          gsap.to(slot, { x: "-=50",rotateX:"-=360", duration: 1 })
        )
        .add(
          gsap.to(slot, {scale: 1, duration: 1 })
        )
        .add(
          gsap.to(slot, {scale: 0.7,rotateZ:360,ease:"outIn", duration: 1 })
        )
        // GSDevTools.create({
        //   animation: tl,
        //   container: eleRef.value!,
        //   minimal: true,
        //   hideGlobalTimeline:true,
        //   keyboard:true,
        //   persist:true,
        //   css: 'bottom:-42px;position: absolute;'
        // })
      }, eleRef.value!)
    })
    return {
      close,
      eleRef,
      st
    }
  },
  render() {
    return (
      <div style={this.style} class={this.cls} ref="eleRef">
        <SimpleIconsTiktok class="grid-band"></SimpleIconsTiktok>
        <div class="grid-close" onClick={this.close}></div>
        <SimpleIconsNike class="grid-type"></SimpleIconsNike>
        <LogosNodejsIconAlt class="grid-slot"></LogosNodejsIconAlt>
      </div>
    )
  }
})
