// 行内接口

import request from './request'
import envConfig from '../config/index'
import { common } from './commonField'

const { baseUrl } = envConfig

// 1、静默授权 OVUS0001
function silentAuth(data: any) {
  return request({
    url: baseUrl + '/user/silentAuth',
    method: 'POST',
    data: { ...common, ...data },
  })
}

export default {
  silentAuth,
}
