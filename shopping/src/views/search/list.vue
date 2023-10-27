<template>
    <div class="searchList">
      <!-- 头部 -->
      <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 搜索 -->
    <van-search
    :value="querySearch || '搜索商品'"
      show-action
      placeholder="请输入搜索商品">
      <template #action>
        <van-icon name="apps-o" />
      </template>
    </van-search>
    <!-- 导航 -->
    <ul class="nav">
      <li>综合</li>
      <li>销量</li>
      <li>价格</li>
    </ul>
    <!-- 商品列表 -->
    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
    </div>
</template>

<script>
import { getProList } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'searchList',
  data () {
    return {
      page: 1,
      proList: []
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
  }

}
</script>

<style lang="less" scoped>
ul{
  margin-top: 10px;
  display: flex;
  height: 36px;
  line-height: 36px;
  li{
    display: inline-block;
    text-align: center;
    flex: 1;
  }
}
.goods-list {
  background-color: #f6f6f6;
}
</style>
