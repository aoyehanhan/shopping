// 存放主页相关的接口请求
import request from '@/utils/request'

export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
