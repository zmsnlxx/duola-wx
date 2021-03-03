import { ajax } from '../../utils/http'

Page({
  data: {
    openid: '',
  },
  jump() {
    wx.navigateTo({ url: '/pages/login/login' })
    // const that = this;
    // const { encryptedData, iv } = e.detail
    // wx.checkSession({
    //   success: function() {
    //     if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
    //       console.log('拒绝授权')
    //     } else {
    //       wx.setStorageSync('loginData', { encryptedData, iv, openid: that.data.openid })
    //
    //     }
    //   },
    //   fail: function() {
    //     console.log("session_key 已经失效，需要重新执行登录流程");
    //     that.wxlogin();
    //   }
    // });
  },
})
