// 提示消息
export default {

  // 成功提示
  success(self, msg) {
    self.$message({
      type: 'success',
      message: msg
    })
  },

  // 失败提示
  error(self, msg) {
    self.$message({
      type: 'error',
      message: msg
    })
  }

}
