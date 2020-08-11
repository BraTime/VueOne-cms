// console.log('ok') 测试

// 入口文件
import Vue from 'vue';

// 导入 mui的样式
import './lib/mui/css/mui.min.css';



// 按需导入 mint-ui 中的组件
import { Header } from 'mint-ui';
// 注册 组件
Vue.component(Header.name , Header)




// 导入app 组件
import app from './App.vue'


var vm = new Vue({
  el: "#app",
  render: c => c(app) // 渲染 app 组件
})