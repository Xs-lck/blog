<template>
  <div class="pager-container" v-if="pageTotal > 1">
    <a @click="handleClick(1)" :class="{ disabled: props.current == 1 }"
      >|&lt;&lt;</a
    >
    <a
      @click="handleClick(props.current - 1)"
      :class="{ disabled: props.current == 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in number"
      :key="i"
      :class="{ active: props.current == n }"
      >{{ n }}</a
    >
    <a
      @click="handleClick(props.current + 1)"
      :class="{ disabled: props.current == pageTotal }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pageTotal)"
      :class="{ disabled: props.current == pageTotal }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';
const emit = defineEmits<{
  (e: 'pageChange', newPage: number): void;
}>();
const props = withDefaults(
  defineProps<{
    current?: number;
    total?: number;
    limit?: number;
    visibleNumber?: number;
  }>(),
  {
    current: 1,
    total: 300,
    limit: 10,
    visibleNumber: 10,
  }
);
const pageTotal = computed(() => Math.ceil(props.total / props.limit));
const min = computed(() => {
  let min = props.current - props.visibleNumber / 2;
  if (min < 1) {
    min = 1;
  }
  return min;
});
const max = computed(() => {
  let max = props.current + props.visibleNumber / 2;
  if (max > pageTotal.value) {
    max = pageTotal.value;
  }
  return max;
});
const number = computed(() => {
  let arr = [];
  for (let i = min.value; i <= max.value; i++) {
    arr.push(i);
  }
  return arr;
});

const handleClick = (newPage: number) => {
  if (newPage < 1) {
    newPage = 1;
  }
  if (newPage > pageTotal.value) {
    newPage = pageTotal.value;
  }
  if (newPage == props.current) {
    return;
  }
  emit('pageChange', newPage);
};
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  cursor: pointer;
  a {
    color: @primary;
    margin: 0px 10px;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
    }
  }
}
</style>
