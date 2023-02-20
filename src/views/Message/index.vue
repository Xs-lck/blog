<template>
  <div ref="messageContainer" class="message-container">
    <MessageArea
      title="留言板"
      :total="dataRef!.total"
      :list="dataRef!.rows"
      @submit="handleSubmit"
      :isListLoading="isLoadingRef"
      :text="text"
    ></MessageArea>
  </div>
</template>

<script setup lang="ts">
import MessageArea from '@/components/MessageArea/index.vue';
import * as mesApi from '@/api/message';
import { useFetchData } from '@/utils/useFetchData';
import { useMainScroll } from '@/utils/useMainScroll';
import { getCurrentInstance, onUnmounted, ref } from 'vue';
import type { formData } from '@/type/blog';
const messageContainer = ref<HTMLElement | null>(null);
let text = $ref('');
let limit = $ref(10);
let page = $ref(1);

const fetchData = async () => await mesApi.getMessages(page, limit);
const { dataRef, isLoadingRef } = useFetchData(fetchData, {
  total: 0,
  rows: [],
});

const { proxy }: any = getCurrentInstance();
let i = 1;
const handleSubmit = async (
  formData: formData,
  callback: (msg: string, type?: string) => void
) => {
  const resp = await mesApi.postMessage({ ...formData });
  if (!resp) {
    callback('您的操作过于频繁，请稍后再试', 'info');
  } else {
    //   this.data.rows.unshift(resp);
    dataRef.value!.total++;
    dataRef.value = await mesApi.getMessages(page, page * limit);
    callback('感谢您的留言');
  }
};

const handleNextPage = (dom: HTMLElement) => {
  if (isLoadingRef.value || !dom) {
    return;
  }
  let range = 100;
  let dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
  if (dec <= range) {
    fetchMore();
  }
};

const hasMore = $computed(
  () => dataRef.value!.rows.length >= dataRef.value!.total
);

const fetchMore = async () => {
  if (dataRef.value!.rows.length === 0) {
    text = '-------博主很菜，请大佬们给点建议------';
    return;
  }
  if (hasMore) {
    text = '------我也是有底线的------';
    return;
  }
  isLoadingRef.value = true;
  page++;
  const resp = await fetchData();
  dataRef.value!.rows = dataRef.value!.rows.concat(resp.rows);
  isLoadingRef.value = false;
};

proxy.$eventBus.on('mainScroll', handleNextPage);
useMainScroll(messageContainer);
onUnmounted(() => {
  proxy.$eventBus.off('mainScroll', handleNextPage);
});
</script>

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
