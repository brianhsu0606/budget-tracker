import request from './request'

const profileApi = {
  getProfile() {
    return request({
      url: '/profile',
      method: 'get',
    })
  },
}

export default profileApi
