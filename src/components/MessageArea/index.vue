<template>
  <div class="message-area-container">
    <DataForm v-bind="$attrs"></DataForm>
    <h3>
      {{ title }}
      <span>({{ total }})</span>
    </h3>
    <DataList :list="list"></DataList>
    <div class="loading" ref="loading" v-loading="props.isListLoading">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import DataForm from './DataForm.vue';
import DataList from './DataList.vue';
import type { messageData } from '@/type/store';
import { getCurrentInstance } from 'vue';
import type { formData } from '@/type/blog';
const { proxy }: any = getCurrentInstance();

const props = withDefaults(
  defineProps<{
    title?: string;
    total?: number;
    list?: messageData;
    isListLoading?: boolean;
    text?: string;
  }>(),
  {
    title: '',
    total: 0,
    list: () => [],
    isListLoading: true,
    text: '',
  }
);
</script>

<style scoped lang="less">
.message-area-container {
  // width: 100%;
  .loading {
    height: 120px;
    width: 100%;
    position: relative;
    color: red;
    line-height: 120px;
    text-align: center;
    font-size: 14px;
  }
}
</style>
