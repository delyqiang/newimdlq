<template>
  <div class="">
    <el-tabs v-model="editableTabsValue" type="card" class="site-tabs">
      <el-tab-pane
        label="用户信息管理"
        name="first"
      />
    </el-tabs>

    <div class="padding10 site-container">
      <p class="isBack">
        <span class="fontw cur_poin" @click="IsBack">
          <span>
            <i class="el-icon-arrow-left" />
          </span>
          <b>用户信息管理</b>
        </span>
      </p>
      <el-card class="box-card marginT10">
        <p><span>用户账号：</span>
          {{ form .tel_phone }}</p>
        <p><span>姓名：</span>{{ form .name }}</p>
        <p><span>身份证号：</span>{{ form .idcard }}</p>
        <p>
          <span>允许登录：</span>
          <el-radio-group v-model="form.allow_login">
            <el-radio :label="0">不允许</el-radio>
            <el-radio :label="1">允许</el-radio>
          </el-radio-group>
        </p>
        <p>
          <span>允许购买：</span>
          <el-radio-group v-model="form.allow_buy">
            <el-radio :label="0">不允许</el-radio>
            <el-radio :label="1">允许</el-radio>
          </el-radio-group>
        </p>
        <p>
          <span>允许评论：</span>
          <el-radio-group v-model="form.allow_comment">
            <el-radio :label="0">不允许</el-radio>
            <el-radio :label="1">允许</el-radio>
          </el-radio-group>
        </p>
        <p><span>登录次数：</span>{{ form .login_num }}</p>
        <p><span>当前积分：</span> {{ form. score }}</p>
        <p><span>已使用积分：</span>{{ form .used_score }}</p>
        <p><span>充值卡当前金额：</span> {{ form .card_balance }}</p>
        <p><span>充值卡已使用金额：</span>{{ form .used_card_balance }}</p>
        <div class="text-right">
          <el-button class="site-button-1" @click="modification">提交操作</el-button>

        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import auditApi from '@/api/audit'
import tips from '@/utils/tips'
// import ConfirmButton from '@/components/public/ConfirmButton'
// import { mapActions } from 'vuex'

export default {
  // components: {
  //   ConfirmButton
  // },
  data() {
    return {
      editableTabsValue: 'first',
      pagin: { size: 10, current: 1 },
      form: {}
    }
  },

  created() {
    this.userDetail(this.$route.query.id)
  },
  methods: {
    // 点击详情页之后获取详情
    async userDetail(id) {
      const { data } = await auditApi.userDetail(id)
      if (data.code === 200) {
        this.form = data.user
      }
    },
    // 提交选择的结果修改
    async modification() {
      const { data } = await auditApi.userModification(this.form.allow_login, this.form.allow_buy, this.form.allow_comment, this.$route.query.id)
      if (data.code === 200) {
        tips.success(this, '操作成功')
        this.userDetail(this.$route.query.id)
        this.$router.go(-1)
      } else {
        tips.error(this, '操作成功')
      }
    },
    // 返回上一页
    IsBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
