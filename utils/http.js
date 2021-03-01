const base = 1

function ajax(url, data, method, otherToken) {
  const params = method === 'post' ? filterParams(data, true) : filterParams(data)
  const token = otherToken || wx.getStorageSync('token')
  const header = { token }
  const baseUrl = ['http://106.15.124.38:8092', 'https://api.xinhuajian.com'][base]
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      data: params || {},
      header,
      method: method || 'get',
      success: function (obj) {
        console.log(obj)
        if (obj.statusCode === 200) {
          if (obj.data.code === 200) {
            resolve(obj.data.data)
          } else if (obj.data.code === 401) {
            wx.showToast({ title: '登录过期，请重新登录', icon: 'none' })
            wx.navigateTo({ url: '/pages/login/login' })
          } else if (obj.data.code === 402) {
            // 非工作人员
            resolve(null)
          } else {
            wx.showToast({ title: obj.data.msg, icon: 'none' })
            reject(obj.data)
          }
        } else {
          wx.showToast({ title: obj.data.msg, icon: 'none' })
          reject(obj.data)
        }
      },
      fail: function (res) {
        reject(res)
        wx.showToast({ title: String(res), icon: 'loading' })
      },
    })
  })
}

function filterParams(params, post) {
  const entityType = ['number', 'boolean']

  if (post) entityType.push('string')

  if (entityType.includes(typeof params) || Array.isArray(params)) {
    return params
  }

  if (typeof params === 'object' && params) {
    const result = {}

    Object.keys(params).forEach(key => {
      if (params[key] !== '') {
        result[key] = params[key]
      }
    })
    return result
  }
}

module.exports = { ajax }
