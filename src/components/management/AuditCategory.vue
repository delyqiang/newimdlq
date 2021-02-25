<template>
  <div class="q">
    <el-table
      class="site-table"
      :data="auditCategory"
      :max-height="height"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="operate"
        label="审核类型"
      />
      <el-table-column
        prop="auditorName"
        label="审核人"
      />
      <el-table-column
        prop="operateTime"
        label="提交时间"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == '未通过'"
            type="text"
            size="small"
            @click="handleAuditCategoryEdit(scope.row.id,scope.row.title,scope.row.categoryId,scope.row)"
          >
            编辑
          </el-button>
          <ConfirmButton
            v-if="scope.row.status != '审核通过'&&scope.row.status!='审核中'"
            type="text"
            size="small"
            title="删除提示"
            content="是否确定删除该项？"
            @confirm="handleAuditCategoryDelete(scope.row.id)"
          >
            删除
            <template v-slot:content>
              <p>删除知识树</p>
              <p class="color-primary">【{{ scope.row.title }}】</p>
              <p>{{ scope.row.status }}，确认是否删除该项？</p>
            </template>
          </ConfirmButton>
          <ConfirmButton
            v-if="scope.row.status == '审核通过'"
            type="text"
            size="small"
            title="关闭提示"
            @confirm="handleAuditCategoryClose(scope.row.id)"
          >
            关闭
            <template v-slot:content>
              <p>关闭知识树</p>
              <p class="color-primary">【{{ scope.row.title }}】</p>
              <p>{{ scope.row.status }}，关闭后不再出现于列表中</p>
            </template>
          </ConfirmButton>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog
      class="site-dialog"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="" label-width="0px">
          <el-radio v-model="form.radioLevel" :disabled="elradio1" label="1">一级类别</el-radio>
          <el-radio v-model="form.radioLevel" :disabled="elradio2" label="2">二级类别</el-radio>
          <el-radio v-model="form.radioLevel" :disabled="elradio3" label="3">属性</el-radio>
        </el-form-item>
        <el-form-item v-if="form.radioLevel > 1" label="所属类别">
          <el-cascader
            v-if="form.radioLevel == 2"
            ref="cascaderAddr"
            v-model="value"
            style="width:265px;"
            placeholder="请选择所属类别"
            clearable
            :options="options2"
            :disabled="cascader1"
            @change="handleChange"
          />
          <el-cascader
            v-if="form.radioLevel == 3"
            ref="cascaderAddr"
            v-model="value2"
            style="width:265px;"
            placeholder="请选择所属类别"
            clearable
            :options="options3"
            :disabled="cascader2"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="leiTitle" />
        </el-form-item>
        <!-- 属性 -->
        <el-form-item v-if="form.radioLevel==3" label="与城市相关" style="text-align:left;">
          <el-radio v-model="radio" style="margin-left:20px;" label="yes">是</el-radio>
          <el-radio v-model="radio" label="no">否</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="site-button-2"
          size="small"
          @click="handleDialogCancel"
        >取 消</el-button>
        <el-button
          class="site-button-1"
          size="small"
          @click="handleDialogConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import auditApi from '@/api/audit'
