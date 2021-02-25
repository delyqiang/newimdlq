<template>
  <div class="confirm-button">
    <el-button
      :class="classname"
      :size="size"
      :type="type"
      :icon="icon"
      @click="dialogVisible = true"
    >
      <slot />
    </el-button>
    <el-dialog
      class="site-dialog"
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <slot name="content">
        <div>{{ content }}</div>
      </slot>
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
export default {
  name: 'ConfirmButton', // 之前的 'confirm-button',
  props: {
    classname: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    // bool:{
    //   type:Boolean,
    //   default:''
    // }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleDialogCancel() {
 
      this.dialogVisible = false
      this.$emit('cancel')
    },
    handleDialogConfirm() {
  
      this.dialogVisible = false
      this.$emit('confirm')
      // window.sessionStorage.removeItem('isDate')
    }
  }
}
</script>

<style scoped lang="scss">
.confirm-button {
  display: inline-block;
}
</style>
