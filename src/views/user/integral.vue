<template>
  <div class="container_index">
    <el-tabs v-model="editableTabsValue" type="card" class="site-tabs">
      <el-tab-pane
        label="用户积分管理"
        name="first"
      />
    </el-tabs>
    <div class="box app-container site-container">
      <breadcrumb />
      <el-card class="box-card">
        <div class="headertop_top">
          <div class="text-right">
            <el-input v-model="tel" placeholder="用户账号" style="width:130px;" />
            <el-date-picker
              v-model="timerange"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeProcessing"
            />
            <el-button class="site-button-1" @click="seachKey(tel,timerange[0],timerange[1])">查 询</el-button>
            <ConfirmButton
              type="text"
              size="small"
              title="增加/减少积分方式"
              @confirm="addReduceintegral()"
            >
              <el-button class="site-button-1">增减积分</el-button>
              <template v-slot:content>
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="auto">
                  <el-form-item label="用户账号" prop="account">
                    <el-input v-model="form.account" placeholder="用户账号" />
                  </el-form-item>
                  <el-form-item label="增减类型" prop="type">
                    <el-select v-model="form.type" style="width:100%;" placeholder="请选择">
                      <el-option
                        v-for="item in typeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="积分值" prop="score">
                    <el-input v-model.number="form.score" placeholder="积分值" style="width:90%" />
                    <span>分</span>
                  </el-form-item>
                  <el-form-item label="分配原因">
                    <el-select v-model="form.way" style="width:100%;" placeholder="请选择">
                      <el-option
                        v-for="item in wayOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input
                      v-model="form.desc"
                      type="textarea"
                      :rows="6"
                      resize="none"
                      placeholder="请输入内容"
                    />
                  </el-form-item>
                </el-form>

              </template>
            </ConfirmButton>
          </div>
          <el-table
            class="site-table marginT20"
            :data="data"
            stripe
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column prop="tel_phone" label="用户账号" />
            <el-table-column prop="score" label="积分值" />
            <el-table-column prop="create_time" label="添加时间" />
            <el-table-column prop="way" label="分配原因" />
            <el-table-column prop="way_desc" label="描述" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span v-if="scope.row.score > 0">增加积分</span>
                <span v-if="scope.row.score < 1 ">减少积分</span>
              </template>
            </el-table-column></el-table>
          <el-pagination
            :current-page="pagin.current"
            :page-sizes="[10, 20, 50, 200]"
            :page-size="pagin.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagin.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index'
import ConfirmButton from '@/components/public/ConfirmButton'
import tips from '@/utils/tips'
import auditApi from '@/api/audit'
export default {
  components: {
    Breadcrumb,
    ConfirmButton
  },
  data() {
    return {
      editableTabsValue: 'first',
      //
      loading: false,
      // tablelist
      data: [],

      // 分页
      pagin: {
        total: 0,
        size: 10,
        current: 1
      },
      timerange: ['', ''],
      tel: '',
      form: {
        account: '', // 账号
        score: '', // 积分制
        desc: '', // 描述
        way: '', // 分配原因
        type: '' // 增减类型
      },
      // 增减类型
      typeOption: [{
        value: '0',
        label: '增加积分'
      }, {
        value: '1',
        label: '减少积分'
      }],
      // 分配原因
      wayOption: [{
        value: '注册',
        label: '注册'
      }, {
        value: '登录',
        label: '登录'
      }, {
        value: '补偿',
        label: '补偿'
      }],
      //  rules
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择增减类型', trigger: 'change' }
        ],
        score: [
          { required: true, message: '请输入积分制', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.intergralList(this.tel, '', '')
  },
  methods: {
    // 同一天处理时间
    timeProcessing() {
      if (this.timerange[0] === this.timerange[1]) {
        this.timerange[1] = this.timerange[1].substring(0, 11) + '23:59:59'
      }
    },
    // 用户积分列表
    async intergralList(tel, time1, time2) {
      const param = {
        account: this.tel,
        beg_date: this.timerange[0],
        end_date: this.timerange[1],
        page: this.pagin.current,
        page_size: this.pagin.size
      }
      const { data } = await auditApi.intergralList(param)
      if (data.code === 200) {
        this.data = data.data.list
        this.pagin.total = data.data.count
      }
    },
    // 搜索
    async seachKey(tel, time1, time2) {
      this.intergralList(tel, time1, time2)
    },
    // 增加/减少积分
    addReduceintegral() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          if (this.form.type !== '0') {
            this.form.score = -this.form.score
          }
          delete this.form.type
          const { data } = await auditApi.intergralAdd(this.form)
          if (data.code === 200) {
            tips.success(this, data.msg)
            this.intergralList(this.tel, '', '')
            this.type = ''
            this.form = {
              account: '', // 账号
              score: '', // 积分制
              desc: '', // 描述
              way: '' // 分配原因
            }
          } else {
            tips.error(this, data.msg)
          }
        } else {
          delete this.form.type
          tips.error(this, '请完整填写信息')
          return false
        }
      })
    },
    // 一页几条
    handleSizeChange(val) {
      this.pagin.size = val
      this.userList()
    },
    // 第几页
    handleCurrentChange(val) {
      this.pagin.current = val
      this.userList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .container_index{
    .box{
      padding-top:0;
      background: #F1F1F1;

    }
  }

</style>
