<template>
  <div id="app">
    <Layout>
      <template #left>
        <div class="left-container">
          <SiteAside></SiteAside>
        </div>
      </template>
      <template #default>
        <RouterView></RouterView>
        <ToTop></ToTop>
      </template>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import SiteAside from '../src/components/SiteAside/index.vue';
import Layout from '../src/components/Layout/index.vue';
import ToTop from '@/components/ToTop/index.vue';
import { RouterView } from 'vue-router';
import { getCurrentInstance } from 'vue';
const { proxy }: any = getCurrentInstance();

// 测试

// function handle1(data: any) {
//   console.log('handle1', data);
// }
// function handle2(data: any) {
//   console.log('handle2', data);
// }
// proxy.$eventBus.on('event1', handle1);
// proxy.$eventBus.on('event1', handle2);
// proxy.$eventBus.on('event2', handle1);
// (window as any).proxy = proxy;
// (window as any).eventBus = proxy.$eventBus;
// (window as any).handle1 = handle1;
// (window as any).handle2 = handle2;
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';
#app {
  height: 100%;
  background-color: #fff;
}
.left-container {
  width: 250px;
  height: 100%;
}
</style>
