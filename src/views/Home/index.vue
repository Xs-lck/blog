<template>
  <div
    v-loading="loadingRef"
    class="home-container"
    ref="home"
    @wheel="handleWheel"
  >
    <ul
      class="homeItem"
      :style="{ marginTop }"
      @transitionend="isScroolRef = false"
    >
      <li v-for="item in dataRef" :key="item.id">
        <Carouselitme :carousel="item" />
      </li>
    </ul>
    <div
      class="icon iconUp"
      @click="change(indexRef - 1)"
      v-show="indexRef > 0"
    >
      <Icon type="arrowUp"></Icon>
    </div>
    <div
      class="icon iconDown"
      @click="change(indexRef + 1)"
      v-show="indexRef < (dataRef as bannerData)?.length - 1"
    >
      <Icon type="arrowDown"></Icon>
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in dataRef"
        @click="change(i)"
        :class="{ active: indexRef == i }"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Carouselitme from './Carouselitme.vue';
import Icon from '@/components/Icon/index.vue';
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useBannerStore } from '@/stores/banner';
import { storeToRefs } from 'pinia';
import type { bannerData } from '@/type/store';

const bannerStore = useBannerStore();
const { loadingRef, dataRef } = storeToRefs(bannerStore);
const { fetchData } = bannerStore;
fetchData();
const indexRef = ref(0); //当前显示的是第几张轮播图
const containerHeightRef = ref(0);
const isScroolRef = ref(false);
const home = ref<Element | null>(null);

onMounted(() => {
  containerHeightRef.value = home.value?.clientHeight as number;
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const marginTop = computed(
  () => -indexRef.value * containerHeightRef.value + 'px'
);

const change = (i: number) => {
  indexRef.value = i;
};

const handleWheel = (e: WheelEvent) => {
  if (isScroolRef.value) return;
  if (
    e.deltaY > 0 &&
    indexRef.value < (dataRef.value as bannerData).length - 1
  ) {
    isScroolRef.value = true;
    indexRef.value++;
  } else if (e.deltaY < 0 && indexRef.value > 0) {
    isScroolRef.value = true;
    indexRef.value--;
  }
};

const handleResize = () => {
  containerHeightRef.value = home.value?.clientHeight as number;
};
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
@import '~@/style/mixin.less';
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  color: #fff;
  overflow: hidden;
  .homeItem {
    transition: all 0.4s;
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      // overflow: hidden;
      // background-color: @dark;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }

  .indicator {
    .self-center();
    left: auto;
    right: 15px;
    // transform: translate(-50%, -50%);
    li {
      list-style: none;
      width: 7px;
      height: 7px;
      border: 2px solid #fff;
      border-radius: 50%;
      margin-bottom: 8px;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
}
.icon {
  .self-center();
  font-size: 26px;
  color: @gray;
  cursor: pointer;
  &Up {
    top: 20px;
    transform: translateX(-50%);
    animation: jumpUp 1.2s infinite;
  }
  &Down {
    top: auto;
    bottom: 20px;
    animation: jumpDown 1.2s infinite;
  }
}
@keyframes jumpUp {
  0% {
    top: 20px;
  }
  50% {
    top: 12px;
  }

  100% {
    top: 20px;
  }
}
@keyframes jumpDown {
  0% {
    bottom: 20px;
  }
  50% {
    bottom: 12px;
  }

  100% {
    bottom: 20px;
  }
}
</style>
