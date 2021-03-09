import { ajax } from '../../utils/http'
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
    },
    id: '',
    value: ''
  },
  onLoad: function (options) {
    console.log(options)
    if (options.id) {
      this.setData({ id: options.id })
      ajax('/wxController/transOrderInfo', { transId: options.id }).then(res => {
        console.log(res)
        this.setData({ result: res })
      })
    } else {
      const id = decodeURIComponent(options.q).split('=')[1]
      ajax('/wxController/getLastTransOrderByCarId', { carId: id }).then(res => {
        console.log(res)
        this.setData({ result: res, id: res.transId })
      })
    }
    const value = this.data.result.total
    this.setData({ value, 'params.volume': value })
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
    if (!volume) return Toast.fail('请填写签收方量')
    wx.navigateTo({ url: `/pages/sign/sign?volume=${volume}&transId=${this.data.id}&remark=${remark}` })
  }
})
