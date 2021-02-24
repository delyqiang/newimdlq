<template>
  <div class="ht_body">
    注册页面
    <p @click="link('Login')" class="cursor_pointer">登录</p>
    <p @click="link('/')" class="cursor_pointer">首页</p>
  </div>
</template>
<script>

  export default {
    data () {
      return {
      }
    },
    methods: {
        link(ref){
            this.$router.push(ref)
        },
    },
    created() {
    },
    mounted() {
    },
    components:{}
  }
</script>


<style scoped>
</style>
