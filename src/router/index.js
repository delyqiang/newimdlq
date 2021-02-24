import Vue from 'vue'
import Router from 'vue-router'


const Index = () => import( '../pages/index.vue') //首页
//user
const Login = () => import( '../pages/user/Login.vue') //登录
const Register = () => import( '../pages/user/Register.vue') //注册
const FindPassword = () => import( '../pages/user/FindPassword.vue') //找回密码
// Bought
const BoughtList = () => import( '../pages/Bought/BoughtList.vue') //我的 我的订单 BoughtList
// Collect
const Cart = () => import( '../pages/Collect/Cart.vue')//购物车   Cart
const Collect = () => import( '../pages/Collect/Collect.vue')//收藏 商品收藏 店铺收藏  Collect
// commodity
const ConfirmOrder = () => import( '../pages/commodity/ConfirmOrder.vue')//确认订单  ConfirmOrder
const Item = () => import( '../pages/commodity/Item.vue')//商品详情  Item
const ServiceCentre = () => import( '../pages/commodity/ServiceCentre.vue')//帮助中心   ServiceCentre  
// Coupon
const Coupon = () => import( '../pages/Coupon/Coupon.vue')//我的 我的优惠券  Coupon
const RechargeableCard = () => import( '../pages/Coupon/RechargeableCard.vue')//我的 商城充值卡  RechargeableCard
// PersonalData
const DeliverAddress = () => import( '../pages/PersonalData/DeliverAddress.vue')//我的 收货地址管理 DeliverAddress
const MyEvaluate = () => import( '../pages/PersonalData/MyEvaluate.vue')//我的 我的评价  MyEvaluate
const MyFoot = () => import( '../pages/PersonalData/MyFoot.vue')//我的 我的足迹 MyFoot
const PersonalData = () => import( '../pages/PersonalData/PersonalData.vue')//我的 个人资料 PersonalData

const View = () => import( '../pages/view.vue')
const noFound = () => import( '../components/503')

/*
 * 商户
 */
const measurement = () => import( '../components/imgUpdown.vue')


Vue.use(Router);

const router = new Router({
  mode:'history',
  routes: [
    {//登录页面
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {//注册页面
      path: '/Register',
      name: 'Register',
      component: Register,
    },
    {//注册页面
      path: '/FindPassword',
      name: 'FindPassword',
      component: FindPassword,
    },
    {//首页
      path: '/',
      name: 'Index',
      component: Index,
    },
    {//我的订单 BoughtList
      path: '/BoughtList',
      name: 'BoughtList',
      component: BoughtList,
    },
    {//购物车   Cart
      path: '/Cart',
      name: 'Cart',
      component: Cart,
    },
    {//收藏 商品收藏 店铺收藏  Collect
      path: '/Collect',
      name: 'Collect',
      component: Collect,
    },
    {//确认订单  ConfirmOrder
      path: '/ConfirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder,
    },
    {//商品详情  Item
      path: '/Item',
      name: 'Item',
      component: Item,
    },
    {//帮助中心   ServiceCentre
      path: '/ServiceCentre',
      name: 'ServiceCentre',
      component: ServiceCentre,
    },
    {//我的优惠券  Coupon
      path: '/Coupon',
      name: 'Coupon',
      component: Coupon,
    },
    {//商城充值卡  RechargeableCard
      path: '/RechargeableCard',
      name: 'RechargeableCard',
      component: RechargeableCard,
    },
    {//收货地址管理 DeliverAddress
      path: '/DeliverAddress',
      name: 'DeliverAddress',
      component: DeliverAddress,
    },
    {//我的评价  MyEvaluate
      path: '/MyEvaluate',
      name: 'MyEvaluate',
      component: MyEvaluate,
    },
    {//我的足迹 MyFoot
      path: '/MyFoot',
      name: 'MyFoot',
      component: MyFoot,
    },
    {//个人资料 PersonalData
      path: '/PersonalData',
      name: 'PersonalData',
      component: PersonalData,
    },
    {//服务需要做健康检查-健康检查路径
      path: '/check',
      name: 'check',
    },
    {//503页面
      path: 'noFound',
      name: 'noFound',
      component: noFound
    },
    {
      path: '/view',
      name: 'View',
      component: View,
      children: [
      ]
    },
    { path: '*', redirect: '/Login' }

  ]
});
export default router
