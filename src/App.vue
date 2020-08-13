<template>
  <div class="app-container">
    <!-- 顶部  header 区域 ---mint-ui 中的Header组件 -->
    <mt-header fixed title="Vue项目-练习"></mt-header>

    <!-- 中间 路由区域 router-view 区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 tabbar 区域 ---mui中的tabbar 样式  -->
    <nav class="mui-bar mui-bar-tab">
      <!-- 将mui自有的.mui-active高亮类 设为路由的默认高亮类  -->
      <router-link class="mui-tab-item-new" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>



</script>


<style scoped>
/* 顶部通栏 */
.mint-header {
    z-index: 99;
  }
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.v-enter  {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active, 
.v-leave-active {
	transition: all .4s ease;
}

/* 改类名 ，解决与mui.js文件冲突问题 .mui-tab-item改为.mui-tab-item-new*/
/* 先将原有样式拷贝 再直接改类名 */
.mui-bar-tab .mui-tab-item-new.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-new {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-new .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-new .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
