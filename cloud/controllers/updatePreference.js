const db = require("../routes/db");

function updatePreference(openid, optionsArr) {
	for (let i = 0; i < optionsArr.length; ++i) {
		db.getConnection(function (err, connection) {
			let weight = 1 - 0.1 * i;
			let sql = `update userInfo set ${optionsArr[i]} = ${weight} where userOpenId = '${openid}'`;
			connection.query(sql, (err, result) => {
				if (err) throw err;
				connection.release();
			});
		});
	}
}

module.exports = updatePreference;
