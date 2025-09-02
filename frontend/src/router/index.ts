import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainLayout.vue'),
      redirect: { name: 'home' },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'expense',
          name: 'expense',
          component: () => import('@/views/ExpenseView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'income',
          name: 'income',
          component: () => import('@/views/IncomeView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('@/views/SettingView.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else if (to.name === 'login' && token) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
