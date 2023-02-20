<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url: string;
    size?: number;
  }>(),
  {
    size: 150,
  }
);
</script>

<template>
  <img
    class="avatar-container"
    :src="props.url"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
    }"
  />
</template>

<style scoped>
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
}
</style>
