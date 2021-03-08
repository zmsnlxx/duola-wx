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
    const { projectId, projectLatitude, mixingStationLatitude, mixingStationLongitude, mixingStationName, projectLongitude } = wx.getStorageSync('user')
    const projectPosition = this.convert2TecentMap(projectLongitude, projectLatitude)
    const mixingStationPosition = this.convert2TecentMap(mixingStationLongitude, mixingStationLatitude)
    const markers = [
      {
        latitude: projectPosition.lat, longitude: projectPosition.lng,
        iconPath: '../../public/image/map-one.png',
        width: 16,
        height: 16,
        label: {
          content: '',  //文本
          color: '#FFFFFF',  //文本颜色
          borderRadius: 100,  //边框圆角
          bgColor: 'rgba(193, 213, 212, 0.35)',  //背景色
          padding: 100,  //文本边缘留白
          anchorY: -100,
          textAlign: 'center',  //文本对齐方式。有效值: left, right, center
        },
      },
      {
        latitude: mixingStationPosition.lat,
        longitude: mixingStationPosition.lng,
        iconPath: '../../public/image/mixingStationPosition-icon.png',
        width: 16,
        height: 16,
        label: {
          content: mixingStationName,  //文本
          color: '#000000',  //文本颜色
          textAlign: 'center',  //文本对齐方式。有效值: left, right, center
        },
      },
    ]
    that.setData({ latitude: projectPosition.lat, longitude: projectPosition.lng, markers })
    ajax('/wxController/getAllTransOrderByProjectId', { projectId }).then(res => {
      const { list, carList } = res
      const markers = carList.map(item => {
        return {
          latitude: item.latitude,
          longitude: item.longitude,
          id: item.carId,
          iconPath: '../../public/image/map-two.png',
          width: 16,
          height: 16,
          label: {
            anchorY: -46,
            content: item.carNo,  //文本
            color: '#FFFFFF',  //文本颜色
            borderRadius: 4,  //边框圆角
            bgColor: '#596384',  //背景色
            padding: 5,  //文本边缘留白
            textAlign: 'center',  //文本对齐方式。有效值: left, right, center
          },
        }
      })
      this.setData({ list, markers: this.data.markers.concat(markers) })
    })
  },
  convert2TecentMap(lng, lat) {
    if (lng === '' && lat === '') {
      return {
        lng: '',
        lat: '',
      }
    }
    const x_pi = 3.14159265358979324 * 3000.0 / 180.0
    const x = lng - 0.0065
    const y = lat - 0.006
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
    const qqlng = z * Math.cos(theta)
    const qqlat = z * Math.sin(theta)
    return {
      lng: qqlng,
      lat: qqlat,
    }
  },
})
