// pages/allmenu/allmenu.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dHalls: ['evk', 'pks', 'vlg'],
    dHallCate: {'EVK': [], 'PKS':[], 'VLG':[]},
    evkCate: [],
    evkDish: [],
    pksCate: [],
    pksDish: [],
    vlgCate: [],
    vlgDish: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(app.globalData.vlgCate.length) {
      this.setData({
        dHallCate: app.globalData.dHallCate,
        evkCate: app.globalData.evkCate,
        vlgCate: app.globalData.vlgCate,
        pksCate: app.globalData.pksCate,
        evkDish: app.globalData.evkDish,
        vlgDish: app.globalData.vlgDish,
        pksDish: app.globalData.pksDish,
      });
    } else {
      app.menuCallBack = res => {
        if(res) {
          this.setData({
            dHallCate: app.globalData.dHallCate,
            evkCate: app.globalData.evkCate,
            vlgCate: app.globalData.vlgCate,
            pksCate: app.globalData.pksCate,
            evkDish: app.globalData.evkDish,
            vlgDish: app.globalData.vlgDish,
            pksDish: app.globalData.pksDish,
          });
        }
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})