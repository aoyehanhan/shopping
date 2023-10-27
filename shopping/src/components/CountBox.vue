<template>
  <div class="count-box">
    <button class="reduce" @click="handleSub">-</button>
    <input @change="handleChange" :value="value" type="text" class="num" >
    <button class="add" @click="handleAdd">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
    width: 110px;
    display: flex;
    button{

        width: 30px;
        height: 30px;
        outline: none;
        border: none;
        text-align: center;
        flex: 1;
    }
    .num{
        margin: 0px 5px;
        width: 40px;
        height: 30px;
        flex: 1;
        text-align: center;
        border: none;
        background-color: #efefef;
    }
}
</style>
