import { ref, type Ref } from 'vue';
export function useCommonAsync <T extends Array<Record<string, any>>>(getDataFun: () => Promise<T>) {
  const loadingRef = ref(false);
  const dataRef:Ref<T | null> = ref(null)
  async function fetchData () {
    if(dataRef.value?.length) return;
    loadingRef.value = true;
    const resp = await getDataFun();
    dataRef.value = resp;
    loadingRef.value = false;
  }
  return {loadingRef, dataRef, fetchData}
}