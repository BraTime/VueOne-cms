<template>
  <div class="newsinfo-container">
    <h3 class="title">新闻标题---{{id}}</h3>
    <p class="subtitle">
      <span>发表时间：2020-08-08 08:08:08</span>
      <span>点击:0次</span>
    </p>
    <hr />
    <div class="content" v-html="content">{{content}}</div>

<!-- 将获取的数据 渲染到页面 -->
    <!-- <h3 class="title">{{ newsinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击:{{ newsinfo.click }}次</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content"></div> -->

    <!-- 评论区域 -->
    <comment :id="id"></comment>
    
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      //id: this.$router.params.id
      newsinfo: {}, // 存放新闻详情页数据
      // 以下为 假数据
      id: 12,
      content:
        "世界的未来属于年轻一代。习近平主席曾说：“全球青年有理想、有担当，人类就有希望，推进人类和平与发展的崇高事业就有源源不断的强大力量。”今天的人类命运共同体，比以往任何时候都呼唤青年肩负起重任。<img src='./src/images/news.jpg' alt=''>世界的未来属于年轻一代世界的未来属于年轻一代世界的未来属于年轻一代世界的未来属于年轻一代",
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then((result) => {
        if (result.body.status === 0) {
          // 成功
          this.newsinfo = result.boby.message[0];
        } else {
          Toast("获取详情页数据失败");
        }
      });
    },
  },
  components: {
      comment
  }
};
</script>

<style lang="less">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    padding: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: rgb(0, 162, 255);
    display: flex;
    justify-content: space-between;
  }
  .content {
      img {
          width: 100%;
      }
  }
}
</style>