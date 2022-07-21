// pages/personal/personal.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isFirst: true
    // openId: 0,
  },

// 点击头像登陆
getUserInfo(res){
  wx.login({
    success: async (res) => {
      let code = res.code;
      // console.log(code)
      let result = await request('/getOpenId', { code });
      app.globalData.openId = result;
      this.setData({
        openId: result,
      })
    },
    fail: (res)=>{
      wx.showToast({
        title: '登陆失败，请重新登录',
        icon: 'none'
      })
    }
  })
  wx.getUserProfile({
    desc: 'desc',
    success:(result)=>{
      app.globalData.userInfo = result.userInfo;
      this.setData({
        userInfo: result.userInfo,
      })
    },
    fail: (result)=>{
      wx.showToast({
        title: '请登陆以获取推荐',
        icon: 'none'
      })
    }
  })

},
// 个人喜欢跳转
toPersonalChoice(){
  wx.navigateTo({
    url: '/pages/personalChoice/personalChoice',
  })
},
// 所有餐厅跳转
toAllMenu(){
  wx.switchTab({
    url: '/pages/allmenu/allmenu',
  })
},
// 教程跳转
toTutorial(){
  wx.navigateTo({
    url: '/pages/tutorial/tutorial',
  })
},

toContact(){
  wx.navigateTo({
    url: '/pages/contact/contact',
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      isFirst: app.globalData.isFirst
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})