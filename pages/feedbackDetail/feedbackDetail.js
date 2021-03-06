import { ajax } from '../../utils/http'

Page({
  data: {
    result: {},
    id: ''
  },
  onLoad(options) {
    if (options.id) {
      ajax('/wxController/complaintInfo', { id: options.id }).then(res => {
        res.userPhotos = res.userPhoto.split(',')
        if (res.status === 2) {
          res.adminPhotos = res.adminPhoto.split(',')
        }
        this.setData({ id: options.id, result: res })
      })
    }
  },
  previewImage(e) {
    const { list, src } = e.currentTarget.dataset
    wx.previewImage({
      current: src,
      urls: list,
    })
  }
})
