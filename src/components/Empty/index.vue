<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>{{ props.text }}</p>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon/index.vue';
const props = withDefaults(defineProps<{ text: string }>(), { text: '无数据' });
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
@import '~@/style/mixin.less';
.empty-container {
  .iconfont {
    font-size: 80px;
  }
  color: @gray;
  text-align: center;
  margin: auto 0;
  .self-center();
}
</style>
