<template>
    <div class="goods-list">
        <!-- 假数据mockgoods  要真数据 更换为 goodslist -->

        <!-- 标签跳转 -->
        <!-- <router-link class="goods-item" v-for="item in mockgoods" :key="item.id" :to="'/home/goodsinfo/' + item.id " tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>  -->
        <!-- 编程式导航 -->
        <div class="goods-item" v-for="item in mockgoods" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div> 

       <!-- 加载更多 -->
       <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast} from "mint-ui"
export default {
    data() {
        return {
            pageindex: 1, //  分页：默认第一页的 商品
            goodslist: [], // 存放商品列表的 数组
            // 假数据
            mockgoods: [
                {id:1 , title: "小米(Mi) ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/8.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
                {id:2 , title: "华为 ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/9.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
                {id:3 , title: "oppo ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/13.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
                {id:4 , title: "vivo ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/14.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
                {id:5 , title: "小米 ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/10.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
                {id:6 , title: "小米 ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/15.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
                {id:7 , title: "小米 ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/16.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
                {id:8 , title: "小米 ", add_time: Date.now() , zhaiyao: "小米Note 32G双网通" , click: 0 , img_url: "./src/images/17.jpg" , sell_price: 2199 , market_price: 2499 , stock_quantity: 60},
            ]
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        // 获取商品列表
        getGoodsList() {
            this.$http.get("api/getgoods?pageindex=" + this.pageindex).then((result) => {
                if(result.body.status === 0) {
                    // 成功了
                    // 因为有加载更多 所以要 老数据(当前数据) + 新数据(新一页数据) 拼接
                    this.goodslist = this.goodslist + result.body.message;
                }else {
                    Toast("获取商品失败！")
                }
            });
        },
        // 加载更多
        getMore() {
            // 页数 +1 再去获取新一页的数据
            this.pageindex++;
            this.getGoodsList();
        },
        // 编程式导航 跳转页面
        goDetail(id) {
            //console.log(this)
            this.$router.push('/home/goodsinfo/' + id)
        }
    },
    
}
</script>

<style lang="less" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap; // 换行
        padding: 7px;
        justify-content: space-between;
        .goods-item {
            width: 49%;
            min-height: 226px;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding-top: 2px;
            display: flex;
            flex-direction: column; // 更改主轴方向为纵向
            justify-content: space-between;
            img {
                width: 100%;
            }
            .title {
                font-size: 14px;
                padding-left: 4px;
            }
            .info {
                background-color: #f5f5f5;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: 600;
                        font-size: 16px;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    font-size: 13px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

    }
</style>