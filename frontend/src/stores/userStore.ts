import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile } from '@/types/type'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
    const username = ref<string>('')
    const displayName = ref<string>('')
    const avatar = ref<string>('')

    const setToken = (newToken: string) => {
      token.value = newToken
    }

    const setUser = (profile: Profile) => {
      displayName.value = profile.displayName
      avatar.value = profile.avatar
    }

    const logout = () => {
      localStorage.removeItem('user')
    }

    return { token, username, displayName, avatar, setToken, setUser, logout }
  },
  {
    persist: true,
  },
)
