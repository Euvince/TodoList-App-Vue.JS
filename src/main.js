import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from './components/Supabase/AuthLayout.vue'
import { routes } from './components/Supabase/routes'


const router = createRouter({
    history : createWebHistory(),
    routes
})

const app = createApp(AuthLayout)

app.use(router)
app.mount('#app')
