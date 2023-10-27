// 存放登录相关的接口请求
import request from '@/utils/request'
// 获取图像验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const getSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}
// 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
