import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AppRouter from './AppRouter.vue'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register }
  ,{ path: '/login', component: Login }
  ,{ path: '/cart', component: Cart }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(AppRouter).use(router).mount('#app')
