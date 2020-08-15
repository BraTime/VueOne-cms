<template>
    <div class="shopCarContainer">
        <!-- 商品列表项区域 -->
        <!-- 真数据 则将 mockgoods替换为goodslist-->
        <div class="goods-list" v-for="(item, i) in mockgoods" :key="item.id">
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <!-- mint-ui 中开关组件 -->
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id , $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">¥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 分析： 如何从购物车中获取商品的数量？ -->
                                <!-- 1、可先创建一个空对象 循环购物车中所有对象 ，将购物车的id作为属性 ，购物车的count的值作为属性值 ，这样可得到一个对象： {id值: count值} 如{34: 5 , 56: 2 , 32: 9 , ...}-->
                                <!-- 2、 -->
                                <a href="#" @click.prevent="remove(item.id , i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- 测试： 各商品id对应的数量 -->
        <!-- <div>{{$store.getters.getGoodsCount}}</div> -->

        <!-- 结算区域 -->
         <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品<span class="red"> 0 </span>件，总价 <span class="red">¥ 0 </span></p>
                    </div>
                <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>

        <!-- 测试： 购物车商品选中情况 对象 -->
        <!-- <p>{{$store.getters.getGoodsSelected}}</p> -->
    </div>
</template>

<script>

import numbox from '../subcomponents/shopcar_numbox.vue';
import {Toast} from "mint-ui"

export default {
    data() {
        return {
            // 存放 购物车所有商品的数据
            goodslist: [] ,
            // 存放假数据的商品信息
            mockgoods: []

        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        // 获取购物车页面 商品的数据
        getGoodsList() {
            // 获取到store中 所有商品的id  拼接成一个 以逗号分隔的字符串
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id) );
            // 购物车中没有商品
            if(idArr.length <= 0) {
                return ;
            }
            // 将缓存中的商品数据 给 假数据
            var arr = JSON.parse(localStorage.getItem('car'));
            arr.forEach(item => {
                item.title = "标题标题题标题题标题题标题"+item.id;
                item.thumb_path = "./src/images/"+(1+item.id)+".jpg";
                item.sell_price = item.price;
            })
            this.mockgoods = arr;
            //console.log(this.mockgoods)
            // 购物车中有商品 请求数据  api/goods/getshopcarlist/1,2,3
            this.$http.get('api/goods/getshopcarlist/'+ idArr.join(','))
            .then((result) => {
                if(result.body.status === 0) {
                    // 成功了
                    this.goodslist = result.body.message;
                }else {
                    Toast("获取商品信息失败！");
                }
            });
        },
        // 点击 删除商品 
        // 根据id删除store中商品信息 ， 根据index 删除组件中的goodslist中的对应的商品
        remove(id , index) {

            this.mockgoods.splice(index , 1); // 删除的假数据
            //this.goodslist.splice(index , 1); // 真数据
            // 将要删除的商品的id  传回给 store 在store中 删除该商品
            this.$store.commit("removeFormCar" , id)
        },
        // 商品选中状态 以{id: id , selected: val}传回给store
        selectedChanged(id , val) {
            // 每当点击开关 将最新的开关状态同步到store中
            //console.log(id+"-----"+val)
            this.$store.commit("updateGoodsSelected" , {id: id , selected: val})

        }
    },
    components: {
      numbox , // 挂载数字选择框
    }
    
}
</script>

<style lang="less" scoped>
    .shopCarContainer {
        background-color: #fff;
        overflow: hidden;
        .mui-card-content-inner {
            display: flex;
            align-items: center; //居中对齐弹性盒的各项
        }
        .goods-list {
            img {
                width: 60px;
                height: 60px;
            }
            h3 {
                font-size: 13px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price {
                    color: red;
                    font-weight: 600;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: 600;
            }
        }
    }
</style>