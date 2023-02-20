import NoFound from "@/components/NoFound/index.vue"
import Loading from '@/components/Loading/index.vue'

import {start, done, configure} from "nprogress";
import 'nprogress/nprogress.css';
import { defineAsyncComponent } from "vue";

configure({
  trickleSpeed: 20,
  showSpinner: false
})

function delay(duration:number){
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(null);
      }, duration);
  })
}

function getPageComponent (pageCompResolve:any) {
  return async () => {
    start();
    if (process.env.NODE_ENV === 'development') {
      await delay(2000);
    }
    done();
    const resp = pageCompResolve();
    return resp;
  }
}

const createAsyncComp = (asyncFun:any) => {
  return defineAsyncComponent({
    loader: getPageComponent(asyncFun),
    loadingComponent: Loading
  })
}

const routes = [
  {
    name: 'Home',
    path: '/',
    // component: createAsyncComp(() => import(/*webpackChunkName: "home"*/ '@/views/Home/index.vue')),
    component: getPageComponent(() =>
      import(/*webpackChunkName: "home"*/ '@/views/Home/index.vue')
    ),
    meta: { title: '首页' },
  },
  {
    name: 'Message',
    path: '/message',
    component: getPageComponent(() =>
      import(/*webpackChunkName: "message"*/ '@/views/Message/index.vue')
    ),
    meta: { title: '留言板' },
  },
  {
    name: 'About',
    path: '/about',
    component: getPageComponent(() =>
      import(/*webpackChunkName: "about"*/ '@/views/About/index.vue')
    ),
    meta: { title: '关于我' },
  },
  {
    name: 'Blog',
    path: '/blog',
    component: getPageComponent(() =>
      import(/*webpackChunkName: "blog"*/ '@/views/Blog/index.vue')
    ),
    meta: { title: '文章' },
  },
  {
    name: 'BlogCategory',
    path: '/blog/cate/:categoryId',
    component: getPageComponent(() =>
      import(/*webpackChunkName: "blogcategory"*/ '@/views/Blog/index.vue')
    ),
    meta: { title: '文章分类' },
  },
  {
    name: 'BlogDetail',
    path: '/blog/:id',
    component: getPageComponent(() =>
      import(/*webpackChunkName: "blogdetail"*/ '@/views/Blog/Detail/index.vue')
    ),
    meta: { title: '文章详情' },
  },
  {
    name: 'Project',
    path: '/project',
    component: getPageComponent(() =>
      import(/*webpackChunkName: "project"*/ '@/views/Project/index.vue')
    ),
    meta: { title: '项目&效果' },
  },
  {
    name: 'Loading',
    path: '/loading',
    component: getPageComponent(() =>
      import(/*webpackChunkName: "project"*/ '@/components/Loading/index.vue')
    ),
    meta: { title: '项目&效果' },
  },
  { name: 'NoFound', path: '/:pathMatch(.*)*', component: NoFound, meta: {title: '没有找到页面'}}
]

export default routes;
