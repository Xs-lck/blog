<template>
  <Layout>
    <div ref="mainContainer" class="main-container">
      <BlogDetail :blog="dataRef" v-if="dataRef"></BlogDetail>
      <BlogComment v-if="!isLoadingRef"></BlogComment>
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoadingRef">
        <BlogTOC :toc="dataRef.toc" v-if="dataRef"></BlogTOC>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout/index.vue';
import BlogDetail from '../components/BlogDetail.vue';
import BlogTOC from '../components/BlogTOC.vue';
import { getBlog } from '@/api/blog';
import { useFetchData } from '@/utils/useFetchData';
import BlogComment from '../components/BlogComment.vue';
import { useMainScroll } from '@/utils/useMainScroll';
import { ref, watch } from 'vue';
import { siteTitle } from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import type { blogArticle } from '@/type/blog';
const route = useRoute();
const router = useRouter();
const mainContainer = ref<HTMLElement | null>(null);

const fetchData = async () => {
  let resp = await getBlog(route.params.id as string);
  if (!resp) {
    router.push('/404');
    return;
  }
  siteTitle.setRouterTitle(resp.title);
  return resp;
};
const { dataRef, isLoadingRef } = useFetchData<blogArticle>(fetchData);

useMainScroll(mainContainer);
</script>

<style scoped lang="less">
.main-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
