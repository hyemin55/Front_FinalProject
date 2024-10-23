import CartView from '@/views/CartView.vue'
import LoginView from '@/views/LoginView.vue'
import MainView from '@/views/MainView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
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
      path: '/category/:title/:idx', // 매개변수 추가
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
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/productsdetail/:idx',
      name: 'productsdetail',
      component: ProductDetailView,
    },
  ],
})

export default router
