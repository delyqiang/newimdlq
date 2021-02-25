<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @select="changeOpen"
        @open="open"
      > -->
    <!-- <sidebar-item v-for="(route,index) in routes" :key="index" :item="route" :base-path="route.path" class="active" />
    </el-menu> -->
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
// import { requestURL } from '@/utils/config.js'
import { mapGetters, mapActions } from 'vuex' // , mapState
import variables from '@/styles/variables.scss'
// import userApi from '@/api/user'
export default {
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // ...mapState('permission', ['routes']), // 异步打开
    routes() { // 测试
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {

  },
  methods: {
    ...mapActions('permission', ['generateRoutes']),

    changeOpen(key, keypath) {
    },

    open(val) {

    }

  }
}
</script>
<style lang="scss">
// 一级 （ 首页 ）样式  hack
// .menu-wrapper .router-link-active .shouye{
//   background-color: #006A5E !important;
//   height: 46px;
//   line-height: 46px;
// }
// 一级间距
.menu-wrapper .el-menu-item{
  height: 46px;
  line-height: 46px;
}
.menu-wrapper .router-link-exact-active .el-menu-item span{
  font-size: 15px;
  font-weight: 600;
}
.menu-wrapper style{
  background-color: #666;
}
// 一级，字体
.menu-wrapper .el-submenu .el-submenu__title span{
  font-size: 15px;
  font-weight: 600;
}
// 二级 （ 间距 ）
.menu-wrapper .el-submenu .el-menu .menu-wrapper .el-menu-item {
  height: 40px;
  line-height: 40px;
}
// 二级 （ 字体 ）
.menu-wrapper .el-submenu .el-menu .menu-wrapper .el-submenu .el-submenu__title span{
  font-size: 14px;
  font-weight: 500;
}
// // 三级 （ 间距 ）
// .menu-wrapper .el-submenu .el-menu .menu-wrapper .el-submenu .el-menu .menu-wrapper .el-menu-item{
//   height: 32px;
//   line-height: 32px;
// }
// 三级字体
// .menu-wrapper .el-submenu .el-menu .menu-wrapper .el-submenu .el-menu .menu-wrapper .el-menu-item span{
//   font-size: 13px;
//   font-weight: 400;
// }
.el-icon-arrow-down .el-submenu__title i{
  color:#fff;
}

</style>
