<script setup lang="ts">
import { defineProps, computed } from 'vue';
const classMap = {
  home: 'iconzhuye',
  success: 'iconzhengque',
  error: 'iconcuowu',
  close: 'iconguanbi',
  warn: 'iconjinggao',
  info: 'iconxinxi',
  blog: 'iconblog',
  code: 'iconcode',
  about: 'iconset_about_hov',
  weixin: 'iconweixin',
  mail: 'iconemail',
  github: 'icongithub',
  qq: 'iconsign_qq',
  arrowUp: 'iconiconfonticonfonti2copy',
  arrowDown: 'iconiconfonticonfonti2',
  empty: 'iconempty',
  chat: 'iconliuyan',
};
const props = defineProps<{
  type: string;
}>();
const icon = computed(() => {
  return classMap[props.type as keyof typeof classMap];
});
</script>

<template>
  <i class="iconfont icon-container" :class="icon"></i>
</template>

<style scoped>
@import '//at.alicdn.com/t/font_2164449_nalfgtq7il.css';
.iconfont {
  font-size: inherit;
  color: inherit;
}
</style>
