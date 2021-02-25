import request from '@/utils/request.js'
import { requestURL } from '@/utils/config.js'

export default {

  // 登录
  getLogin(param) {
    return request({
      url: requestURL + 'login',
      method: 'post',
      params: param
    })
  },

  // 首页data
  getIndexData() {
    return request({
      url: requestURL + 'manage/index',
      method: 'get'
    })
  },

  // 充值卡列表
  rechargeList(param) {
    return request({
      url: requestURL + 'manage/recharge_card_list',
      method: 'get',
      params: param
      // params: {
      // data: data
      // }
    })
  },
  // 批量生成充值卡
  addRecharge(param) {
    return request({
      url: requestURL + 'manage/recharge_card_add',
      method: 'get',
      responseType: 'blob',
      params: param
    })
  },
  // 充值卡删除
  deleteRecharge(id) {
    return request({
      url: requestURL + 'manage/recharge_card_del/' + id,
      method: 'get'
    })
  },
  // 充值卡搜索条件
  serchRecharge() {
    return request({
      url: requestURL + 'manage/card_search_condition',
      method: 'get'
    })
  },
  // 用户反馈列表
  feedbackList(status, param) {
    return request({
      url: requestURL + 'manage/back_list/' + status,
      method: 'get',
      params: param
    })
  },
  // 管理员标记反馈内容
  remark(fb_id, status, remark) {
    return request({
      url: requestURL + 'manage/feedback_handle?fb_id=' + fb_id + '&status=' + status + '&remark=' + remark,
      method: 'post'
    })
  },
  // 删除意见反馈
  feedbackDel(fb_id) {
    return request({
      url: requestURL + 'manage/feedback_del/' + fb_id,
      method: 'get'
    })
  },
  // 获取一级列表分类
  getoneType() {
    return request({
      url: requestURL + 'index/category',
      method: 'get'
    })
  },
  // 添加文章 /manage/contentAdd
  contentAdd(param) {
    return request({
      url: requestURL + 'manage/contentAdd',
      method: 'post',
      params: param
    })
  },
  // 文章查询
  contentFind(param) {
    return request({
      url: requestURL + 'manage/contentFind',
      method: 'get',
      params: param
    })
  },
  // /manage/contentUpdate
  contentUpdate(param) {
    return request({
      url: requestURL + 'manage/contentUpdate',
      method: 'post',
      params: param
    })
  },

  // 商品分类列表
  getlistType() {
    return request({
      url: requestURL + 'index/category_all',
      method: 'get'
    })
  },

  // 删除商品类别
  typeDel(id) {
    return request({
      url: requestURL + 'manage/goods_category_del/' + id,
      method: 'post'
    })
  },
  // 编辑商品类别
  typeEdit(id, name) {
    return request({
      url: requestURL + 'manage/goods_category_edit?category_id=' + id + '&name=' + name,
      method: 'post'
    })
  },

  // 添加商品类别
  addType(parent_id, name) {
    return request({
      url: requestURL + 'manage/goods_category_add?parent_id=' + parent_id + '&name=' + name,
      method: 'post'
    })
  },

  // -------------------   积分   ----------------------

  // 添加积分礼品
  scoregiftAdd(gift_info, banner_pic_list, details_pic_list) {
    return request({
      url: requestURL + `manage/score_gift_add`,
      method: 'post',
      data: {
        gift_info,
        banner_pic_list,
        details_pic_list
      }
    })
  },

  // 积分礼品列表
  scoreList(param) {
    return request({
      url: requestURL + 'manage/score_gift_list',
      method: 'get',
      params: param
    })
  },

  // 积分管理列表
  scoreManageList() {
    return request({
      url: requestURL + 'manage/score_scale',
      method: 'get'
    })
  },

  // 积分兑换比例设置   (积分管理)
  scoreManageSet(param) {
    return request({
      url: requestURL + 'manage/score_scale_set',
      method: 'post',
      params: param
    })
  },

  // 积分礼品上下架状态修改
  scoreStatus(gift_id, status) {
    return request({
      url: requestURL + 'manage/score_gift_shelf_status?gift_id=' + gift_id + '&status=' + status,
      method: 'post'
    })
  },
  // 积分列表(用户积分管理)
  intergralList(param) {
    return request({
      url: requestURL + 'manage/score_list',
      method: 'get',
      params: param
    })
  },
  // 积分增减(用户积分管理)
  intergralAdd(param) {
    return request({
      url: requestURL + 'manage/score_add',
      method: 'post',
      params: param
    })
  },
  // 积分礼品详情8/manage/score_giftDetail_info/
  giftDetail(id) {
    return request({
      url: requestURL + 'manage/score_giftDetail_info/gift_id' + id,
      method: 'get'
    })
  },
  // 礼品积分详情列表
  getDetail(id) {
    return request({
      url: requestURL + 'manage/score_gift_info/' + id,
      method: 'get'
    })
  },
  // 积分礼品订单列表
  orderList(param) {
    return request({
      url: requestURL + 'manage/score_gift_order_list',
      method: 'get',
      params: param
    })
  },
  // 积分礼品订单详情
  getorderDetail(id) {
    return request({
      url: requestURL + 'manage/score_gift_order/' + id,
      method: 'get'
    })
  },
  // 积分礼品订单上传快递单号
  uploadExpress(express, express_number, id) {
    return request({
      url: requestURL + 'manage/express_info?express=' + express + '&express_number=' + express_number + '&order_id=' + id,
      method: 'post'
    })
  },
  // 积分礼品发货
  sendOrder(id) {
    return request({
      url: requestURL + 'manage/gift_order_delivered/' + id,
      method: 'post'
    })
  },
  // 用户积分列表(用户管理)
  userList(param) {
    return request({
      url: requestURL + 'manage/user_list',
      method: 'get',
      params: param
    })
  },
  // 用户列表管理详情
  userDetail(id) {
    return request({
      url: requestURL + 'manage/user/' + id,
      method: 'get'
    })
  },
  // 用户修改提交操作
  userModification(login, buy, comment, id) {
    return request({
      url: requestURL + 'manage/user_allow_setting?allow_login=' + login + '&allow_buy=' + buy + '&allow_comment=' + comment + '&user_id=' + id,
      method: 'post'
    })
  },
  // 获取批次标识
  tagGet() {
    return request({
      url: requestURL + 'manage/recharge_card_tag',
      method: 'get'
    })
  },
  // 驳回商铺/manage/store_list_already_close
  colseShop(param) {
    return request({
      url: requestURL + 'manage/store_list_already_close?',
      method: 'get',
      params: param
    })
  },
  // 待审核店铺
  auditShop(param) {
    return request({
      url: requestURL + '/manage/store_list_wait_examine',
      method: 'get',
      params: param
    })
  },
  // 已审核商铺
  // auditedShop(param) {
  //   return request({
  //     url: requestURL + 'manage/store_list_already_examine',
  //     method: 'get',
  //     params: param
  //   })
  // },

  // 店铺关闭
  closeStore(param) {
    return request({
      url: requestURL + 'manage/store_close',
      method: 'post',
      params: param
    })
  },
  // 店铺详情
  storeDetails(store_id) {
    return request({
      url: requestURL + `manage/store_details/${store_id}`,
      method: 'get'
    })
  },
  // 店铺审核通过
  storeAudit(store_id) {
    return request({
      url: requestURL + `manage/store_examine_pass`,
      method: 'post',
      data: store_id
    })
  },

  // 店铺审核驳回
  storeReject(param) {
    return request({
      url: requestURL + 'manage/store_examine_reject',
      method: 'post',
      data: param
    })
  }

}

