import { ajax } from '../../utils/http'

Page({
  data: {
    result: {},
    steps: [],
    active: 0,
    id: '',
  },

  onLoad: function (options) {
    if (options.id) {
      this.setData({ id: options.id })
      ajax('/wxController/getLogsByTransId', { transId: options.id }).then(res => {
        const steps = res.map(item => ({ status: item.statusStr, siteName: item.siteName, date: item.time.split(' ')[0], hour: item.time.split(' ')[1].slice(0,5) }))
        this.setData({ steps })
      })
      ajax('/wxController/transOrderInfo', { transId: options.id }).then(res => {
        this.setData({ result: res })
      })
    }
  },

  goSign() {
    wx.navigateTo({ url: `/pages/signature/signature?id=${this.data.id}` })
  },

  goFeedback() {
    wx.navigateTo({ url: `/pages/addFeedback/addFeedback?transId=${this.data.id}` })
  }
})
