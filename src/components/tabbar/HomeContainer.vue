<template>
  <div>
    <!-- 这是轮播图区域 -->
      <!-- 将数据由属性lunbotuList 传给轮播图子组件-->
      <!-- isFull属性 控制图片是否 宽度100%- -->
      <swiper :lunbotuList="lunbotuList" :isFull="true"></swiper>
    <!-- mui九宫格--六宫格的改造 -->
    <div>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{ path: '/home/newslist' }">
              <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
            <img src="../../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="../../images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { Toast } from "mint-ui";
// 导入 轮播图 子组件
import swiper from "../subcomponents/swiper.vue"

export default {
  data() {
    return {
      // 用于保存 轮播图的数组 真数据
      list: [],
      // 假数据
       lunbotuList: [{img: "./src/images/banner-1.jpg"},{img: "./src/images/banner-2.jpg"},{img: "./src/images/banner-3.jpg"}] 
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // 请求 轮播图的api 获取轮播图
      this.$http.get("api/getlunbo").then((result) => {
        //console.log(result.body)
        if (result.body.status === 0) {
          // 获取成功
          this.list = result.body.message;
        } else {
          Toast("获取加载轮播图失败....");
        }
      });
    },
  },
  components: {
    swiper: swiper
  }

};
</script>

<style lang="less" scoped>

// 九宫格样式
.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    .mui-table-view-cell {
        border: none;
        img {
            width: 60px;
            height: 60px;
        }
        .mui-media-body {
            font-size: 13px;
        }
    }
}
</style>