<template>
  <div class="site-aside-container">
    <Avatar :url="dataRef?.avatar || loading" />
    <h1 class="title">{{ dataRef?.siteTitle || '加载中...' }}</h1>
    <Meun />
    <Contact />
    <!-- <p class="footer"></p> -->
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar/index.vue';
import Contact from './Contact/index.vue';
import Meun from './Meun/index.vue';
import loading from '@/assets/loading.svg';
import { useSetStore } from '@/stores/setting';
import { storeToRefs } from 'pinia';
const setStore = useSetStore();
const { dataRef } = storeToRefs(setStore);
const { fetchData } = setStore;
fetchData();
</script>

<style lang="less">
@import '~@/style/var.less';
.site-aside-container {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  background: @dark;
  overflow-x: hidden;
  overflow-y: auto;

  box-sizing: border-box;
  .title {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
}
.avatar-container {
  text-align: center;
  display: block;
  margin: 0 auto;
}
</style>
