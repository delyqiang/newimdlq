<template>
  <div class="site-container ">

    <el-card class="box-card site-card" :class="{isHeight:isHeight}" style="padding:30px;">
      <el-steps v-show="active!==5" :active="active" finish-status="success">
        <el-step title="基础信息"> 12313223</el-step>
        <el-step title="企业信息" />
        <el-step title="开户行信息" />
        <el-step title="法人信息" />
        <el-step title="商铺信息" />
      </el-steps>

      <div v-show="active==0" style="width:60%;" class="marginAuto">
        <el-form ref="form1" :model="form1" label-width="auto">
          <el-form-item label="手机号">
            <el-input v-model="form1.storeAccount" placeholder="此手机号为登录账号" class="input-width" />
            <el-button
              class="bg-color text-white"
              @click="getcode"
            >获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form1.code1" class="input-width" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form1.storePasswd" placeholder="字母/数字或者英文符号，最短8位，区分大小写" class="input-width" />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form1.storePasswd" class="input-width" />
          </el-form-item>
          <el-form-item label="管理员姓名">
            <el-input v-model="form1.adminName" class="input-width" />
          </el-form-item>
          <el-form-item label="管理员电话">
            <el-input v-model="form1.adminTel" class="input-width" placeholder="此手机号用于接收平台信息提示通知" />
            <el-button
              class="bg-color text-white"
              @click="getcodetwo"
            >获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form1.code2" class="input-width" />
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active==1" style="width:50%;" class="marginAuto">
        <el-form ref="form2" :model="form2" label-width="auto">
          <el-form-item label="公司名称">
            <el-input v-model="form2.frimName" class="input-width" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="form2.frimAddres" placeholder="请填写详细地址" class="input-width" />
          </el-form-item>
          <el-form-item label="纳税人识别号">
            <el-input v-model="form2.business" class="input-width" />
          </el-form-item>
          <el-form-item label="注册资金">
            <el-input v-model="form2.frimFund" class="input-width" />
          </el-form-item>
          <el-form-item label="上传营业执照">
            <el-input v-model="form2.charter" class="input-width" />
            <el-button
              class="bg-color text-white"
              @click="getfile"
            >上传营业执照</el-button>
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input v-model="form2.businessScop" class="input-width" />
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active==2" style="width:60%;" class="marginAuto">
        <el-form ref="form3" :model="form3" label-width="auto">
          <el-form-item label="开户名称">
            <el-input v-model="form3.bankName" class="input-width" placeholder="开户名称和企业主体保持一致" />
          </el-form-item>
          <el-form-item label="开户银行">
            <el-input v-model="form3.bankInfo" placeholder="请填写详细地址" class="input-width" />
          </el-form-item>
          <el-form-item label="对公账号">
            <el-input v-model="form3.bankNumber" class="input-width" placeholder="请填写正确,如错误会造成结算失败" />
          </el-form-item>
          <el-form-item label="开户地点">
            <el-input v-model="form3.bankAddress" class="input-width" />
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active==3" style="width:60%;" class="marginAuto">
        <el-form ref="form4" :model="form4" label-width="auto">
          <el-form-item label="法人姓名">
            <el-input v-model="form4.legalPerson" class="input-width" />
          </el-form-item>
          <el-form-item label="法人身份证号">
            <el-input v-model="form4.legalIdcard" class="input-width" />
          </el-form-item>
          <el-form-item label="法人手机号">
            <el-input v-model="form4.legalPhone" class="input-width" />
            <el-button
              class="bg-color text-white"
              @click="getcodethree"
            >获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form4.codefour" class="input-width" />
          </el-form-item>
          <el-form-item label="身份证人像面照片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证国徽面照片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active==4" style="width:60%;" class="marginAuto">
        <el-form ref="form5" :model="form5" label-width="auto">
          <el-form-item label="商铺名称">
            <el-input v-model="form5.storeName" class="input-width" />
          </el-form-item>
          <el-form-item label="商铺归属地">
            <el-input v-model="form5.storeAddres" class="input-width" />
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active==5" class="text-center">
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
        >下一步</el-button>
      </div>
      <div v-show="active==1" class="text-center">
        <el-button
          class="marginT30 bg-color text-white"
          style="width:208px;"
          @click="nexttwo"
        >下一步</el-button>
      </div>
      <div v-show="active==2" class="text-center">
        <el-button
          class="marginT30 bg-color text-white"
          style="width:208px;"
          @click="nextthree"
        >下一步</el-button>
      </div>
      <div v-show="active==3" class="text-center">
        <el-button
          class="marginT30 bg-color text-white"
          style="width:208px;"
          @click="nextfour"
        >下一步</el-button>
      </div>
      <div v-show="active==4" class="text-center">
        <el-button
          class="marginT30 bg-color text-white"
          style="width:208px;"
          @click="nextfive"
        >下一步</el-button>
      </div>

    </el-card>

  </div>
