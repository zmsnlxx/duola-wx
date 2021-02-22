const { tabs } = require('./config.js')
Component({
  properties: {
    activeIndex: {
      type: Number,
      value: 0,
    },
  },
  data: {
    tabs,
  },
  created() {
    wx.hideTabBar({ aniamtion: false })
  },
  methods: {
    clickTag(e) {
      let index = e.currentTarget.dataset.index
      console.log(index)

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
