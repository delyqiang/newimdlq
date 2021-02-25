<template>
  <div class="ht_body">
    找回密码页面
    <p class="cursor_pointer" @click="link('login')">登录</p>
    <p class="cursor_pointer" @click="link('/')">首页</p>
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    link(ref) {
      window.sessionStorage.setItem('path', ref)
      this.$router.push(ref)
    }
  }
}
</script>

<style scoped>
</style>
