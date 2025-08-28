import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const isGuest = ref(false)
  const userId = ref<string | null>(null)
  const token = ref<string | null>(null)

  // 帳號登入
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/login', { email, password })
      userId.value = res.data.userId
      token.value = res.data.token
      isLoggedIn.value = true
      isGuest.value = false
      localStorage.setItem('token', res.data.token)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // 訪客登入
  const guestLogin = () => {
    isGuest.value = true
    isLoggedIn.value = true
    userId.value = 'guest' // 可以用固定值或隨機生成
    // 初始化 localStorage
    if (!localStorage.getItem('guestTransactions')) {
      localStorage.setItem('guestTransactions', JSON.stringify([]))
    }
  }

  const logout = () => {
    isLoggedIn.value = false
    isGuest.value = false
    userId.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  return { isLoggedIn, isGuest, userId, token, login, guestLogin, logout }
})
