import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { ajax } from '../../utils/http'

Page({
  data: {
    params: {
      projectId: '' ,
      projectName: '' ,
      remark: '' ,
      userPhoto: '',
    },
    fileList: [],
  },
  onLoad() {
    const { projectId, projectName } = wx.getStorageSync('user')
    this.setData({ 'params.projectId': projectId, 'params.projectName': projectName })
  },
  deleteImg(e) {
    const delIndex = e.detail.index
    const { fileList } = this.data
    fileList.splice(delIndex, 1)
    this.setData({ fileList })
  },
  afterRead(e) {
    const that = this
    const { type, url } = e.detail.file[0]
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
          // isVideo: type === 'video',
          // thumb: type === 'image' ? result.data : result.data + '?vframe/jpg/offset/1'
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
    const { remark, userPhoto } = this.data.params
    if (!userPhoto) return Toast.fail('请上传图片')
    if (!remark) return Toast.fail('请填写意见')

    ajax('/wxController/feedbackAdd', { feedbackAddDto: this.data.params }, 'post').then(res => {
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
