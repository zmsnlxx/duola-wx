import { ajax } from '../../utils/http'
import { transOrderStatus } from '../../utils/constant'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

Page({
  data: {
    labels: [
      { label: '运输方量', key: 'total' },
      { label: '车牌', key: 'carNo' },
      { label: '司机', key: 'driverName' },
      { label: '收货单位', key: 'projectName' },
      { label: '物料名称', key: 'goodsName' },
    ],
    result: {},
    params: {
      remark: '',
      volume: ''
    }
  },
  onLoad: function (options) {
    if (options.id) {
      this.setData({ id: options.id })
      ajax('/wxController/transOrderInfo', { transId: options.id }).then(res => {
        console.log(res)
        this.setData({ result: res })
      })
    }
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
    const { remark, volume } = this.data.params
    if (!volume) return Toask.fail('请填写签收方量')
    wx.navigateTo({ url: `/pages/sign/sign?remark=${remark}&volume=${volume}` })
  }
})
