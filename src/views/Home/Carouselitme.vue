<template>
  <div
    class="carouselitem-container"
    ref="carouselitem"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" :style="imagePosition" ref="image">
      <ImageLoader
        @load="showWord"
        :src="props.carousel.bigImg"
        :placeholder="props.carousel.midImg"
      />
    </div>
    <div class="title" ref="titleDom">{{ props.carousel.title }}</div>
    <div class="description" ref="desc">{{ props.carousel.description }}</div>
  </div>
</template>

<script setup lang="ts">
import type { bannerItem } from '@/type/store';
import ImageLoader from '@/components/ImageLoader/index.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
const props = defineProps<{
  carousel: bannerItem;
}>();
const titleWidthRef = ref(0);
const descWidthRef = ref(0);
const containerSizeRef = ref<any>(0);
const imageSizeRef = ref<any>(0);
const mouseXRef = ref<any>(0);
const mouseYRef = ref<any>(0);

const titleDom = ref<HTMLElement | null>(null);
const desc = ref<HTMLElement | null>(null);
const carouselitem = ref<HTMLElement | null>(null);
const image = ref<HTMLElement | null>(null);

const center = computed(() => ({
  x: containerSizeRef.value.width / 2,
  y: containerSizeRef.value.height / 2,
}));

const imagePosition = computed(() => {
  if (!containerSizeRef.value || !imageSizeRef.value) {
    return;
  }
  const extraWidth = containerSizeRef.value.width - imageSizeRef.value.width;
  const extraHeight = containerSizeRef.value.height - imageSizeRef.value.height;

  const left = (extraWidth / containerSizeRef.value.width) * mouseXRef.value;
  const top = (extraHeight / containerSizeRef.value.height) * mouseYRef.value;
  return {
    transform: `translate(${left}px, ${top}px)`,
  };
});

onMounted(() => {
  titleWidthRef.value = (titleDom.value as HTMLElement)?.clientWidth;
  descWidthRef.value = (desc.value as HTMLElement).clientWidth;
  getSize();
  mouseXRef.value = center.value.x;
  mouseYRef.value = center.value.y;
  window.addEventListener('resize', getSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', getSize);
});

const getSize = () => {
  if (carouselitem.value || image.value) {
    return;
  }
  containerSizeRef.value = {
    width: (carouselitem.value as unknown as HTMLElement)?.clientWidth,
    height: (carouselitem.value as unknown as HTMLElement)?.clientHeight,
  };
  // console.log(this.containerSize)
  imageSizeRef.value = {
    width: (image.value as unknown as HTMLElement)?.clientWidth,
    height: (image.value as unknown as HTMLElement)?.clientHeight,
  };
};

const showWord = () => {
  (titleDom.value as HTMLElement).style.opacity = '1';
  (titleDom.value as HTMLElement).style.width = '0';
  (titleDom.value as HTMLElement).clientWidth;
  (titleDom.value as HTMLElement).style.transition = 'all 1s';
  (titleDom.value as HTMLElement).style.width = titleWidthRef.value + 'px';

  (desc.value as HTMLElement).style.opacity = '1';
  (desc.value as HTMLElement).style.width = '0';
  (desc.value as HTMLElement).clientWidth;
  (desc.value as HTMLElement).style.transition = 'all 1s 1s';
  (desc.value as HTMLElement).style.width = descWidthRef.value + 'px';
};

const handleMousemove = (e: MouseEvent) => {
  const rect = (carouselitem.value as HTMLElement).getBoundingClientRect();
  mouseXRef.value = e.clientX - rect.left;
  mouseYRef.value = e.clientY - rect.top;

  // console.log(rect, this.mouseX, this.mouseY)
  // this.clientX = this.e.clientX -
  // console.log(e.clientX, e.clientY)
};
const handleMouseLeave = (e: MouseEvent) => {
  mouseXRef.value = center.value.x;
  mouseYRef.value = center.value.y;
};
</script>

<style lang="less" scoped>
.carouselitem-container {
  width: 100%;
  height: 100%;
  position: relative;
  color: #fff;
  overflow: hidden;
  .title,
  .description {
    opacity: 0;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    left: 20px;
    letter-spacing: 3px;
    text-shadow: 1px 0px 0px rgba(0, 0, 0, 0.6), -1px 0px 0px rgba(0, 0, 0, 0.6),
      0px 1px 0px rgba(0, 0, 0, 0.6), 0px -1px 0px rgba(0, 0, 0, 0.6);
  }
  .title {
    top: calc(50% - 20px);
    font-size: 2em;
  }
  .description {
    top: calc(50% + 40px);
    font-size: 1.2em;
  }
}
.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  // z-index: -1;
  transition: all 0.2s;
}
</style>
