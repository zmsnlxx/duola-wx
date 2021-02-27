Page({
  data: {
    labels: [
      { label: '运输方量', key: 'capacity' },
      { label: '车牌', key: 'carNo' },
      { label: '司机', key: 'driverName' },
      { label: '收货单位', key: 'projectName' },
      { label: '物料名称', key: 'goodsName' },
    ],
    result: {
      projectName: '我是收货单位名称',
      goodsName: 'C40',
      driverName: '金闪闪',
      carNo: '甘E09870',
      capacity: '16m³',
    },
    params: {
      remark: '',
      volume: ''
    }
  },
  onLoad: function (options) {

  },

  cancel() {
    wx.navigateBack()
  },
  changeValue(e) {
    this.setData({ 'params.volume': e.detail })
  },
  change(e) {
    this.setData({ 'params.remark': e.detail.value })
  },
  goSign() {
    console.log(this.data.params)
    wx.navigateTo({ url: '/pages/sign/sign' })
  }
})
