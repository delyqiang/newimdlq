<template>
  <!-- 首页-静态页面 :style="backgroundDiv"-->
  <div style="position:relative">
  <Head></Head>
  首页
  <Footer></Footer>
  </div>
</template>
<script>
  import Head from '../components/Head.vue'
  import Footer from '../components/Footer.vue'
  export default {
    data () {
      return {
      }

    },
    components: {Head,Footer},

    methods: {
    },
    created() {
    },
    mounted () {

    },
  }
</script>
<style scoped>
</style>
