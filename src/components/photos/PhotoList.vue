<template>
    <div class="">
        <!-- 顶部滑动条区域 -->
        <div class="mui-silder">
            <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!-- 假数据渲染 -->
                    <!-- :class 样式绑定 item.id===0 才有 .mui-active类-->
                     <a :class="['mui-control-item',item.id===0 ? 'mui-active' : '']" v-for="item in mockmsgs" :key="item.id" @tap="getPhotoListCateId(item.id)">{{item.title}}</a>
                    <!-- 真数据渲染 -->
                     <a :class="['mui-control-item' , item.id===0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListCateId(item.id)">{{item.title}}</a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <!-- 假数据 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+ item.id" tag="li" v-for="item in mocklist" :key="item.id">
                <img v-lazy="item.img_url" alt="">
                <!-- 文字 -->
                <div class="info">
                    <h2 class="info-title" :title="item.title">{{item.title}}</h2>
                    <p class="info-body" :zhaiyao="item.zhaiyao">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>

        <!-- 真数据 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+ item.id" tag="li" v-for="item in list" :key="item.id">
                <img v-lazy="item.img_url" alt="">
                <!-- 文字 -->
                <div class="info">
                    <h2 class="info-title">{{item.title}}</h2>
                    <p class="info-body">{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </ul>
     
       

    </div>
</template>

<script>

import { Toast } from "mint-ui";
// 导入 mui.js文件
import mui from "../../lib/mui/js/mui.js";


export default {
    data() {
        return {
            // 假数据  --分类
            mockmsgs: [
                { title: "热门推荐" , id: 1},
                { title: "摄影学习" , id: 2},
                { title: "摄影器材" , id: 3},
                { title: "明星写真" , id: 4},
                { title: "科技生活" , id: 5},
            ],
            // 假数据 -- 图片地址
            mocklist: [
                {id: 1 , title: "图片" , img_url: './src/images/1.jpg' , zhaiyao: "美美美美图"},
                {id: 2 , title: "图片" , img_url: './src/images/2.jpg' , zhaiyao: "美美美美图"},
                {id: 3 , title: "图片" , img_url: './src/images/3.jpg' , zhaiyao: "美美美美图"},
                {id: 4 , title: "图片" , img_url: './src/images/4.jpg' , zhaiyao: "美美美美图"},
                {id: 5 , title: "图片" , img_url: './src/images/5.jpg' , zhaiyao: "美美美美图"},
                {id: 6 , title: "图片" , img_url: './src/images/6.jpg' , zhaiyao: "美美美美图"},
                {id: 7 , title: "图片" , img_url: './src/images/7.jpg' , zhaiyao: "美美美美图"},
            ],
            cates: [], // 存放 所有图片分类  真数据
            list: [] // 存放 所有图片列表(图片地址)  真数据
        };
    },
    created() {
        this.getAllCategory();
        this.getPhotoListCateId(0); // 默认进入页面  主动请求所有页面
    },
    mounted() { // 此时页面已被初始化好且已放在页面中了
    // 若要操作元素，最好在 mounted()中 ，因为此时元素已经初始化好了
        // 初始化 scroll控件
        mui('.mui-scroll-wrapper').scroll({
        	scrollY: true, //是否竖向滚动
        	scrollX: true, //是否横向滚动
        	bounce: false //是否启用回弹
        });
    },
    methods: {
         // 获取所有图片分类
        getAllCategory() {
            // 假数据
            this.mockmsgs.unshift({ title: "全部" , id: 0});
            // 请求真数据
            this.$http.get('api/getimages/:cateid').then((result) => {
                if(result.body.status === 0) {
                    // 成功
                    result.body.message.unshift({ title: "全部" , id: 0});
                    this.cates = result.body.message;
                }else {
                    Toast('获取所有图片失败！')
                }
            });
        },
        // 获取图片列表 (图片地址)
        getPhotoListCateId(cateId) {
            // 根据 分类id即cateId  获取对应图片列表
            this.$http.get('api/getimages/' + cateId).then((result) => {
                if(result.body.status === 0) {
                    // 成功
                    this.list = result.body.message;
                }else {
                    Toast('获取所有图片失败！')
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
    * {
        touch-action: pan-y;
    }
    .photo-list {
        list-style: none;
        padding: 10px 10px 0 10px;
        margin: 0;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px rgb(199, 199, 199);
            position: relative;
            img {
                width: 100%;
                vertical-align: middle; // 去掉图片3px
            }
            // 懒加载图片的样式
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                width: 100%;
                max-height: 84px;
                color: #fff;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,.4);
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    color: #fff;
                    font-size: 14px;
                }
            }
        }
    }
    
</style>