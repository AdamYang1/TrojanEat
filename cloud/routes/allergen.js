const express = require("express");
const router = express.Router();
const db = require("../routes/db");
const types = require("../static/types");
const getAllergen = require("../controllers/getAllergen");

//display allergic types
router.get("/openid/:openid", async (req, res) => {
	let result = [];
	const { openid } = req.params;
	for (let i = 0; i < types.length; ++i) {
		let temp = await getAllergen(openid, types[i]);
		if (temp.length > 0) {
			let t = JSON.stringify(temp);
			let first_index = t.indexOf("{") + 1;
			let last_index = t.indexOf(":") - 1;
			let allergen = t.substring(++first_index, last_index);
			result.push(allergen);
		}
	}
	res.send(result);
});

// update allergic types
router.put("/openid/:openid/allergens/:allergens", (req, res) => {
	const { openid, allergens } = req.params;
	alArr = allergens.split(",");
	alArr.forEach((al) => {
		let sql = `update userInfo set ${al} = -1 where userOpenId = '${openid}';`;
		db.query(sql, (err, result) => {
			if (err) throw err;
		});
	});
});
module.exports = router;
