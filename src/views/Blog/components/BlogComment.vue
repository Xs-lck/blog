<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
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
import { getComments } from '@/api/blog';
import { postComment } from '@/api/blog';
import { useFetchData } from '@/utils/useFetchData';
import { useRoute } from 'vue-router';
import type { comments, formData } from '@/type/blog';
import { getCurrentInstance, onUnmounted, watch } from 'vue';
const route = useRoute();

const fetchNextPage = (dom: HTMLElement) => {
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

const { proxy }: any = getCurrentInstance();
proxy.$eventBus.on('mainScroll', fetchNextPage);

onUnmounted(() => {
  proxy.$eventBus.off('mainScroll', fetchNextPage);
});

let limit = $ref(10);
let page = $ref(1);
let text = $ref('');

const fetchData = async () =>
  await getComments(route.params.id as string, page, limit);
let { dataRef, isLoadingRef } = useFetchData<comments>(fetchData, {});

const handleSubmit = async (
  formData: formData,
  callback: (msg: string, type?: string) => void
) => {
  const resp = await postComment({
    blogId: route.params.id as string,
    ...formData,
  });
  if (!resp) {
    callback('您的操作过于频繁，请稍后再试', 'info');
  } else {
    //   this.data.rows.unshift(resp);
    dataRef.value!.total++;
    dataRef.value = await getComments(
      route.params.id as string,
      page,
      dataRef.value!.total
    );
    callback('评论成功');
  }
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  width: 100%;
  padding-top: 20px;
}
</style>
