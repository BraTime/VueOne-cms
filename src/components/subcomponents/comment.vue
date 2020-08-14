<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入内容(不超过120字)" maxlength="120" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="postComment" class="btn_1">发表评论</mt-button>
    <!-- 评论内容列表 -->
    <div class="cmt-list">
      <!-- 使用假数据 -->
      <div class="cmt-item" v-for="(item , i) in comments" :key="item.add_time">
        <div class="cmt-title">
          <span>第{{ i+1 }}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}</span>
        </div>
        <div class="cmt-body">
          <span>{{ item.content === 'undefined' ? '可用户很懒，什么都没留下' : item.content }}</span>
        </div>
      </div>

      <!-- 使用数据渲染得到的评论 -->
      <div class="cmt-item" v-for="(item , i) in mockmsg" :key="item.add_time">
        <div class="cmt-title">
          <span>第{{ i+1 }}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}</span>
        </div>
        <div class="cmt-body">
          <span>{{ item.content === 'undefined' ? '可用户很懒，什么都没留下' : item.content }}</span>
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  props: ["id"],
  data() {
    return {
      content: "", // 评论框输入的内容
      pageindex: 1, // 默认展示第一页数据
      comments: [], // 存放所有的评论
      mockmsg: [
        // 假数据
        { user_name: "张数", add_time: +new Date(), content: "哈哈哈哈哈" },
        { user_name: "李四", add_time: +new Date(), content: "呀呀呀呀" },
        { user_name: "周围", add_time: +new Date(), content: "啦啦啦啦" },
        { user_name: "来了", add_time: +new Date(), content: "啦啦啦啦" },
        { user_name: "哎哟", add_time: +new Date(), content: "啦啦啦啦" },
        { user_name: "物理", add_time: +new Date(), content: "啦啦啦啦" },
      ],
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    // 获取评论
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then((result) => {
          if (result.body.status === 0) {
            //  成功了
            //this.comments = result.body.message;
            // 获取新数据时，不要把老数据覆盖，用数组的拼接---获取更多评论
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败");
          }
        });
    },
    // 加载更多
    getMore() {
      // 点击获取下一页评论  即页码加1  再重新调用getComments方法 获取数据
      this.pageindex++;
      this.getComments();
    },
    // 发表评论
    postComment() {
      // 校验内容是否为空
      if (this.content.trim().length === 0) return Toast("评论内容不能为空！");
      // 评论内容添加到假数据中
      var cmt = {
        user_name: "匿名用户",
        add_time: Date.now(),
        content: this.content.trim(),
      };
      this.mockmsg.unshift(cmt);
      this.content = '';

      // 将评论提交到服务器  $router.params.id当前文章的id 通过url获取
      // this.content  提交的内容
      // { emulateJSON: true } 以普通表单形式提交
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.content.trim(),
        })
        .then((result) => {
          if (result.body.status === 0) {
            // 拼接一个对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.content.trim(),
            };
            this.comments.unshift(cmt);
            this.content = "";
          }
        });

        
    }
  }
};
</script>

<style lang="less" scoped>
.cmt-container {
  padding: 5px 0;
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .btn_1 {
    margin-bottom: 6px;
  }
  .cmt-list {
    .cmt-item {
      font-size: 12px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>