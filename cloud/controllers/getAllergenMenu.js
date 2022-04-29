// const Async = require("async");
const db = require("../routes/db");

async function getAllergenMenu(openid, allergens, date, mealtime, dh) {
	let resultdic = {};
	let foodList = [];
	allergensArr = allergens.split(",");
	if (resultdic[`${dh}`] === undefined) {
		resultdic[`${dh}`] = {};
	}
	for (i in allergensArr) {
		let allergen = allergensArr[i];
		if (resultdic[`${dh}`][`${allergen}`] === undefined) {
			resultdic[`${dh}`][`${allergen}`] = [];
		}
		foodList = await getFood(dh, allergen, openid, date, mealtime);
		resultdic[`${dh}`][`${allergen}`] = foodList;
	}
	return resultdic;
}

function getResult(dh, allergen, openid, date, mealtime) {
	return new Promise((resolve, reject) => {
		let sql = `select food_ch from ${dh}
		inner join userInfo on abs(${dh}.${allergen}) = abs(userInfo.${allergen})
		where ${dh}.time = '${date}' and ${dh}.meal_time = '${mealtime}' and userInfo.userOpenId = '${openid}';`;
		db.query(sql, (err, result) => {
			// console.log(result);
			if (err) reject(err);
			if (result.length > 0) {
				resolve(result);
			}
			if (result.length == 0) {
				resolve(result);
			}
		});
	});
}

async function getFood(dh, allergen, openid, date, mealtime) {
	return new Promise(async (resolve, reject) => {
		let foodList = [];
		let result = await getResult(dh, allergen, openid, date, mealtime);
		foodList = result.map((r) => {
			let temp = JSON.stringify(r);
			let first_index = temp.indexOf(":") + 1;
			let last_index = temp.lastIndexOf("}") - 1;
			let food = temp.substring(++first_index, last_index);
			return food;
		});
		resolve(foodList);
	});
}

module.exports = getAllergenMenu;
