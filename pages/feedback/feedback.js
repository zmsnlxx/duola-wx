import { ajax } from '../../utils/http'

Page({
  data: {
    list: [
      {
        addTime: '2020/08/09 13:00',
        examineStatus: '0',
        examineStatusStr: '处理中',
        id: '0',
        projectName: '火车站地块A',
        remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        userPhoto: 'https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.luRQgy1sz2jnc1ca833cb44c6d166e2e494f24755721.jpeg'
      },
      {
        addTime: '2020/08/09 13:00',
        examineStatus: '1',
        examineStatusStr: '已回复',
        id: '1',
        projectName: '火车站地块A',
        remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        userPhoto: 'https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.luRQgy1sz2jnc1ca833cb44c6d166e2e494f24755721.jpeg',
        answer: {
          addTime: '2020/08/09 13:00',
          remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
          userPhoto: 'https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.luRQgy1sz2jnc1ca833cb44c6d166e2e494f24755721.jpeg,https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.ZBnQJc9mDrt8c1ca833cb44c6d166e2e494f24755721.jpeg',
        }
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
