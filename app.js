// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: {},
    openid: 0,
    userPreference:[],
    types: ['乳制品', '牛肉', '鸡肉', '猪肉', '蛋类', '鱼类', '花生',
    '芝麻', '贝类', '豆制品', '坚果', '谷物类'],
    selecedArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
})
