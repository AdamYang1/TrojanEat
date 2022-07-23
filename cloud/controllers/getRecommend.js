const Async = require("async");
const db = require("../routes/db");
const types = require("../static/types");
const dhall = ["vlg", "evk", "pks"];
function getRecommend(openid, date, mealtime, temp) {
	Async.map(temp, function (type, callback) {
		//results is user's preference array
		dhall.forEach((dh) => {
			let open = false;
			Async.waterfall([
				//待优化
				//filter dhall that closes
				function (callback) {
					let sql = `select * from ${dh} where time = "${date}" and meal_time = "${mealtime}";`;
					db.query(sql, (err, result) => {
						if (err) throw err;
						open = result.length > 0 ? true : false;
						callback(null);
					});
				},
				//count how many matched dishes for each dinning hall
				function (callback) {
					if (!open) return;
					let sql = `select
					count(${dh}.food)*userinfo.${type} as recommend from ${dh}
					inner join userinfo on ceil(${dh}.${type}) = ceil(userinfo.${type})
					where ${dh}.time = '${date}' and
					${dh}.meal_time = '${mealtime}' and userinfo.userOpenId = '${openid}';`;
					db.query(sql, (err, output) => {
						if (err) throw err;
						let temp = JSON.stringify(output);
						let first_index = temp.indexOf(":");
						let last_index = temp.lastIndexOf("}");
						let count = temp.substring(++first_index, last_index); //21
						if (count.length == 0) count = 0;
						callback(null, count, openid);
					});
				},
				// augment the result to the dh_rec
				function (count, openid, callback) {
					if (!open) return;
					let sql = `update userInfo set ${dh}_rec = ${dh}_rec + ${count} where userOpenId = '${openid}';`;
					db.query(sql, (err, result) => {
						if (err) throw err;
						// console.log('计算成功！！！')
					});
				},
			]);
		});
	});
}

module.exports = getRecommend;
