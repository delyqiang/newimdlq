<template>
  <div class="publicTop">
    <div class="loginStatus">
      <span @click="link('Login')" class="cursor_pointer">请登录</span>
      <span @click="link('Register')" class="cursor_pointer RegisterIcon">免费注册</span>
    </div>
  <ul class="header">
    <li><img src="../assets/img/hearderIcon1.png" alt=""><span @click="link('Coupon')" class="cursor_pointer">优惠券</span></li>
    <li><img src="../assets/img/hearderIcon2.png" alt=""><span @click="link('Cart')" class="cursor_pointer">购物车</span></li>
    <li><img src="../assets/img/hearderIcon4.png" alt=""><span @click="link('ConfirmOrder')" class="cursor_pointer">我的订单</span></li>
    <li><img src="../assets/img/hearderIcon3.png" alt=""><span @click="link('Collect')" class="cursor_pointer">收藏夹</span></li>
    <li class="hoverPerson">
      <img src="../assets/img/hearderIcon5.png" alt="">
      <span  class="cursor_pointer">我的</span>
      <div class="suspension">
        <span @click="link('ConfirmOrder')" class="cursor_pointer">我的订单</span>
        <span @click="link('ConfirmOrder')" class="cursor_pointer">商城充值卡&nbsp;&nbsp;&nbsp;</span>
        <span @click="link('ConfirmOrder')" class="cursor_pointer">我的优惠券</span>
        <span @click="link('ConfirmOrder')" class="cursor_pointer">我的足迹</span>
        <span @click="link('ConfirmOrder')" class="cursor_pointer">收货地址管理</span>
        <span @click="link('ConfirmOrder')" class="cursor_pointer">个人资料</span>
        <span @click="link('ConfirmOrder')" class="cursor_pointer">我的评价</span>
        <span @click="link('ConfirmOrder')" class="cursor_pointer">退出</span>
      </div>
    </li>
    <li><img src="../assets/img/hearderIcon6.png" alt=""><span @click="link('ServiceCentre')" class="cursor_pointer">帮助中心</span></li>
  </ul>
  
  </div>
</template>
<script>
  export default{
    data(){
      return {
      }
    },
    methods: {
      link(ref){
        this.$router.push(ref)
      },
    },
    mounted: function () {
    },
    components: {}
  }
</script>
<style scoped>
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
  .loginStatus{
    margin-left: 126px;
  }
  .loginStatus span{
    font-size: 16px;
    font-weight: 400;
    color: #FF3F38;
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
    border-top: none;
    box-sizing: border-box;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; */

  }
  .header .suspension span{
    /* min-width: 113px; */
    margin: 0 16px;
    font-size: 18px;
    font-weight: 400;
    color: #333333;

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
