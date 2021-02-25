// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
// import { constantRoutes } from '@/router'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// router.beforeEach(async(to, from, next) => {
//   const users = window.sessionStorage.getItem('token')
//   if (to.path !== '/' && !users) {
//     next('/')
//   } else {
//     if (users) {
//       // const accessRoutes = await store.dispatch('permission/generateRoutes')
//       // router.addRoutes(accessRoutes)
//       next()
//     } else {
//       next()
//     }
//   }
// })

// router.afterEach((to, from, next) => {
//   // finish progress bar
//   next()
// })
