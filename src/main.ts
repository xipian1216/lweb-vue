import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useArticlesStore } from './stores/articles'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

useArticlesStore().initArticle();

app.mount('#app')
