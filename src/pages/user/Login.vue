<template>
  <div class="ht_body">
    <div>
      <img src="../../assets/img/jnlogo.png" alt="">
    </div>
    <div class="loginContent">
    </div>
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
        console.log(ref)
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
.loginContent{
  width: 100%;
  height: 565px;
  background: url("../../assets/img/loginBg.jpg") no-repeat;
  /* background-size: 100% 100%; */
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

</style>
