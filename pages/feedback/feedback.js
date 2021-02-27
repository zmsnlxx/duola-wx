import { ajax } from '../../utils/http'

Page({
  data: {
    list: [
      {
        addTime: '2020/08/09 13:00',
        examineStatus: '0',
        examineStatusStr: '审核中',
        id: '0',
        part: '1楼地基',
        projectName: '火车站地块A',
      },
      {
        addTime: '2020/08/09 13:00',
        examineStatus: '1',
        examineStatusStr: '审核通过',
        id: '1',
        part: '1楼地基',
        projectName: '火车站地块A',
      },
      {
        addTime: '2020/08/09 13:00',
        examineStatus: '2',
        examineStatusStr: '审核拒绝',
        id: '2',
        part: '1楼地基',
        projectName: '火车站地块A',
      },
    ]
  },
  onLoad: function () {
    const { uId } = wx.getStorageSync('user');
    ajax('/wxController/feedbackList', { startPage: 1, pageSize: 999, userId: uId }).then(res => {
      console.log(res)
    })
  },
  goDetail (e) {
    wx.navigateTo({ url: `/pages/feedbackDetail/feedbackDetail?id=${e.currentTarget.dataset.id}` })
  }
})
