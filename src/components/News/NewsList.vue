<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<router-link to="/home/newsinfo/12">
						<img class="mui-media-object mui-pull-left" src="../../images/menu1.png">
						<div class="mui-media-body">
							<h2>幸福</h2>
							<p class="mui-ellipsis">
                                <span>发布时间：2020-08-08 08:08:08</span>
                                <span>点击：0次</span>
                            </p>
						</div>
					</router-link>
				</li>
                <!-- v-for 渲染数据 -->
                <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/'+ item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h2>{{ item.title }}</h2>
							<p class="mui-ellipsis">
                                <!-- item.time | dateFormat 过滤了时间格式 -->
                                <span>发布时间：{{item.time | dateFormat}}</span>
                                <span>点击：{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
    data() {
        return {
            newslist: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList() {
            this.$http.get('api/getnewslist').then((result) => {
                if(result.body.status === 0) {
                    // 成功了
                    this.newslist = result.body.message;
                }else {
                    Toast('获取新闻列表失败')
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
    .mui-table-view {
        li {
            h2 {
                font-size: 14px;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>