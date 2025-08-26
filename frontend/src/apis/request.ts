import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/api',
})

request.interceptors.request.use()
request.interceptors.response.use((res) => {
  const { code, message, result } = res.data

  if (code === 200) {
    return result
  } else {
    return Promise.reject(message)
  }
})

export default request
