import { getSetting } from '@/api/setting';
import { siteTitle } from '@/utils';
import { defineStore } from 'pinia'
import { ref, type LinkHTMLAttributes } from 'vue';

export const useSetStore = defineStore('setting', () => {
  const loadingRef = ref(false);
  const dataRef = ref<any>(null);
  async function fetchData() {
    loadingRef.value = true;
    const resp = await getSetting() as any;
    dataRef.value = resp;
    loadingRef.value = false;
    if (resp.siteTitle) {
      siteTitle.setSiteTitle(resp.siteTitle);
    }
    if (resp.favicon) {
      let link:LinkHTMLAttributes = document.querySelector('link[rel="icon"]') as LinkHTMLAttributes;
      if ((link.href = resp.favicon)) {
        return;
      }
      link.href = resp.favicon;
    }
  }
  return {dataRef, fetchData}
}) 
