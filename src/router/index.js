import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// console.log(key)

export const constantRoutes = [
  // 首页
  {
    path: '',
    component: Layout,
    redirect: '/index/page',
    children: [{
      path: '/',
      name: '首页',
      component: () => import('@/views/index/index')
    }
    ]
  },
  // login登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 注册
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  // 忘记密码
  {
    path: '/findPassword',
    component: () => import('@/views/login/FindPassword'),
    hidden: true
  },
  // 购物车 收藏
  {
    path: '/collect',
    component: Layout,
    redirect: '/collect/page',
    children: [
      {
        path: 'cart', // 购物车
        component: () => import('@/views/Collect/Cart')
      },
      {
        path: 'collect', // 收藏 商品收藏 店铺收藏
        component: () => import('@/views/Collect/Collect')
      }
    ]
  },
  // 确认订单  // 商品详情   帮助中心
  {
    path: '/commodity',
    component: Layout,
    redirect: '/collect/page',
    children: [
      {
        path: 'order', // 确认订单
        component: () => import('@/views/commodity/ConfirmOrder')
      },
      {
        path: 'item', // 商品详情
        component: () => import('@/views/commodity/Item')
      },
      {
        path: 'serviceCentre', // 帮助中心
        component: () => import('@/views/commodity/ServiceCentre')
      }
    ]
  },

  // 我的订单 商城充值卡 我的优惠券 我的足迹 收货地址管理 我的评价 个人资料
  {
    path: '/my',
    component: Layout,
    redirect: '/my/page',
    children: [
      {
        path: 'boughtList', // 我的订单
        component: () => import('@/views/Bought/BoughtList')
      },
      {
        path: 'rechargeableCard', // 商城充值卡
        component: () => import('@/views/Coupon/RechargeableCard')
      },
      {
        path: 'coupon', // 优惠券
        component: () => import('@/views/Coupon/Coupon')
      },
      {
        path: 'foot', // 我的足迹
        component: () => import('@/views/PersonalData/MyFoot')
      },
      {
        path: 'deliverAddress', // 收货地址管理
        component: () => import('@/views/PersonalData/DeliverAddress')
      },
      {
        path: 'evaluate', // 我的评价
        component: () => import('@/views/PersonalData/MyEvaluate')
      },
      {
        path: 'personalData', // 个人资料
        component: () => import('@/views/PersonalData/PersonalData')
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
// 解决刷新路由失效的问题
// var key = JSON.parse(window.sessionStorage.getItem('keyPath'))
// if (key) {
//   constantRoutes.push({
//     path: '',
//     component: Layout,
//     redirect: key,
//     children: [{
//       path: key,
//       name: key + 1,
//       component: () => import('@/views/idcard/AllList')
//     }]
//   })
// }

const createRouter = () => new Router({
  // mode: 'history', // require service support ( 后端支持可开 )
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

// ********************************************************************
