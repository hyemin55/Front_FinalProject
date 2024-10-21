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
      path: '/perfume/',
      name: 'perfume',
      component: ProductListView,
    },
    {
      path: '/diffuser',
      name: 'diffuser',
      component: ProductListView,
    },
    {
      path: '/candle',
      name: 'candle',
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
