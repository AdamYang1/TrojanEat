const express = require('express');
const router = express.Router();
const db = require('../routes/db');
// specific dinning hall in specific time with all menu
router.get('/dhall/:dhall/date/:date/mealtime/:mealtime',
    (req, res) => {
        const { dhall, date, mealtime } = req.params;
        let sql = `select time, meal_time, food from ${dhall} where time = '${date}' and meal_time = '${mealtime}'`;
        // console.log(sql);
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
            res.end();
        })
    });
module.exports = router;