// pages/personalChoice/personalChoice.js
import request from "../request/request";
var app = getApp();
let typesArr = app.globalData.types;
// let
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// types: ['乳制品', '牛肉', '鸡肉', '猪肉', '蛋类', '鱼类', '花生',
		//   '芝麻', '贝类', '豆制品', '坚果', '谷物类'],
		// typesEng: ['dairy', 'beef', 'chicken', 'pork', 'eggs', 'fish', 'peanuts',
		//   'sesame', 'shellfish', 'soy', 'tree_nuts', 'wheat_gluten'],
		types: [
			"鸡肉",
			"蛋类",
			"乳制品",
			"牛肉",
			"鱼类",
			"豆制品",
			"猪肉",
			"贝类",
			"谷物类",
			"坚果",
			"花生",
			"芝麻",
		],
		typesEng: [
			"chicken",
			"eggs",
			"dairy",
			"beef",
			"fish",
			"soy",
			"pork",
			"shellfish",
			"wheat_gluten",
			"tree_nuts",
			"peanuts",
			"sesame",
		],
		userPreference: [],
		userPreferenceEng: [],
		test: [],
		userOptions: [],
	},
	// 点击某个食品
	handleType: function (e) {
		if (this.data.userPreference.length >= 4) {
			wx.showToast({
				title: "最多只能选择4个不同种类哦～",
				icon: "none",
			});
		} else {
			let type = e.currentTarget.dataset.type;
			let typeIndex = typesArr.indexOf(type);
			let typeEng = this.data.typesEng[typeIndex];
			if (app.globalData.selecedArr[typeIndex] == 0) {
				this.setData(
					{
						userPreference: this.data.userPreference.concat(type),
						userPreferenceEng: this.data.userPreferenceEng.concat(typeEng),
					},
					function (type) {
						app.globalData.userPreference = this.data.userPreference;
						app.globalData.userPreferenceEng = this.data.userPreferenceEng;
					}
				);
				app.globalData.selecedArr[typeIndex] = 1;
				// wx.setStorageSync(type, 1);
			} else {
				wx.showToast({
					title: "请不要重复选择已选过种类～",
					icon: "none",
				});
			}
		}
	},

	handleClear() {
		// clear all data
		this.setData({
			userPreference: [],
			userPreferenceEng: [],
		});
		app.globalData.selecedArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		app.globalData.userPreference = [];
		app.globalData.userPreferenceEng = [];
	},
	async handleSubmit() {
		let openid = app.globalData.openid;
		let options = app.globalData.userPreferenceEng.join(",");
		let prev = this.data.userOptions.join(",");
		// console.log(options);
		if (app.globalData.userPreferenceEng.length == 0) {
			wx.showToast({
				title: "你现在没有任何选择哦",
				duration: 1000,
				icon: "none",
			});
			return;
		}
		if(prev.length != 0){
			await request(
				`/personal/customer/openid/${openid}/like/options/${options}/prev/${prev}`,
				{ openid, options },
				"PUT"
			);
		} else {
			await request(
				`/personal/customer/openid/${openid}/like/options/${options}/prev/vegan`,
				{ openid, options },
				"PUT"
			);
		}
		app.globalData.dhRank = [];
		app.globalData.dhRec = [];
		app.globalData.displayRecTypes = [];
		app.globalData.recDish = [];
		app.globalData.otherDh = [];
		app.globalData.otherDhRec = [];
		app.globalData.evkRec = [];
		app.globalData.vlgRec = [];
		app.globalData.pksRec = [];
		app.globalData.userPreference = [];
		app.globalData.userPreferenceEng = [];
		app.globalData.evkMenu = [];
		app.globalData.pksMenu = [];
		app.globalData.vlgMenu = [];
		app.globalData.evkCate = [];
		app.globalData.evkDish = [];
		app.globalData.pksCate = [];
		app.globalData.pksDish = [];
		app.globalData.vlgCate = [];
		app.globalData.vlgDish = [];
		//avoid bugg....
		await request(`/recommend/openid/${app.globalData.openid}`, {}, "GET");

		app.onLaunch();
		wx.switchTab({
			url: "/pages/home/home",
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			userPreference: app.globalData.userPreference,
			userPreferenceEng: app.globalData.userPreferenceEng,
			userOptions: app.globalData.userPreferenceEng,
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({
			userPreference: app.globalData.userPreference,
			userPreferenceEng: app.globalData.userPreferenceEng,
		});
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
