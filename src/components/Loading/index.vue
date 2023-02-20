<template>
  <div class="loading-container">
    <div class="container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import '~@/style/mixin.less';
@ballSize: 10px;
@containerSize: 150px;
@n: 36; // 小球个数
@pdeg: (360deg / @n); // 旋转角度
@duration: 2000ms; // 动画时间
.loading-container {
  width: 100%;
  height: 100%;
  margin: auto;
  .container {
    .self-center(relative);
    width: @containerSize;
    height: @containerSize;
    border-radius: 50%;
    .dot {
      position: absolute;
      left: 50%;
      top: 50%;
      width: @ballSize;
      height: @ballSize;
      margin-left: (-@ballSize / 2);
      margin-top: (-@ballSize / 2);
      perspective: 70px;
      transform-style: preserve-3d;
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      &::before {
        background-color: darkslategray;
        top: -100%;
        animation: moveBlack @duration infinite;
      }
      &::after {
        background-color: red;
        top: 100%;
        animation: moveRed @duration infinite;
      }
    }
  }
}

@keyframes moveBlack {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0, 100%, @ballSize);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0, 200%, 0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, 100%, -@ballSize);
    animation-timing-function: ease-out;
  }
}

@keyframes moveRed {
  0% {
    animation-timing-function: ease-in;
  }
  25% {
    transform: translate3d(0, -100%, -@ballSize);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translate3d(0, -200%, 0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, -100%, @ballSize);
    animation-timing-function: ease-out;
  }
}

.loop(@i) when(@i <= @n) {
  .dot:nth-child(@{i}) {
    transform: rotate(@pdeg * @i) translateY((@containerSize / 2));
    &::before,
    &::after {
      animation-delay: -(@duration / @n) * 5 * @i !important;
    }
  }
  .loop(@i + 1);
}
.loop(1);
</style>
