Page({
  data: {
    projectName: '',
    name: '',
  },
  onLoad(query) {
    const { projectName } = wx.getStorageSync('user')
    this.setData({ projectName })
  }
})
