<template>
  <div class="goodsinfo-containner">
      <!-- 加入购物车的小球 -->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- mocklunbo为假数据  真数据为lunbotu -->
          <swiper :lunbotuList="mocklunbo" :isFull="false"></swiper>
        </div>
      </div>
    </div>
    
    <!-- 商品购买区域 -->
    <!-- mackinfo 为假数据  真数据 为 goodsinfo -->
    <div class="mui-card buy">
      <div class="mui-card-header">{{mackinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>¥{{mackinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">¥{{mackinfo.sell_price}}</span>
          </p>
          <!-- getcount向子组件传递的事件  max向子组件传的参数 -->
          <p>购买数量：<numbox @getcount="getSelectCount" :max="mackinfo.stock_quantity"></numbox> </p>
            <!-- 分析： 如何在加入购物车的时候，拿到选择的数量 -->
            <!-- 1、按钮属于goodsinfo页面 ，数字属于numbox 子组件 -->
            <!-- 2、无法直接从goodsinfo页面中获取 选中的商品值 ，需要子组件向父组件传值(事件调用机制): 即父向子传方法，子把数据当参数传回给父 -->
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card detail">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{mackinfo.goods_no}}</p>
          <p>库存情况：{{mackinfo.stock_quantity}}</p>
          <p>上架时间：{{mackinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入轮播图子组件
import swiper from "../subcomponents/swiper.vue";
// 导入数字选择框
import numbox from "../subcomponents/goodsinfo-numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      // 控制小球显示 隐藏
      ballFlag: false,
      // 存放用户选中的商品数量 值
      selectdCount: 1, // 默认值 1
      // 存放获取的 图片数据 真数据
      lunbotu: [],
      // 存放商品 信息 数据
      goodsinfo: {},
      // 假数据  图片
      mocklunbo: [
        { img: "./src/images/16.jpg" },
        { img: "./src/images/17.jpg" },
      ],
      //  商品详情  假数据
      mackinfo: {
        id: this.$route.params.id,
        title: "手机美美美忽高忽低施工方华东" + this.$route.params.id,
        add_time: Date.now(),
        goods_no: 'SD6746758459769',
        stock_quantity: 20,
        market_price: 2799,
        sell_price: 2599
      },
    };
  },
  created() {
    this.getLunBotu();
    this.getGoodsInfo();
  },
  methods: {
    // 获取轮播图 图片数据
    getLunBotu() {
      this.$http.get("api/getthumimages/" + this.id).then((result) => {
        if (result.body.status === 0) {
          // 成功了
          // 循环每一项  追加一个img 属性 因为轮播图组件中只认 item.img
          result.body.message.forEach((item) => {
            item.img = item.src;
          });

          this.lunbotu = result.body.message;
        } else {
          Toast("获取图片失败！");
        }
      });
    },
    // 获取商品的信息 数据
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then((result) => {
        if (result.body.status === 0) {
          //   成功了
          this.goodsinfo = result.body.message[0];
        } else {
          Toast("获取商品信息失败！");
        }
      });
    },
    // 点击 去往图文介绍
    goDesc(id) {
        // 编程式导航  
        // name为路由匹配规则的名字 goodsdesc对应 '/home/goodsdesc/:id'
        this.$router.push({name: "goodsdesc" , params: {id: id}});
    },
    // 点击 去往商品评论
    goComment(id) {
         // 编程式导航
        this.$router.push({name: "goodscomment" , params: {id: id}});
    },
    // 点击加入购物车 小球效果
    addToShopCar() {
        this.ballFlag = !this.ballFlag;
    },
    // 做半场动画 使用钩子函数
    beforeEnter(el) {
        // 动画开始前的样式
        el.style.transform = "translate(0 ,0)"; // 小球开始位置
    },
    enter(el , done) {
        el.offsetWidth; // 不写不出动画效果
        console.log(this.$refs)
        // 获取小球 在页面中的坐标
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        // 获取购物车上数量图标 在页面中的坐标
        const badgePosition = document
            .getElementById("badge")
            .getBoundingClientRect();
        // 开始位置  和 目标位置的 坐标差值
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;
        // 动画开始后的样式
        el.style.transform = `translate(${xDist}px, ${yDist}px)`;// 小球终点位置
        el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
        done(); // 避免延迟
    },
    afterEnter(el) {
        // 动画完成之后的样式
        this.ballFlag = !this.ballFlag; // 隐藏小球
    },
    // 获取购买数量 选中的值
    getSelectCount(count) {
        // 子组件调用此方法 把选中的值 以实参传入 再保存给父组件中的 selectdCount
        this.selectdCount = count;
        //console.log(this.selectdCount)
    },
    
  },
  components: {
    swiper: swiper,
    numbox: numbox,
  },
};
</script>


<style lang="less" scoped>
.goodsinfo-containner {
  background-color: #fff;
  overflow: hidden;
  .mui-card {
      box-shadow: 0 1px 2px rgba(0,0,0,.15);
  }
  .buy {
    p {
      color: #555;
    }
    .now_price {
      color: red;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  // 小球效果
  .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 390px;
      left: 150px;
  }
}
</style>
