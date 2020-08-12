// console.log('ok') 测试

// 入口文件
import Vue from 'vue';
// 1.1 导入路由包
import VueRouter from "vue-router"
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入vue-resource
import VueResource from "vue-resource"
// 2.2 安装
Vue.use(VueResource)



// 导入 mui的样式
import './lib/mui/css/mui.min.css';
// 导入 mui 中的扩展图标的样式 
// 注意: 将他对应的扩展字体库mui-icons-extra.ttf拷贝到项目fonts中
import './lib/mui/css/icons-extra.css'



// 按需导入 mint-ui 中的组件
import { Header , Swipe , SwipeItem } from 'mint-ui';
// 注册 组件
Vue.component(Header.name , Header)
Vue.component(Swipe.name , Swipe)
Vue.component(SwipeItem.name , SwipeItem)


// 导入app 组件
import app from './App.vue'
// 导入自己的 路由模块 router.js
import router from './router';

var vm = new Vue({
  el: "#app",
  render: c => c(app), // 渲染 app 组件
  router, // 挂载路由 router
})