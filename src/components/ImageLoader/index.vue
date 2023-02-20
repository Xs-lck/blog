<template>
  <div class="image-loader-container">
    <img
      v-if="!loadedRef"
      class="placeholder"
      :src="props.placeholder"
      alt=""
    />
    <img
      @load="handleLoad"
      :src="props.src"
      alt=""
      :style="{ opacity: originOpacity, transition: `${props.duration}ms` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const emit = defineEmits<{
  (e: 'load'): void;
}>();
const props = withDefaults(
  defineProps<{
    src: string;
    placeholder: string;
    duration?: number;
  }>(),
  {
    duration: 500,
  }
);
const originLoadedRef = ref(false); //  原图是否加载完成
const loadedRef = ref(false); // 是否一切都尘埃落定了

const originOpacity = computed(() => (originLoadedRef.value ? 1 : 0));

const handleLoad = () => {
  originLoadedRef.value = true;
  loadedRef.value = true;
  emit('load');
  setTimeout(() => {
    loadedRef.value = true;
    emit('load');
  }, props.duration);
};
</script>

<style scoped lang="less">
@import '~@/style/mixin.less';
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }

  .placeholder {
    filter: blur(2vw);
  }
}
</style>
