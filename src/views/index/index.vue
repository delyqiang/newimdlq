<template>
  <div class="container_index">
    <div class="cptj">产品推荐</div>
    <div class="prodListFlex">
      <div v-for="(item,index) in prodList" v-show="index<8" :key="index" class="prodItem" @click="link('/commodity/item',item.id)">
        <div class="prodHead">
          <img class="prodImg" :src="item.image_cover" alt="">
        </div>

        <div class="prodName">{{ item.goods_name }}</div>
        <div class="prodSubsidy">
          <span>区县补贴</span>
          <span>市补贴</span>
          <span>省补贴</span>
        </div>
        <div class="prodBottom">
          <span class="goodsPrice">￥{{ item.goods_price }}</span>
          <span class="payCount">{{ item.pay_count }}人已付款</span>
        </div>
      </div>
    </div>
    <div class="indexExplain">
      <div class="explainItem">
        <img src="../../assets/index/indexbottom1.png" alt="">
        <p class="explainFirst">真品货源</p>
        <p class="explainLast">正品，优质，放心</p>
      </div>
      <div class="explainItem">
        <img src="../../assets/index/indexbottom2.png" alt="">
        <p class="explainFirst">数据互通</p>
        <p class="explainLast">网站，商家，消费者</p>
      </div>
      <div class="explainItem">
        <img src="../../assets/index/indexbottom3.png" alt="">
        <p class="explainFirst">统一价格</p>
        <p class="explainLast">拒绝被宰，安心购物</p>
      </div>
      <div class="explainItem">
        <img src="../../assets/index/indexbottom4.png" alt="">
        <p class="explainFirst">担保交易</p>
        <p class="explainLast">支付宝担保，交易更安全</p>
      </div>
      <div class="explainItem">
        <img src="../../assets/index/indexbottom5.png" alt="">
        <p class="explainFirst">无忧退货</p>
        <p class="explainLast">7+15无理由退换货</p>
      </div>
    </div>

  </div>
</template>

<script>
import indexApi from '@/api/index'
export default {
  components: {
  },
  data() {
    return {
      // 产品推荐
      prodList: []

    }
  },
  watch: {
  },
  created() {
    this.getRecommend()// 产品推荐
  },
  methods: {
    // 商品推荐
    async getRecommend() {
      const { data } = await indexApi.getRecommend()
      if (data.code === 200) {
        this.prodList = data.list
      }
    },
    link(ref, value) {
      // this.$router.push(ref)
      window.sessionStorage.setItem('path', ref)
      this.$router.push({ path: ref, query: { id: value }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/element-variables.scss";
  .cptj{
    font-size: 46px;
    font-weight: 600;
    color: #333333;
    line-height: 48px;
    text-align: center;
  }
  .prodListFlex .prodItem:hover{
      border: 1px solid $--color-Theme;
      .prodName{
        color: $--color-Theme;
      }
    }
  .prodListFlex{
    width: 80%;
    margin-left: 10%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    .prodItem{
      cursor: pointer;
      width: 23%;
      margin-left: 2%;
      // height: 474px;
      margin-top: 60px;
      background: #FFFFFF;
      border: 1px solid #999999;
      border-radius: 10px;
      .prodHead{
        width:80%;
        height: 264px;
        margin-left: 10%;
        margin-top: 23px;
        text-align: center;
        .prodImg{
          width: 100%;
          max-width: 264px;
        }
      }
      .prodName{
        height: 70px;
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        line-height: 35px;
        margin: 6px 8px 5px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;

      }
      .prodSubsidy{
        height: 28px;
        line-height: 28px;
        padding: 0 12px;
        span{
          display: inline-block;
          width: 92px;
          background: rgba(255, 162, 100, .1);
          font-size: 16px;
          font-weight: 400;
          color: #FF7C41;
          border-radius: 5px;
          text-align: center;
        }
      }
      .prodBottom{
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        .goodsPrice{
          font-size: 22px;
          font-weight: 500;
          color: #FE514B;
          line-height: 34px;
        }
        .payCount{
          font-size: 18px;
          font-weight: 400;
          color: #BBBBBB;
          line-height: 34px;

        }
      }
    }
  }
  .indexExplain{
    width: 100%;
    height: 280px;
    display: flex;
    justify-content: center;
    background: #F3F3F3;
    .explainItem{
      margin: 0 60px;
      text-align: center;
      margin-top: 60px;
      .explainFirst{
        font-size: 18px;
        font-weight: 500;
        color: #666666;
        text-align: center;
        margin: 13px 0;
      }
      .explainLast{
        font-size: 16px;
        font-weight: 400;
        color: #999999;
        text-align: center;
      }
    }

  }
  @media screen and  (max-width:1200px){
    .prodListFlex .prodItem .prodHead{
      width:80%;
      height: 195px;
    }
    .prodListFlex .prodItem .prodHead .prodImg{
      width: 100%;
      max-height: 195px;
    }
  }
  @media screen and (min-width:1200px) and (max-width:1400px){
     .prodListFlex .prodItem .prodHead{
      width:80%;
      height: 196px;
    }
    .prodListFlex .prodItem .prodHead .prodImg{
      width: 100%;
      max-height: 196px;
    }
  }
  @media screen and (min-width:1400px) and (max-width:1600px){
     .prodListFlex .prodItem .prodHead{
      width:80%;
      height: 214px;
    }
    .prodListFlex .prodItem .prodHead .prodImg{
      width: 100%;
      max-height: 214px;
    }
  }
  @media screen and (min-width:1600px) and (max-width:1900px){
     .prodListFlex .prodItem .prodHead{
      width:80%;
      height: 243px;
    }
    .prodListFlex .prodItem .prodHead .prodImg{
      width: 100%;
      max-height: 243px;
    }
  }
  @media screen and (min-width:1900px){
    .prodListFlex .prodItem .prodHead{
      width:80%;
      height: 264px;
    }
    .prodListFlex .prodItem .prodHead .prodImg{
      width: 100%;
      max-height: 264px;
    }
  }
</style>
