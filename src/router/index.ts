import { createRouter, createWebHistory } from 'vue-router'

import {siteTitle} from '@/utils'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  siteTitle.setRouterTitle((to.meta.title as string))
})

export default router
