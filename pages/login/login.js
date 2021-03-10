import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { ajax } from '../../utils/http'
import { telephoneReg } from '../../utils/util'

Page({
  data: {
    params: {
      userName: '',
      password: ''
    }
  },
  onChange(e) {
    const model = e.currentTarget.dataset.name
    this.setData({ [`params.${model}`]: e.detail })
  },
  login() {
    if (!this.data.params.userName) return Toast.fail('请输入手机号！')
    if (!telephoneReg.test(this.data.params.userName)) return Toast.fail('手机号码格式错误')
    if (!this.data.params.password) return Toast.fail('请输入密码！')
    ajax('/wxController/login', this.data.params, 'post').then(res => {
      console.log(res)
      wx.setStorageSync('token', res.token);
      wx.setStorageSync('user', res);
      wx.switchTab({ url: '/pages/index/index' })
    })
  },
  goRegister() {
    wx.navigateTo({ url: '/pages/register/register' })
  }
})
