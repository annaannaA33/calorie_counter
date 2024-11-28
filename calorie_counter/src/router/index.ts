import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/day/:date',
      name: 'day',
      component: HomeView, // Используем ту же страницу, но с параметром даты
      props: true, // Передаём параметр `date` как пропс
    },
    /*{
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },*/
  ],
})

export default router
