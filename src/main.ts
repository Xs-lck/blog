import './mock';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vLoading from '@/directives/loading';
import eventBus from '@/utils/eventBus';
import vLazy from '@/directives/lazy';
import showMessage from '@/utils/showMessage';
import './style/global.less';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$showMessage = showMessage;

app.config.globalProperties.$eventBus = eventBus;

app.directive('lazy', vLazy)
app.directive('loading', vLoading)

app.use(createPinia())
app.use(router)


app.mount('#app')


