import SimpleIconsTiktok from '~icons/simple-icons/tiktok'
import SimpleIconsXbox from '~icons/simple-icons/xbox'
import LogosNodejsIconAlt from '~icons/logos/nodejs-icon-alt'
import SimpleIconsNike from '~icons/simple-icons/nike'
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
    const eleRef = ref()
    const st = ref(props.style)
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
