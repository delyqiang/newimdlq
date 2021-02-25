import { asyncRoutes, constantRoutes } from '@/router'
// /////////////////////////////////////
// import { getAuthMenu } from '@/api/user'
import Layout from '@/layout'
// /////////////////////////////////////
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// 权限判断
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
// ///////////////////////////////////////
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
// var arr = []

export function generaMenu(routes, data) {
  // var r = JSON.parse(sessionStorage.getItem('r'))
  data.forEach(item => {
    const menu = {

      // path, component 的转换关系更具业务逻辑
      // `${r == '2' ? r : r == '1' ? r : ''}` 三元判断
      path: item.id < 0 ? `/key_` + item.id + '_' + item.name : '',
      // component: item.url === '#' ? Layout : () => import(`@/views${item.url}/index`), url没有#所以不行
      // (item.id % 1000) == 0 这个计算逻辑是有问题的，比如只有一个一级链接时候，数值随机会有问题
      // item.icon === 'fun' 取响应的一级svg
      component: item.id > 0 ? Layout : () => import('@/views/index/index'),
      redirect: item.id > 0 ? `/key_` + item.id + '_' + item.name : '',
      // hidden: true,
      children: [
        {
          path: item.id > 0 ? `/key_` + item.id + '_' + item.name : '',
          name: item.id > 0 ? `key_` + item.name : '',
          // title: item.name,
          component: () => import('@/views/index/index'),
          meta: { title: item.name, icon: item.icon }
        }
      ]
      // name: 'menu_' + item.menu_id,
      // name: item.id > 0 ? 'key_' + item.id : '',
      // meta: { title: item.menu_name, id: item.menu_id, roles: ['admin'] } ----title: item.name.includes('首页') ? item.name.slice(0, 2) :
      // 'dashboard' 'example'
    }
    // type=1选项卡，type=null没有选项卡, 二级的type值不为‘1’的话，就会直接渲染三级，解决办法二级变‘1’
    // if (item.children) {
    //   // 子级的遍历
    //   // var arr = []
    //   if (item.type === '0') {
    //     generaMenu(menu.children, item.children)
    //     // if (item.type === '1') {
    //     //   window.sessionStorage.setItem('btnx', JSON.stringify(item.children))
    //     // }
    //   } else if (item.type === '1') {
    //     // console.log(item.children)
    //     // if (item.children.length !== 0) {
    //     // }
    //     // console.log(item.children)
    //     arr.push(item.children)
    //     // console.log(arr)
    //     // window.sessionStorage.setItem('btnx', JSON.stringify(arr))
    //   }
    //   // 如果子级下 type=1，对应的选项卡属性提出来
    // }
    // var cpt = [{

    //   path: item.id > 0 ? `/key_` + item.id + '_' + item.name : '',
    //   name: item.id > 0 ? `/key_` + item.id : '',
    //   // title: item.name,
    //   component: () => import('@/views/idcard/AllList')
    // }]

    // if (item.children == null) {
    //   // item.children.concat(cpt)
    //   // console.log(null)
    //   // generaMenu(menu.children, cpt)
    // }
    // menu.children.concat(cpt)
    routes.push(menu)
    // console.log(menu)
    window.sessionStorage.setItem('route', JSON.stringify(routes))
  })
}
// ///////////////////////////////////////
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 递归过滤异步路由表
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
// ////////////////////////////////////////////////
const actions = {
  generateRoutes({ commit }, roles) { //
    // console.log(roles)
    return new Promise(resolve => {
      console.log(asyncRoutes)
      // const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      // getAuthMenu(state.token).then(response => {
      //   let data = response
      //   if (response.data.code !== 0) {
      //     this.$message({
      //       message: '菜单数据加载异常',
      //       type: 0
      //     })
      //   } else {
      //     data = response.data.data
      //     Object.assign(loadMenuData, data)
      //     // 清空数组
      //     asyncRoutes.length = 0
      //     generaMenu(asyncRoutes, loadMenuData)

      //     let accessedRoutes = []
      //     // if (roles.includes('0')) { // sidebar,传来的roles
      //     // alert(JSON.stringify(asyncRoutes))
      //     accessedRoutes = asyncRoutes || []
      //     // console.log(accessedRoutes, 222222222222222)
      //     // } else {
      //     //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      //     // }
      //     commit('SET_ROUTES', accessedRoutes)
      //     // console.log(accessedRoutes)
      //     resolve(accessedRoutes)
      //     // console.log(accessedRoutes)
      //   }
      //   // generaMenu(asyncRoutes, data)
      // }).catch(error => {
      //   console.log(error)
      // })
    })
  }
}
// /////////////////////////////////////////////////////////////////////
// const actions = {
//   generateRoutes({ commit }, roles) {
//     return new Promise(resolve => {
//       let accessedRoutes
//       if (roles.includes('admin')) {
//         accessedRoutes = asyncRoutes || []
//       } else {
//         accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//       }
//       commit('SET_ROUTES', accessedRoutes)
//       resolve(accessedRoutes)
//     })
//   }
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
