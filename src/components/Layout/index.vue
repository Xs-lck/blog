<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main" id="content">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  align-content: stretch;
  .left {
    flex: 0 0 auto;
  }
  .main {
    flex: 1 1 auto;
  }
  .right {
    flex: 0 0 auto;
  }
}
</style>
