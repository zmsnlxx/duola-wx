import { ajax } from '../../utils/http'

Page({
  data: {
    result: {},
    steps: [
      { text: '步骤四', desc: '描述信息' },
      { text: '步骤一', desc: '描述信息' },
      { text: '步骤二', desc: '描述信息' },
      { text: '步骤三', desc: '描述信息' },
    ],
    active: 0
  },

  onLoad: function (options) {
    console.log(options.id)
    if (options.id) {
      ajax('/wxController/getLogsByTransId', { transId: options.id }).then(res => {
        console.log(res)
      })
    } else {

    }
  },

  goSign() {
    wx.navigateTo({ url: '/pages/signature/signature' })
  },

  goFeedback() {
    wx.navigateTo({ url: '/pages/addFeedback/addFeedback' })
  }
})
