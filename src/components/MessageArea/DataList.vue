<template>
  <ul class="data-list-container">
    <li v-for="item in props.list" :key="item?.id">
      <Avatar :url="item?.avatar" :size="44"></Avatar>
      <div class="content">
        <div class="nickname">{{ item?.nickname }}</div>
        <div class="cur">{{ item?.content }}</div>
        <div class="time">{{ formatDate(item?.createDate, true) }}</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar/index.vue';
import { formatDate } from '@/utils';
import type { messageData } from '@/type/store';
import { watch } from 'vue';
const props = withDefaults(
  defineProps<{
    list?: messageData;
  }>(),
  {
    list: () => [],
  }
);
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
.data-list-container {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid lighten(@gray, 20%);
}
.avatar-container {
  margin-right: 15px;
}
.nickname {
  margin-bottom: 15px;
  font-size: 18px;
  color: darken(@success, 10%);
}
.cur {
  font-size: 14px;
}
.content {
  flex: 1 1 auto;
  position: relative;
}
.time {
  position: absolute;
  right: 0;
  top: 0;
  color: @gray;
  font-size: 14px;
  letter-spacing: 1px;
}
</style>
