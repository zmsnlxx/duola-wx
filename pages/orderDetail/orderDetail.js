import { ajax } from '../../utils/http'
import { examineStatus } from '../../utils/constant'

Page({
  data: {
    labels: [
      { label: '工程名称', key: 'projectName' },
      { label: '工程地址',  key: 'projectAddress', },
      { label: '浇筑部位',  key: 'part', },
      { label: '塌落度',  key: 'slump', },
      { label: '需求标号',  key: 'goodsId' },
      { label: '需求方量',  key: 'total', },
      { label: '期望时间',  key: 'wishTime' },
      { label: '是否泵送',  key: 'isPump' },
      { label: '特殊要求', key: 'specialId' },
    ],
    examineStatus,
    result: null
  },
  onLoad: function (options) {
    console.log(options.id)
    if (options.id) {
      ajax('/wxController/onlineOrderInfo', { id: options.id }).then(res => {
        console.log(res)
        this.setData({ result: res })
      })
    }
  },
  cancel() {
    wx.navigateBack()
  },
  submit() {
    wx.setStorageSync('currentOrder', this.data.result)
    wx.navigateTo({ url: '/pages/createOrder/createOrder?type=edit' })
  }
})
