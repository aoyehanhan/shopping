<template>
  <div class="login">
    <!-- 头部区域 -->
    <van-nav-bar
      title="用户登录"
      left-text=""
      left-arrow
      @click-left="breakBtn"/>
      <!-- 内容区域 -->
    <div class="login-context">
      <h1>手机号登陆</h1>
      <p>未注册的手机号登陆后将自动注册</p>
      <div class="from">
        <div class="from-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号" type="text">
        </div>
        <div class="from-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="aGetPicCode" alt="">
        </div>
        <div class="from-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{second===totalSecond?'获取验证码': second + '秒后重新发送'}}</button>
        </div>
      </div>
      <!-- 尾部区域 -->
      <div class="footer">
        <button class="login-btn" @click="login">登录</button>
      </div>
    </div>
  </div>

</template>

<script>
import { codeLogin, getPicCode, getSmsCode } from '@/api/login'
export default {
  name: 'loginIndex',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 传递请求验证码的唯一标识
      picUrl: '', // 图形验证码地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null,
      mobile: '',
      msgCode: '' // 短信验证码
    }
  },
  created () {
    this.aGetPicCode()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    breakBtn () {
      this.$router.back()
    },
    // 获取验证码倒计时
    async getCode () {
      if (!this.valiFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        const res = await getSmsCode(this.picCode, this.picKey, this.mobile)
        console.log(res)
        this.$toast('短信发送成功')
        // 开始倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 校验手机号是否合法
    valiFn () {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取图形验证码
    async aGetPicCode () {
      const res = await getPicCode()
      this.picUrl = res.data.base64
      this.picKey = res.data.key
    },
    // 登录
    async login () {
      if (!this.valiFn()) {
        return
      }
      if (!/^\w{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$toast('登录成功')
      // 判断是否有会跳地址
      const url = this.$route.query.backUrl || '/home'
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
.login-context {
  margin: 40px auto 0px;
  width: 320px;
}
p{
  margin-top: 10px;
  color: #ccc;
}
.from{
  margin-top: 40px;
}
.from-item{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
}
.inp{
  float: left;
  width: 200px;
  height: 100%;
  border: none;
}
img{
  float: right;
  margin: 5px 0;
  width: 90px;
  height: 50px;
  vertical-align: middle;
}
.from-item button{
  float: right;
  margin: 20px 0;
  border: none;
  color: orange;
  background: none;
}
.footer{
  margin-top: 40px;
}
.login-btn{
  width: 100%;
  height: 50px;
  font-size: 18px;
  border: none;
    border-radius: 20px;
  background: orange;
  color: #fff;
}
</style>
