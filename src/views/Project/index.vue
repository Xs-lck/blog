<template>
  <div class="project-container" ref="projectContainer" v-loading="loadingRef">
    <a
      v-for="item in dataRef"
      :key="item.id"
      :href="item.url ? item.url : `javascript:alert('无法访问')`"
      :target="item.url ? '_blank' : '_self'"
      class="project-item"
    >
      <img
        class="thumb"
        v-lazy="{
          src: item.thumb,
          proxy,
        }"
        alt=""
      />
      <div class="info">
        <h2>
          {{ item.name }}
          <a class="github" href="">gitee</a>
        </h2>
        <p v-for="(decs, i) in item.description" :key="i">{{ decs }}</p>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { useMainScroll } from '@/utils/useMainScroll';
import { ref, watch, getCurrentInstance } from 'vue';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';

const { proxy }: any = getCurrentInstance();
const projectContainer = ref<HTMLElement | null>(null);
useMainScroll(projectContainer);

const project = useProjectStore();
const { dataRef, loadingRef } = storeToRefs(project);
const { fetchData } = project;
fetchData();
</script>

<style scoped lang="less">
.project-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
}
.project-item {
  // width: 100%;
  // height: 300px;
  display: flex;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 20px;
  transition: all 0.5s;
  .thumb {
    width: 300px;
    flex: 0 0 250px;
    height: 250px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 5px;
  }
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
  .info {
    flex: 1 1 auto;
    line-height: 1.7;
    h2 {
      margin: 0;
      .github {
        font-size: 12px;
      }
    }
  }
}
</style>
