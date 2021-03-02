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
        if (res.answer) {
          res.answer.userPhotos = res.answer.userPhoto.split(',')
        }
        this.setData({ id: options.id, result: res })
      })
    }
  }
})
