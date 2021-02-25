import request from '@/utils/request'
import { requestURL } from '@/utils/config.js'

export default {
  // 商品详情
  goodsDetails(goods_id) {
    return request({
      url: requestURL + `manage/goods_details/${goods_id}`,
      method: 'get'
    })
  },

  // 已审核商品列表
  auditList(param) {
    return request({
      url: requestURL + 'manage/goods_list_already_examine',
      method: 'get',
      params: param
    })
  },

  // 已下架商品列表
  shelfList(param) {
    return request({
      url: requestURL + 'manage/goods_list_off_shelf',
      method: 'get',
      params: param
    })
  },

  // 待审核商品列表
  examineList(param) {
    return request({
      url: requestURL + 'manage/goods_list_wait_examine',
      method: 'get',
      params: param
    })
  },

  // 商品审核通过
  goodsAudit(goods_id) {
    return request({
      // /manage/goods_examine_pass
      url: requestURL + `manage/goods_examine_pass`,
      method: 'post',
      data: goods_id
    })
  },
  // 商品审核驳回
  goodsReject(param) {
    return request({
      url: requestURL + 'manage/goods_examine_reject',
      method: 'post',
      data: param
    })
  },
  // 商品下架
  goodsShelf(param) {
    return request({
      url: requestURL + 'manage/goods_off_shelf',
      method: 'post',
      params: param
    })
  },
  // 商品上架
  goodsOnShelf(id) {
    return request({
      url: requestURL + '/manage/goods_on_shelf',
      method: 'post',
      data: id
    })
  },

  // ------------------------  订单  -------------------
  // 订单列表
  orderList(param) {
    return request({
      url: requestURL + 'manage/order_list',
      method: 'get',
      params: param
    })
  },
  // 订单详情
  orderInfo(orderId) {
    return request({
      url: requestURL + `manage/order_info/${orderId}`,
      method: 'get'
    })
  },
  // 超时订单列表
  overtimeOrderList(param) {
    return request({
      url: requestURL + '/manage/overtime_order_list',
      method: 'get',
      params: param
    })
  },

  // ------------------  结算  -----------------

  // 优惠券结算
  couponSettle(param) {
    return request({
      url: requestURL + 'manage/coupon_settle',
      method: 'get',
      params: param
    })
  },

  // 商城结算
  storeSettle(param) {
    return request({
      url: requestURL + 'manage/store_settle_list',
      method: 'get',
      params: param
    })
  },

  // 结算完成
  settleComplete(settle_id) {
    return request({
      url: requestURL + `manage/settle_complete/${settle_id}`,
      method: 'get'
    })
  },

  // 结算审核
  settlExamine(settle_id) {
    return request({
      url: requestURL + `manage/settle_examine/${settle_id}`,
      method: 'get'
    })
  },

  // 结算详情
  settleInfo(settle_id, status) {
    return request({
      url: requestURL + `manage/store_settle_info/${settle_id}/${status}`,
      method: 'get'
    })
  },

  // 生成结算单
  createSettle(param) {
    return request({
      url: requestURL + `manage/settle_generate`,
      method: 'post',
      params: param
    })
  },

  // 批量商品推荐
  batchGoodsRequest(param) {
    return request({
      url: requestURL + `manage/goods_recommend`,
      method: 'post',
      data: param
    })
  },
  // 取消商品推荐
  batchGoodsCancel(param) {
    return request({
      url: requestURL + `manage/goods_recommend_cancel`,
      method: 'post',
      data: param
    })
  }

}

