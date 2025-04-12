import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from './components/Supabase/AuthLayout.vue'
import { routes } from './components/Supabase/routes'
import { supabase } from './components/Supabase/supabase'


const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const { data } = await supabase.auth.getSession()
    const isLoggedIn = !!data.session

    const authPaths = [
        '/auth',
        '/auth/',
        '/auth/login',
        '/auth/login/',
        '/auth/register',
        '/auth/register/',
      ]

    if (to.meta.requiresAuth && !isLoggedIn) {
      next('/auth/login')
    } else if (authPaths.includes(to.path) && isLoggedIn) {
      next('/home')
    } else {
      next()
    }
  })

const app = createApp(AuthLayout)

app.use(router)
app.mount('#app')
