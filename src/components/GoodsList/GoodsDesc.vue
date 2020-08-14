<template>
    <div class="goodsdesc-container">
        <h1 class="title">{{mockinfo.title}}</h1>
        <hr>
        <!-- mockinfo 为假数据  info为真数据 -->
        <div class="content" v-html="mockinfo.content"></div>
    </div>
</template>

<script>

import {Toast} from 'mint-ui';

export default {
    data() {
        return {
            // 存放 图文数据
            info: { },
            // 假数据
            mockinfo:  {
                title: "小米手机标题" + this.$route.params.id,
                content: "<p>美美美忽高忽低施工方华东师兑换顾地科技返回该海丰厚的噶好回归号胡椒粉哈健康黄金卡分行范格但美环境哈哈翻江倒的骄傲和房间卡搭嘎动感较大方法会对规范合格砥砺奋进更换积分兑换顾地科技返回该海丰厚的噶好回归号法国红酒关房图斯克兑换顾地科技返回该海丰厚的噶好回归号多个函数妇箪食股份的闪光点发货的三个</p><img src='./src/images/13.jpg'><p>美环境哈哈翻江倒的骄傲和房间卡搭嘎动感较大方法会对规范合格砥砺奋进更换积分兑换顾地科技返回该海丰厚的噶好回归号法国红酒关房图</p><img src='./src/images/15.jpg'><p>椒粉哈健康黄金卡分行范格但美环境哈哈翻江倒的骄傲和房间卡搭嘎动感较大方法会对规范合格砥砺奋进更换积分兑换顾地科技返回该海丰厚的噶好回归号法国红酒关房图斯克兑换顾地科技返回该海丰厚的噶</p>",
            },
        }
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        // 获取图片信息 数据
        getGoodsDesc() {
            this.$http.get("api/goods/getdesc/" + this.$route.params.id).then((result) => {
                if(result.body.status === 0) {
                    // 成功
                    this.info = result.body.message[0];
                }else {
                    Toast("获取图文信息失败！")
                }
            });
        }
    },
    
}
</script>

<style lang="less" scoped>
    .goodsdesc-container {
        padding: 0 4px;
        .title {
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: #3081dd;
        }
        .content {
           /deep/  p {
                text-indent: 2em;
                color: #555;
                line-height: 28px;
                letter-spacing: .2em;
                
            }
           /deep/ img {
                width: 100%;
            }
        }
    }
</style>