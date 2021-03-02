Page({
  data: {
    labels: [
      { label: '切换工程', path: '/pages/changeProject/changeProject', value: '' },
      { label: '我的订单', path: '/pages/order/order', value: '' },
      { label: '我的反馈', path: '/pages/feedback/feedback', value: '' },
      { label: '联系我们', path: '', value: '' },
    ],
    show: false,
    user: {}
  },
  onShow() {
    const user = wx.getStorageSync('user')
    const labels = this.data.labels
    labels.forEach((item, index) => {
      if (index === 0) {
        item.value = user.projectName
      }
    })
    this.setData({ labels, user })
  },
  jump(e) {
    if (e.currentTarget.dataset.path) {
      wx.navigateTo({ url: e.currentTarget.dataset.path })
    } else {
      this.setData({ show: true })
    }
  },
  logout() {
    wx.clearStorage()
    wx.navigateTo({ url: `/pages/login/login` })
  },
  onClose() {
    this.setData({ show: false })
  },
  goFeedback() {
    this.onClose()
    wx.navigateTo({ url: '/pages/addFeedback/addFeedback' })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: '400-4000-400',
      success: () => { this.onClose() },
      fail: () => { this.onClose() }
    })
  }
})
