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
    const that = this
    const { url } = e.detail.file[0]
    wx.uploadFile({
      url: 'https://api.xinhuajian.com/upLoadPhoto',
      filePath: url,
      header: { token: wx.getStorageSync('token') },
      name: 'file',
      success: (res) => {
        const result = JSON.parse(res.data)
        const fileList = this.data.fileList
        fileList.push({
          url: result.data,
          isImage: true,
          thumb: result.data
        })
        that.setData({ fileList })
      },
      fail: (err) => { reject(err) }
    });
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
