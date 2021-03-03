import { ajax } from './utils/http'

App({
  onShow() {
    wx.login({
      success: res => {
        ajax('/wxController/checkLogin', { jsCode: res.code }).then(res => {
          wx.setStorageSync('openid', res.openid)
        })
      }
    })

    const token = wx.getStorageSync('token')
    if (token) {
      const user = wx.getStorageSync('user')
      wx.switchTab({ url: '/pages/index/index' })
      ajax('/wxController/getProjectByUserId', { userId: user.uId }).then(res => {
        wx.setStorageSync('user', Object.assign(user, res))
      })
    }
  },
})

