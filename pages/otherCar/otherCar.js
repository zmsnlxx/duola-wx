import { ajax } from '../../utils/http'

Page({
  data: {
    list: []
  },
  onLoad() {
    const { projectId } = wx.getStorageSync('user')
    ajax('/wxController/getAllTransOrderByProjectId', { projectId }).then(res => {
      console.log(res)
    })
  }
})
