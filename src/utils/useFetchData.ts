import { ref } from "vue";
export function useFetchData<T>(fetchData:() => Promise<T | undefined>, defaultValue:any = null) {
  const isLoadingRef = ref(true);
  const dataRef = ref<T | null>(defaultValue);
  fetchData().then(resp => {
    resp && ((dataRef.value as T) = resp);
    isLoadingRef.value = false;
  });

  return {
    isLoadingRef,
    dataRef
  }

}