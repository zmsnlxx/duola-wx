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
    jumpDetail() {
      console.log(this.data.info)
      wx.navigateTo({ url: `/pages/transportOrder/transportOrder?id=${this.data.info.id}` })
    }
  },
})
