import axios from 'axios'
// import encrypt from './encrypt.js'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // baseURL:// 固定域名
  timeout: 5000 // request timeout
})
// 跨域请求，允许保存cookie
// axios.defaults.withCredentials = true
// request interceptor
service.interceptors.request.use(function(config) {
  var users = window.sessionStorage.getItem('token')
  if (users) {
    config.headers = {
      'token': users
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  } else {
    config.headers = {

    }
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(

  response => {
    // console.log(response.data.code)
    if (response.data.code === 401) {
      const result = confirm('登录过期，确定后将返回登录页面，请重新登录。')
      if (result) {
        window.location.href = '/'
        window.sessionStorage.clear()
      }
    }

    // console.log(response)

    return response
  },
  error => {
    if (error.response && error.response.status === 500) {
      alert('网络连接有误，请重试')
    }
  }
)

export default service
