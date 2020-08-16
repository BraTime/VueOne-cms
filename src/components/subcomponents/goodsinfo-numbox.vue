<template>
    <!-- 用watch 属性来监听 父组件传过来的max -->
    <!-- 如果使用真数据 则不用 :data-numbox-max="max" 这个了-->
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max" data-numbox-step='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

     

    

    <!-- 分析：子组件什么时候把值传给 父组件？ -->
    <!-- 1、点击 +  或 - 或直接输入数字时 立即把值传给父组件 -->
    <!-- 2、数字一旦发生改变  就立即把值传给父组件 @change监听改变事件 -->
</template>

<script>
 
import mui from "../../lib/mui/js/mui.js" 

export default {
  // 接收父组件传过来的max属性 --库存量
  props: ["max"],
  watch: {
    // 属性监听 只有max改变即触发
    'max': function(newVal , oldVal) {
      // 设置 numbox 的最大值
        mui('.mui-numbox')
          .numbox()
          .setOption("max" , newVal);
    }
  },
  mounted() {
    mui('.mui-numbox').numbox()
  },
  methods: {
    // 文本框 改变事件
    countChange() {
      // 每当文本框值改变  就把值传给父组件
      // console.log(this.$refs.numbox.value) //得到ref="number"的dom对象
      // this.$emit("父组件中方法" ， 传递的参数)
       this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
};
</script>

<style lang="">
</style>