// const Async = require("async");
const db = require("../routes/db");
const { vlg_c, pks_c, evk_c } = require("../static/categories");
async function getLikeMenu(dh, date, mealtime) {
	let resultdic = {};
	let foodList = [];
	let categories = [];
	if (dh == "vlg") categories = vlg_c;
	else if (dh == "evk") categories = evk_c;
	else if (dh == "pks") categories = pks_c;
	if (resultdic[`${dh}`] === undefined) {
		resultdic[`${dh}`] = {};
	}
	for (i in categories) {
		let cate = categories[i];
		if (resultdic[`${dh}`][`${cate}`] === undefined) {
			resultdic[`${dh}`][`${cate}`] = [];
		}
		foodList = await getFood(dh, cate, date, mealtime);
		resultdic[`${dh}`][`${cate}`] = foodList;
	}
	return resultdic;
}

function getFoodList(dh, cate, date, mealtime) {
	return new Promise((resolve, reject) => {
		let sql = `select food_ch from ${dh} where category = '${cate}' and meal_time = '${mealtime}' and time = '${date}';`;
		db.query(sql, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});
}

async function getFood(dh, cate, date, mealtime) {
	return new Promise(async (resolve, reject) => {
		let foodList = [];
		let result = await getFoodList(dh, "Crepes", date, mealtime);
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
module.exports = getLikeMenu;
