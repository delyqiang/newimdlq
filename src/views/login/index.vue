<template>
  <div class="ht_body">
    <div class="loginLogo">
      <img src="../../assets/index/jnlogo.png" alt="">
    </div>
    <div class="loginContent">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" class="">
        <p class="text-333 text-center marginT0 marginB50" style="font-size:26px;">欢迎登录济宁惠民商城</p>
        <el-form-item prop="account" class="marginB30">
          <el-input v-model="loginForm.account" placeholder="请输入用户名">
            <i slot="prefix" class="iconfont icon-dengluyonghuming" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="marginB30">
          <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" @keyup.enter.native="handleLogin">
            <i slot="prefix" class="iconfont icon-password" />
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:0px;">
          <div class="center-foot">
            <router-link style="float:left;color:#A9A9A9;" :to="{path:'/findPassword'}">忘记密码?</router-link>
            <router-link style="float:right;color:#A9A9A9;" :to="{path:'/register'}">注册</router-link>
          </div>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button
            class="text-white bg-Theme radius30 border-none"
            style="width:320px;"
            @click="handleLogin"
          >登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="text-center marginT30">备案号：123456778990-098</div>
  </div>
</template>

<script>
import tips from '@/utils/tips'
import auditApi from '@/api/audit'

export default {
  components: {},
  data() {
    return {
      // 登录参数
      loginForm: {
        account: '16619839667',
        password: '123456'
        // code: '',
        // randomStr: ''
      },
      // 验证码
      // usercode: '',
      // 表单验证
      rules: {
        account: [
          { required: true, message: '请输入正确用户名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确密码', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
        // code: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        //   // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ]
      }
    }
  },
  created() {
    var host = window.location.host
    var hostText = host.search('localhost') !== -1
    if (hostText) {
      this.loginForm.account = '13051820887'
    }
  },
  methods: {
    link(ref) {
      window.sessionStorage.setItem('path', ref)
      this.$router.push(ref)
    },
    // 注册直接跳转到注册页面
    handleRegister() {
      // this.$router.push({ path: '/register' })
    },
    // 登录--获取 token
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          const { data } = await auditApi.getLogin(this.loginForm)
          if (data.code === 200) {
            tips.success(this, data.msg)
            window.sessionStorage.setItem('account', this.loginForm.account)
            window.sessionStorage.setItem('token', data.token)
            this.$router.push({ path: '/' })
          } else {
            tips.error(this, data.msg)
          }
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.loginLogo{
  width: 280px;
  margin-left: 160px;
  padding-top: 43px;
  margin-bottom: 43px;
  img{
    width: 100%;
  }
}
.loginContent{
  width: 100%;
  height: 565px;
  background: url("../../assets/index/loginBg.jpg") no-repeat;
  /* background-size: 100% 100%; */
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  padding-top: 48px;
  .el-form {
    margin: 0 auto;
    width: 509px;
    height: 476px;
    background: rgba(256,256,256,.7);
    border-radius: 10px;
    margin-top: 0;
    margin-right: 14%;
    padding: 57px 84px 0;

  }
}
</style>
