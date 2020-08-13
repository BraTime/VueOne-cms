<template>
    <div class="photoinfo-container">
        <!-- 真数据 photoinfo  假数据 mackinfo -->
        <h3 class="title">{{mackinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{mackinfo.add_time | dateFormat}}</span>
            <span>点击次数：{{mackinfo.click }} 次</span>
        </p>
         
        <hr>

        <!-- 缩略图区域 macklist假数据  list真数据-->
        <div class="thumbs">
            <vue-preview :slides="macklist" @close="handleClose"></vue-preview>
        </div>

         <!-- 图片内容区域 -->
         <div class="content" v-html="mackinfo.content"></div>

         <!-- 放置一个评论子组件 -->
         <cmt-box :id="id"></cmt-box>
        
    </div>
</template>

<script>
import { Toast } from "mint-ui"
// 导入评论子组件
import comment from "../subcomponents/comment.vue"

export default {
    data() {
        return {
            // 一进入页面 得到url栏里的id 即图片id
            id: this.$route.params.id,
            photoinfo: { },  // 存放图片详情数据
            list: [],  // 缩略图的数组
            // 假数据
             // 图片详情的假数据
            mackinfo:  {
                id: this.$route.params.id, 
                title: "图片" + this.$route.params.id,
                click: 0 , 
                content:  `"美美美忽高忽低施工方华东师范格但斯克多个函数妇箪食股份的闪光点发货的三个<img src='./src/images/${this.$route.params.id}.jpg' width="100%">美环境哈哈翻江倒海丰厚的噶好回归号法国红酒关房图"`,
                add_time: Date.now() 
            },
            // 图片详情页中 缩略图--假数据
            macklist: [ 
                {
                     src: './src/images/1.jpg',
                     msrc: './src/images/1m.jpg',
                     alt: 'picture1',
                     title: 'Image Caption 1',
                     w: 600,
                     h: 400
                },
                {
                      src: './src/images/2.jpg',
                      msrc: './src/images/2m.jpg',
                      alt: 'picture2',
                      title: 'Image Caption 2',
                      w: 600,
                      h: 400
                },
                {
                      src: './src/images/3.jpg',
                      msrc: './src/images/3m.jpg',
                      alt: 'picture3',
                      title: 'Image Caption 32',
                      w: 600,
                      h: 400
                },

            ]
        }
    },
    
    created() {
        //console.log(this.id)
         this.getPhotoInfo();
         this.getThumbs();
    },
    methods: {
        // 获取图片详情
        getPhotoInfo() {
            this.$http.get("api/getimageInfo/"+this.id).then((result) => {
                if(result.body.status === 0) {
                    // 成功
                    this.photoinfo = result.body.message[0];
                }else {
                    Toast("获取图片详情失败");
                }
            });
        },
        // 获取 缩略图
        getThumbs() {
            this.$http.get("api/getthumimages/"+this.id).then((result) => {
                if(result.body.status === 0) {
                    // 循环每个图片数据  增加 宽 高 属性
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                    });
                    // 将补全的数据 给list
                    this.list = result.body.message;
                }
            });
        },
        handleClose () {
            console.log('close event')
        },
    },
    components: {
        // 注册 评论子组件
        "cmt-box": comment,
    }
    
}
</script>

<style lang="less" scoped>
    .photoinfo-container {
        padding: 3px;
        h3 {
            font-size: 15px;
            color: #26a2ff;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content {
            font-size: 13px;
            line-height: 13px;
        }
        /*图片预览 缩略图 样式*/
        .thumbs {
          /deep/ .my-gallery {
            display: flex;
            flex-wrap: wrap;
            figure {
              width: 50%;
              padding: 5px;
              margin: 0;
              box-sizing: border-box;
              img {
                width: 100%;
              }
            }
          }
        }
    }
</style>