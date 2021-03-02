import { ajax } from './utils/http'

App({
  onShow() {
    const user = wx.getStorageSync('user')
    ajax('/wxController/getProjectByUserId', { userId: user.uId }).then(res => {
      wx.setStorageSync('user', Object.assign(user, res))
    })
  }
})
