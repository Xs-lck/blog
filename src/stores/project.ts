import {getProject} from '@/api/project'
import type { project } from '@/type/project';
import {defineStore} from 'pinia'
import { useCommonAsync } from './common';
export const useProjectStore = defineStore('project', () => useCommonAsync<project>(getProject))
