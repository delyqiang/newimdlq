import request from '@/utils/request.js'
import { requestURL } from '@/utils/config.js'

export default {
  //   ------------------  首页 index/index  ------------------------
  // 商品推荐
  getRecommend() {
    return request({
      url: requestURL + 'index/goods/recommend',
      method: 'get'
    })
  },
  // 公告
  getNotice() {
    return request({
      url: requestURL + '/notice/getNotice',
      method: 'get'
    })
  },
  // 个人信息 积分
  useruserinfo() {
    return request({
      url: requestURL + 'user/user_info',
      method: 'get'
    })
  },
  // 一级分类列表
  getCategory() {
    return request({
      url: requestURL + 'index/category',
      method: 'get'
    })
  },

  // ---------------------  反馈留言 index/nav/feedback  -------------------
  subfeedback(param) {
    return request({
      url: requestURL + 'user/feedback',
      method: 'post',
      params: param
    })
  },

  subfeedbackList(param) {
    return request({
      url: requestURL + `user/backListByUser`,
      method: 'get',
      params: param
    })
  },
  // /manage/deleteFeedBackByIds
  deleteFeedBackByIds(param) {
    return request({
      url: requestURL + 'user/deleteFeedBackByIds',
      method: 'post',
      params: param
    })
  },
  // manage/backListByUser

  // -------------------  index/search/search  ------------------------
  // 搜索记录
  getRecord(param) {
    return request({
      url: requestURL + 'user/search_history/list',
      method: 'get',
      params: param
    })
  },
  // 清除搜索记录
  delRecord(param) {
    return request({
      url: requestURL + 'user/search_history/clear',
      method: 'post',
      params: param
    })
  },

  // 添加搜索记录
  addRecord(param) {
    return request({
      url: requestURL + 'user/search_history/add',
      method: 'post',
      params: param
    })
  },

  // --------------------  index/search/searchList （店铺页，搜索列表页）  -------------------
  // 店铺页
  // 店铺详情
  storeDetail(id) {
    return request({
      url: requestURL + `store/store/${id}`,
      method: 'get'
    })
  },
  // 店铺是否收藏---状态查询
  isFavoriteShop(storeid) {
    return request({
      url: requestURL + `favorite/store_status/${storeid}`,
      method: 'get'
    })
  },
  // 店铺收藏添加
  storeAdd(param) {
    return request({
      url: requestURL + `favorite/store/add`,
      method: 'post',
      params: param
    })
  },
  // 店铺收藏删除
  storeDel(id) {
    return request({
      url: requestURL + `favorite/store/del/${id}`,
      method: 'post'
    })
  },

  // 搜索商品列表
  getSearchlist(param) {
    return request({
      url: requestURL + `goods/search`,
      method: 'get',
      params: param
    })
  },
  // --------------------  订单 index/search/order -------------------------
  // 结算详情
  payDetail(param) {
    return request({
      url: requestURL + 'order/settlement',
      method: 'post',
      data: param
    })
  },
  // 提交订单详情
  subOrder(param) {
    return request({
      url: requestURL + 'order/orderAdd',
      method: 'post',
      data: param
    })
  },
  // wx_pay
  wxpay(param) {
    return request({
      url: requestURL + 'wx/wxPay',
      method: 'post',
      params: param
    })
  },
  // 支付完成调用更新状态 （ 已付款，待发货 ）后期会废弃
  payorderStatus(param) {
    return request({
      url: requestURL + `order/order_status/paid`,
      method: 'post',
      params: param
    })
  },

  // ---------------------  商品详情和商品评价 index/search/details （ 2模块 ）  ---------------------
  // 商品评价
  getEvaluate(param) {
    return request({
      url: requestURL + `goods/evaluate`,
      method: 'get',
      params: param
    })
  },

  // 商品详情
  getGoodsDetail(param) {
    return request({
      url: requestURL + `goods/detail`,
      method: 'get',
      params: param
    })
  },

  // 商品是否收藏 --- 状态查询
  isFavoriteGoods(goodsid) {
    return request({
      url: requestURL + `favorite/goods_status/${goodsid}`,
      method: 'get'
    })
  },

  // 商品规格列表
  getSpecifications(param) {
    return request({
      url: requestURL + `goods/specifications`,
      method: 'get',
      params: param
    })
  },

  // 添加购物车
  cartAdd(param) {
    return request({
      url: requestURL + `cart/cart_add`,
      method: 'post',
      params: param
    })
  },

  // 商品收藏添加
  favoriteAdd(param) {
    return request({
      url: requestURL + `favorite/goods/add`,
      method: 'post',
      params: param
    })
  },
  // 商品收藏删除
  favoriteDel(param) {
    return request({
      url: requestURL + `favorite/goods/del/${param}`,
      method: 'post'
    })
  },
  // 选择商品规格后获取的库存
  getChoose(param) {
    return request({
      url: requestURL + `goods/choose`,
      method: 'get',
      params: param
    })
  },

  // --------------  index/search/result  店铺简介、申请退款  -----------------

  // 店铺简介
  shopInfo(id) {
    return request({
      url: requestURL + `store/store_info?store_id=${id}`,
      method: 'get'
    })
  }
}
