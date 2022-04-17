// pages/personalChoice/personalChoice.js
var app = getApp()
let selecedArr = app.globalData.selecedArr;
let typesArr = app.globalData.types;
// let 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ['乳制品', '牛肉', '鸡肉', '猪肉', '蛋类', '鱼类', '花生',
      '芝麻', '贝类', '豆制品', '坚果', '谷物类'],
    userPreference: [],
    test: []
  },
  // 点击某个食品
  handleType: function (e) {
    let type = e.currentTarget.dataset.type;
    let typeIndex = typesArr.indexOf(type);
    if (selecedArr[typeIndex] == 0) {
      this.setData({
        userPreference: this.data.userPreference.concat(type)
      })
      app.globalData.userPreference.concat(type);
      app.globalData.selecedArr[typeIndex] = 1
      wx.setStorageSync(type, 1);
    } else {
      console.log('nonono');
    }

  },
  handleClear() {
    // clear all data
    this.setData({
      userPreference: []
    })
    app.globalData.selecedArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    selecedArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    app.globalData.userPreference = [];
  },
  handleSubmit() {
    // 未能更新global data
    console.log(app.globalData.userPreference.length);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let temp = app.globalData.userPreference;
    this.setData({
      userPreference: temp
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