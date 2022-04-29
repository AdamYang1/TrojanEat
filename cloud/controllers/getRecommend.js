const Async = require("async");
const db = require("../routes/db");
const types = require("../static/types");
const dhall = ["vlg", "evk", "pks"];

function getRecommend(openid, date, mealtime) {
	Async.map(
		types,
		function (type, callback) {
			// find out user's preference
			db.query(
				`select ${type} from userInfo where userOpenId = '${openid}' and
        ${type} != -1 and ${type} != 0`,
				(err, result) => {
					if (err) throw err;
					let len = type.length;
					// console.log(result);
					let temp = JSON.stringify(result).substring(3, 3 + len);
					callback(null, temp);
				}
			);
		},
		function (err, results) {
			//results is user's preference array
			results.forEach((t) => {
				if (t.length > 0) {
					dhall.forEach((dh) => {
						Async.waterfall([
							//count how many matched dishes for each dinning hall
							function (callback) {
								let sql = `with temp as(
                            select time, meal_time, userInfo.userOpenId as openid, userInfo.${t} as weight, ${dh}.food as recommend from ${dh}
                            inner join userInfo on ceil(${dh}.${t}) = ceil(userInfo.${t}) where ${dh}.time = '${date}' and ${dh}.meal_time = '${mealtime}' and userInfo.userOpenId = '${openid}')
							select count(recommend)*weight from temp group by time;`;
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
								let sql = `update userInfo set ${dh}_rec = ${dh}_rec + ${count} where userOpenId = '${openid}';`;
								db.query(sql, (err, result) => {
									if (err) throw err;
									// console.log('计算成功！！！')
								});
							},
						]);
					});
				}
			});
		}
	);
}

module.exports = getRecommend;
