import { ajax } from '../../utils/http'

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
    result: {
      goodsId: '111', isPump: '1', part: 222, projectAddress: '333', projectId: '44', projectName: '555', slump: '12', specialId: '313', total: '312', wishTime: '312'
    }
  },
  onLoad: function (options) {
    console.log(options.id)
    if (options.id) {
      ajax('/wxController/onlineOrderInfo', { id: options.id }).then(res => {
        console.log(res)
      })
    }
  },
  cancel() {
    wx.navigateBack()
  },
  submit() {

  }
})
