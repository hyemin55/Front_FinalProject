import CartView from '@/views/CartView.vue'
import MainView from '@/views/MainView.vue'
import ProductListView from '@/views/ProductListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/category/:title', // 매개변수 추가
      name: 'productList',
      component: ProductListView,
    },
    {
      path: '/search',
      name: 'search',
      component: ProductListView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
  ],
})

export default router
