import { onMounted, getCurrentInstance, type Ref, onUnmounted } from "vue";

export function useMainScroll (refContainer:Ref<HTMLElement | null>) {
  const {proxy}:any = getCurrentInstance();
  const handleScroll = () => {
    proxy.$eventBus.emit('mainScroll', refContainer.value)
  }
  const toTop = (scroll:number) => {
    refContainer.value!.scrollTop = scroll;
  }
  onMounted(() => {
    refContainer.value?.addEventListener('scroll', handleScroll);
    proxy.$eventBus.on('mainScrollTop', toTop)
  })
  onUnmounted(() => {
    refContainer.value?.removeEventListener('scroll', handleScroll);
    proxy.$eventBus.emit('mainScroll');
    proxy.$eventBus.off('mainScrollTop', toTop);
  })
}