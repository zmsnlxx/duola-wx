import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { ajax } from '../../utils/http'

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad() {
  },
  onShow() {
    const token = wx.getStorageSync('token')
    if (!token) {
      Toast({ type: 'fail', context: this, message: '暂未登录，请登录后访问！', onClose: () => {
        wx.navigateTo({ url: '/pages/login/login' })
      }})
    }
  }
})
