<template>
  <div @click="handleClick" v-show="showRef" class="to-top-container">Top</div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue';
const { proxy }: any = getCurrentInstance();
const showRef = ref(false);
const scrollShow = (dom: any) => {
  if (!dom) {
    showRef.value = false;
    return;
  }
  showRef.value = dom.scrollTop >= 1000 ? true : false;
};
const handleClick = () => {
  proxy.$eventBus.emit('mainScrollTop', 0);
};
proxy.$eventBus.on('mainScroll', scrollShow);
onUnmounted(() => {
  proxy.$eventBus.off('mainScroll', scrollShow);
});
</script>

<style scoped lang="less">
@import '~@/style/var.less';
.to-top-container {
  width: 60px;
  height: 60px;
  color: #fff;
  background: @primary;
  border-radius: 50%;
  position: fixed;
  right: 80px;
  bottom: 50px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}
</style>
