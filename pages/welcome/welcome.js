// pages/welcome/welcome.js
import request from "../request/request";
let app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		openid: 0,
	},
	async handleStart() {
		await request(`/personal/newuser/openid/${this.data.openid}`, {}, "POST");
		// 跳转教程
		wx.navigateTo({
			url: "/pages/personalChoice/personalChoice",
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (app.globalData.openid.length) {
			this.setData({
				openid: app.globalData.openid,
			});
		} else {
			app.welcomeCallBack = (res) => {
				if (res) {
					this.setData({
						openid: app.globalData.openid,
					});
				}
			};
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		// this.setData({
		//   openid: app.globalData.openid
		// })
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
