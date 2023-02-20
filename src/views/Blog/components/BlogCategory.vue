<template>
  <div class="blogCategory-container" v-loading="isLoadingRef">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleChangeSelect"></RightList>
  </div>
</template>

<script setup lang="ts">
import RightList from './RightList.vue';
import { getBlogTypes } from '@/api/blog';
import { useFetchData } from '@/utils/useFetchData';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { listItem, blogTypes } from '@/type/blog';

const router = useRouter();
const route = useRoute();

const fetchData = async () => await getBlogTypes();

let { dataRef, isLoadingRef } = useFetchData<blogTypes>(fetchData, []);

const limit = computed(() => {
  return route.query.limit || 10;
});
const categoryId = computed(() => {
  return route.params.categoryId || -1;
});

const list = computed<Array<listItem>>(() => {
  let totalCount = 0;
  for (let i = 0; i < dataRef.value!.length; i++) {
    totalCount += dataRef.value![i].articleCount;
  }
  const result = [
    {
      name: '全部',
      aside: `${totalCount}篇`,
      id: -1,
      articleCount: totalCount,
    },
    ...(dataRef.value as blogTypes),
  ];
  const res: Array<listItem> = result.map((item) => ({
    ...item,
    isSelected: +categoryId.value === item.id,
    aside: `${item.articleCount}篇`,
  }));
  return res;
});

const handleChangeSelect = (item: any) => {
  const query: any = {
    page: 1,
    limit: limit.value,
  };
  if (item.id == -1) {
    router.push({
      name: 'Blog',
      query,
    });
  } else {
    router.push({
      name: 'BlogCategory',
      query,
      params: {
        categoryId: item.id,
      },
    });
  }
};
</script>

<style lang="less" scoped>
.blogCategory-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  h2 {
    margin: 0;
    font-size: 1.2em;
  }
}
</style>
