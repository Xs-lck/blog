<template>
  <ul class="rightlist-container">
    <li v-for="(item, i) in props.list" :key="i">
      <span @click="handleSelect(item)" :class="{ select: item.isSelected }">{{
        item.name
      }}</span>
      <span
        @click="handleSelect(item)"
        :class="{ select: item.isSelected }"
        class="aside"
        >{{ (item as listItem).aside }}</span
      >
      <RightList
        :list="(item as newToc).children"
        @select="handleSelect"
      ></RightList>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { listItem, newToc } from '@/type/blog';
const props = withDefaults(
  defineProps<{
    list: Array<listItem> | Array<newToc>;
  }>(),
  { list: () => [] }
);
type Item = listItem | newToc;
const emit = defineEmits<{
  (e: 'select', item: Item): void;
}>();

function handleSelect<T extends Item>(item: T) {
  emit('select', item);
}
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
.rightlist-container {
  list-style: none;
  padding: 0;
  .rightlist-container {
    padding-left: 10px;
  }
  li {
    font-size: 14px;
    cursor: pointer;
    min-height: 35px;
    line-height: 35px;
  }
}
span.select {
  color: @warn;
  font-weight: bold;
}
.aside {
  font-size: 12px;
  vertical-align: bottom;
  color: @gray;
  margin-left: 10px;
}
</style>
