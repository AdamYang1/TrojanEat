const express = require("express");
const router = express.Router();
const db = require("../routes/db");
const Async = require("async");

const types = require("../static/types");
const dhalls = require("../static/dhalls");

router.get("/date/:date", (req, res) => {
	const { date } = req.params;
	for (let i = 0; i < 3; i++) {
		let sql = `select (sum(vegan) + sum(vegetarian))/count(food) as res from ${dhalls[i]} where time = "${date}";`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			let temp = JSON.stringify(result[0]).substring(7, 11);
			if (temp != "null") {
				if (temp > 0.9) {
					res.send({
						vegan: dhalls[i],
					});
				}
			}
		});
	}
});

module.exports = router;
