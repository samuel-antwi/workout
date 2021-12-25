import { createApp } from 'vue'
import App from './App.vue'
import 'vue-material-design-icons/styles.css'
import './index.css'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
