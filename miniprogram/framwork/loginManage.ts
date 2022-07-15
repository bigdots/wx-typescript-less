/**
 * 静默授权的单例类
 * 需要sesssionId直接调用SlientLoginManage.instance.getLoginInfo即可，它会进行登录操作，并且多次调用只执行一次
 */

import { Request } from '../request/index'
import Wxp from './wxp'

interface LoginInfo {
  invalidTime: string | number
  sessionId: string | number
}

export default class SlientLoginManage {
  static _instance: SlientLoginManage | null = null

  private _loginPromise: any = null

  static get instance() {
    if (!SlientLoginManage._instance) {
      SlientLoginManage._instance = new SlientLoginManage()
    }
    return SlientLoginManage._instance
  }

  /**
   * 获取用户登录信息，多次调用不会重复登录
   * @returns
   */
  getLoginInfo() {
    if (!this._loginPromise) {
      this._loginPromise = this._slientlogin()
    }
    return this._loginPromise
  }

  /**
   * 静默登录
   * 多次调用都会重新登录
   * @returns
   */
  login() {
    this._loginPromise = this._slientlogin()
    return this._loginPromise
  }

  /**
   * 静默登录接口
   * @returns sessionID outerNo invalidTime
   */
  private async _slientlogin(): Promise<LoginInfo> {
    const res = await Wxp.login()
    // 静默授权请求
    const res1: any = await Request.silentAuth(res.code)

    return res1
  }
}
