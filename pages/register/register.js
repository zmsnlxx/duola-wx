import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { telephoneReg } from '../../utils/util'
import { ajax } from '../../utils/http'

Page({
  data: {
    params: {
      name: '',
      password: '',
      phone: '',
      rePassword: '',
      remark: ''
    },
    form: [
      { label: '姓名', placeholder: '请输入您的真实姓名', key: 'name', type: 'text' },
      { label: '手机号', placeholder: '请输入您的手机号', key: 'phone', type: 'number' },
      { label: '密码', placeholder: '请输入您的密码', key: 'password', type: 'password' },
      { label: '重置密码', placeholder: '请重复输入您设置的密码', key: 'rePassword', type: 'password' },
      { label: '加入工程', placeholder: '请输入您需要加入的工程，以便审核', key: 'remark', type: 'text' },
    ]
  },
  changeValue (e) {
    const model = e.currentTarget.dataset.key
    this.setData({ [`params.${model}`]: e.detail })
  },
  register() {
    const { name, password, phone, rePassword, remark } = this.data.params
    const { openid } = wx.getStorageSync('loginData')
    if (!name) return Toast.fail('请输入您的真实姓名！')
    if (!phone) return Toast.fail('请输入您的手机号！')
    if (!password) return Toast.fail('请输入您的密码！')
    if (!rePassword) return Toast.fail('请重复输入您设置的密码！')
    if (!remark) return Toast.fail('请输入您需要加入的工程！')
    if (rePassword !== password) return Toast.fail('两次密码不一致！')
    if (!telephoneReg.test(phone)) return Toast.fail('手机号码格式错误')

    const params = Object.assign({}, this.data.params, { openid })
    console.log(params)

    ajax('/wxController/wxRegister', params, 'post').then(res => {
      console.log(res)
      Toast({
        type: 'success',
        context: this,
        message: '信息已提交！',
        onClose: () => {
          wx.navigateTo({ url: '/pages/login/login' })
        }
      });
    })
  }
})
