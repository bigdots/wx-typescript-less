// import { promisifyAll } from 'miniprogram-api-promise'

import { promisifyAll } from 'miniprogram-api-promise'
const Wxp = <WechatMiniprogram.Wx>{}
promisifyAll(wx, Wxp)

export default Wxp
