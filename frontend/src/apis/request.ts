import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const request = axios.create({
  baseURL: 'http://localhost:3000/api',
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.token || localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
request.interceptors.response.use((res) => {
  const { code, message, result } = res.data

  if (code === 200) {
    return result
  } else {
    return Promise.reject(message)
  }
})

export default request
