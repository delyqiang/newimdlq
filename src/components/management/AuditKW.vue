<template>
  <el-table
    v-loading="loading"
    class="site-table"
    :data="auditKW"
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
        <!-- <el-button
          v-if="scope.row.status == '未提交'"
          type="text"
          size="small"
          @click="handleAuditKWSubmit(scope.row.id)"
        >
          提交
        </el-button> -->
        <el-button
          v-if="scope.row.status == '未通过'||scope.row.status == '保存'"
          type="text"
          size="small"
          @click="handleAuditKWEdit(scope.row.id)"
        >
          编辑
        </el-button>
        <ConfirmButton
          v-if="scope.row.status != '审核通过'&&scope.row.status != '审核中'"
          type="text"
          size="small"
          title="删除提示"
          content="是否确定删除该项？"
          @confirm="handleAuditKWDelete(scope.row.id)"
        >
          删除
          <template v-slot:content>
            <p>删除知识点</p>
            <p class="color-primary">【{{ scope.row.title }}】</p>
            <p>{{ scope.row.status }}，确认是否删除该项？</p>
          </template>
        </ConfirmButton>
        <ConfirmButton
          v-if="scope.row.status == '审核通过'"
          type="text"
          size="small"
          title="关闭提示"
          @confirm="handleAuditKWClose(scope.row.id)"
        >
          关闭
          <template v-slot:content>
            <p>关闭知识点</p>
            <p class="color-primary">【{{ scope.row.title }}】</p>
            <p>{{ scope.row.status }}，关闭后不再出现于列表中</p>
          </template>
        </ConfirmButton>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import auditApi from '@/api/audit'
import tips from '@/utils/tips'
import ConfirmButton from '@/components/public/ConfirmButton'
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
      auditKW: []
    }
  },
  created() {
    // 知识点审核进度
    this.getAuditKW()
  },
  methods: {
    // 知识点审核进度
    async getAuditKW() {
      this.loading = true
      const { data } = await auditApi.getKWList()
      if (data.code === 0) {
        this.auditKW = data.data
      }
      this.loading = false
    },
    // 提交按钮
    async handleAuditKWSubmit(id) {
      this.loading = true
      const { data } = await auditApi.submitKWList(id)
      if (data.code === 0) {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.getAuditKW()
      } else {
        this.$message().error('提交失败')
      }
      this.loading = false
    },
    // 编辑按钮
    handleAuditKWEdit(id) {
      // console.log(row)
      this.$router.push({ path: `/knowledgeedit2`, query: { urlid: id }})
    },
    // 删除按钮 （修改）
    async handleAuditKWDelete(id) {
      this.loading = true
      const { data } = await auditApi.delOne(id)
      if (data.code === 0) {
        tips.success(this, '删除成功')
        await this.getAuditKW()
      } else {
        tips.error(this, '删除失败')
      }
      this.loading = false
    },
    // 关闭按钮
    async handleAuditKWClose(id) {
      this.loading = true
      const { data } = await auditApi.closeOne(id)
      if (data.code === 0) {
        tips.success(this, '关闭成功！')
        await this.getAuditKW()
      } else {
        tips.error(this, '关闭失败！')
      }
      this.loading = false
    }
  }
}
</script>
