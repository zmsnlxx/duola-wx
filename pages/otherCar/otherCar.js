import { ajax } from '../../utils/http'

Page({
  data: {
    list: [],
    latitude: '',
    longitude: '',
    markers: [],
    defaultMarkers: [],
    loadTime: '',
    show: false,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    minDate: new Date("2020-01-01 00:00:00").getTime(),
  },
  onLoad() {
    const { projectLatitude, mixingStationLatitude, mixingStationLongitude, mixingStationName, projectLongitude } = wx.getStorageSync('user')
    const projectPosition = this.convert2TecentMap(projectLongitude, projectLatitude)
    const mixingStationPosition = this.convert2TecentMap(mixingStationLongitude, mixingStationLatitude)
    const markers = [
      {
        latitude: projectPosition.lat, longitude: projectPosition.lng,
        iconPath: '../../public/image/map-position.png',
        width: 100,
        height: 100,
        anchor: {
          x: .5,
          y: .5
        }
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
    this.setData({ latitude: projectPosition.lat, longitude: projectPosition.lng, defaultMarkers: markers })
  },
  onShow() {
    this.getList()
  },
  getList() {
    const { projectId } = wx.getStorageSync('user')
    this.setData({ markers: [] })
    ajax('/wxController/getAllTransOrderByProjectId', { projectId, loadTime: this.data.loadTime }).then(res => {
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
      this.setData({ list, markers: [...this.data.defaultMarkers, ...markers] })
      console.log(this.data.markers)
    })
  },
  open() {
    this.setData({ show: true })
  },
  onDateConfirm(e) {
    this.setData({ loadTime: e.detail, show: false })
    this.getList()
  },
  close() {
    this.setData({ show: false, loadTime: '' })
  },
  preventTouchMove() {},
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
