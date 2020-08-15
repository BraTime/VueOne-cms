// console.log('ok') 测试

// 入口文件
import Vue from 'vue';
// 1.1 导入路由包
import VueRouter from "vue-router"
// 1.2 安装路由
Vue.use(VueRouter)

// 注册 Vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// 每次一进来，肯定调用main.js 就从本地存储中获取 "car" 这一项数据 没有就 []
var car = JSON.parse(localStorage.getItem('car') || '[]');

// new 一个实例
var store = new Vuex.Store({
  state: { // this.$store.state.xxx
    // 存储 购物车中的商品的数据--{id:商品id,count:商品数量 , price:单价 , selected: 是否选中true/false }
    car: car
  },
  mutations: { // this.$store.commit(xxx)
    // 点击加入购物车 将商品信息 加载到state中的car数组中
    addToCar(state , goodsinfo) {
      // 分析 ：
      // 1、若已有此对象 则只更新数量
      // 2、 若没有  则直接把对象 push 到car 中
      var flag = false; // 标志符：在购车中没有找到对应商品

      state.car.some(item => {
        if(item.id == goodsinfo.id) {
          // 更新数量
          item.count += parseInt(goodsinfo.count);
          flag  = true; // 在购车中找到对应商品
          return true; // 找到了，终止循环
        }
      });
      // 如果flag 最后为false  则购物车中没有对应商品对象 push
      if(!flag) {
        state.car.push(goodsinfo)
      }

      // 当更新后 把car数组 存储到本地的 localStorage
      localStorage.setItem('car' , JSON.stringify(state.car))

    },
    // 更新购物车中的商品信息--数量改变时
    updateGoodsInfo(state , goodsinfo) {
      // 修改购物车中商品的数量值
      // 分析：循环遍历每一项 有更改的，就更新
      state.car.forEach(item => {
        if(item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      // 当更新后 把car数组 重新存储到本地的 localStorage
      localStorage.setItem('car' , JSON.stringify(state.car));
    },
    // 根据id 从store中购物车中删除对应的商品
    removeFormCar(state , id) {
      //console.log(item.id)
      state.car.some((item, i) => {
        if(item.id == id) {
          state.car.splice(i , 1);
          return true;
        }
      })
      // 将数据 更新到本地存储中
      localStorage.setItem('car' , JSON.stringify(state.car));
    },
    // 更新商品 选中状态
    updateGoodsSelected(state , goods) {
      state.car.some(item => {
        if(item.id == goods.id) {
          item.selected = goods.selected;
          return true;
        }
      })
      // 将数据 更新到本地存储中
      localStorage.setItem('car' , JSON.stringify(state.car));
    }

  },
  getters: {  // this.$store.getters.xxx
    // 获取购物车的所有商品数量和
    getAllCount(state) {
      var c = 0;
      // 遍历购物车中 每一项商品 他们的数量相加
      state.car.forEach(item => {
        c += item.count;
      })
      return c;
    },
    // 获取各商品对应的数量 返回一个对象 {商品id值： 商品count值}
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o ;
    },
    // 购物车商品是否选中 返回一个对象 {商品id: 商品是否选中}
    getGoodsSelected(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
   
  }
})

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
import './lib/mui/css/mui.css';
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
  store, // 挂载vuex.Store 实例 状态管理对象
})