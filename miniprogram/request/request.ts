// 封装微信小程序请求api

import { Toast } from '../framwork/modal'

export default function request(options: any) {
  console.debug('请求报文', options)
  const { isShowLoading = true } = options
  return new Promise((resolve, reject) => {
    if (isShowLoading) {
      Toast.loading('加载中...')
    }
    wx.request({
      ...options,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        Toast.info('请求错误')
        reject(err)
      },
      complete(res) {
        console.debug('响应报文', res)
        if (isShowLoading) {
          Toast.hideLoading()
        }
      },
    })
  })
}
