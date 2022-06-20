// app.js
import request from "./pages/request/request";
// let app = getApp();
App({
	async onLaunch() {
		console.log('app launched');
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
		if (that.globalData.isBreakfast) {
			that.globalData.mealIndex = 0;
		}
		if (that.globalData.isLunch) {
			that.globalData.mealIndex = 1;
		}
		if (that.globalData.isDinner) {
			that.globalData.mealIndex = 2;
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
				if (that.welcomeCallBack) {
					// console.log(that.globalData.dhRec);
					that.welcomeCallBack(that.globalData.dhRec);
				}

				// 获取用户openid后需要看是否第一次登陆
				let customerInfo = await request(
					`/personal/openid/${that.globalData.openid}`,
					{}
				);
				that.globalData.isFirst = customerInfo.length == 0 ? true : false;

				// that.globalData.isFirst = customerInfo.length == 0 ? true : false;
				// 若不是，获取用户喜好并跳转页面
				if (!that.globalData.isFirst) {
					/* 更新用户当天推荐餐厅排名 =====================================*/
					await request(
						// `/recommend/openid/${that.globalData.openid}/date/${that.globalData.myDate}
						// /mealtime/${that.globalData.mealInterval[mealIndex]}`,
						`/recommend/openid/${that.globalData.openid}/date/2022-06-19/mealtime/Lunch`,
						{},
						"PUT"
					);
					/* 更新用户当天推荐餐厅排名 =*/

					/* 获取用户信息 ===============================================*/
					let user = await request(
						`/personal/openid/${that.globalData.openid}`,
						{},
						"GET"
					);
					/* 获取用户信息 =*/

					/* 获取用户当天餐厅排名 ============================================*/
					let dhRank = await request(
						`/recommend/openid/${that.globalData.openid}`,
						{},
						"GET"
					);
					/* 获取用户当天餐厅排名 =*/

					/* 更新用户喜好 ============================================*/
					let tempUserInfo = JSON.parse(JSON.stringify(user[0]));
					for (let i in tempUserInfo) {
						if (
							tempUserInfo[i] > 0 &&
							tempUserInfo[i] <= 1 &&
							i.indexOf("pks") == -1 &&
							i.indexOf("evk") == -1 &&
							i.indexOf("vlg") == -1
						) {
							let index = that.globalData.typesEng.indexOf(i);
							let type = that.globalData.types[index];
							that.globalData.selecedArr[index] = 1;
							that.globalData.userPreference.push(type);
							that.globalData.userPreferenceEng.push(i);
						}
					}
					/* 更新用户喜好 =*/

					/* 更新用户餐厅推荐 ==============================================*/
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
					/* 更新用户餐厅推荐 =*/

					/* 获取推荐餐厅信息 ========================================*/
					let dhRecommended = that.globalData.dhRec[0];

					let dhRecMenu = await request(
						/* `/menu/openid/${that.globalData.openid}
						/options/${userPreferenceEng.join(',')}
						/date/${that.globalData.myDate}
						/mealtime/${that.globalData.mealInterval[mealIndex]}
						/dh/${that.globalData.dhRec[0]}`, */
						`/menu/openid/o0wn04gRkRW6BiuGbjDZiLAPumX0/options/beef,shellfish/date/2022-06-19/mealtime/Lunch/dh/
						${that.globalData.dhRec[0]}`,
						{},
						"GET"
					);
					let recMenu = JSON.parse(JSON.stringify(dhRecMenu[dhRecommended]));
					//处理type
					for (let type in Object.keys(recMenu)) {
						for (let typeEng in that.globalData.userPreferenceEng) {
							if (
								Object.keys(recMenu)[type] ==
								that.globalData.userPreferenceEng[typeEng]
							) {
								that.globalData.displayRecTypes.push(
									that.globalData.userPreference[typeEng]
								);
							}
						}
					}
					//处理对应菜品
					for (let type in recMenu) {
						that.globalData.recDish.push(recMenu[type]);
					}
					/* 获取推荐餐厅信息 =/

					/* 获取全部餐厅信息 ===============================================*/
					for (let dh in that.globalData.dhArr) {
						let tempAllMenu = await request(
							/* 	`/menu/date/${that.globalData.myDate}
							/mealtime/${that.globalData.mealInterval[mealIndex]}
							/dh/${that.globalData.dhArr[dh]}`, */
							`/menu/date/2022-06-19/mealtime/Lunch/dh/${that.globalData.dhArr[dh]}`,
							{},
							"GET"
						);
						if (that.globalData.dhArr[dh] == "evk") {
							that.globalData.evkCate = Object.keys(
								tempAllMenu[that.globalData.dhArr[dh]]
							);
							for (let cate in that.globalData.evkCate) {
								let category = {
									cate: "",
									dishes: [],
								};
								category.cate = that.globalData.evkCate[cate];
								category.dishes =
									tempAllMenu["evk"][that.globalData.evkCate[cate]];
								that.globalData.evkMenu.push(category);
							}
						}
						if (that.globalData.dhArr[dh] == "pks") {
							that.globalData.pksCate = Object.keys(
								tempAllMenu[that.globalData.dhArr[dh]]
							);
							for (let cate in that.globalData.pksCate) {
								let category = {
									cate: "",
									dishes: [],
								};
								category.cate = that.globalData.pksCate[cate];
								category.dishes =
									tempAllMenu["pks"][that.globalData.pksCate[cate]];
								that.globalData.pksMenu.push(category);
							}
						}
						if (that.globalData.dhArr[dh] == "vlg") {
							that.globalData.vlgCate = Object.keys(
								tempAllMenu[that.globalData.dhArr[dh]]
							);
							for (let cate in that.globalData.vlgCate) {
								let category = {
									cate: "",
									dishes: [],
								};
								category.cate = that.globalData.vlgCate[cate];
								category.dishes =
									tempAllMenu["vlg"][that.globalData.vlgCate[cate]];
								that.globalData.vlgMenu.push(category);
							}
						}
					}

					// 获取每个餐厅推荐菜品
					for (let i = 0; i < 3; i++) {
						let dhRecMenu = await request(
							/* `/menu/openid/${that.globalData.openid}
							/options/${userPreferenceEng.join(',')}
							/date/${that.globalData.myDate}
							/mealtime/${that.globalData.mealInterval[mealIndex]}
							/dh/${that.globalData.dhRec[0]}`, */
							`/menu/openid/o0wn04gRkRW6BiuGbjDZiLAPumX0/options/beef,shellfish/date/2022-06-19/mealtime/Lunch/dh/
							${that.globalData.dhArr[i]}`,
							{},
							"GET"
						);
						let recMenu = JSON.parse(
							JSON.stringify(dhRecMenu[that.globalData.dhArr[i]])
						);
						//处理对应菜品
						if (that.globalData.dhArr[i] == "evk") {
							for (let type in recMenu) {
								that.globalData.evkRec.push(recMenu[type]);
							}
						}
						if (that.globalData.dhArr[i] == "pks") {
							for (let type in recMenu) {
								that.globalData.pksRec.push(recMenu[type]);
							}
						}
						if (that.globalData.dhArr[i] == "vlg") {
							for (let type in recMenu) {
								that.globalData.vlgRec.push(recMenu[type]);
							}
						}
					}
					for (let i = 0; i < 3; i++) {
						if (that.globalData.dhArr[i] != dhRecommended) {
							that.globalData.otherDh.push(that.globalData.dhArr[i]);
							let obj = {
								dh: "",
								types: [],
								rec: [],
							};
							obj.dh = that.globalData.dhArr[i];
							obj.types = that.globalData.displayRecTypes;
							if (obj.dh == "vlg") obj.rec = that.globalData.vlgRec;
							if (obj.dh == "evk") obj.rec = that.globalData.evkRec;
							if (obj.dh == "pks") obj.rec = that.globalData.pksRec;
							that.globalData.otherDhRec.push(obj);
						}
					}
					/* 获取全部餐厅信息 =*/

					/* prevent home.onload aroused before app.onlaunch ===============*/
					if (that.userCallBack) {
						// console.log(that.globalData.dhRec);
						that.userCallBack(that.globalData.dhRec);
					}
					if (that.menuCallBack) {
						// console.log(that.globalData.vlgCate);
						that.menuCallBack(that.globalData.vlgCate);
					}
					/* prevent home.onload aroused before app.onlaunch =*/
				}
				// 若是第一次登陆，跳转到欢迎界面
				else {
					wx.redirectTo({
						url: "/pages/welcome/welcome",
					});
				}
			},
		});
	},
	globalData: {
		/* user info */
		isFirst: false,
		userInfo: {},
		openid: 0,
		userPreference: [],
		userPreferenceEng: [],
		/* cec menu */
		dhRank: [],
		dhArr: ["evk", "pks", "vlg"],
		dhRec: [],
		displayRecTypes: [],
		recDish: [],
		otherDh: [],
		otherDhRec: [],
		/* all menu */
		evkMenu: [],
		pksMenu: [],
		vlgMenu: [],
		evkCate: [],
		evkDish: [],
		pksCate: [],
		pksDish: [],
		vlgCate: [],
		vlgDish: [],

		evkRec: [],
		vlgRec: [],
		pksRec: [],
		/* static data */
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
		/* mealtime info */
		mealInterval: ["Breakfast", "Lunch", "Dinner"],
		mealIndex: -1,
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
