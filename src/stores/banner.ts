import {getBanner} from '@/api/banner'
import { defineStore } from 'pinia';
import {useCommonAsync} from './common'
import type {bannerData} from '@/type/store'

export const useBannerStore = defineStore('banner', () => useCommonAsync<bannerData>(getBanner))