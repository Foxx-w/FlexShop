import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'
import PurchaseHistory from './views/BuyHistory.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register }
  ,{ path: '/login', component: Login }
  ,{ path: '/cart', component: Cart }
  ,{ path: '/history', component: PurchaseHistory }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
