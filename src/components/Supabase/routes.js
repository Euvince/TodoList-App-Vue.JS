import AuthLayout from "./AuthLayout.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import Register from "./pages/Register.vue";
import Todos from "./pages/Todos.vue";
import TodoLayout from "./TodoLayout.vue";


export const routes = [
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            { path : 'login', component : Login, name : 'login' },
            { path : 'register', component : Register, name : 'register' },
        ]
    },
    {
        path: '/',
        component: TodoLayout,
        children: [
            { path: 'home', component: Home, name: 'home' },
            { path: 'todos', component: Todos, name: 'todos' },
        ]
    },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
]
