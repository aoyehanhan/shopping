<template>
  <div class="home">
    <!-- 头部标题 -->
    <div class="header">商城</div>
    <!-- 搜索 -->
    <van-search v-model="search" placeholder="请输入搜索感兴趣的商品" @click="$router.push('/search')" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
      <img :src='item.imgUrl' alt="">
    </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <van-grid :column-num="5">
    <van-grid-item v-for="item in navList" :key="item.imgUrl" :icon="item.imgUrl" :text="item.text" />
    </van-grid>
    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess">
        <p class="guess-title">—— 猜你喜欢 ——</p>
        <div class="goods-list">
          <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
        </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'homeIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      search: '',
      bannerList: [], // 轮播
      navList: [], // 导航
      proList: []// 商品
    }
  },
  async created () {
    const res = await getHomeData()
    const bannerList = res.data.pageData.items[1].data
    this.bannerList = bannerList
    const navList = res.data.pageData.items[3].data
    this.navList = navList
    const proList = res.data.pageData.items[6].data
    this.proList = proList
  }
}
</script>

<style lang="less" scoped>
.header{
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: skyblue;
  text-align: center;
  color: #fff;
}
.van-search__content {
  border-radius: 10px;
}
.my-swipe .van-swipe-item {
    img{
      width: 100%;
      height: 200px;
    }
}
.main img {
  display: block;
  width: 100%;
}
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
