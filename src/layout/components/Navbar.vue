<template>
  <div class="publicTop">
    <div v-if="!account" class="loginStatus">
      <span class="pointe" @click="link('/login')">请登录</span>
      <span class="pointe RegisterIcon" @click="link('/register')">免费注册</span>
    </div>
    <div v-if="account" class="loginStatus loginStatus2">
      <p><img src="../../assets/index/indexIcon.png" style="width:18px;" class="pointe" alt="" @click="link('/')"><span class="pointe" @click="link('/')"> 商城首页 </span><span>Hi,</span><span>{{ account }}</span></p>
    </div>
    <ul class="header">
      <li @click="link('/my/coupon')"><img src="../../assets/index/hearderIcon1.png" alt=""><span class="pointe">优惠券</span></li>
      <li @click="link('/collect/cart')"><img src="../../assets/index/hearderIcon2.png" alt=""><span class="pointe">购物车</span></li>
      <li @click="link('/commodity/order')"><img src="../../assets/index/hearderIcon4.png" alt=""><span class="pointe">我的订单</span></li>
      <li class="hoverPerson">
        <img src="../../assets/index/hearderIcon3.png" alt="">
        <span class="pointe" @click="link('/collect/collect')">收藏夹</span>
        <img src="../../assets/index/bottomjt.png" class="jtIcon2" alt="">
        <img src="../../assets/index/topjt.png" class="jtIcon" alt="">
        <p class="mystyle" />
        <div class="suspension suspension2">
          <span class="pointe spinsc" @click="link('/collect/collect')">商品收藏</span>
          <span class="pointe spusc" @click="link('/collect/collect')">商铺收藏</span>
        </div>
      </li>
      <li class="hoverPerson">
        <img src="../../assets/index/hearderIcon5.png" alt="">
        <span class="pointe ">我的</span>
        <img src="../../assets/index/bottomjt.png" class="jtIcon2" alt="">
        <img src="../../assets/index/topjt.png" class="jtIcon" alt="">
        <p class="mystyle" />
        <div class="suspension">
          <span class="pointe" @click="link('/my/boughtList')">我的订单</span>
          <span class="pointe" @click="link('/my/rechargeableCard')">商城充值卡&nbsp;&nbsp;&nbsp;</span>
          <span class="pointe" @click="link('/my/coupon')">我的优惠券</span>
          <span class="pointe" @click="link('/my/foot')">我的足迹</span>
          <span class="pointe" @click="link('/my/deliverAddress')">收货地址管理</span>
          <span class="pointe" @click="link('/my/personalData')">个人资料</span>
          <span class="pointe" @click="link('/my/evaluate')">我的评价</span>
          <span class="pointe" @click="logout">退出</span>
        </div>
      </li>
      <li @click="link('/commodity/serviceCentre')"><img src="../../assets/index/hearderIcon6.png" alt=""><span class="pointe">帮助中心</span></li>
    </ul>
  </div>
</template>

<script>
import tips from '@/utils/tips'
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      account: '', // 手机号
      path: window.sessionStorage.getItem('path'),
      indexShow: true

    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  created() {
    this.account = window.sessionStorage.getItem('account')
  },
  methods: {
    link(ref) {
      window.sessionStorage.setItem('path', ref)
      this.$router.push(ref)
    },
    logout() {
      sessionStorage.clear()
      tips.success(this, '您已退出登录!')
      this.account = ''
      // this.$router.push({ path: '/login' })
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/element-variables.scss";
.publicTop{
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: #F2F2F2;
  display: flex;
  justify-content: space-between;
}
.header{
    margin-right: 244px;
    display: flex;
  }
  .header li{
    width: 113px;
    text-align: center;
    /* margin-left: 37px; */
    cursor: pointer;
  }
  .header li span{
    margin-left: 10px;
    font-size: 16px;
    font-weight: 400;
    color: #ADADAD;
  }
  .header li .mystyle{
    display: none;
  }
  .header li:hover .mystyle{
    display: block;
    z-index: 10000;
    width: 100%;
    height: 2px;
    background: #fff;
    position: absolute;
    bottom: -2px;
    left: 0;
  }
  .header li:hover>span{
    margin-left: 10px;
    font-size: 16px;
    font-weight: 400;
    color: $--color-Theme;
  }
  .loginStatus{
    min-width: 185px;
    margin-left: 126px;
    span{
      font-size: 16px;
      font-weight: 400;
      color: #FF3F38;
    }
  }
  .loginStatus2{
    span{
      font-size: 16px;
      font-weight: 400;
      color: #ADADAD;

    }
  }
  .RegisterIcon{
    margin-left: 66px;
  }
  .suspension{
    display: none;
    position: absolute;
    right: -1px;
    width: 370px;
    height: 115px;
    background: #FFFFFF;
    border: 1px solid #999999;
    // border-top: none;
    box-sizing: border-box;
    //  display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
      .spinsc{
        margin-top: 7px !important;
      }
      .spusc{
        margin-top: 0 !important;
      }
  }
  .suspension2{
    width: 113px;
    height: 70px;
    background: #FFFFFF;
    border: 1px solid #999999;
    box-sizing: border-box;
    .spinsc{
      margin-top: 7px !important;
    }
    .spusc{
      margin-top: 0 !important;
    }

  }
  .suspension2 span{
    height: 24px;
    line-height: 24px;
    margin-top: 12px;
  }
  .header .suspension span{
    /* min-width: 113px; */
    margin: 0 16px;
    font-size: 18px;
    font-weight: 400;
    color: #333333;
  }
  .jtIcon{
    width: 9px;
    display: none;
  }
  .jtIcon2{
    width: 9px;
    display: inline-block;
  }
  .header li:hover .jtIcon{
    width: 9px;
    display: inline-block;
  }
  .header li:hover .jtIcon2{
    width: 9px;
    display: none;
  }
  .hoverPerson{
    position: relative;
  }
  .hoverPerson:hover{
    width: 113px;
    position: relative;
    background: #FFFFFF;
    border: 1px solid #999999;
    box-sizing: border-box;
    border-bottom: none;
    border-top: none;

  }
  .hoverPerson:hover .suspension{
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
</style>
