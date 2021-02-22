Page({
  data: {
    labels: [
      { label: '切换工程', path: '/pages/changeProject/changeProject', value: wx.getStorageSync('user').projectName },
      { label: '我的订单', path: '/pages/order/order', value: '' },
      { label: '我的反馈', path: '/pages/feedback/feedback', value: '' },
      { label: '联系我们', path: '/pages/concatUs/concatUs', value: '' },
    ]
  },
  jump(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.path })
  }
})
