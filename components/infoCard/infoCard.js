import { transOrderStatus } from '../../utils/constant'

Component({
  properties: {
    info: {
      type: Object,
      value: {},
    },
  },
  data: {
    projectName: wx.getStorageSync('user').projectName,
    transOrderStatus,
  },
  methods: {
    clickTag(e) {
      let index = e.currentTarget.dataset.index

      if (index === this.data.activeIndex) {
        return false
      }
      let pagePath = this.data.tabs[index].path
      wx.switchTab({
        url: pagePath,
      })
    },
    publish() {
      wx.navigateTo({ url: '/pages/createOrder/createOrder' })
    },
  },
})
