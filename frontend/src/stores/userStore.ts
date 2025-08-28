import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const token = ref('')

  // 初始化 store，刷新頁面從 localStorage 拿資料
  const initUser = () => {
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    if (storedToken && storedUsername) {
      token.value = storedToken
      username.value = storedUsername
    }
  }

  const setUser = (userData: { username: string; token: string }) => {
    username.value = userData.username
    token.value = userData.token
    localStorage.setItem('username', userData.username)
    localStorage.setItem('token', userData.token)
  }

  const logout = () => {
    username.value = ''
    token.value = ''
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  return { username, token, initUser, setUser, logout }
})
