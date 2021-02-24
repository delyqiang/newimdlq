<template>
    <div class="pdl15">
      <Tag closable v-for="item,index in tabLIst" :color="item.checked?'#2d8cf0':'#80848f'"  @on-close="onClose(item,index)" :name="item.url">
        <span @click="navigateTo(item)">{{item.name}}</span>
      </Tag>
    </div>
</template>

<script>
  export default {
    name: "routerTab",
    props : {
      tabLIst:{
        type:Array,
      }
    },
    methods:{
      navigateTo (item) {
        // this.tabLIst.push(name)
        for (let i= 0 ; i <this.tabLIst.length ; i++){
          let T = this.tabLIst[i];
          if (T.url==item.url){
            this.$set(T,'checked',true);
          }else{
            this.$set(T,'checked',false);
          }
        }
        this.$router.push({name:item.url});
        // this.menuList();
      },
      onClose(item,index){
        let path = this.$route.matched[1].path;  // 获取到地址拦上#号后面的url地址
        let arr = this.$router.options.routes[4].children;
        if (this.tabLIst.length<=1){

          return
        }
        for (let i= 0 ; i <arr.length ; i++){
          let T = arr[i];
          if (T.path==item.url){
            T.meta.keepAlive = false;
          }
        }
        if(path.indexOf('/view/') != -1){  // 是否包含，-1是包含，0不包含
          let activename = path.slice(6);
          if (activename==item.url){
            this.tabLIst.splice(index,1);
            this.navigateTo(this.tabLIst[this.tabLIst.length-1])
          }else{
            this.tabLIst.splice(index,1);
          }
        }



      }
    }
  }
</script>

<style scoped>

</style>
