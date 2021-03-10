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
      wx.connectSocket({
        url: `wss://api.xinhuajian.com//wxNewProjectSocket/${user.uId}`,
      })
      wx.onSocketOpen(function(res){
        console.log('WebSocket连接已打开！', res)
      })
      wx.onSocketError(function(res){
        console.log('WebSocket连接打开失败，请检查！')
      })
      wx.onSocketMessage(function(res) {
        const project = JSON.parse(res.data)
        console.log(project)
        wx.setStorageSync('user', Object.assign(user, project))
      })
    }
  },
})

