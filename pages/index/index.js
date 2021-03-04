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
    params: {
      startPage: 1,
      pageSize: 10,
      projectId: ''
    },
    total: 0
  },
  onShow() {
    const { projectId } = wx.getStorageSync('user')
    this.setData({ 'params.projectId': projectId })
    this.getList()

    ajax('/wxController/signCount', { id: projectId }).then(res => {
      Object.keys(this.data.result).forEach(key => {
        this.setData({ [`result.${key}`]: res[key] })
      })
    })
  },
  getList() {
    ajax('/wxController/getTransOrderByProjectId', this.data.params).then(res => {
      this.setData({ list: res.list, total: res.total })
    })
  },
  jump() {
    wx.navigateTo({ url: '/pages/otherCar/otherCar' })
  },
  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        wx.navigateTo({ url: res.path })
      },
      fail() {
        Toast({ type: 'fail', context: this, message: '扫码失败' })
      }
    })
  },

  onReachBottom() {
    const { pageSize, startPage } = this.data.params
    if (pageSize * startPage > this.data.total) return
    this.setData({ 'params.startPage': startPage + 1 })
    this.getList()
  },
  onHide() {
    this.setData({ list: [], 'params.startPage': 1 })
  },
  onPullDownRefresh() {
    this.setData({ list: [], 'params.startPage': 1 })
    this.getList()
    wx.stopPullDownRefresh()
  },
})
