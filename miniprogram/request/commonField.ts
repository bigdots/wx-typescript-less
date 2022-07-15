// 配置行内请求公共报文

import Wxp from '../framwork/wxp'

interface Common {
  benchMarkLevel: string | number
  theme: string
  deviceOrientation: string
  brand: string
  model: string
  pixelRatio: number
  screenWidth: number
  screenHeight: number
  windowWidth: string | number
  windowHeight: string | number
  statusBarHeight: string | number
  language: string
  system: string
  fontSizeSetting: string | number
  sdkVersion: string
  platform: string
  resolution: string
  networkType: string
  location: string
  ipAddress: string
  macAddress: string
  version: string
}

export let common = <Common>{}
const {
  platform = '',
  system = '',
  model = '',
  // devicePixelRatio = 0,
  screenWidth = 0,
  screenHeight = 0,
  benchmarkLevel = '',
  theme = '',
  deviceOrientation = '',
  brand = '',
  pixelRatio = 0,
  windowWidth = '',
  windowHeight = '',
  statusBarHeight = '',
  language = '',
  fontSizeSetting = '',
  SDKVersion = '',
  version = '',
} = wx.getSystemInfoSync()

common.platform = platform
common.resolution = `${screenWidth * pixelRatio}*${screenHeight * pixelRatio}`
common.screenWidth = screenWidth
common.screenHeight = screenHeight
common.benchMarkLevel = benchmarkLevel
common.theme = theme
common.deviceOrientation = deviceOrientation
common.brand = brand
common.model = model
common.pixelRatio = pixelRatio
common.windowWidth = windowWidth
common.windowHeight = windowHeight
common.statusBarHeight = statusBarHeight
common.language = language
common.system = system
common.fontSizeSetting = fontSizeSetting
common.sdkVersion = SDKVersion
common.version = version

export const getCommonField = async () => {
  /**
   * 获取网络类型
   */
  let res: any = await Wxp.getNetworkType({})
  // console.log(res);
  common.networkType = res.networkType
  /**
   * 获取位置,暂时先不获取，写一个假的
   */

  const res2 = await Wxp.getLocation({ type: 'wgs84' })
  const { longitude, latitude } = res2
  common.location = `${longitude},${latitude}`

  return common
}