import categoryApi from '@/api/category'
import tips from '@/utils/tips'
import ConfirmButton from '@/components/public/ConfirmButton'
// import { isArray } from 'util'
export default {
  components: {
    ConfirmButton
  },
  props: {
    height: {
      type: [String, Number],
      default: 400
    }
  },
  data() {
    return {
      loading: false,
      auditCategory: [],
      // 新添加
      activeName: 'first',
      dialogTitle: '',
      dialogVisible: false,
      dialogMode: '',
      form: {
        radioLevel: '1'
      },
      // thirdList: [],
      // 新添加的属性，解决重新赋值不行的问题
      value: [],
      value2: [],
      leiTitle: '',
      // 局部组件调用刷新
      // isRouterAlive: true
      idid: '',
      // cateID
      categoryID: '',
      // 单选框组
      radio: 'yes',
      options: [],
      options2: [],
      options3: [],
      // value: [],
      // 级联选择器的回掉
      valId: '',
      valLabel: '',
      // 修改的disabled
      elradio1: false,
      elradio2: false,
      elradio3: false,
      cascader1: false,
      cascader2: false
    }
  },
  created() {
    this.seleList2('2') // 属性  级联选择器
    this.seleList3('3') // 属性  级联选择器
    this.seleList4('4') // 属性  级联选择器
    // 知识树审核进度列表
    this.getAuditCategory()
  },
  methods: {
    // 知识树审核进度
    async getAuditCategory() {
      const { data } = await auditApi.getAuditList()
      if (data.code === 0) {
        this.auditCategory = data.data
      }
    },
    // 知识树提交
    async handleAuditCategorySubmit(id) {
      const { data } = await auditApi.submitKWList(id)
      if (data.code === 0) {
        tips.success(this, '提交成功！')
        this.getAuditCategory()
      } else {
        tips.error(this, '提交失败！')
      }
    },
    // 知识树编辑
    handleAuditCategoryEdit(id, title, categoryId, all) {
      // console.log(all, 123) // 没有 component
      this.dialogTitle = '修改类别'
      this.dialogVisible = true
      this.categoryID = categoryId // 后台响应的 categoryId
      // console.log('category', categoryId)
      // console.log(title)
      // 类别名称
      const cont = title
      var index3 = cont.lastIndexOf('/')
      // 截取 ’/‘ 之后的
      var str3 = cont.substring(index3 + 1, cont.length)
      this.leiTitle = str3
      // 显示当前的层级状态
      var num = 1
      for (var i = 0; i <= cont.length; i++) {
        if (cont[i] === '/') {
          num = num + 1
          if (num === 1) {
            this.form.radioLevel = '1'
            // 这里的 disabled 在回显下拉菜单内容中
          } else if (num === 2) {
            this.form.radioLevel = '2'
            this.elradio1 = true
            this.elradio3 = true
            this.elradio2 = false
            this.cascader1 = true
            this.cascader2 = true
          } else if (num === 3) {
            this.form.radioLevel = '3'
            this.elradio1 = true
            this.elradio2 = true
            this.elradio3 = false
            this.cascader1 = !this.cascader1
            this.cascader2 = !this.cascader2
            // console.log(3333)
          }
        }
      }
      // 回显在下拉菜单框的内容
      if (num === 2) {
        const cascaderId = categoryId.split('-')
        const arr = []
        cascaderId.forEach(item => {
          arr.push(Number(item))
        })
        this.value = arr
      } else if (num === 3) {
        const cascaderId = categoryId.split('-')
        const arr = []
        cascaderId.forEach(item => {
          arr.push(Number(item))
        })
        this.value2 = arr
      } else {
        this.form.radioLevel = '1'
        this.leiTitle = title
        // console.log(1111)
        this.elradio1 = false
        this.elradio2 = true
        this.elradio3 = true
      }
      // 当前的id
      this.idid = id
    },
    // 知识树删除
    async handleAuditCategoryDelete(id) {
      const { data } = await auditApi.delTwo(id)
      // console.log(data)
      // const status = sessionStorage.getItem('status')
      if (data.code === 0) {
        console.log(data)
        tips.success(this, '删除成功！')
        this.getAuditCategory()
      } else {
        tips.error(this, '删除失败！')
      }
    },
    // 知识树关闭
    async handleAuditCategoryClose(id) {
      const { data } = await auditApi.closeOne(id)
      if (data.code === 0) {
        tips.success(this, '关闭成功！')
        this.getAuditCategory()
      } else {
        tips.error(this, '关闭失败！')
      }
    },
    // 知识树编辑更新
    async editsubmit(id, form) {
      var categoryId = null
      if (form.radioLevel == 2) {
        // categoryId
        categoryId = this.value
        // console.log(categoryId)
        // categoryName
        var valLabel = this.$refs['cascaderAddr'].currentLabels
        this.valLabel = valLabel.join('/')
      } else if (form.radioLevel == 3) {
        // categoryId
        categoryId = this.value2
        this.valId = categoryId.join('-')
        // categoryName
        var valLabel2 = this.$refs['cascaderAddr'].currentLabels
        this.valLabel = valLabel2.join('/')
      } else {
        categoryId = null
      }
      //
      const { data } = await categoryApi.editCategory(id, this.valId,
        this.leiTitle,
        this.valLabel,
        this.radio)
      if (data.code === 0) {
        tips.success(this, '修改成功！')
        this.getAuditCategory()
        this.resetDialog()
      } else {
        tips.error(this, '修改失败！')
        this.resetDialog()
      }
    },

    // 模态框取消
    handleDialogCancel() {
      this.resetDialog()
    },
    // 模态框确认（ 修改请求 ）
    async handleDialogConfirm() {
      var form = this.form
      // console.log(223232, form)
      // eslint-disable-next-line
      if (form.radioLevel == 0) {
        tips.error(this, '请选择级别！')
        return
      } else {
        this.editsubmit(this.idid, form)
      }
    },
    resetDialog() {
      this.dialogVisible = false
      this.dialogTitle = ''
      this.dialogMode = ''
      this.radioLevel = 0
    },
    // 级联，接口2
    async seleList2(deep) {
      const { data } = await categoryApi.seleList(deep)
      if (data.code === 0) {
        // console.log(data.data)
        var val = data.data
        // 删除 children 为空的属性
        const handel = (item, attr) => (item[attr] && item[attr].length ? item[attr].forEach(row => (handel(row, attr))) : delete item[attr])
        val.forEach(item => handel(item, 'children'))
        // console.log(val)
        this.options = val
      }
    },
    // 级联，接口3
    async seleList3(deep) {
      const { data } = await categoryApi.seleList(deep)
      if (data.code === 0) {
        // console.log(data.data)
        var val = data.data
        // 删除 children 为空的属性
        const handel = (item, attr) => (item[attr] && item[attr].length ? item[attr].forEach(row => (handel(row, attr))) : delete item[attr])
        val.forEach(item => handel(item, 'children'))
        // console.log(val)
        this.options2 = val
      }
    },
    // 级联，接口4
    async seleList4(deep) {
      const { data } = await categoryApi.seleList(deep)
      if (data.code === 0) {
        // console.log(data.data)
        var val = data.data
        // 删除 children 为空的属性
        const handel = (item, attr) => (item[attr] && item[attr].length ? item[attr].forEach(row => (handel(row, attr))) : delete item[attr])
        val.forEach(item => handel(item, 'children'))
        // console.log(val)
        this.options3 = val
      }
    },
    // 级联选择回掉
    handleChange(value) {
      // console.log(this.form.categoryId3)
      const valId = value.join('-')
      this.valId = valId
      const valLabel = this.$refs['cascaderAddr'].currentLabels
      this.valLabel = valLabel.join('/')
    }
  }
}
</script>
