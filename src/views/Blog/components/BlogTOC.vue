<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect"></RightList>
  </div>
</template>

<script setup lang="ts">
import RightList from './RightList.vue';
import { deBounce } from '@/utils';
import type { Toc, newToc } from '@/type/blog';
import { ref, getCurrentInstance, computed, onMounted, onUnmounted } from 'vue';
const { proxy }: any = getCurrentInstance();
const props = defineProps<{
  toc: Toc;
}>();
const activeAnchorRef = ref('');

const setSelect = () => {
  activeAnchorRef.value = '';
  for (const dom of doms.value) {
    if (!dom) {
      continue;
    }
    let domTop = dom.getBoundingClientRect().top;
    let topArea = 100; // 规定区域的大小
    if (domTop >= 0 && domTop <= topArea) {
      //在规定的区域
      activeAnchorRef.value = dom.id;
    } else if (domTop > topArea) {
      // 在规定区域的下方
      return;
    } else {
      // 在规定区域的上方
      activeAnchorRef.value = dom.id;
    }
  }
};
const setSelectDebounce = deBounce(setSelect, 50);
proxy.$eventBus.on('mainScroll', setSelectDebounce);

const doms = computed(() => {
  let doms: Array<HTMLElement> = [];
  let getDoms = (toc: Toc = []) => {
    for (const item of toc) {
      let dom = document.getElementById(item.anchor);
      dom && doms.push(dom);
      if (item.children && item.children.length) {
        getDoms(item.children);
      }
    }
  };
  getDoms(props.toc);
  return doms;
});

onMounted(() => {
  const hash = location.hash;
  location.hash = '';
  setTimeout(() => {
    location.hash = hash;
  }, 50);
  // location.hash = hash;
});

onUnmounted(() => {
  proxy.$eventBus.off('mainScroll', setSelectDebounce);
});

const tocWithSelect = computed<Array<newToc>>(() => {
  let getTOC = (toc: Toc = []): Array<newToc> => {
    return toc.map((r) => ({
      ...r,
      isSelected: r.anchor === activeAnchorRef.value,
      children: getTOC(r.children),
    }));
  };
  return getTOC(props.toc);
});

const handleSelect = (item: any) => {
  location.hash = (item as newToc).anchor;
};
</script>

<style scoped lang="less">
.blog-toc-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  h2 {
    margin: 0;
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>
