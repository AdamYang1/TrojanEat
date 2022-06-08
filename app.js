// app.js
import request from "./pages/request/request";
// let app = getApp();
App({
	async onLaunch() {
		let that = this;
		// 展示本地存储能力
		const logs = wx.getStorageSync("logs") || [];
		logs.unshift(Date.now());
		wx.setStorageSync("logs", logs);

		/* 获取当前日期 */
		let date = new Date();
		let myDay = date.getDay();
		let myTime = date.toTimeString();
		let myDate =
			date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
		// 判断是否工作日
		if (myDay >= 1 && myDay <= 5) {
			that.globalData.isWeekDay = true;
		}
		// 判断是否开门
		if (myTime >= "21:00") {
			that.globalData.vlgOpen = true;
			that.globalData.evkOpen = false;
			that.globalData.pksOpen = false;
		}
		if (myTime >= "22:00" || myTime <= "07:00") {
			that.globalData.vlgOpen = false;
			that.globalData.evkOpen = false;
			that.globalData.pksOpen = false;
		}
		if (myTime >= "07:00" && myTime <= "10:30") {
			that.globalData.vlgOpen = true;
			that.globalData.evkOpen = true;
			that.globalData.pksOpen = true;
		}
		if (myTime >= "10:30" && myTime <= "11:00") {
			that.globalData.vlgOpen = false;
			that.globalData.evkOpen = false;
			that.globalData.pksOpen = false;
		}
		// 判断mealtime
		if (myTime <= "10:30" && myTime >= "07:00") {
			that.globalData.isBreakfast = true;
			that.globalData.isLunch = false;
			that.globalData.isDinner = false;
		}
		if (myTime <= "16:00" && myTime >= "10:30") {
			that.globalData.isBreakfast = false;
			that.globalData.isLunch = true;
			that.globalData.isDinner = false;
		}
		if (myTime <= "22:00" && myTime >= "16:00") {
			that.globalData.isBreakfast = false;
			that.globalData.isLunch = false;
			that.globalData.isDinner = true;
		}
		// 更新日期
		let mealIndex = -1;
		if (that.globalData.isBreakfast) {
			mealIndex = 0;
		}
		if (that.globalData.isLunch) {
			mealIndex = 1;
		}
		if (that.globalData.isDinner) {
			mealIndex = 2;
		}
		that.globalData.myDate = myDate;
		/* 日期 */

		/* 登陆获取信息 */
		// 登录
		wx.login({
			success: async (res) => {
				let code = res.code;
				let result = await request("/getOpenId", { code });
				that.globalData.openid = result;
				// 获取用户openid后需要看是否第一次登陆
				let customerInfo = await request(
					`/personal/openid/${that.globalData.openid}`,
					{}
				);
				that.globalData.isFirst = customerInfo.length == 0 ? true : false;

				// that.globalData.isFirst = customerInfo.length == 0 ? true : false;
				// 若不是，获取用户喜好并跳转页面
				if (!that.globalData.isFirst) {
					//更新用户当天推荐餐厅排名
					let updateRec = await request(
						// `/recommend/openid/${that.globalData.openid}/date/${that.globalData.myDate}
						// /mealtime/${that.globalData.mealInterval[mealIndex]}`,
						`/recommend/openid/${that.globalData.openid}/date/2022-04-26/mealtime/Lunch`,
						{},
						"PUT"
					);

					//获取用户喜好
					let temp = await request(
						`/personal/openid/${that.globalData.openid}`,
						{},
						"GET"
					);

					//获取用户当天餐厅排名
					let dhRank = await request(
						`/recommend/openid/${that.globalData.openid}`,
						{},
						"GET"
					);

					//更新用户喜好
					let tempUserInfo = JSON.parse(JSON.stringify(temp[0]));
					for (let i in tempUserInfo) {
						if (tempUserInfo[i] == 1) {
							let index = that.globalData.typesEng.indexOf(i);
							let type = that.globalData.types[index];
							that.globalData.selecedArr[index] = 1;
							that.globalData.userPreference.push(type);
							that.globalData.userPreferenceEng.push(i);
						}
					}

					//更新用户餐厅推荐
					let tempDhRank = JSON.parse(JSON.stringify(dhRank[0]));
					for (let i in tempDhRank) {
						//evk pks vlg
						that.globalData.dhRank.push(tempDhRank[i]);
					}
					let tempMax = -1;
					for (let i in that.globalData.dhRank) {
						tempMax =
							that.globalData.dhRank[i] > tempMax
								? that.globalData.dhRank[i]
								: tempMax;
					}
					for (let i in that.globalData.dhRank) {
						if (that.globalData.dhRank[i] == tempMax) {
							that.globalData.dhRec.push(that.globalData.dhArr[i]);
						}
					}
					let dhRecommended = that.globalData.dhRec[0];
					//获取推荐餐厅信息
					let dhRecInfo = await request(
						/* `/menu/openid/${that.globalData.openid}
						/options/${userPreferenceEng.join(',')}
						/date/${that.globalData.myDate}
						/mealtime/${that.globalData.mealInterval[mealIndex]}
						/dh/${dhRec[0]}`, */
						`/menu/openid/o0wn04gRkRW6BiuGbjDZiLAPumX0/options/beef,shellfish/date/2022-04-26/mealtime/Lunch/dh/pks`,
						{},
						"GET"
					);
					let tempRecDhInfo = JSON.parse(JSON.stringify(dhRecInfo))[dhRecommended];
					console.log(Object.keys(tempRecDhInfo));
					for(let i in tempRecDhInfo) {
						console.log(tempRecDhInfo[i]);
					}
					


					/* prevent home.onload aroused before app.onlaunch */
					if (that.userCallBack) {
						// console.log(that.globalData.dhRec);
						that.userCallBack(that.globalData.dhRec);
					}
	
				}
				// 若是第一次登陆，跳转到欢迎界面
				else {
					wx.redirectTo({
						url: "/pages/welcome/welcome",
					});
				}
				// console.log(that.globalData.userPreference)
			},
		});
	},
	globalData: {
		isFirst: false,
		userInfo: {},
		openid: 0,
		userPreference: [],
		userPreferenceEng: [],
		dhRank: [],
		dhArr: ["evk", "pks", "vlg"],
		dhRec: [],
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
		selecedArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		mealInterval: ["Breakfast", "Lunch", "Dinner"],
		myDate: "0000-00-00",
		isFirst: true,
		isWeekDay: true,
		isBreakfast: false,
		isLunch: false,
		isDinner: false,
		vlgOpen: true,
		evkOpen: true,
		pksOpen: true,
	},
});
