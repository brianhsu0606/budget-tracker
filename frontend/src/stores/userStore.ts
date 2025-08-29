import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile } from '@/types/type'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const username = ref<string>('')
  const displayName = ref<string>('')
  const avatar = ref<string>('')

  // 初始化 store，刷新頁面從 localStorage 拿資料
  const initUser = () => {
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    if (storedToken && storedUsername) {
      token.value = storedToken
      username.value = storedUsername
    }
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const setUser = (profile: Profile) => {
    username.value = profile.username
    displayName.value = profile.displayName
    avatar.value = profile.avatar
  }

  const logout = () => {
    username.value = ''
    token.value = ''
    localStorage.removeItem('username')
    localStorage.removeItem('token')
  }

  return { token, username, avatar, displayName, initUser, setToken, setUser, logout }
})
