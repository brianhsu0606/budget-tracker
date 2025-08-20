import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainLayout.vue'),
      redirect: { name: 'home' },
      children: [
        { path: 'home', name: 'home', component: () => import('@/views/HomeView.vue') },
        { path: 'expense', name: 'expense', component: () => import('@/views/ExpenseView.vue') },
        { path: 'income', name: 'income', component: () => import('@/views/IncomeView.vue') },
      ],
    },
  ],
})

export default router
