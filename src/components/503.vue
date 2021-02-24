<template>
	  <Row class="mauto">
      <Col :sapn="24"></Col>
    </Row>
</template>

<script>
  export default {
    name : "noFound",
    props : {},
    components : {},
    computed : {},
    data () {
      return {}
    },
    watch : {},
    mounted () {
      sessionStorage.clear();
    },
    created () {
    },
    methods : {},
    filters : {}
  }
</script>

<style scoped>

</style>
