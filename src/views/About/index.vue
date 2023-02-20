<template>
  <div class="about-container" v-loading="loadingRef">
    <iframe class="about-content" :src="dataRef!" frameborder="0"> </iframe>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAboutStore } from '@/stores/about';
const aboutStore = useAboutStore();
const { dataRef, loadingRef } = storeToRefs(aboutStore);
const { fetchData } = aboutStore;
fetchData();
</script>

<style scoped lang="less"></style>
