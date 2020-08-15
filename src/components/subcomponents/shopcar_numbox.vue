<template>
    <!-- 用watch 属性来监听 父组件传过来的max -->
    <!-- 如果使用真数据 则不用 :data-numbox-max="max" 这个了-->
    <div class="mui-numbox" data-numbox-min="1" data-numbox-step='1' style="height:25px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

    <!-- 分析：子组件什么时候把值传给 父组件？ -->
    <!-- 1、点击 +  或 - 或直接输入数字时 立即把值传给父组件 -->
    <!-- 2、数字一旦发生改变  就立即把值传给父组件 @change监听改变事件 -->
</template>

<script>
 
import mui from "../../lib/mui/js/mui.js" 

export default {
    props: ["initcount" , "goodsid"],
    mounted() {
        // 初始化数字框
        mui('.mui-numbox').numbox()
    },
     methods: {
        //  数量改变了
        countChange() {
            // 拿到数字框的值 就其更新到 store中
            // console.log(this.$refs.numbox.value)

            // 将更改的商品id 和数量 传回给store
            this.$store.commit("updateGoodsInfo" , {id: this.goodsid , count: this.$refs.numbox.value});
            
         },

    },
  
};
</script>

<style lang="">

</style>