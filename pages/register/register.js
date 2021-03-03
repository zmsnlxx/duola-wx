import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { telephoneReg } from '../../utils/util'
import { ajax } from '../../utils/http'

Page({
  data: {
    params: { name: '', password: '', phone: '', rePassword: '', remark: '', openid: '' },
    form: [
      { label: '姓名', placeholder: '请输入您的真实姓名', key: 'name', type: 'text' },
      { label: '手机号', placeholder: '请输入您的手机号', key: 'phone', type: 'number' },
      { label: '密码', placeholder: '请输入您的密码', key: 'password', type: 'password' },
      { label: '重置密码', placeholder: '请重复输入您设置的密码', key: 'rePassword', type: 'password' },
      { label: '加入工程', placeholder: '请输入您需要加入的工程，以便审核', key: 'remark', type: 'text' },
    ]
  },
  onShow() {
    const openid = wx.getStorageSync('openid')
    this.setData({ 'params.openid': openid })
  },
  changeValue (e) {
    const model = e.currentTarget.dataset.key
    this.setData({ [`params.${model}`]: e.detail })
  },
  register() {
    const { name, password, phone, rePassword, remark } = this.data.params
    if (!name) return Toast.fail('请输入您的真实姓名！')
    if (!phone) return Toast.fail('请输入您的手机号！')
    if (!password) return Toast.fail('请输入您的密码！')
    if (!rePassword) return Toast.fail('请重复输入您设置的密码！')
    if (!remark) return Toast.fail('请输入您需要加入的工程！')
    if (rePassword !== password) return Toast.fail('两次密码不一致！')
    if (!telephoneReg.test(phone)) return Toast.fail('手机号码格式错误')

    ajax('/wxController/wxRegister', this.data.params, 'post').then(() => {
      Toast({
        type: 'success',
        context: this,
        message: '您的账户目前已提交审核！',
        onClose: () => {
          wx.navigateTo({ url: '/pages/login/login' })
        }
      });
    })
  }
})
