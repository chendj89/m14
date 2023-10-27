const heart = ''
const logo = ''

const star = ''
const cloud = ''

const data = [heart, logo, star, cloud]

const max = 50

let particles = []

class Ball {
  constructor(shape) {
    this.shape = $(shape)
    this.speed = 2 + Math.random() * 12
    this.vx = Math.random() * this.speed - Math.random() * this.speed
    this.vy = Math.random() * this.speed - Math.random() * this.speed
    this.radius = 10 + Math.round(Math.random() * 50)
    this.w = $(window).width()
    this.h = $(window).height()
    this.x = (this.w - this.radius) / 2
    this.y = (this.h - this.radius) / 2

    $(window).on('resize', this.resize.bind(this))
    this.render()
  }

  render() {
    $(this.shape).css({
      width: this.radius,
      height: this.radius
    })
    $('body').append(this.shape)
  }

  resize() {
    this.w = $(window).width()
    this.h = $(window).height()
  }

  move() {
    this.x = this.x + this.vx
    this.y = this.y + this.vy

    this.shape.css({
      left: this.x,
      top: this.y,
      transform: 'rotate(' + this.y + 'deg)'
    })

    if (this.x < 0 || this.x > this.w - this.radius) {
      this.vx = -this.vx
      $(this.shape).toggleClass('highlight')
    }
    if (this.y < 0 || this.y > this.h - this.radius) {
      this.vy = -this.vy
      $(this.shape).toggleClass('highlight')
    }
    return this
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

for (let i = 0; i < max; i++) {
  particles.push(new Ball(data[randomInt(0, data.length - 1)]))
}

function update() {
  particles = particles.filter(function (p) {
    return p.move()
  })
  requestAnimationFrame(update.bind(this))
}
update()
