<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入内容(不超过120字)" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <!-- 评论内容列表 -->
    <div class="cmt-list">
      <div class="cmt-item">
        <div class="cmt-title">
            <span>第一楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2020-08-08 08:08:08</span>
        </div>
        <div class="cmt-body">
            <span>努力终会有回报的</span>
        </div>
      </div>
      <div class="cmt-item">
        <div class="cmt-title">
            <span>第一楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2020-08-08 08:08:08</span>
        </div>
        <div class="cmt-body">
            <span>努力终会有回报的</span>
        </div>
      </div>
      <div class="cmt-item">
        <div class="cmt-title">
            <span>第一楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2020-08-08 08:08:08</span>
        </div>
        <div class="cmt-body">
            <span>努力终会有回报的</span>
        </div>
      </div>

    <!-- 使用数据渲染得到的评论 -->
      <div class="cmt-item" v-for="(item , i) in comments" :key="item.add_time">
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
export default {
    data() {
        return {
            pageindex: 1, // 默认展示第一页数据
            comments: [], // 存放所有的评论
        }
    },
    created() {
        this.getComments();
    },
    methods: {
        // 获取评论
        getComments() {
            this.$http.get("api/getcomments/"+this.id+"?pageindex=" + this.pageindex).then((result) => {
                if(result.body.status === 0) {
                    //  成功了
                    //this.comments = result.body.message;
                    // 获取新数据时，不要把老数据覆盖，用数组的拼接---获取更多评论
                    this.comments = this.comments.concat(result.body.message);
                }else {
                    Toast('获取评论失败')
                }
            });
        },
        // 加载更多
        getMore() { 
            // 点击获取下一页评论  即页码加1  再重新调用getComments方法 获取数据
            this.pageindex++;
            this.getComments();
        }
    },
    props: ['id']
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
    .cmt-list {
        .cmt-item {
            font-size: 12px;
            .cmt-title{ 

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