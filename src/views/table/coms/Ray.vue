<template>
  <div class="opp">
    <svg class="defs">
      <defs>
        <symbol id="s-star" viewbox="0 0 210 210">
          <polygon
            points="98.4999978 153.75 38.2520165 185.424245 49.7583542 118.337123 1.01670635 70.8257603 68.3760155 61.037872 98.5000012 1.1379786e-14 128.624005 61.0378871 195.98331 70.8258091 147.241642 118.337136 158.747982 185.424247"
            transform="translate(10,10)"
          />
        </symbol>
        <radialGradient id="gr-radial-lights" cx="50%" cy="50%" r="70%">
          <stop stop-color="white" offset="5%" stop-opacity="1" />
          <stop stop-color="white" offset="100%" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
    <div class="demo demo--lights">
      <svg viebox="0 0 1024 640">
        <svg viewbox="0 0 640 640">
          <g transform="scale(1)">
            <circle
              class="c-lights"
              r="64%"
              cx="50%"
              cy="50%"
              stroke-width="128%"
              stroke-dasharray="10%"
              stroke="url(#gr-radial-lights)"
            ></circle>
          </g>
        </svg>
        <svg viewbox="0 0 320 50">
          <svg viewbox="0 0 150 150">
            <g class="group--stars">
              <use xlink:href="#s-star" class="star--outline" />
              <g class="group--stars-anim">
                <use xlink:href="#s-star" fill="currentColor" />
                <use xlink:href="#s-star" fill="white" />
                <use xlink:href="#s-star" fill="currentColor" />
                <use xlink:href="#s-star" fill="white" />
              </g>
            </g>
          </svg>
        </svg>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts" name="Ray"></script>

<style lang="scss" scoped>
$trans-hor: 75px;
$trans-vert: 75px;
$lights-color: lightseagreen;

.opp {
  position: relative;
  width: 100%;
  height: 100%;
}
.defs {
  position: absolute;
}
.demo--lights {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $lights-color;
  color: $lights-color;
}
svg {
  width: 100%;
  height: 100%;
}
.group--stars {
  transform: scale(0.9);
}
.star--outline {
  transform-origin: $trans-hor $trans-vert;
  transform: scale(1.2);
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-dasharray: 4;
  animation: stardashoffset 2s infinite linear;
}
.group--stars-anim {
  use {
    transform-origin: $trans-hor $trans-vert;
    animation: starmove 8s infinite linear;
  }
  @for $item from 2 through 4 {
    use:nth-child(#{$item}) {
      transform: scale(1-($item/5));
    }
  }
}
.c-lights {
  fill: none;
  transform-origin: 320px 320px;
  animation: rotation 20s infinite linear;
}

@keyframes starmove {
  $trans-min: 0.8;
  $trans-max: 1.2;

  $trans-min-offset: 0.7;
  $trans-max-offset: 1.3;

  0% {
    transform-origin: $trans-hor * $trans-min * 0.8 $trans-vert * $trans-min;
  }
  12.5% {
    transform-origin: $trans-hor $trans-vert * $trans-min-offset * 0.95;
  }
  25% {
    transform-origin: $trans-hor * $trans-max * 1.2 $trans-vert * $trans-min;
  }
  37.5% {
    transform-origin: $trans-hor * $trans-max * 1.15 $trans-vert;
  }
  50% {
    transform-origin: $trans-hor * $trans-max * 1.1 $trans-vert * $trans-max *
      1.05;
  }
  65.5% {
    transform-origin: $trans-hor $trans-vert * $trans-max-offset * 1.1;
  }
}
</style>
