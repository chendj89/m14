<template>
  <div class="boxaa">
    <div class="container">
      <div class="moon">☃️</div>
      <div class="moon moon2">👹</div>
      <div class="planet">🌚</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Planet"></script>

<style lang="scss" scoped>
@use 'sass:math';
$planet: 40px;
$moon: 10px;

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
  left: calc(50% - #{$planet + $moon} / 2);
  top: calc(50% - #{$planet + $moon} / 2);
  // animation: rotate 10s linear infinite forwards;
  width: $planet + $moon;
  height: $planet + $moon;
}

.planet {
  position: absolute;
  border-radius: 100%;
  width: $planet;
  height: $planet;
  display: flex;
  left: 50%;
  top: 50%;
  margin-left: -$planet/2;
  margin-top: -$planet/2;
  align-items: center;
  justify-content: center;
  font-size: $planet;
  z-index: 9;
}

.moon {
  position: absolute;
  border-radius: 100%;
  width: $moon;
  height: $moon;
  animation: orbit 4s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(0, 0);
  z-index: 1;
  font-size: 12px;
}

.moon2 {
  transform: translate(0, $planet);
  animation: orbit2 4s ease-in-out infinite;
  animation-delay: 1s;
}

$next: (
  0.5 + $moon / $planet)*100;

@function getX($num){
  @return math.sin(0)
}

@keyframes orbit {
  0% {
    z-index: 10;
    transform: translate(getX(0), 0
    );
}

20% {
  z-index: 10;
}

50% {
  transform: translate(getX(1), getX(1));
  z-index: 10;
}

#{$next}% {
  z-index: 1;
}

100% {
  z-index: 10;
}
}

@keyframes orbit2 {
  0% {
    z-index: 10;
    transform: translate(0, $planet );
  }

  20% {
    z-index: 10;
  }

  50% {
    transform: translate($planet , 0);
    z-index: 10;
  }

  #{$next}% {
    z-index: 1;
  }

  100% {
    transform: translate(0, $planet );
    z-index: 10;
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
