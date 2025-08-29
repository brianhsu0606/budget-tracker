import request from './request'
import type { Profile } from '@/types/type'

const profileApi = {
  getProfile(): Promise<Profile> {
    return request({
      url: '/profile',
      method: 'get',
    })
  },
  updateProfile(data: Profile): Promise<Profile> {
    return request({
      url: '/profile',
      method: 'put',
      data,
    })
  },
}

export default profileApi
