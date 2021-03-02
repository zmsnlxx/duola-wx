import { ajax } from '../../utils/http'
import { examineStatus } from '../../utils/constant'

Page({
  data: {
    list: [],
    examineStatus,
    params: {
      projectId: '',
      uId: '',
      type: 0,
      pageSize: 10,
      startPage: 1,
    },
    total: 0,
  },
  onLoad: function () {
    const { uId, projectId } = wx.getStorageSync('user');
    this.setData({ 'params.uId': uId, 'params.projectId': projectId })
  },
  onShow() {
    this.getList()
  },
  getList() {
    ajax('/wxController/onlineOrderList', this.data.params).then(res => {
      this.setData({ list: this.data.list.concat(res.list), total: res.total })
    })
  },
  onReachBottom() {
    const { pageSize, startPage } = this.data.params
    if (pageSize * startPage > this.data.total) return
    this.setData({ 'params.startPage': startPage + 1 })
    this.getList()
  },
  goDetail (e) {
    wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${e.currentTarget.dataset.id}` })
  }
})
