import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const request = axios.create({
  baseURL: '/api'
})

// 设置请求的拦截器
request.interceptors.request.use(config => {
  nProgress.start()
  if (store.state.detail.UUID_Token) {
    config.headers.userTempId = store.state.detail.UUID_Token
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  return config
})

// 相应的拦截器
request.interceptors.response.use(res => {
  nProgress.done()
  return res.data
}, (error) => {
  return Promise.reject(new Error('faile'))
})

export default request
