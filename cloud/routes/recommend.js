const express = require("express");
const router = express.Router();
const types = require("../static/types");
const db = require("../routes/db");
const dhall_rec = ["vlg_rec", "evk_rec", "pks_rec"];
// find how many matched dishes
let getRecommend = require("../controllers/getRecommend");

// DISPLAY Recommend
router.get("/openid/:openid", (req, res) => {
	const { openid } = req.params;
	let sql = `select evk_rec, pks_rec, vlg_rec from userInfo where userOpenId = '${openid}';`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
		res.end();
	});
});
// update recommend
router.put(
	"/openid/:openid/date/:date/mealtime/:mealtime",
	async (req, res) => {
		const { openid, date, mealtime } = req.params;
		//initialize the recommendation index to zero
		dhall_rec.forEach((d) => {
			let sql = `update userInfo set ${d} = 0 where userOpenId = '${openid}';`;
			db.query(sql, (err, result) => {
				if (err) throw err;
			});
		});
		getRecommend(openid, date, mealtime);
		res.json({
			success: true,
		});
	}
);

module.exports = router;
