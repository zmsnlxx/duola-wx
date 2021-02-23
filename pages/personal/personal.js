Page({
  data: {
    labels: [
      { label: '切换工程', path: '/pages/changeProject/changeProject', value: '' },
      { label: '我的订单', path: '/pages/order/order', value: '' },
      { label: '我的反馈', path: '/pages/feedback/feedback', value: '' },
      { label: '联系我们', path: '/pages/concatUs/concatUs', value: '' },
    ]
  },
  onShow() {
    const { projectName } = wx.getStorageSync('user')
    const labels = this.data.labels
    labels.forEach((item, index) => {
      if (index === 0) {
        item.value = projectName
      }
    })
    this.setData({ labels })
  },
  jump(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.path })
  },
  logout() {
    wx.clearStorage()
    wx.navigateTo({ url: `/pages/login/login` })
  }
})
