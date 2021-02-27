Page({
  data: {
    result: {
      addTime: '2020/08/09 13:00',
      examineStatus: '1',
      examineStatusStr: '已回复',
      id: '1',
      projectName: '火车站地块A',
      remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
      userPhoto: 'https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.luRQgy1sz2jnc1ca833cb44c6d166e2e494f24755721.jpeg',
      // answer: {
      //   addTime: '2020/08/09 13:00',
      //   remark: '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
      //   userPhoto: 'https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.luRQgy1sz2jnc1ca833cb44c6d166e2e494f24755721.jpeg,https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.ZBnQJc9mDrt8c1ca833cb44c6d166e2e494f24755721.jpeg,https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.luRQgy1sz2jnc1ca833cb44c6d166e2e494f24755721.jpeg,https://cdn.fledchina.com/wx9c6810500b31e6bb.o6zAJs5EpeQM-BYlmtOyhOdjhx2U.luRQgy1sz2jnc1ca833cb44c6d166e2e494f24755721.jpeg',
      // },
    },
  },
  onLoad(query) {
    const { result } = this.data
    result.userPhotos = result.userPhoto.split(',')
    if (result.answer) {
      result.answer.userPhotos = result.answer.userPhoto.split(',')
    }
    this.setData({ result })
  }
})
