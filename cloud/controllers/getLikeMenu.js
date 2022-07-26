// const Async = require("async");
const db = require("../routes/db");

async function getLikeMenu(openid, options, date, mealtime, dh) {
	let resultdic = {};
	let optiondic = [];
	let foodList = [];
	optionsArr = options.split(",");
	if (resultdic[`${dh}`] === undefined) {
		resultdic[`${dh}`] = {};
	}
	for (i in optionsArr) {
		let option = optionsArr[i];
		if (resultdic[`${dh}`][`${option}`] === undefined) {
			resultdic[`${dh}`][`${option}`] = [];
		}
		foodList = await getFood(dh, option, openid, date, mealtime);
		resultdic[`${dh}`][`${option}`] = foodList;
	}
	return resultdic;
}

function getResult(dh, option, openid, date, mealtime) {
	return new Promise((resolve, reject) => {
		db.getConnection(function (err, connection) {
			let sql = `select food_ch from ${dh}
			inner join userInfo on ceil(${dh}.${option}) = ceil(userInfo.${option})
			where ${dh}.time = '${date}' and ${dh}.meal_time = '${mealtime}' and userInfo.userOpenId = '${openid}';`;
			connection.query(sql, (err, result) => {
				// console.log(result);
				if (err) reject(err);
				if (result.length >= 0) {
					resolve(result);
				}
				connection.destroy();
			});
		});
	});
}

async function getFood(dh, option, openid, date, mealtime) {
	return new Promise(async (resolve, reject) => {
		let foodList = [];
		let result = await getResult(dh, option, openid, date, mealtime);
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
