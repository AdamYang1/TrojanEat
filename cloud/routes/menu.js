const express = require("express");
const Async = require("async");
const router = express.Router();
const db = require("../routes/db");
const dhalls = ["vlg", "evk", "pks"];
const getLikeMenu = require("../controllers/getLikeMenu");
// const getLikeMenu = require("../controllers/getLikeMenu");
// specific dinning hall in specific time with all menu
router.get("/dhall/:dhall/date/:date/mealtime/:mealtime", (req, res) => {
	const { dhall, date, mealtime } = req.params;
	let sql = `select time, meal_time, food from ${dhall} where time = '${date}' and meal_time = '${mealtime}'`;
	// console.log(sql);
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
		res.end();
	});
});
// get menu from a dinning according to preference
router.get(
	"/openid/:openid/options/:options/date/:date/mealtime/:mealtime/dh/:dh",
	async (req, res) => {
		const { openid, options, date, mealtime, dh } = req.params;
		let test = await getLikeMenu(openid, options, date, mealtime, dh);
		// console.log(test);
		JSON.stringify(test);
		res.status(200).send(test);
		res.end();
	}
);

module.exports = router;
