// pages/allmenu/allmenu.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dHalls: ['evk', 'pks', 'vlg'],
    dHallCate: {'EVK': [], 'PKS':[], 'VLG':[]},
    vlgMenu: [],
    evkMenu: [],
    pksMenu: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(app.globalData.vlgCate.length) {
      this.setData({
        vlgMenu: app.globalData.vlgMenu,
        pksMenu: app.globalData.pksMenu,
        evkMenu: app.globalData.evkMenu,
      });
    } else {
      app.menuCallBack = res => {
        if(res) {
          this.setData({
            vlgMenu: app.globalData.vlgMenu,
            pksMenu: app.globalData.pksMenu,
            evkMenu: app.globalData.evkMenu,
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