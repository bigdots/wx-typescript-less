// 微信需要用户授权api封装
import envConfig from '../config/index'
import { Toast } from './modal'
import Wxp from './wxp'

/**
 * 授权微信允许推送订阅消息
 * @returns Promise success 订阅成功； fail 订阅失败  cancel 取消
 */
function requestSubscribeMessage() {
  return new Promise((resolve, reject) => {
    const tmplIds = envConfig.tmplIds
    wx.requestSubscribeMessage({
      tmplIds,
      success(res) {
        console.error(Math.random())
        let _status = false
        tmplIds.map((item) => {
          if (res[item] == 'accept') {
            resolve('success')
            _status = true
          }
        })
        if (!_status) {
          // 取消了订阅
          reject('cancel')
        }
      },
      fail() {
        reject('fail')
      },
    })
  })
}

/**
 *  授权获取用户信息
 */
async function getUserProfile() {
  try {
    const res = await wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
    })
    return res
  } catch (e) {
    // 拒绝
    return false
  }
}

// 弹框获取微信用户信息
const setUserInfo = async () => {
  const userInfo = wx.getStorageSync('userInfo')
  if (userInfo) {
    return Promise.resolve(true)
  }
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '温馨提示',
      content: '亲，授权用户信息后才能正常使用小程序功能',
      success(res) {
        console.log('suc', res.confirm)
        if (!res.confirm) {
          // 取消
          reject('cancel')
          return
        }

        resolve(getUserProfile())
      },
      fail() {
        reject('fail')
      },
    })
  })
}

/**
 * 授权微信小程序定位、照相机等功能
 *
 * */
async function scopeAuth(scope: string) {
  const res: any = await wx.getSetting()

  if (!res.authSetting[`scope.${scope}`]) {
    return Wxp.authorize({
      scope: `scope.${scope}`,
    })
  }

  return false
}

/**
 * 下载网络图片功能,调用前请先调用WxAuth.scopeAuth('writePhotosAlbum')
 * @param url  网络图片地址
 */
async function downloadToPhotosAlbum(url: string) {
  const res: any = await Wxp.downloadFile({
    url,
  })
  return wx.saveImageToPhotosAlbum({
    filePath: res.tempFilePath,
  })
}

/**
 * 下载网络图片功能-二进制流,调用前请先调用WxAuth.scopeAuth('writePhotosAlbum')
 * @param url  网络图片地址
 */
async function downloadToBufferPhotosAlbum(url: string) {
  Toast.loading()
  const res: any = await Wxp.downloadFile({
    url,
    filePath: `${wx.env.USER_DATA_PATH}/image${Date.now()}.jpg`,
  })

  return wx
    .saveImageToPhotosAlbum({
      filePath: res.filePath,
    })
    .finally(() => {
      const fs = wx.getFileSystemManager()
      // 保存成功后删除该本地文件
      try {
        fs.unlink({
          filePath: res.filePath,
          complete: (res1) => {
            console.debug(res1)
          },
        })
      } catch (e) {
        console.error(e)
      }

      Toast.hideLoading()
    })
}

export const WxAuth = {
  requestSubscribeMessage,
  getUserProfile,
  setUserInfo,
  scopeAuth,
  downloadToPhotosAlbum,
  downloadToBufferPhotosAlbum,
}
