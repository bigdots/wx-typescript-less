// 环境配置
import dev from './dev'
import trial from './trial'
import release from './release'

const accountInfo = wx.getAccountInfoSync()
const { envVersion } = accountInfo.miniProgram
let config = {
  baseUrl: 'https://api.dev.com',
  tmplIds: [],
}
switch (envVersion) {
  case 'develop':
    config = dev
    break
  case 'trial':
    config = trial
    break
  case 'release':
    config = release
    break
  default:
    config = dev
    break
}

export default config
