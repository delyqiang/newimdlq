<template>
  <div class="site-container ">

    <el-card class="box-card site-card" :class="{isHeight:isHeight}" style="padding:30px;">
      <!-- <el-steps v-show="active!==5" :active="active" finish-status="success">
        <el-step title="基础信息"> 12313223</el-step>
        <el-step title="企业信息" />
        <el-step title="开户行信息" />
        <el-step title="法人信息" />
        <el-step title="商铺信息" />
      </el-steps> -->

      <div v-show="active==0" style="width:60%;" class="marginAuto">
        <el-form ref="form1" :model="form1" label-width="auto">
          <el-form-item label="手机号">
            <el-input v-model="form1.phone" placeholder="此手机号为登录账号" class="input-width" />
            <!-- <el-button
              class="bg-color text-white"
              @click="getcode"
            >获取验证码</el-button> -->
          </el-form-item>
          <!-- <el-form-item label="验证码">
            <el-input v-model="form1.code1" class="input-width" />
          </el-form-item> -->
          <el-form-item label="密码">
            <el-input v-model="form1.parssword" show-password type="password" placeholder="字母/数字或者英文符号，最短8位，区分大小写" class="input-width" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form1.storePasswd" show-password type="password" class="input-width" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form1.name" class="input-width" />
          </el-form-item>
          <el-form-item label="后缀">
            <el-input v-model="form1.url_name" class="input-width" />
          </el-form-item>
          <!-- <el-form-item label="管理员电话">
            <el-input v-model="form1.adminTel" class="input-width" placeholder="此手机号用于接收平台信息提示通知" />
            <el-button
              class="bg-color text-white"
              @click="getcodetwo"
            >获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form1.code2" class="input-width" />
          </el-form-item> -->
        </el-form>
      </div>
      <div v-show="active==1" class="text-center">
        <div>注册完成，可跳转</div>
        <el-button
          class="marginT30 bg-color text-white"
          style="width:25%;"
          @click="loginBack"
        >登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
      <div v-show="active==0" class="text-center">
        <el-button
          class="marginT30 bg-color text-white"
          style="width:208px;"
          @click="nextone"
        >注册</el-button>
      </div>

    </el-card>

  </div>
</template>

<script>
// import { requestURL } from '@/utils/config.js'
import tips from '@/utils/tips'
import auditApi from '@/api/audit'
export default {
  data() {
    return {
      active: 0,
      isHeight: false,
      form1: {
        phone: '13055556666', // 手机号
        parssword: '123456', // 密码
        storePasswd: '123456', // 确认密码
        name: '戴利强', // 昵称
        url_name: 'dlq' // url后缀
      }
    }
  },
  methods: {
    async nextone() {
      // 校验手机号
      // 校验昵称
      // 校验url后缀
      // 校验密码
      if (this.form1.phone === '') {
        tips.error(this, '手机号不能为空')
        return false
      }
      if (!(/^1[3456789]\d{9}$/.test(this.form1.phone))) {
        tips.error(this, '请输入正确的手机号')
        return
      }
      if (this.form1.parssword === '') {
        tips.error(this, '密码不能为空')
        return false
      }
      // if (this.form1.parssword.length < 8) {
      //   tips.error(this, '密码不可小于8位')
      //   return false
      // }
      if (this.form1.parssword !== this.form1.storePasswd) {
        tips.error(this, '两次密码不一致')
        return false
      }
      if (this.form1.name === '') {
        tips.error(this, '昵称不能为空')
        return false
      }
      if (this.form1.url_name === '') {
        tips.error(this, 'url后缀不能为空')
        return false
      }
      const { data } = await auditApi.register(this.form1)
      console.log(data)
      if (data.code === 200) {
        // this.$message({
        //   type: 'success',
        //   message: '注册成功'
        // })
        tips.success(this, data.msg)
        // window.sessionStorage.setItem('id', data.data)
        this.active++
      } else {
        tips.error(this, data.msg)
      }
    },
    async nextfour() {
      this.form4.id = window.sessionStorage.getItem('id')
      console.log(this.form4)
      const { data } = await auditApi.addLegal(this.form4)
      console.log(data)
      if (data.code === 200) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.active++
      } else {
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      }
    },
    async nextfive() {
      this.form5.id = window.sessionStorage.getItem('id')
      console.log(this.form5)
      const { data } = await auditApi.addName(this.form5)
      console.log(data)
      if (data.code === 200) {
        this.$message({
          type: 'success',
          message: '注册成功'
        })
        this.active++
      } else {
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      }
    },
    loginBack() {
      // 此处应该把数据加入进去然后填入数据库跳入登录页面
      this.$router.go(-1) // 返回上层
    }
  }
}
</script>
<style lang="scss" scoped>
.isHeight{
  height: 600px;
  line-height: 100px;
}
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
