import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile } from '@/types/type'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('')
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
      token.value = ''
      displayName.value = ''
      avatar.value = ''
    }

    return { token, displayName, avatar, setToken, setUser, logout }
  },
  {
    persist: true,
  },
)
