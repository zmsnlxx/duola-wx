
Component({
  properties: {
    info: {
      type: Object,
      value: {},
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    projectName: wx.getStorageSync('user').projectName,
  },
  methods: {
    jumpDetail() {
      const { transId, id } = this.data.info
      wx.navigateTo({ url: `/pages/transportOrder/transportOrder?id=${transId || id }` })
    },
    sign() {
      const { transId, id } = this.data.info
      wx.navigateTo({ url: `/pages/signature/signature?id=${transId || id }` })
    }
  },
})
