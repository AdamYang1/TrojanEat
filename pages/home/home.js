// pages/home/home.js
import request from '../request/request'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid: 0,
    isFirst: true
  },
  // 首页登陆
  homeLogin() {
    wx.login({
      success: async (res) => {
        let code = res.code;
        let result = await request('/getOpenId', { code });
        app.globalData.openid = result;
        console.log(this.data.openid);
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
      success: (result) => {
        app.globalData.userInfo = result.userInfo;
        this.setData({
          userInfo: result.userInfo,
        })
      },
      fail: (result) => {
        wx.showToast({
          title: '请登陆以获取推荐',
          icon: 'none'
        })
      }
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
    this.setData({
      openid: app.globalData.openid,
    })
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