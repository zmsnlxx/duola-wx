import { ajax } from '../../utils/http'
import { examineStatus } from '../../utils/constant'

Page({
  data: {
    list: [],
    examineStatus
  },
  onLoad: function () {
    const { uId, projectId } = wx.getStorageSync('user');
    console.log(projectId)
    ajax('/wxController/onlineOrderList', { startPage: 1, pageSize: 10, userId: uId, type: 0, projectId }).then(res => {
      console.log(res)
      this.setData({ list: res.list })
    })
  },
  goDetail (e) {
    wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${e.currentTarget.dataset.id}` })
  }
})
