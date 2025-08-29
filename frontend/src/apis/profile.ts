import request from './request'
import type { Profile } from '@/types/type'

const profileApi = {
  getProfile(): Promise<Profile> {
    return request({
      url: '/profile',
      method: 'get',
    })
  },
}

export default profileApi
