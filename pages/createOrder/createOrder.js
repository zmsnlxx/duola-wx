import { ajax } from '../../utils/http'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

Page({
  data: {
    labels: [
      { label: '工程名称', key: 'projectName', type: 'text', disabled: true },
      { label: '工程地址', required: true, key: 'projectAddress', type: 'text', class: 'input' },
      { label: '浇筑部位', required: true, key: 'part', type: 'text', class: 'input' },
      { label: '塌落度', required: true, key: 'slump', type: 'text', class: 'input' },
      { label: '需求标号', required: true, key: 'goodsId', class: 'select' },
      { label: '需求方量', required: true, key: 'total', type: 'number', class: 'input' },
      { label: '期望时间', required: true, key: 'wishTime', class: 'time' },
      { label: '是否泵送', required: true, key: 'isPump', class: 'radio' },
      { label: '特殊要求', key: 'specialId', class: 'select' },
    ],
    minDate: new Date().getTime(),
    specialIds: [],
    goodsIds: [],
    radio: '1',
    isEdit: false,
    form: { goodsId: '', isPump: '1', part: '', projectAddress: '', projectId: '', projectName: '', slump: '', specialId: '', total: '', wishTime: '', },
    show: { goodsId: false, specialId: false, wishTime: false },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    name: { specialId: '请选择', goodsId: '请选择' },
  },
  onLoad: function (option) {
    const { projectId, projectName } = wx.getStorageSync('user')
    this.setData({ 'form.projectName': projectName, 'form.projectId': projectId })
    ajax('/goodsPullList', { goodsType: [1, 2] },  'post').then(res => {
      const specialIds = []
      const goodsIds = []
      res.forEach(item => {
        const arr = item.goodsType === 1 ? specialIds : goodsIds
        arr.push({ text: item.goodsName, value: item.id })
      })
      this.setData({ specialIds, goodsIds })
    })
    if (option.type === 'edit') {
      wx.setNavigationBarTitle({ title: '编辑订单' })
      this.setData({ isEdit: true })
      const currentOrder = wx.getStorageSync('currentOrder')
      Object.keys(this.data.form).forEach(key => {
        this.setData({ [`form.${key}`]: currentOrder[key] })
      })
    }
  },
  onChange(e) {
    this.setData({ radio: e.detail, 'form.isPump': e.detail })
  },
  changeValue (e) {
    const model = e.currentTarget.dataset.key
    this.setData({ [`form.${model}`]: e.detail })
  },
  open(e) {
    const model = e.currentTarget.dataset.key
    this.setData({ [`show.${model}`]: true })
  },
  close(e) {
    const model = e.currentTarget.dataset.key
    this.setData({ [`show.${model}`]: false })
  },
  preventTouchMove() {},
  onDateConfirm(e) {
    const model = e.currentTarget.dataset.key
    this.setData({ [`form.${model}`]: e.detail, [`show.${model}`]: false })
  },
  onConfirm(e) {
    const { key } = e.currentTarget.dataset
    const { text, value } = e.detail.value
    this.setData({ [`form.${key}`]: value, [`show.${key}`]: false, [`name.${key}`]: text })
  },
  cancel() {
    wx.navigateBack()
  },
  submit () {
    const { projectAddress, part, slump, goodsId, total, wishTime } = this.data.form
    if (!projectAddress) return Toast.fail('请输入工程地址')
    if (!part) return Toast.fail('请输入浇筑部位')
    if (!slump) return Toast.fail('请输入塌落度')
    if (!goodsId) return Toast.fail('请选择需求标号')
    if (!total) return Toast.fail('请输入需求方量')
    if (!wishTime) return Toast.fail('请选择期望时间')

    const api = this.data.isEdit ? '/wxController/onlineOrderEdit' : '/wxController/onlineOrderAdd'
    ajax(api, this.data.form, 'post').then(() => {
      Toast({
        type: 'success',
        context: this,
        message: `${this.data.isEdit ? '编辑' : '提交'}成功`,
        onClose: () => {
          wx.navigateBack()
        }
      })
    })
  }
})
