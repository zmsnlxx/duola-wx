import { ajax } from '../../utils/http'

Page({
  data: {
    openid: '',
  },
  onShow() {
    const token = wx.getStorageSync('token')
    if (token) {
      wx.switchTab({ url: '/pages/index/index' })
    } else {
      this.wxlogin()
    }
  },
  wxlogin(){
    const that = this
    wx.login({
      success: res => {
        ajax('/wxController/checkLogin', { jsCode: res.code }).then(res => {
          that.setData({ openid: res.openid });
        })
      }
    })
  },
  getPhoneNumber(e) {
    const that = this;
    const { encryptedData, iv } = e.detail
    wx.checkSession({
      success: function() {
        if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
          console.log('拒绝授权')
        } else {
          wx.setStorageSync('loginData', { encryptedData, iv, openid: that.data.openid })
          wx.navigateTo({ url: '/pages/login/login' })
        }
      },
      fail: function() {
        console.log("session_key 已经失效，需要重新执行登录流程");
        that.wxlogin();
      }
    });
  },
})
