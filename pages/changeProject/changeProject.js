import { ajax } from '../../utils/http'
import { examineStatus } from '../../utils/constant'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

Page({
  data: {
    projectName: '',
    name: '',
    list: [],
    params: {
      pageSize: 10,
      startPage: 1,
      userId: ''
    },
    examineStatus,
    remark: '',
  },
  onLoad() {
    const { projectName, uId } = wx.getStorageSync('user')
    this.setData({ projectName, 'params.userId': uId })
  },
  onShow() {
    this.getList()
  },
  getList() {
    ajax('/wxController/changeProjectList', this.data.params).then(res => {
      this.setData({ list: this.data.list.concat(res) })
    })
  },
  changeStatus(e) {
    const userProjectId = e.currentTarget.dataset.id
    ajax('/wxController/changeStatus', { userProjectId }, 'post').then(() => {
      Toast.success('撤回成功')
      this.resetList()
    })
  },
  resetList() {
    this.setData({ list: [], 'params.startPage': 1 })
    this.getList()
  },
  onHide() {
    this.setData({ list: [], 'params.startPage': 1 })
  },
  changeProject() {
    ajax('/wxController/projectChange', { remark: this.data.remark }, 'post').then(() => {
      Toast.success('提交成功')
      this.resetList()
    })
  },
  changeValue(e) {
    this.setData({ remark: e.detail })
  }
})
