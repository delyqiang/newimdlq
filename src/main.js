// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/public.css"
import "./assets/css/reset.css"
import './api/index.js'
import "./assets/iconfont/iconfont.css"

import {Throttle} from'./util/utils'
import btnqx from './assets/js/Payment_method'

Vue.use(ElementUI);
Vue.prototype.btnqx=btnqx

window.Throttle = Throttle
Vue.use(Throttle);
//兄弟组件传参 --在SetPassword.vue设置完密码后回调index.vue方法
window.eventBus = new Vue();
/* eslint-disable no-new */
//iview  修复IE10及以下版本不支持dataset属性的问题，兼容transfer-dom.js中使用了dataset的问题
if (window.HTMLElement) {
    if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
        Object.defineProperty(HTMLElement.prototype, 'dataset', {
            get: function () {
                var attributes = this.attributes; // 获取节点的所有属性
                var name = [];
                var value = []; // 定义两个数组保存属性名和属性值
                var obj = {}; // 定义一个空对象
                for (var i = 0; i < attributes.length; i++) { // 遍历节点的所有属性
                    if (attributes[i].nodeName.slice(0, 5) === 'data-') { // 如果属性名的前面5个字符符合"data-"
                        // 取出属性名的"data-"的后面的字符串放入name数组中
                        name.push(attributes[i].nodeName.slice(5));
                        // 取出对应的属性值放入value数组中
                        value.push(attributes[i].nodeValue);
                    }
                }
                for (var j = 0; j < name.length; j++) { // 遍历name和value数组
                    obj[name[j]] = value[j]; // 将属性名和属性值保存到obj中
                }
                return obj; // 返回对象
            },
        });
    }
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Array.prototype.contains = function ( needle ) {
  for (var i=0;i<this.length;i++) {
    if (this[i] == needle)
      return true;
  }
  return false;
}
