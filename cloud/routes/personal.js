const express = require("express");
const router = express.Router();
const db = require("../routes/db");
const Async = require("async");

const types = require("../static/types");
const dhalls = require("../static/dhalls");
// !!!!! first time using !!!!!!
// add new userinfo (first time using)
router.post("/newuser/openid/:openid", (req, res) => {
	Async.waterfall([
		function (callback) {
			const { openid } = req.params;
			let sql = `insert into userInfo (userOpenId) values ('${openid}');`;
			db.query(sql, (err, result) => {
				if (err) throw err;
				res.end();
			});
			callback(null, openid);
		}, // update new user preference (first time using)
		function (openid, callback) {
			for (let i = 0; i < 15; ++i) {
				let sql = `update userInfo set ${types[i]} = 0 where userOpenId = '${openid}';`;
				db.query(sql, (err, result) => {
					if (err) throw err;
				});
			}
			callback(null, openid);
		}, //update new user preference for dinninghall (first time using)
		function (openid) {
			dhalls.forEach((dhall) => {
				let sql = `update userInfo set ${dhall} = 0 where userOpenId = '${openid}';`;
				db.query(sql, (err, result) => {
					if (err) throw err;
				});
			});
		},
	]);
});

// ===================== after the first time :) ==========================
// like!!! dishes
router.put(
	"/customer/openid/:openid/like/options/:options/prev/:prev",
	(req, res) => {
		const { openid, options, prev } = req.params;
		const optionsArr = options.split(",");
		const prevArr = prev.split(",");
		//initialize all the choices again
		for (let i = 0; i < prevArr.length; ++i) {
			let sql = `update userInfo set ${prevArr[i]} = 0 where userOpenId = '${openid}'`;
			db.query(sql, (err, result) => {
				if (err) throw err;
			});
		}
		for (let i = 0; i < optionsArr.length; ++i) {
			// console.log(optionsArr[i]);
			let weight = 1 - 0.1 * i;
			let sql = `update userInfo set ${optionsArr[i]} = ${weight} where userOpenId = '${openid}'`;
			db.query(sql, (err, result) => {
				if (err) throw err;
			});
		}
		// console.log(options.split(','));
		// let sql = `update userInfo set `
		res.end();
	}
);

// !!! dislike changed to allergen!!!
// router.put("/customer/openid/:openid/dislike/options/:options", (req, res) => {
// 	const { openid, options } = req.params;
// 	const optionsArr = options.split(",");
// 	for (let i = 0; i < 15; ++i) {
// 		let sql = `update userInfo set ${types[i]} = 0 where userOpenId = '${openid}' and ${types[i]} = -1;`;
// 		db.query(sql, (err, result) => {
// 			if (err) throw err;
// 		});
// 	}
// 	for (let i = 0; i < optionsArr.length; ++i) {
// 		let sql = `update userInfo set ${optionsArr[i]} = -1 where userOpenId = '${openid}'`;
// 		db.query(sql, (err, result) => {
// 			if (err) throw err;
// 		});
// 	}
// console.log(options.split(','));
// let sql = `update userInfo set `
// 	res.end();
// });
//!!!

// dinning hall ranking
router.put("/customer/openid/:openid/dhranking/:dhranking", (req, res) => {
	const { openid, dhranking } = req.params;
	const dhArr = dhranking.split(",");
	for (let i = 0; i < 3; ++i) {
		let sql = `update userInfo set ${dhArr[i]} = ${
			i + 1
		} where userOpenId = '${openid}'`;
		db.query(sql, (err, result) => {
			if (err) throw err;
		});
	}
	res.end();
});

// display user preference
router.get("/openid/:openid", (req, res) => {
	const { openid } = req.params;
	let sql = `select * from userInfo where userOpenId = '${openid}';`;
	db.query(sql, (err, result) => {
		res.send(result);
	});
});

module.exports = router;
