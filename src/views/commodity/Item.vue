<template>
  <div class="ht_body">
    <!-- {{ detail }} -->
    <div class="itemDetail">
      <div class="itemLeft">
        <div class="activeBanner" :style="'background:url('+activeBanner+') no-repeat;background-size:100% 100%;padding-bottom:100%;'" />
        <!-- <img :src="activeBanner" alt=""> -->
        <div class="thumbnail">
          <img v-for="(item,index) in swiperList" :key="index" :src="item" alt="" @click="activeBannerFun(item)">
        </div>
      </div>
      <div class="itemRight">
        <p class="itemTitle">{{ detail.goods_name }}</p>
        <div v-if="detail.subsidy&&detail.subsidy.length>0" class="prodSubsidy">
          <span v-for="(item,index) in detail.subsidy" :key="index">{{ item }}</span>
        </div>
        <div class="itemPrice marginB30">
          <span class="goodsPrice">￥{{ detail.goods_price }}</span>
          <span class="marketPrice">价格¥{{ detail.market_price }}</span>
        </div>
        <div>
          <span class="attribute marginB30">发货：</span>
          <span class="attributeParameter">{{ detail.origin_place }} | 快递：{{ detail.goods_freight==null?'10':detail.goods_freight }}.00元</span>
        </div>
        <div>
          <span class="attribute marginB30">库存：</span>
          <span class="attributeParameter">{{ sku }}</span>
        </div>
        <div v-for="(item,index) in detail.goods_spec_list" :key="index" class="marginB30">
          <span class="attribute">{{ item.name }}：</span>
          <span v-for="(items,index2) in item.values" :key="index2" :class="item.display===items.spec_value_id?'bg-red specItem':'specItem'" @click="selectone(items.spec_value_id,index,index2)">{{ items.name }}</span>
        </div>
        <div class="marginB30">
          <span>数量</span>
          <el-input-number v-model="count" :min="1" :max="10" label="描述文字" />
        </div>
        <div>
          <el-button class="site-button-1" style="width:320px;">立即购买</el-button>
          <el-button class="site-button-2" style="width:320px;" icon="el-icon-shopping-cart-2"> 加入购物车</el-button>
        </div>
      </div>
    </div>
    <div class="itemDetailBottom">
      <div class="storeLeft">
        <div>
          <img src="../../assets/index/store.png" alt="">
          <span>商铺名称商铺名称商</span>
        </div>
        <div>
          <p>公司名称:</p>
          <p>标贝（北京）科技有限公司</p>
        </div>
        <div>
          <p>商铺简介::</p>
          <p>商铺简介商铺简介商铺简介商铺简
            介商铺简介商铺简介商铺简介商铺
            简介商铺简介商铺简介商铺简介商
            铺简介商铺简介商铺简介铺简介商
            铺简介。</p>
        </div>
        <div>
          <p>联系电话:</p>
          <p>13099998888</p>
        </div>
        <div>
          <p>微信号:</p>
          <p>13099998888</p>
        </div>
      </div>
      <div class="detailRight">

        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">商品详情</el-radio-button>
          <el-radio-button :label="true">宝贝评价</el-radio-button>
        </el-radio-group>
        <div v-if="!isCollapse">
          <img v-for="(item,index) in swiperList" :key="index" :src="item" alt="" @click="activeBannerFun(item)">
        </div>
        <div v-if="isCollapse">
          评价挺好的
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import indexApi from '@/api/index'
export default {
  components: {},
  data() {
    return {
      isCollapse: false, // 详情 评价
      goodsDetails: {},
      count: 1, // 购买数量
      sku: 0, // 库存
      id: this.$route.query.id,
      detail: { // 详情

      },
      swiperList: [], // 轮播图list
      specId: '',
      activeBanner: ''
    }
  },
  created() {
    console.log(this.id)
    this.getGoodsDetail() // 商品详情
  },
  mounted() {
  },
  methods: {
    // 选择商品规格
    selectone(specValueId, index, index2) {
      this.name = ''
      this.detail.goods_spec_list[index].display = specValueId
      this.detail.goods_spec_list[index].displayName = this.detail.goods_spec_list[index].values[index2].name
      if (this.detail.goods_spec_list.length === 1) {
        this.name = this.detail.goods_spec_list[0].displayName
      } else if (this.detail.goods_spec_list.length === 2) {
        this.name = this.detail.goods_spec_list[0].displayName + '-' + this.detail.goods_spec_list[1].displayName
      } else if (this.detail.goods_spec_list.length === 3) {
        this.name = this.detail.goods_spec_list[0].displayName + '-' + this.detail.goods_spec_list[1].displayName + '-' + this.detail.goods_spec_list[2].displayName
      }
      this.specName = this.name
      console.log(this.specName, 'this.specName')
      const storeIdIndex = this.detail.sku_list.findIndex(item4 => item4.express === this.name)
      this.goodsDetails = this.detail.sku_list[storeIdIndex]
      this.sku = this.goodsDetails && this.goodsDetails.sku ? this.goodsDetails.sku : 0
      this.detail.goods_price = this.goodsDetails && this.goodsDetails.price ? this.goodsDetails.price : this.detail.goods_price
      this.detail.market_price = this.goodsDetails && this.goodsDetails.market_price ? this.goodsDetails.market_price : this.detail.market_price
      this.specId = this.goodsDetails && this.goodsDetails.spec_id ? this.goodsDetails.spec_id : this.specId
      this.$forceUpdate()
    },
    // 预览图片
    activeBannerFun(item) {
      this.activeBanner = item
    },
    // 商品详情
    async getGoodsDetail() {
      var that = this
      var param = {}
      param.goodsId = this.id // 商品id
      const { data } = await indexApi.getGoodsDetail(param)
      if (data.code === 200) {
        data.data.forEach(element => {
          that.detail = element
          this.detail.store_name = this.detail.store_name.length > 12 ? this.detail.store_name.substring(0, 12) + '...' : this.detail.store_name
          this.detail.goods_spec_list.forEach((item, index) => {
            item.display = 0
            item.displayName = ''
            item.values.forEach((item2, index2) => {
              item2.display = 0
            })
          })
          that.swiperList = element.image_banner
          that.activeBanner = that.swiperList[0]
          if (element.sku_list.length === 1) {
            this.specId = element.sku_list[0].spec_id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/element-variables.scss";
.itemDetail{
  width: 100%;
  display: flex;
  display: flex;
  .itemLeft{
    width: 32.7%;
    margin-left: 10.4%;
    .activeBanner{
      background-size: 100% 100% !important;
      margin-bottom: 14px;
    }
    img{
      width: 100%;
    }
    .thumbnail{
      width: 100%;
      height: 92px;
      display: flex;
      img{
        width: 92px;
        cursor: pointer;
        margin-right: 20px;
      }
    }
  }
  .itemRight{
    width: 42.33%;
    margin-left: 4.17%;
    margin-right: 10.4%;
    .itemTitle{
      font-size: 24px;
      font-weight: 500;
      color: #333333;
      line-height: 38px;
      margin-bottom: 36px;
    }
    .prodSubsidy{
      height: 28px;
      line-height: 28px;
      padding: 0 12px;
      margin-bottom: 40px;
      span{
        display: inline-block;
        width: 92px;
        background: rgba(255, 162, 100, .1);
        font-size: 16px;
        font-weight: 400;
        color: $--color-butie;
        border-radius: 5px;
        text-align: center;
        margin-left: 10px;
      }
    }
    .itemPrice{
      border-bottom: 1px dashed #666666;
      padding-bottom: 25px;
      .goodsPrice{
        font-size: 48px;
        font-weight: bold;
        color:$--color-Theme;
        line-height: 34px;
      }
      .marketPrice{
        font-size: 18px;
        font-weight: 400;
        text-decoration: line-through;
        color: #BBBBBB;
        line-height: 34px;
      }
    }
    .attribute{
      font-size: 24px;
      font-weight: 400;
      color: $--color-heard;
      line-height: 48px;
      min-width: 58px;
      display: inline-block;
    }
    .attributeParameter{
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: $--color-page;
      line-height: 48px;
    }
    .specItem{
      width: 98px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background: #FFFFFF;
      border: 1px solid #999999;
      border-radius: 5px;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
    }
    .bg-red{
      background: $--color-Theme;
      border:1px solid $--color-Theme;
      color: #fff;
    }
  }
}
.itemDetailBottom{
  display: flex;
  .storeLeft{
    width: 21.61%;
    max-width: 415px;
    // height: 110px;
    background: #FFF7F7;
    border: 1px solid #999999;
    margin-left: 10.4%;
  }
  .detailRight{
    width: 56.35%;
    border: 1px solid #999999;
    margin-right: 10.4%;
    margin-left: 1.15%;
  }
}
</style>
