import { ajax } from '../../utils/http'

Page({
  data: {
    openid: '',
  },
  jump() {
    const token = wx.getStorageSync('token')
    if (token) {
      wx.switchTab({ url: '/pages/index/index' })
    } else {
      wx.navigateTo({ url: '/pages/login/login' })
    }
  },
})
