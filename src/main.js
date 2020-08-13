// console.log('ok') 测试

// 入口文件
import Vue from 'vue';
// 1.1 导入路由包
import VueRouter from "vue-router"
// 1.2 安装路由
Vue.use(VueRouter)

// 导入时间 处理的插件
import moment from 'moment';

// 定义全局过滤器 ---- 日期格式  利用日期处理类库 npm i moment -S
Vue.filter('dateFormat' , function(dataStr, patten="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(patten)
})

// 2.1 导入vue-resource
import VueResource from "vue-resource"
// 2.2 安装
Vue.use(VueResource)

// 全局配置路由地址 设置请求根路径
Vue.http.options.root = 'http://vue.studyit.io'
// 设置全局 post 提交时， 表单数据的储存格式---普通表单格式
Vue.http.options.emulateJSON = true


// 导入 mui的样式
import './lib/mui/css/mui.min.css';
// 导入 mui 中的扩展图标的样式 
// 注意: 将他对应的扩展字体库mui-icons-extra.ttf拷贝到项目fonts中
import './lib/mui/css/icons-extra.css'



// 按需导入 mint-ui 中的组件
// import { Header , Swipe , SwipeItem , Button , Lazyload } from 'mint-ui';
// // 注册 组件
// Vue.component(Header.name , Header);
// Vue.component(Swipe.name , Swipe);
// Vue.component(SwipeItem.name , SwipeItem);
// Vue.component(Button.name , Button);
// Vue.use(Lazyload);

// 要使用 懒加载  要全部导入mint-ui组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



// 导入app 组件
import app from './App.vue'
// 导入自己的 路由模块 router.js
import router from './router';

var vm = new Vue({
  el: "#app",
  render: c => c(app), // 渲染 app 组件
  router, // 挂载路由 router
})