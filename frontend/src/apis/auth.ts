import request from './request'
import type { LoginForm } from '@/types/type'

const authApi = {
  register(data: LoginForm) {
    return request({
      url: '/register',
      method: 'post',
      data,
    })
  },
  login(data: LoginForm): Promise<string> {
    return request({
      url: '/login',
      method: 'post',
      data,
    })
  },
}

export default authApi
