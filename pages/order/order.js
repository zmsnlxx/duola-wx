import { ajax } from '../../utils/http'
import { examineStatus } from '../../utils/constant'

Page({
  data: {
    list: [],
    examineStatus
  },
  onLoad: function () {
    const { uId } = wx.getStorageSync('user');
    ajax('/wxController/onlineOrderList', { startPage: 1, pageSize: 999, userId: uId, type: 0 }).then(res => {
      console.log(res)
      this.setData({ list: res.list })
    })
  },
  goDetail (e) {
    wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${e.currentTarget.dataset.id}` })
  }
})
