const express = require("express");
const router = express.Router();
const db = require("../routes/db");
const dhalls = ["vlg", "evk", "pks"];
// const { spawn } = require("child_process");
const parseData = require("../controllers/parseData");
//先删除raw data， 然后爬取新的数据，然后drop 之前的proc表格，重新create

// delete data in dh_raw tables
router.put("/delete", (req, res) => {
	dhalls.forEach((dh) => {
		let sql = `delete from ${dh}_raw;`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			// res.send({ sucess: true });
			return result;
		});
	});
	res.send({ sucess: true });
});

// parse data
router.get(
	"/parse/year/:year/month1/:month1/day1/:day1/month2/:month2/day2/:day2/",
	async (req, res) => {
		let success = true;
		const { year, month1, day1, month2, day2 } = req.params;
		parseData(year, month1, day1, month2, day2);
		dhalls.forEach((dh) => {
			let sql = `select * from ${dh}_raw;`;
			db.query(sql, (err, result) => {
				if (err) {
					success = false;
					throw err;
				}
				return result;
			});
		});
		if (success) res.send({ success: true });
	}
);

// drop dh_proc tables
router.put("/drop", (req, res) => {
	dhalls.forEach((dh) => {
		let sql = `drop table ${dh};`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			// res.send({ sucess: true });
			return result;
		});
	});
	res.send({ sucess: true });
});

// create dh_proc tables
router.put("/proc", (req, res) => {
	dhalls.forEach((dh) => {
		let sql = `create table if not exists ${dh} as
        select
            time, meal_time, category, food, food_ch,
            dairy, eggs, fish, not_analyzed_for_allergens, peanuts, pork, chicken, beef, sesame, shellfish, soy, tree_nuts,
            vegan, vegetarian, wheat_gluten
        from(
            select time, meal_time, category, food, food_ch,
            case when locate('dairy', lower(type)) > 0 then 1 else 0 end as dairy,
            case when locate('ggs', lower(type)) > 0 then 1 else 0 end as eggs,
            case when locate('fish', lower(type)) > 0 then 1 else 0 end as fish,
            case when locate('food not analyzed for allergens', lower(type)) > 0 then 1 else 0 end as not_analyzed_for_allergens,
            case when locate('peanuts', lower(type)) > 0 then 1 else 0 end as peanuts,
            case when locate('pork', lower(type)) > 0 then 1 else 0 end as pork,
            case when locate('chicken', lower(food)) > 0 then 1 else 0 end as chicken,
            case when locate('beef', lower(food)) > 0 then 1 else 0 end as beef,
            case when locate('sesame', lower(type)) > 0 then 1 else 0 end as sesame,
            case when locate('sellfish', lower(type)) > 0 then 1 else 0 end as shellfish,
            case when locate('soy', lower(type)) > 0 then 1 else 0 end as soy,
            case when locate('tree', lower(type)) > 0 then 1 else 0 end as tree_nuts,
            case when locate('vegan', lower(type)) > 0 then 1 else 0 end as vegan,
            case when locate('vegetarian', lower(type)) > 0 then 1 else 0 end as vegetarian,
            case when locate('wheat', lower(type)) > 0 then 1 else 0 end as wheat_gluten
            from ${dh}_raw
            )
        as ${dh}_temp;`;
		db.query(sql, (err, result) => {
			if (err) throw err;
			// res.send({ sucess: true });
		});
	});
	res.send({ sucess: true });
});

module.exports = router;
