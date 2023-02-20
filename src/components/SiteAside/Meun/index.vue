<template>
  <nav class="meun-container">
    <RouterLink
      v-for="item in items"
      :key="item.icon"
      :to="{ name: item.name }"
      active-class="selected"
      v-solt="{ isExactActive: item.isExactActive }"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/index.vue';
import { RouterLink } from 'vue-router';
const items = [
  {
    name: 'Home',
    title: '首页',
    icon: 'home',
    isExactActive: true,
  },
  {
    name: 'Blog',
    title: '文章',
    icon: 'blog',
    isExactActive: false,
  },
  {
    name: 'About',
    title: '关于我',
    icon: 'about',
    isExactActive: true,
  },
  {
    name: 'Project',
    title: '项目&效果',
    icon: 'code',
    isExactActive: true,
  },
  {
    name: 'Message',
    title: '留言板',
    icon: 'chat',
    isExactActive: true,
  },
];
</script>

<style scoped lang="less">
@import '~@/style/var.less';
.meun-container {
  a {
    color: @gray;
    height: 45px;
    padding: 0px 50px;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin: 10px 0;
    transition: all 0.2s;

    .icon {
      color: @gray;
      width: 30px;
    }
    &.selected {
      background: #2d2d2d;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>
