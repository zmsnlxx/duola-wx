import { ajax } from '../../utils/http'

Page({
  data: {
    list: [],
    latitude: '',
    longitude: '',
    markers: [],
  },
  onShow() {
    const that = this
    const { projectId } = wx.getStorageSync('user')

    ajax('/wxController/getAllTransOrderByProjectId', { projectId }).then(res => {
      const { list, carList } = res
      const markers = carList.map(item => {
        return {
          latitude: item.latitude,
          longitude:item.longitude,
          id: item.carId,
          label: {
            content: item.carNo,  //文本
            color: '#FFFFFF',  //文本颜色
            borderRadius: 4,  //边框圆角
            bgColor: '#596384',  //背景色
            padding: 5,  //文本边缘留白
            textAlign: 'center'  //文本对齐方式。有效值: left, right, center
          }
        }
      })
      this.setData({ list, markers })
    })

    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: res => {
        const { latitude, longitude } = res
        that.setData({ latitude, longitude })
      },
      fail: () => Toast({ type: 'fail', context: this, message: '获取位置信息失败' }),
    })
  }
})
