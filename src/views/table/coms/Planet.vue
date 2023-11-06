<template>
  <div class="boxaa">
    <div class="container">
      <div class="moon">☃️</div>
      <div class="planet">🌚</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Planet"></script>

<style lang="scss" scoped>
$planet-color: #885ae1;
$moon-color: #dfe3e6;
$planet-size: 40px;

$moon-size: $planet-size / 4.5;
$translate-size: $planet-size / 3;
$dot-size: $planet-size / 7;
.boxaa {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: darken(#75bad1, 55%);
  border-radius: 4px;
}
.container {
  position: absolute;
  left: calc(50% - #{$planet-size} / 2);
  top: calc(50% - #{$planet-size} / 2);
  animation: rotate 10s linear infinite forwards;
}

.planet {
  position: relative;
  border-radius: 100%;
  //background-color: $planet-color;
  width: $planet-size;
  height: $planet-size;
  box-shadow: inset -$moon-size -$moon-size 0px darken($planet-color, 5%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  // &:before {
  //   position: absolute;
  //   top: $dot-size;
  //   left: $translate-size;
  //   content: '';
  //   background: darken($planet-color, 10%);
  //   border-radius: 100%;
  //   width: $dot-size;
  //   height: $dot-size;
  //   display: block;
  // }
  // &:after {
  //   position: absolute;
  //   top: $translate-size * 1.3;
  //   left: $dot-size * 1.3;
  //   content: '';
  //   background: darken($planet-color, 10%);
  //   border-radius: 100%;
  //   width: $translate-size;
  //   height: $translate-size;
  //   display: block;
  // }
}

.moon {
  position: absolute;
  border-radius: 100%;
  // background-color: $moon-color;
  width: $moon-size;
  height: $moon-size;
  animation: orbit 2s ease-in-out infinite;
  transform: translate(-$translate-size, -$translate-size);
  display: flex;
  align-items: center;
  justify-content: center;
  // animation: rotate 10s linear infinite forwards;
}

@keyframes orbit {
  0% {
  }
  20% {
    z-index: 10;
  }
  50% {
    transform: translate($planet-size, $planet-size);
    z-index: -1;
  }
  100% {
    z-index: -1;
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
