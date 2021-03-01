import { ajax } from '../../utils/http'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

Page({
  data: {
    result: {
      accumulativeSign: '', //累计签收
      signing: '', // 待签收 ,
      todaySign: '', // 今日签收 ,
      transit: '', // 在途方量
    },
    labels: [
      { label: '今日签收', key: 'todaySign' },
      { label: '待签收', key: 'signing' },
      { label: '在途方量', key: 'transit' },
    ],
    list: [],
  },
  onLoad() {
    const { projectId } = wx.getStorageSync('user')
    ajax('/wxController/getTransOrderByProjectId', { projectId, startPage: 1, pageSize: 999 }).then(res => {
      console.log(res)
      this.setData({ list: res.list })
    })
    ajax('/wxController/signCount', { id: projectId }).then(res => {
      Object.keys(this.data.result).forEach(key => {
        this.setData({ [`result.${key}`]: res[key] })
      })
    })
  },
  jump() {
    wx.navigateTo({ url: '/pages/otherCar/otherCar' })
  },
  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.navigateTo({ url: `/${res.path}` })
      },
      fail() {
        Toast({ type: 'fail', context: this, message: '扫码失败' })
      }
    })
  },
})
