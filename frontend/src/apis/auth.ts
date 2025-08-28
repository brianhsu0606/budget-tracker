import request from './request'
import type { Form } from '@/types/type'

const authApi = {
  register(data: Form) {
    return request({
      url: '/register',
      method: 'post',
      data,
    })
  },
  login(data: Form): Promise<string> {
    return request({
      url: '/login',
      method: 'post',
      data,
    })
  },
}

export default authApi
