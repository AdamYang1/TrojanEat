const express = require("express");
const router = express.Router();
const db = require("../routes/db");
const getLikeMenu = require("../controllers/getLikeMenu");
const getAllLikeMenu = require("../controllers/getAllMenu");
const getAllergenMenu = require("../controllers/getAllergenMenu");
const getAllergenMenuEng = require("../controllers/getAllergenMenuEng");

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
//!!!preference menu!!! 记得传入options
//!!!一次只能返回一个餐厅的menu
// get menu from a dinning according to preference
router.get(
	"/openid/:openid/options/:options/date/:date/mealtime/:mealtime/dh/:dh",
	async (req, res) => {
		const { openid, options, date, mealtime, dh } = req.params;
		let likeMenu = await getLikeMenu(openid, options, date, mealtime, dh);
		JSON.stringify(likeMenu);
		res.status(200).send(likeMenu);
		res.end();
	}
);

router.get(
	"/openid/:openid/options/:options/date/:date/mealtime/:mealtime/dh/:dh",
	async (req, res) => {
		const { openid, options, date, mealtime, dh } = req.params;
		let likeMenu = await getLikeMenuEng(openid, options, date, mealtime, dh);
		JSON.stringify(likeMenu);
		res.status(200).send(likeMenu);
		res.end();
	}
);

//!!!allergen menu!!! 记得传入allergens
//!!!一次只能返回一个餐厅的menu
router.get(
	"/openid/:openid/allergens/:allergens/date/:date/mealtime/:mealtime/dh/:dh",
	async (req, res) => {
		const { openid, allergens, date, mealtime, dh } = req.params;
		let alMenu = await getAllergenMenu(openid, allergens, date, mealtime, dh);
		JSON.stringify(alMenu);
		res.status(200).send(alMenu);
		res.end();
	}
);

// get all menu
router.get("/date/:date/mealtime/:mealtime/dh/:dh", async (req, res) => {
	const { date, mealtime, dh } = req.params;
	let allMenu = await getAllLikeMenu(dh, date, mealtime);
	JSON.stringify(allMenu);
	res.status(200).send(allMenu);
	res.end();
});
module.exports = router;
