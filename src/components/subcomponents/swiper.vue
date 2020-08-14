<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 循环 将轮播图渲染  组件中用v-for 要用:key=-->
      <!-- lunbotuList是由 父组件传递过来的 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
        <!--{full: true} 添加full类 false不加 -->
        <img :src="item.img" :class="{full: isFull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    // 接收 父组件 传过来的 lunbotuList属性  
    // isFull 控制 图片宽度是否100% 值为 true / false
    props: ["lunbotuList" , "isFull"],
};
</script>

<style lang="less" scoped>
// 轮播图
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      // width: 100%;
      height: 100%;
    }
  }
  .mint-swipe-indicators {
    .mint-swipe-indicator.is-active {
      opacity: 1;
    }
  }
}
// 用于 控制图片是否 宽度 100%
.full {
      width: 100%;
    }
</style>