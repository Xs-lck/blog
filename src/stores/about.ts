import { defineStore } from 'pinia'
import {getAbout} from '@/api/about'
import type {aboutData} from '@/type/store'
import {useCommonAsync} from './common'

export const useAboutStore = defineStore('about', () => useCommonAsync<aboutData>(getAbout))
