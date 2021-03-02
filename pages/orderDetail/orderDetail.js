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
    goodsIds: [],
    specialIds: [],
    goodsName: '',
    specialName: '',
  },
  onLoad: function (options) {
    if (options.id) {
      this.setData({ id: options.id })
    }
  },
  onShow() {
    const goodsIds = wx.getStorageSync('goodsIds')
    const specialIds = wx.getStorageSync('specialIds')
    this.setData({ goodsIds, specialIds })
    ajax('/wxController/onlineOrderInfo', { id: this.data.id }).then(res => {
      const goodsName = goodsIds.find(item => item.value === res.goodsId).text
      // TODO 更改筛选text => value
      const specialArr = specialIds.filter(item => res.specialId.split(',').includes(item.text))
      const specialName = specialArr.map(item => item.text).join(',')
      this.setData({ result: res, goodsName, specialName })
    })
  },
  cancel() {
    wx.navigateBack()
  },
  submit() {
    wx.navigateTo({ url: `/pages/createOrder/createOrder?id=${this.data.id}` })
  }
})
