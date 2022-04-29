const Async = require("async");
const db = require("../routes/db");

function getAllergen(openid, type) {
	return new Promise((resolve, reject) => {
		let sql = `select ${type} from userInfo where userOpenId = '${openid}' and ${type} = -1;`;
		db.query(sql, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});
}
// let sql = `select ${type} from userInfo where userOpenId = '${openid}' and ${type} = -1;`;
module.exports = getAllergen;
