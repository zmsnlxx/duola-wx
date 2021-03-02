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
    result: null,
    id: '',
    goodsName: '',
    specialName: '',
  },
  onLoad: function (options) {
    if (options.id) {
      this.setData({ id: options.id })
    }
  },
  onShow() {
    ajax('/wxController/onlineOrderInfo', { id: this.data.id }).then(res => {
      this.setData({ result: res, goodsName: res.goodsStr, specialName: res.specialIdStr })
    })
  },
  cancel() {
    wx.navigateBack()
  },
  submit() {
    wx.navigateTo({ url: `/pages/createOrder/createOrder?id=${this.data.id}` })
  }
})
