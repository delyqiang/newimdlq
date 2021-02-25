<template>
  <div class="container_index">
    <el-tabs v-model="editableTabsValue" type="card" class="site-tabs">
      <el-tab-pane
        label="用户信息管理"
        name="first"
      />
    </el-tabs>
    <div class="box app-container site-container">
      <breadcrumb />
      <el-card class="box-card">
        <div class="headertop_top">
          <div class="text-right">
            <el-input v-model="account" placeholder="用户账号" style="width:130px;" />
            <el-select v-model="value" placeholder="登录状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-model="timerange"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeProcessing"
            />
            <el-button class="site-button-1" @click="seachKey(timerange[0],timerange[1],account,value)">搜 索</el-button>
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
            <el-table-column prop="user_time" label="注册时间" />
            <el-table-column prop="login_num" label="登录次数" />
            <el-table-column prop="last_login_time" label="最后登录" />
            <el-table-column prop="score" label="当前积分" />
            <el-table-column prop="used_score" label="已使用积分" />
            <el-table-column prop="used_card_balance" label="充值卡已使用金额" />
            <el-table-column label="登录状态">
              <template slot-scope="scope">
                <span v-if="scope.row.allow_login === 0 ">不允许登录</span>
                <span v-if="scope.row.allow_login === 1 ">允许登录</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleAuditKWDetail(scope.row.user_id)"
                >
                  查看详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
// import ConfirmButton from '@/components/public/ConfirmButton'
import auditApi from '@/api/audit'
export default {
  components: {
    Breadcrumb
    // ConfirmButton
  },
  data() {
    return {
      editableTabsValue: 'first',
      //
      loading: false,
      // tablelist
      data: [],
      account: '',
      timerange: ['', ''],
      // 分页
      pagin: {
        total: 0,
        size: 10,
        current: 1
      },
      options: [{
        value: '0',
        label: '不允许登录'
      }, {
        value: '1',
        label: '允许登录'
      },
      {
        value: '',
        label: '全部状态'
      }],
      value: ''
    }
  },
  created() {
    this.userList('', '', this.account, this.value)
  },
  methods: {
    // 同一天处理时间
    timeProcessing() {
      if (this.timerange[0] === this.timerange[1]) {
        this.timerange[1] = this.timerange[1].substring(0, 11) + '23:59:59'
      }
    },
    // 用户列表接口
    async userList() {
      const param = {
        beg_date: this.timerange[0],
        end_date: this.timerange[1],
        account: this.account,
        allow_login: this.value,
        page: this.pagin.current,
        page_size: this.pagin.size
      }
      const { data } = await auditApi.userList(param)
      if (data.code === 200) {
        this.data = data.data.list
        this.pagin.total = data.data.count
      }
    },
    // 搜索
    async seachKey(time1, time2, account, value) {
      this.userList(time1, time2, account, value)
    },
    // 查看详情
    async handleAuditKWDetail(id) {
      this.$router.push({ path: '/users', query: { id: id }})
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
