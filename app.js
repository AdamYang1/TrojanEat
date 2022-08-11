// app.js
import request from "./pages/request/request";
// let app = getApp();
App({
	async onLaunch() {
		// console.log('app launched');
		let that = this;
		// 展示本地存储能力
		const logs = wx.getStorageSync("logs") || [];
		logs.unshift(Date.now());
		wx.setStorageSync("logs", logs);

		/* 获取当前日期 */
		let date = new Date();
		let myDay = date.getDay();
		let myTime = date.toTimeString();
		let myMonth = date.getMonth() + 1;
		let myDate = date.getFullYear() + "-" + myMonth + "-" + date.getDate();
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
			that.globalData.mealIndex = -1;
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
		} else if (that.globalData.isLunch) {
			that.globalData.mealIndex = 1;
		} else if (that.globalData.isDinner) {
			that.globalData.mealIndex = 2;
		} else {
			that.globalData.mealIndex = -1;
		}
		that.globalData.myDate = myDate;
		/* 日期 */
		console.log(that.globalData.mealIndex);
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
				// 若不是，获取用户喜好并跳转页面
				if (!that.globalData.isFirst) {
					if (that.globalData.mealIndex != -1) {
						that.globalData.isOpen = true;
						console.log(that.globalData.isOpen);
						/* 获取用户信息 ===============================================*/
						let user = await request(
							`/personal/openid/${that.globalData.openid}`,
							{},
							"GET"
						);
						/* 获取用户信息 =*/

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

						//需要处理如果用户有喜好
						
						if (that.globalData.userPreference.length != 0) {
							/* 更新用户当天推荐餐厅排名 =====================================*/
							/* 获取用户当天餐厅排名 ============================================*/
							let dhRank = [];
							await request(
								`/recommend/openid/${that.globalData.openid}/date/${
									that.globalData.myDate
								}
								/mealtime/${
									that.globalData.mealInterval[that.globalData.mealIndex]
								}/options/${that.globalData.userPreferenceEng.join(",")}`,
								{},
								"PUT"
							).then(async () => {
								dhRank = await request(
									`/recommend/openid/${that.globalData.openid}`,
									{},
									"GET"
								);
								console.log(dhRank);
							});
							/* 更新用户当天推荐餐厅排名 =*/
							/* 获取用户当天餐厅排名 =*/

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
							console.log(dhRecommended);
							let dhRecMenu = await request(
								`/menu/openid/${that.globalData.openid}
						/options/${that.globalData.userPreferenceEng.join(",")}
						/date/${that.globalData.myDate}
						/mealtime/${that.globalData.mealInterval[that.globalData.mealIndex]}
						/dh/${that.globalData.dhRec[0]}`,
								{},
								"GET"
							);
							let dhRecMenuEng = await request(
								`/menu/openid/${that.globalData.openid}
						/options/${that.globalData.userPreferenceEng.join(",")}
						/date/${that.globalData.myDate}
						/mealtime/${that.globalData.mealInterval[that.globalData.mealIndex]}
						/dh/${that.globalData.dhRec[0]}/eng`,
								{},
								"GET"
							);
							let recMenu = JSON.parse(
								JSON.stringify(dhRecMenu[dhRecommended])
							);
							let recMenuEng = JSON.parse(
								JSON.stringify(dhRecMenuEng[dhRecommended])
							);
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
							for (let type in recMenuEng) {
								that.globalData.recDishEng.push(recMenuEng[type]);
							}
							/* 获取推荐餐厅信息 =/

					/* 获取全部餐厅信息 ===============================================*/
							for (let dh in that.globalData.dhArr) {
								let tempAllMenu = await request(
									`/menu/date/${that.globalData.myDate}
							/mealtime/${that.globalData.mealInterval[that.globalData.mealIndex]}
							/dh/${that.globalData.dhArr[dh]}`,
									//!!! TESTING
									// `/menu/date/2022-06-19/mealtime/Lunch/dh/${that.globalData.dhArr[dh]}`,
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
									`/menu/openid/${that.globalData.openid}
							/options/${that.globalData.userPreferenceEng.join(",")}
							/date/${that.globalData.myDate}
							/mealtime/${that.globalData.mealInterval[that.globalData.mealIndex]}
							/dh/${that.globalData.dhArr[i]}`,
									{},
									"GET"
								);
								let dhRecMenuEng = await request(
									`/menu/openid/${that.globalData.openid}
							/options/${that.globalData.userPreferenceEng.join(",")}
							/date/${that.globalData.myDate}
							/mealtime/${that.globalData.mealInterval[that.globalData.mealIndex]}
							/dh/${that.globalData.dhArr[i]}/eng`,
									{},
									"GET"
								);

								let recMenu = JSON.parse(
									JSON.stringify(dhRecMenu[that.globalData.dhArr[i]])
								);
								let recMenuEng = JSON.parse(
									JSON.stringify(dhRecMenuEng[that.globalData.dhArr[i]])
								);
								//处理对应菜品
								if (that.globalData.dhArr[i] == "evk") {
									for (let type in recMenu) {
										that.globalData.evkRec.push(recMenu[type]);
										that.globalData.evkRecEng.push(recMenuEng[type]);
									}
								}
								if (that.globalData.dhArr[i] == "pks") {
									for (let type in recMenu) {
										that.globalData.pksRec.push(recMenu[type]);
										that.globalData.pksRecEng.push(recMenuEng[type]);
									}
								}
								if (that.globalData.dhArr[i] == "vlg") {
									for (let type in recMenu) {
										that.globalData.vlgRec.push(recMenu[type]);
										that.globalData.vlgRecEng.push(recMenuEng[type]);
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
									let objEng = {
										dh: "",
										types: [],
										rec: [],
									};
									obj.dh = that.globalData.dhArr[i];
									objEng.dh = obj.dh;
									obj.types = that.globalData.displayRecTypes;
									objEng.types = obj.types;
									if (obj.dh == "vlg") {
										obj.rec = that.globalData.vlgRec;
										objEng.rec = that.globalData.vlgRecEng;
									}
									if (obj.dh == "evk") {
										obj.rec = that.globalData.evkRec;
										objEng.rec = that.globalData.evkRecEng;
									}
									if (obj.dh == "pks") {
										obj.rec = that.globalData.pksRec;
										objEng.rec = that.globalData.pksRecEng;
									}
									that.globalData.otherDhRec.push(obj);
									that.globalData.otherDhRecEng.push(obj);
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
						} else {
							that.globalData.havePreference = false;
						}
					} else {
						that.globalData.isOpen = false;
						console.log(that.globalData.isOpen);
					}
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
		/* open */
		isOpen: true,
		/* user info */
		havePreference: true,
		isFirst: false,
		userInfo: {},
		openid: 0,
		userPreference: [],
		userPreferenceEng: [],
		/* rec menu */
		dhRank: [],
		dhArr: ["evk", "pks", "vlg"],
		dhRec: [],
		displayRecTypes: [],
		recDish: [],
		recDishEng: [],
		otherDh: [],
		otherDhRec: [],
		otherDhRecEng: [],
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
		evkRecEng: [],

		vlgRec: [],
		vlgRecEng: [],

		pksRec: [],
		pksRecEng: [],

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
