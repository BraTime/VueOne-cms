<template>
    <div class="goodscomment-container">
        <cmtbox :id="id"></cmtbox>
    </div>
</template>

<script>

import {Toast} from 'mint-ui';
// 导入评论组件
import cmtbox from "../subcomponents/comment.vue";

export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components: {
        cmtbox: cmtbox
    }
}
</script>

<style lang="less" scoped>
    .goodscomment-container {
        padding: 0 4px;
    }
</style>