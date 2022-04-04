// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

// 点击头像登陆
getUserInfo(res){
  wx.getUserProfile({
    desc: 'desc',
    success:(result)=>{
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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