</template>

<script>
import { requestURL } from '@/utils/config.js'
import auditApi from '@/api/audit'
export default {
  data() {
    return {
      active: 0,
      isHeight: false,
      form1: {
        storeAccount: '1',
        storePasswd: '1',
        adminName: '1',
        adminTel: '1'
      },
      form2: {
        frimName: '北京一家公司',
        frimAddres: '北京',
        frimFund: '3000000',
        business: '4564asdasfafs',
        businessScop: '5000',
        charter: '600'
      },
      form3: {
        bankName: '1',
        bankNumber: '223456322111',
        bankInfo: '这是开户银行信息啊啊啊啊啊',
        bankAddress: '开户地22222'
      },
      form4: {
        legalPerson: '我是法人',
        legalPhone: '17600322977',
        legalIdcard: '4111190006585241',
        legalIdcardFront: '12312',
        legalIdcardBack: '12312'
      },
      form5: {
        storeName: '店铺店铺啊啊啊啊啊',
        storeAddres: '北京大北京这是大北京'
      }
    }
  },
  methods: {
    async nextone() {
      const { data } = await auditApi.addStore(this.form1)
      console.log(data)
      if (data.code === 200) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        window.sessionStorage.setItem('id',
          data.data)
        this.active++
      } else {
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      }
    },
    async nexttwo() {
      this.form2.id = window.sessionStorage.getItem('id')
      console.log(this.form2.id)
      const { data } = await auditApi.addFrim(this.form2)
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
    async nextthree() {
      this.form3.id = window.sessionStorage.getItem('id')
      const { data } = await auditApi.addBank(this.form3)
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
    },
    getcode() {
      if (this.form1.storeAccount === '') {
        this.$message({
          type: 'error',
          message: '手机号不能为空'
        })
      } else {
        this.$http
          .get(
            requestURL +
                `/sms/sendMessage?phoneNumber=${this.form1.storeAccount}`
          )
          .then((res) => {
            if (res.data.code === 200) {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: '已发送成功'
              })
            }
            if (res.data.code === 400) {
              console.log(res.data)
              // this.getUser()
              this.$message({
                type: 'error',
                message: '手机号有误,无法发送验证码'
              })
            }
          })
      }
    },
    getcodetwo() {
      if (this.form1.adminTel === '') {
        this.$message({
          type: 'error',
          message: '管理员手机号不能为空'
        })
      } else {
        this.$http
          .get(
            requestURL +
                `/sms/sendMessage?phoneNumber=${this.form1.adminTel}`
          )
          .then((res) => {
            if (res.data.code === 200) {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: '已发送成功'
              })
            }
            if (res.data.code === 400) {
              console.log(res.data)
              // this.getUser()
              this.$message({
                type: 'error',
                message: '手机号有误,无法发送验证码'
              })
            }
          })
      }
    },
    getcodethree() {
      if (this.form4.legalPhone === '') {
        this.$message({
          type: 'error',
          message: '法人手机号不能为空'
        })
      } else {
        this.$http
          .get(
            requestURL +
                `/sms/sendMessage?phoneNumber=${this.form4.legalPhone}`
          )
          .then((res) => {
            if (res.data.code === 200) {
              console.log(res.data)
              this.$message({
                type: 'success',
                message: '已发送成功'
              })
            }
            if (res.data.code === 400) {
              console.log(res.data)
              // this.getUser()
              this.$message({
                type: 'error',
                message: '手机号有误,无法发送验证码'
              })
            }
          })
      }
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
