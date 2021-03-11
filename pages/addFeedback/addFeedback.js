import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { ajax } from '../../utils/http'

Page({
  data: {
    params: {
      projectId: '' ,
      projectName: '' ,
      remark: '' ,
      userPhoto: '',
      transId: '',
    },
    cWidth: 0,
    cHeight: 0,
    fileList: [],
  },
  onLoad(options) {
    const { projectId, projectName } = wx.getStorageSync('user')
    this.setData({ 'params.projectId': projectId, 'params.projectName': projectName })
    if (options.transId) {
      this.setData({ 'params.transId': options.transId })
    }
  },
  deleteImg(e) {
    const delIndex = e.detail.index
    const { fileList } = this.data
    fileList.splice(delIndex, 1)
    this.setData({ fileList })
  },
  afterRead(e) {
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    const that = this
    const { url } = e.detail.file[0]
    wx.getImageInfo({
      src: url,
      success: (res) => {
        let ratio = 2;
        let canvasWidth = res.width
        let canvasHeight = res.height
        while (canvasWidth > 400 || canvasHeight > 400){ // 保证宽高在400以内
          canvasWidth = Math.trunc(res.width / ratio)
          canvasHeight = Math.trunc(res.height / ratio)
          ratio++;
        }
        that.setData({
          cWidth: canvasWidth,
          cHeight: canvasHeight
        })

        var ctx = wx.createCanvasContext('canvas')
        ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight)
        ctx.draw(false, setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: 'canvas',
            destWidth: canvasWidth,
            destHeight: canvasHeight,
            success: function (res) {
              wx.uploadFile({
                url: 'https://api.xinhuajian.com/upLoadPhoto',
                filePath: res.tempFilePath,
                header: { token: wx.getStorageSync('token') },
                name: 'file',
                success: (res) => {
                  const result = JSON.parse(res.data)
                  const fileList = that.data.fileList
                  fileList.push({
                    url: result.data,
                    isImage: true,
                    thumb: result.data
                  })
                  that.setData({ fileList })
                  wx.nextTick(() => wx.hideLoading())
                },
                fail: err => { console.log(err) }
              });
            },
            fail: function (res) {
              console.log(res.errMsg)
            }
          })
        },100))
      }
    })
  },
  cancel() {
    wx.navigateBack()
  },
  submit () {
    this.setData({ 'params.userPhoto': this.data.fileList.map(item => item.url).join(',') })
    const { remark } = this.data.params
    if (!remark) return Toast.fail('请填写意见')

    ajax('/wxController/feedbackAdd', this.data.params, 'post').then(() => {
      Toast({
        type: 'success',
        message: '提交成功！',
        onClose: () => {
          wx.navigateBack()
        }
      })
    })
  },
  change(e) {
    this.setData({ 'params.remark': e.detail.value })
  }
})
