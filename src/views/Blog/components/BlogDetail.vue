<template>
  <div class="blog-detail-container">
    <h2>{{ blog.title }}</h2>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览量：{{ blog.scanNumber }}</span>
      <a href="#Dataform">评论：{{ blog.commentNumber }}</a>
      <Router-link
        :to="{
          name: 'BlogCategory',
          params: {
            categoryId: blog.category.id,
          },
        }"
        >{{ blog.category.name }}</Router-link
      >
    </div>
    <div class="markdown-body" v-html="blog.htmlContent"></div>
  </div>
</template>

<script setup lang="ts">
import formatDate from '@/utils/formatDate';
import 'highlight.js/styles/github.css';
import '@/style/markdown.css';
import type { blogArticle } from '@/type/blog';
const props = defineProps<{
  blog: blogArticle;
}>();
</script>

<style scoped lang="less">
@import '~@/style/var.less';

.blog-detail-container {
  width: 100%;
}
.aside {
  font-size: 14px;
  color: @gray;
  span,
  a {
    margin-right: 20px;
  }
}
.markdown-body {
  margin: 20px 0;
}
</style>
