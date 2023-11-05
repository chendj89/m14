import './index.scss'
import dayjs from 'dayjs'
const Zhou = defineComponent({
  name: 'Zhou',
  render() {
    return (
      <div class="zhou">
        <div class="zhou-item">一周</div>
        <div class="zhou-item">小结</div>
      </div>
    )
  }
})

const Xing = defineComponent({
  name: 'Xing',
  setup() {
    const date = dayjs().format('MM/DD')
    return {
      date
    }
  },
  render() {
    return (
      <div class="xing">
        <div class="xing-item1">{this.date}</div>
        <div class="xing-item2">星期三</div>
      </div>
    )
  }
})

export default defineComponent({
  name: 'Week',
  setup() {},
  render() {
    return (
      <div class="week">
        <div class="week-item">
          <Zhou></Zhou>
          <Xing></Xing>
        </div>
        <div class="week-item2"></div>
      </div>
    )
  }
})
