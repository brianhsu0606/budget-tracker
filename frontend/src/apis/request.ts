import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('請求攔截器錯誤:', error)
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (res) => {
    const { code, message, result } = res.data

    if (code === 200) {
      return result
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    const userStore = useUserStore()

    // 後端回傳 401，代表 token 過期或無效
    if (error.response.status === 401) {
      userStore.logout()
      router.push('/login')
      return Promise.reject(new Error('登入已過期，請重新登入'))
    }

    if (error.response && error.response.data && error.response.data.message) {
      return Promise.reject(new Error(error.response.data.message))
    }

    return Promise.reject(new Error(error.message || '伺服器錯誤'))
  },
)

export default request
