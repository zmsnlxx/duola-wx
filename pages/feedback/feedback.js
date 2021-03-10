import { ajax } from '../../utils/http'
import { feedbackStatus } from '../../utils/constant'

Page({
  data: {
    list: [],
    params: {
      userId: '',
      pageSize: 10,
      startPage: 1,
    },
    total: 0,
    feedbackStatus,
  },
  onLoad: function () {
    const { uId } = wx.getStorageSync('user');
    this.setData({ 'params.userId': uId })
  },
  getList() {
    ajax('/wxController/feedbackList', this.data.params).then(res => {
      this.setData({ list: this.data.list.concat(res.list), total: res.total })
    })
  },
  onShow() {
    this.setData({ list: [], 'params.startPage': 1 })

    this.getList()
  },
  goDetail (e) {
    wx.navigateTo({ url: `/pages/feedbackDetail/feedbackDetail?id=${e.currentTarget.dataset.id}` })
  },
  onReachBottom() {
    const { pageSize, startPage } = this.data.params
    if (pageSize * startPage > this.data.total) return
    this.setData({ 'params.startPage': startPage + 1 })
    this.getList()
  },
  onPullDownRefresh() {
    this.setData({ list: [], 'params.startPage': 1 })
    this.getList()
    wx.stopPullDownRefresh()
  },
})
