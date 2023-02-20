<script setup lang="ts">
import Layout from '@/components/Layout/index.vue';
import BlogCategory from './components/BlogCategory.vue';
import BlogList from './components/BlogList.vue';
</script>

<template>
  <div class="blog-container">
    <Layout>
      <template #default>
        <BlogList></BlogList>
      </template>
      <template #right>
        <BlogCategory></BlogCategory>
      </template>
    </Layout>
  </div>
</template>

<style lang="less">
.blog-container {
  width: 100%;
  height: 100%;
}
</style>
