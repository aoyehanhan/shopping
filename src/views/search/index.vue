<template>
    <div class="search">
      <!-- 头部 -->
    <van-nav-bar
    title="商城搜索"
    left-arrow
    @click-left="$router.go(-1)"
  />
  <!-- 搜索 -->
  <van-search
    v-model="search"
    show-action
    placeholder="请输入搜索商品">
    <template #action>
      <div @click="goSearch(search)">搜索</div>
    </template>
  </van-search>
  <!-- 搜索历史标题 -->
  <div class="content" v-if="history.length > 0">
    <div class="title">
      <span>最近搜索</span>
      <van-icon  name="delete-o" size="16" @click="clear" />
    </div>
  </div>
  <!-- 历史记录 -->
  <div class="list">
    <div v-for="item in history" :key="item" @click="goSearch(item)">{{ item }}</div>

  </div>
    </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'searchIndex',
  data () {
    return {
      search: '',
      history: getHistoryList()
    }
  },
  methods: {
    goSearch (key) {
      const index = this.history.indexOf(key)
      if (index !== -1) {
        // 存在相同的项，将原有关键字移除
        // splice(从哪开始, 删除几个, 项1, 项2)
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      setHistoryList(this.history)
      // 跳转到搜索列表页
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action{
  color: #fff;
  background-color: #ff3404;
   padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
}
.content{
  margin-top: 20px;
  color: #ccc;
  overflow:auto;
  span{
    float: left;
    margin-left: 10px;
  }
  .van-icon{
    float: right;
    margin: 5px 10px;
  }
}
.list{
      display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
    div{
      width: 30%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: black;
      border: 1px solid #ccc;
      border-radius: 20px;
      margin-top: 10px;
      overflow: hidden;
    }
}

</style>
